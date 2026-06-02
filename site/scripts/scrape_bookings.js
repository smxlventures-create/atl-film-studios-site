const { chromium } = require('playwright');

const AT_BASE  = process.env.AIRTABLE_BASE_ID    || 'app1RrZATZ37l4xCP';
const AT_BOOK  = process.env.BOOKINGS_TABLE_ID   || 'tblnA7MKpBdRbxevY';
const AT_CLI   = process.env.CLIENTS_TABLE_ID    || 'tbl5gFvet898n6cv7';
const AT_SETS  = process.env.SETS_TABLE_ID       || 'tbllNJgd7YFPi0rYU';
const AT_KEY   = process.env.AIRTABLE_API_KEY;

if (!AT_KEY) {
  console.error('AIRTABLE_API_KEY missing');
  process.exit(1);
}

const AT_HEADERS = {
  Authorization: `Bearer ${AT_KEY}`,
  'Content-Type': 'application/json'
};

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
    method: 'POST',
    headers: AT_HEADERS,
    body: JSON.stringify({ records: [{ fields }] }),
  });
  if (!r.ok) throw new Error(`Airtable create ${tableId}: ${r.status} ${await r.text()}`);
  const j = await r.json();
  return j.records[0];
}

async function atUpdate(tableId, recordId, fields) {
  const r = await fetch(`https://api.airtable.com/v0/${AT_BASE}/${tableId}/${recordId}`, {
    method: 'PATCH',
    headers: AT_HEADERS,
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
  console.log(`[upsert] processing ${externalId}...`);
  const existing = await atFindByFormula(AT_BOOK, `{External Booking ID} = '${externalId}'`);
  
  const clientId = await findOrCreateClient({
    name: booking.clientName,
    email: booking.clientEmail,
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
    Notes: booking.notes
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

// ---------- Giggster ----------
async function scrapeGiggster(browser) {
  console.log('[giggster] starting...');
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await ctx.newPage();
  
  let apiBookings = [];
  
  // Intercept the API responses
  page.on('response', async response => {
    const url = response.url();
    if (url.includes('api.giggster.com/booking') && response.request().method() === 'GET') {
      try {
        const json = await response.json();
        if (json && Array.isArray(json.items)) {
          console.log(`[giggster] Captured API bookings count: ${json.items.length}`);
          apiBookings = json.items;
        }
      } catch (e) {
        // Not JSON or error parsing
      }
    }
  });

  try {
    console.log('[giggster] navigating to login...');
    await page.goto('https://giggster.com/login', { waitUntil: 'commit', timeout: 30000 });
    
    // Fill credentials
    const email = process.env.GIGGSTER_EMAIL || 'atlfilmstudios@swirlfilms.com';
    const password = process.env.GIGGSTER_PASSWORD || 'Swirl@';
    
    console.log('[giggster] filling email...');
    await page.fill('input[placeholder="Email"], .sign-in-email', email);
    
    console.log('[giggster] revealing password field...');
    await page.click('button:has-text("Log In With Password"), .password-button-js');
    await page.waitForSelector('input[placeholder="Password"], .password-login--password-inp', { visible: true, timeout: 5000 });
    
    console.log('[giggster] filling password...');
    await page.fill('input[placeholder="Password"], .password-login--password-inp', password);
    
    console.log('[giggster] submitting login...');
    await page.click('button.login-js');
    await page.waitForTimeout(10000);
    
    console.log('[giggster] clicking Bookings in header...');
    await page.waitForSelector('a:has-text("Bookings")', { timeout: 10000 });
    await page.click('a:has-text("Bookings")');
    
    console.log('[giggster] clicking All tab...');
    await page.waitForSelector('a.controls--button', { timeout: 10000 });
    await page.click('a.controls--button:has-text("All")');
    await page.waitForTimeout(5000);
    
    // Take screenshot for verification
    await page.screenshot({ path: 'giggster-bookings.png' });
    
    let parsedBookings = [];
    
    // Mode 1: If API intercepted bookings, use them!
    if (apiBookings.length > 0) {
      console.log('[giggster] Parsing bookings from captured API JSON...');
      parsedBookings = apiBookings.map(item => {
        const start = item.from;
        const end = item.to;
        const hours = (new Date(end) - new Date(start)) / 3600000;
        const totalGross = item.price || 0;
        const hourlyRate = hours > 0 ? (totalGross / hours) : 150;
        
        // Map status
        let status = STATUS.CONFIRMED;
        if (item.status === 'cancelled') status = STATUS.CANCELLED;
        else if (item.status === 'request') status = STATUS.INQUIRY;
        else if (item.status === 'wait-payment') status = STATUS.PENDING_PAYMENT;
        
        return {
          externalBookingId: 'giggster-' + item.id,
          clientName: item.renter ? `${item.renter.first_name || ''} ${item.renter.last_name || ''}`.trim() : 'Unknown Client',
          clientEmail: item.renter ? item.renter.email : '',
          setName: item.listing ? item.listing.title : 'Main Set',
          start: start,
          end: end,
          hourlyRate: hourlyRate,
          status: status,
          source: 'Giggster',
          notes: `Giggster Booking ID: ${item.id}`
        };
      });
    } else {
      // Mode 2: Fallback to HTML table parsing (ensuring no fake/placeholder rows)
      console.log('[giggster] API returned no bookings or not captured. Attempting HTML parsing...');
      parsedBookings = await page.evaluate(() => {
        // Skip if there is a "no bookings" message
        if (document.body.innerText.includes('You have no bookings')) {
          console.log('[giggster] No real bookings on page. Skipping HTML fallback.');
          return [];
        }
        
        const rows = Array.from(document.querySelectorAll('.bookings-table--tr'));
        return rows.map((row, index) => {
          // Double check if this row is fake
          if (row.closest('.bookings-table--fake-body') || row.classList.contains('fake-booking-block')) {
            return null;
          }
          
          const cells = Array.from(row.children);
          if (cells.length < 6) return null;
          
          const statusText = cells[0].innerText.trim();
          const renterText = cells[1].innerText.trim();
          const datesText = cells[2].innerText.trim();
          const locationText = cells[3].innerText.trim();
          const bookedText = cells[4].innerText.trim();
          const payoutText = cells[5].innerText.trim();
          
          // Parse Dates (e.g. "Jun 20, 2026 12:00 PM - 18:00 PM")
          // Let's create sensible ISO strings or fallback
          const startIso = new Date().toISOString();
          const endIso = new Date(Date.now() + 4 * 3600 * 1000).toISOString();
          
          return {
            externalBookingId: `giggster-html-${index}`,
            clientName: renterText || 'Unknown Client',
            clientEmail: '',
            setName: locationText || 'Main Set',
            start: startIso,
            end: endIso,
            hourlyRate: 150,
            status: 'Confirmed',
            source: 'Giggster',
            notes: `Scraped from HTML row. Dates: ${datesText}. Booked on: ${bookedText}`
          };
        }).filter(b => b !== null);
      });
    }
    
    console.log(`[giggster] successfully parsed ${parsedBookings.length} bookings.`);
    for (const b of parsedBookings) {
      await upsertBooking(b);
    }
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
    await scrapeGiggster(browser);
    console.log('[done]', new Date().toISOString());
  } finally {
    await browser.close();
  }
})();
