# `_upload-ready/` — Squarespace bulk upload batch

**21 SEO-renamed JPGs, ready for drag-and-drop into Squarespace Asset Library.**

Per image agent's playbook (see `squarespace-image-playbook.md`):
- All files JPG, q80 (LED-wall hero at q65 due to dense detail)
- Heroes at 2500px wide, in-content at 1500px wide
- Filenames are SEO-keyword-rich, lowercase-hyphenated, with `atl-film-studios-` prefix
- Filename = permanent CDN URL after upload (DO NOT rename in Squarespace after the fact — it won't rewrite the URL)
- Filename also serves as default alt-text fallback for Banner Pages

## Upload sequence (per image playbook §10)

1. Squarespace admin → Pages → Assets → drag all 21 files in one batch
2. Multi-select per listing → "Move Here" into corresponding folder:
   - `/courtroom/` (5 files: `atl-film-studios-courtroom-*`)
   - `/hospital-suite/` (4 files: `atl-film-studios-hospital-*`)
   - `/police-precinct/` (4 files: `atl-film-studios-police-precinct-*`)
   - `/interrogation/` (2 files: `atl-film-studios-interrogation-*`)
   - `/psych-wall/` (2 files: `atl-film-studios-psych-wall-*`)
   - `/led-wall/` (3 files: `atl-film-studios-led-wall-*`)
   - `/facility/` (1 file: `atl-film-studios-facility-*`)
3. Logo (`atl-film-studios-logo-2025.png`) already in Squarespace at the existing CDN URL — do NOT re-upload.

## Image-to-page mapping (which file goes where on each Squarespace page)

| Squarespace page | Hero (banner) | Gallery / content blocks |
|---|---|---|
| `/` (home Index) | `atl-film-studios-led-wall-driving-plate-hero.jpg` | montage uses: courtroom-set-hero, police-precinct-bullpen-hero, hospital-patient-room-hero, interrogation-room-mirror-hero, psych-wall-hero, led-wall-cosmic-stage |
| `/sets/courtroom` | `atl-film-studios-courtroom-set-hero.jpg` | `-judge-bench-flags`, `-gallery-counsel`, `-witness-stand`, `-bench-alt` |
| `/sets/hospital` | `atl-film-studios-hospital-patient-room-hero.jpg` | `-bed-detail`, `-corridor-wide`, `-corridor-waiting` |
| `/sets/police-bullpen` | `atl-film-studios-police-precinct-bullpen-hero.jpg` | `-case-board`, `-bullpen-blue`, `-case-board-alt` |
| `/sets/interrogation` | `atl-film-studios-interrogation-room-mirror-hero.jpg` | `-table` |
| `/sets/psych-wall` ⚠️ | `atl-film-studios-psych-wall-hero.jpg` | `-corner` |
| `/sets/led-walls` | `atl-film-studios-led-wall-driving-plate-hero.jpg` | `-cosmic-stage`, `-production` |
| `/sets/jail-cell` ⚠️ | **photos needed** | photos needed |
| `/sets/prison-cell` ⚠️ | **photos needed** | photos needed |
| `/about` | (reuse) `led-wall-driving-plate-hero` | optional facility shots |
| `/location` | optional | `atl-film-studios-facility-loading-bay.jpg` |

⚠️ = open question or content gap

## Alt-text presets (write once, paste during page-build)

| Filename keyword | Alt text |
|---|---|
| `courtroom-set-hero` | Pre-dressed courtroom film set with judge's bench, witness stand, gallery seating, and US + state flags at ATL Film Studios in Atlanta |
| `courtroom-judge-bench-flags` | Courtroom judge's bench with green banker's lamp, American flag, and state flag detail |
| `courtroom-gallery-counsel` | Courtroom gallery pews and counsel tables on hardwood floor under acoustic-panel walls |
| `courtroom-witness-stand` | Courtroom witness stand with gallery pews and counsel tables in background |
| `courtroom-bench-alt` | Alternate wide angle of the courtroom judge's bench and counsel area |
| `hospital-patient-room-hero` | Hospital patient room film set with adjustable bed, vitals monitor, IV pole, and skeleton model at ATL Film Studios |
| `hospital-bed-detail` | Detail shot of hospital bed with bedside lamp, visitor chair, and sink station |
| `hospital-corridor-wide` | Hospital corridor film set with waiting bench, exposed-pipe ceiling, and door-through to additional rooms |
| `hospital-corridor-waiting` | Hospital corridor waiting area with bench seating, side table, and plant |
| `police-precinct-bullpen-hero` | Detective bullpen film set with multi-desk squad room, precinct seal, and active case board at ATL Film Studios |
| `police-precinct-case-board` | Detective case board with photos, papers, and string tacks above detective desks |
| `police-precinct-bullpen-blue` | Alternate angle of detective bullpen with blue accent wall and period-appropriate computer monitors |
| `police-precinct-case-board-alt` | Detective bullpen case-board detail with police precinct seal on wall |
| `interrogation-room-mirror-hero` | Police interrogation room film set with two-way mirror, single overhead bulb, metal table and chairs at ATL Film Studios |
| `interrogation-room-table` | Interrogation room metal table and chairs with heavy door and purple-lavender walls |
| `psych-wall-hero` | Psych ward / padded wall film set at ATL Film Studios (confirm Tyrell before publishing) |
| `psych-wall-corner` | Alternate angle of psych wall set |
| `led-wall-driving-plate-hero` | LED volume wall film stage with urban driving plate and picture car at ATL Film Studios — 2× 12'×16' Watchout + Unreal Engine |
| `led-wall-cosmic-stage` | LED volume wall stage with cosmic content playing — virtual production stage at ATL Film Studios |
| `led-wall-production` | Production crew working on the LED volume wall stage |
| `facility-loading-bay` | Drive-in loading bay at ATL Film Studios — full-height rolling door for equipment and picture-car drive-on |
