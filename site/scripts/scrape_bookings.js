/**
 * ATL Film Studios — Booking reconciliation scrape
 *
 * Runs every 6h on the Manus cloud computer. Logs into Peerspace + Giggster
 * host dashboards, scrapes upcoming bookings (next 30 days), upserts each row
 * into the Airtable Bookings table using `External Booking ID` as the key.
 *
 * This is the FALLBACK / RECONCILIATION layer. The Zapier email parsers are
 * the primary ingestion path. When they disagree, the SCRAPE wins because it
 * reads committed dashboard state, not just emails.
 *
 * Env vars (set in Manus cloud-pc):
 *   PEERSPACE_EMAIL, PEERSPACE_PASSWORD
 *   GIGGSTER_EMAIL,  GIGGSTER_PASSWORD
 *   AIRTABLE_API_KEY    (Personal Access Token with data.records:read+write
 *                        on base app1RrZATZ37l4xCP)
 *   AIRTABLE_BASE_ID    = "app1RrZATZ37l4xCP"
 *   BOOKINGS_TABLE_ID   = "tblnA7MKpBdRbxevY"
 *   CLIENTS_TABLE_ID    = "tbl5gFvet898n6cv7"
 *   SETS_TABLE_ID       = "tbllNJgd7YFPi0rYU"
 *
 * Cron: crontab -e
 *   0 */6 * * * cd /home/ubuntu && /usr/bin/node scrape_bookings.js >> scrape.log 2>&1
 *
 * Or systemd timer (preferred for reliability):
 *   /etc/systemd/system/scrape-bookings.service
 *   /etc/systemd/system/scrape-bookings.timer  (OnCalendar=*-*-* 00/6:00:00)
 */

const { chromium } = require('playwright');

const AT_BASE  = process.env.AIRTABLE_BASE_ID    || 'app1RrZATZ37l4xCP';
const AT_BOOK  = process.env.BOOKINGS_TABLE_ID   || 'tblnA7MKpBdRbxevY';
const AT_CLI   = process.env.CLIENTS_TABLE_ID    || 'tbl5gFvet898n6cv7';
const AT_SETS  = process.env.SETS_TABLE_ID       || 'tbllNJgd7YFPi0rYU';
const AT_KEY   = process.env.AIRTABLE_API_KEY;

if (!AT_KEY) { console.error('AIRTABLE_API_KEY missing'); process.exit(1); }

const AT_HEADERS = { Authorization: `Bearer ${AT_KEY}`, 'Content-Type': 'application/json' };

// Status enum (must match Airtable Bookings.Status single-select options)
const STATUS = {
  INQUIRY: 'Inquiry',
  PENDING_PAYMENT: 'Pending Payment',
  CONFIRMED: 'Confirmed',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  NO_SHOW: 'No-Show',
};

// ---------- Airtable helpers ----------

async function atFindByFormula(tableId, formula) {
  const url = `https://api.airtable.com/v0/${AT_BASE}/${tableId}?filterByFormula=${encodeURIComponent(formula)}&maxRecords=1`;
  const r = await fetch(url, { headers: AT_HEADERS });
  if (!r.ok) throw new Error(`Airtable find ${tableId}: ${r.status} ${await r.text()}`);
  const j = await r.json();
  return j.records?.[0] || null;
}

async function atCreate(tableId, fields) {
  const r = await fetch(`https://api.airtable.com/v0/${AT_BASE}/${tableId}`, {
    method: 'POST', headers: AT_HEADERS,
    body: JSON.stringify({ records: [{ fields }] }),
  });
  if (!r.ok) throw new Error(`Airtable create ${tableId}: ${r.status} ${await r.text()}`);
  const j = await r.json();
  return j.records[0];
}

async function atUpdate(tableId, recordId, fields) {
  const r = await fetch(`https://api.airtable.com/v0/${AT_BASE}/${tableId}/${recordId}`, {
    method: 'PATCH', headers: AT_HEADERS,
    body: JSON.stringify({ fields }),
  });
  if (!r.ok) throw new Error(`Airtable update ${tableId}/${recordId}: ${r.status} ${await r.text()}`);
  return (await r.json());
}

async function findOrCreateClient({ name, email, phone, source }) {
  const safeEmail = (email || '').toLowerCase().replace(/'/g, "\\'");
  if (safeEmail) {
    const existing = await atFindByFormula(AT_CLI, `LOWER({Email}) = '${safeEmail}'`);
    if (existing) return existing.id;
  }
  const fields = { Name: name || 'Unknown' };
  if (email) fields.Email = email;
  if (phone) fields.Phone = phone;
  if (source) fields['Source of First Contact'] = source;
  const created = await atCreate(AT_CLI, fields);
  return created.id;
}

async function findSetIdByName(setName) {
  if (!setName) return null;
  const safe = setName.replace(/'/g, "\\'");
  const rec = await atFindByFormula(AT_SETS, `LOWER({Set Name}) = LOWER('${safe}')`);
  return rec?.id || null;
}

async function upsertBooking(booking) {
  const externalId = booking.externalBookingId;
  if (!externalId) { console.warn('skip: no externalBookingId', booking); return; }

  const safe = externalId.replace(/'/g, "\\'");
  const existing = await atFindByFormula(AT_BOOK, `{External Booking ID} = '${safe}'`);

  const clientId = await findOrCreateClient({
    name: booking.clientName,
    email: booking.clientEmail,
    phone: booking.clientPhone,
    source: booking.source,
  });
  const setId = await findSetIdByName(booking.setName);

  const fields = {
    'External Booking ID': externalId,
    Source: booking.source,
    Start: booking.start,
    End: booking.end,
    'Hourly Rate': booking.hourlyRate ?? 150,
    'Platform Fee %': booking.source === 'Direct' ? 0 : 15,
    Status: booking.status || STATUS.CONFIRMED,
    Client: clientId ? [clientId] : undefined,
    Set: setId ? [setId] : undefined,
  };
  Object.keys(fields).forEach(k => fields[k] === undefined && delete fields[k]);

  if (existing) {
    await atUpdate(AT_BOOK, existing.id, fields);
    console.log(`  ↺ updated ${externalId}`);
  } else {
    await atCreate(AT_BOOK, fields);
    console.log(`  + created ${externalId}`);
  }
}

// ---------- Peerspace ----------

async function scrapePeerspace(browser) {
  console.log('[peerspace] starting...');
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  try {
    await page.goto('https://www.peerspace.com/auth/sign-in', { waitUntil: 'domcontentloaded' });
    await page.fill('input[name="email"], input[type="email"]', process.env.PEERSPACE_EMAIL);
    await page.fill('input[name="password"], input[type="password"]', process.env.PEERSPACE_PASSWORD);
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      page.click('button[type="submit"]'),
    ]);

    await page.goto('https://www.peerspace.com/dashboard/calendar', { waitUntil: 'networkidle' });

    // TODO: confirm these selectors after first manual login — Peerspace UI may
    // expose bookings as data-* attrs on calendar cells or as a separate /reservations endpoint.
    const bookings = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll('[data-booking-id], .booking-card, .reservation-row').forEach(el => {
        out.push({
          externalBookingId: 'peerspace-' + (el.dataset.bookingId || el.getAttribute('data-id') || ''),
          clientName: el.querySelector('.guest-name, .client-name')?.textContent?.trim(),
          clientEmail: el.querySelector('.guest-email, .client-email')?.textContent?.trim(),
          setName: el.querySelector('.venue-name, .listing-name')?.textContent?.trim(),
          start: el.dataset.start || el.querySelector('time.start')?.getAttribute('datetime'),
          end: el.dataset.end || el.querySelector('time.end')?.getAttribute('datetime'),
          totalAmount: parseFloat((el.querySelector('.total, .payout')?.textContent || '').replace(/[^0-9.]/g, '')),
          status: 'Confirmed',
          source: 'Peerspace',
        });
      });
      return out;
    });

    console.log(`[peerspace] found ${bookings.length} bookings`);
    for (const b of bookings) await upsertBooking(b);
  } catch (e) {
    console.error('[peerspace] error:', e.message);
  } finally {
    await ctx.close();
  }
}

// ---------- Giggster ----------

async function scrapeGiggster(browser) {
  console.log('[giggster] starting...');
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  try {
    await page.goto('https://giggster.com/login', { waitUntil: 'domcontentloaded' });
    await page.fill('input[type="email"], input[name="email"]', process.env.GIGGSTER_EMAIL);
    await page.fill('input[type="password"], input[name="password"]', process.env.GIGGSTER_PASSWORD);
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      page.click('button[type="submit"]'),
    ]);

    await page.goto('https://giggster.com/host/bookings', { waitUntil: 'networkidle' });

    // TODO: confirm selectors after first manual login
    const bookings = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll('.booking-row, [data-booking-id]').forEach(el => {
        out.push({
          externalBookingId: 'giggster-' + (el.dataset.bookingId || el.dataset.id || ''),
          clientName: el.querySelector('.guest-name')?.textContent?.trim(),
          clientEmail: el.querySelector('.guest-email')?.textContent?.trim(),
          setName: el.querySelector('.location-name')?.textContent?.trim(),
          start: el.dataset.start,
          end: el.dataset.end,
          totalAmount: parseFloat((el.querySelector('.total-amount')?.textContent || '').replace(/[^0-9.]/g, '')),
          status: 'Confirmed',
          source: 'Giggster',
        });
      });
      return out;
    });

    console.log(`[giggster] found ${bookings.length} bookings`);
    for (const b of bookings) await upsertBooking(b);
  } catch (e) {
    console.error('[giggster] error:', e.message);
  } finally {
    await ctx.close();
  }
}

// ---------- Main ----------

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    await scrapePeerspace(browser);
    await scrapeGiggster(browser);
    console.log('[done]', new Date().toISOString());
  } finally {
    await browser.close();
  }
})();
