# Sanitation App Rebuild - Master Notes

Last updated: 2026-06-11

## Decisions Captured

- Instagram reel links are not being treated as app evidence for Phase 1. Current visible Instagram content looked unrelated or unavailable, and the user said "probably not" and trusts judgment.
- Phase 1 should start now with Calendar, Payroll Entry, Settings, and Locations.
- First rules area to resolve: charts/holidays.
- Money rules should store both hour-equivalent values and dollar values. The practical decision rule is: store hours because workers think in time banks/additives, and store dollars/rate snapshots because pay-stub/ESS reconciliation will eventually need exact money.
- The actual uploaded calendar sheet is the source of truth for daily chart strings. Those strings include sanitation chart numbers, supervisor/officer chart labels such as F1-F6, and A/B markers.
- Calendar cell layout from the paper sheet: date number centered; officer/supervisor chart to the left of the date number; a horizontal rule spans the full calendar-cell width under the date row; sanitation worker chart sits underneath that rule; vacation batch goes to the right only on Mondays, such as V6, V7, V8, V9.
- The uploaded screenshots, paper calendar sheets, contact sheets, and video storyboards are the project source of truth for recreated app screens. Before building or changing a screen, identify the matching screenshot(s), tag them in `06_source_screenshot_tags.md`, extract visible text/data/layout/order/icons/interactions, then build from that extracted evidence. If a detail is not visible or conflicts with another source, mark it unresolved instead of guessing.

## Working Rule: Screenshot Source Of Truth

Moving forward, every recreated screen should follow this workflow:

1. Find the relevant uploaded screenshot(s), scanned calendar sheet, or storyboard before implementing.
2. Tag the evidence in `outputs/06_source_screenshot_tags.md` with screen name, source file/group, visible evidence, and how the app handles it.
3. Extract all visible text, field order, menu order, labels, icons, colors, layout behavior, and interactions from the evidence.
4. Use the extracted screenshot information as the build source before using assumptions, fallback data, or generic UI patterns.
5. If the screenshot does not show a detail, keep that detail in `outputs/03_unresolved_items.md` and come back to it later.
6. When the user provides a correction, update the app and the notes so the correction is preserved.

## Rewritten Assignment

Recreate a mobile-first sanitation worker app inspired by Skeemer. The app must help workers track calendar/charts, daily payroll activity, pay-affecting functions, time banks, locations, events, reference info, and later payroll verification against ESS/pay-stub/PDF data. Nothing should live only in conversation memory. Requirements must be split into tracked pieces, with unresolved items counted and revisited until closed.

## Evidence Processed

- 64 source URLs were inventoried.
- Google Drive folder was reachable.
- The first pasted Drive file list produced 50 downloaded screenshots, but the current shared Drive folder was later refreshed directly and now has 221 downloaded screenshots in `work/downloaded_sources`.
- The refreshed screenshot gallery is rebuilt in `work/source_gallery.html` across 23 pages.
- 14 additional scanned 2026 paper calendar photos were found in the Drive folder and downloaded to `work/scanned_2026_calendars`.
- January-December 2026 paper calendar fields are now wired into the calendar as positioned chart data.
- The full-year 2026 sanitation chart fields are generated from the scanned-sheet weekly matrix and checked against the January-April source transcriptions. May-December scanned event notes were entered date-by-date.
- Charts / Holidays now has a 2026 chart holiday analyzer. It counts selected-chart holidays hit, charts immediately before holidays, charts immediately after holidays, and comparison totals for sanitation charts, officer charts, A/B charts, and Saturday chart.
- 8 YouTube tutorial pages were reachable and storyboard-reviewed:
  - New Features, 1:53
  - Calendar Features, 1:35
  - Event Planner, 1:16
  - Payroll Good Practices, 2:05
  - Vacation Batches 2.02, 2:00
  - Settings and Calendar Schedules, 0:59
  - Backup and Restore, 1:20
  - AutoBackup, 2:02
- YouTube captions were attempted twice but the public caption endpoint returned empty for available caption tracks.
- 5 Instagram reels were checked in Chrome. They appear unrelated to the Skeemer app or unavailable, so they are excluded from Phase 1 evidence unless replacement app-specific links are provided.
- One visual duplicate was identified: the Manhattan 4 location info screenshot appears twice in the Drive set.
- The Brooklyn location screenshot sequence was extracted and wired into the prototype, replacing the earlier official-source fallback for Brooklyn.

## Core Vocabulary

- Chart: a scheduled day off.
- Sanitation worker chart: worker day-off chart, likely 1 through 25.
- Officer chart: chart cycle 1 through 6, repeating. It can create a three-day weekend when a chart day touches Saturday/Sunday/Monday patterns.
- Supervisor chart: user correction/reference term for the F1-F6 chart labels visible on the uploaded calendar sheet; treat this as the same chart family previously called officer chart unless later clarified.
- Sunday: automatic chart/day off, though workers may sometimes work Sunday.
- A-day/B-day chart: alternating day-off chart pattern, often used by broom garages.
- Vacation week: shown as v2 through v8 on Mondays in the paper/app calendar. Vacation picks happen in seniority order.
- Holiday on chart/vacation: if chart or vacation falls on a holiday, the worker gets 8 hours in the books to use later.
- Chart holiday analyzer: a calculator that compares chart numbers against the imported 2026 holiday calendar. Current prototype treats before/after holiday as the immediately adjacent calendar day.
- Function: the daily assignment/work type. Some functions create additional pay or tracked hours.
- Dump: pay-relevant event attached to certain functions. One or two dumps may matter.
- Truck money in hours: pay-related truck value represented in hours.
- Route extension: daily payroll toggle, normally left checked.
- Paid for work: manual indicator changed from X to check after supervisor says the worker was paid.
- Gains/losses: shift staffing changes, including added/removed workers and APP/emergency situations.
- Out of town/hours: moving between districts may create hours depending on current district, previous district, home district, and rules still to be confirmed.

## Confirmed App Areas

- Mobile-first UI with a magenta app bar and drawer navigation.
- Calendar screen with annual/quarterly/monthly style views, size selector, year selector, holiday colors, chart shading, events, vacation labels, birthdays, and imported calendar-style text.
- Drawer/menu items observed: Calendar, Payroll, Event Planner, Locations, Clinic, ECB Summons, Who Dumped Last?, Hours?, Stats, Piggy Bank (WIP), Settings, Backup / Restore, Notifications, Contact Me, Tutorials, About.
- Payroll calendar and Payroll Entry form.
- Event Planner calendar and Event Entry form.
- Locations directory with borough tabs and district list/detail pages.
- Location screenshots are now tagged in `outputs/06_source_screenshot_tags.md` so screen rebuild work can point back to the exact Drive references.
- Settings and vacation batch behavior are visible in YouTube storyboards and described by the user.
- Settings vacation batch screenshots show a gray `Vacation Batches For 2025` board. Each row has a `VAC` tile, a `WEEK` tile, and date tiles. Clicking a `VAC` tile opens a `Choose A Vacation Batch` dialog where the batch code appears before the week range, such as `V41` then `Oct 6 To Oct 11` in the 2025 reference. The prototype should not use a plain date picker for this because the visible `V` code is part of the selection.
- Backup/restore and auto-backup are visible in YouTube metadata/storyboards.

## Payroll Entry Fields Observed

- Date header.
- Work status radio options: Worked/Holiday, Worked Chart, Worked Vacation.
- Location.
- Function.
- Shift start/end, selected in 15-minute intervals.
- Route Extension toggle/check.
- Truck Money (In Hours).
- Partner.
- Dump status selector: No Partner, No Dump, I Dumped, Partner Dumped, We Dumped.
- Comp Time Gained.
- Comp Time Used.
- Holiday Time Gained.
- Holiday Time Used.
- Gains.
- Losses.
- Paid For Work toggle/check.
- Note field.
- OK and Cancel buttons.

## Function List Observed

Absent, Admin. Officer, ATV, AWOL, Baskets, BIT, Blockade, Blocking, Broom Dump, Bulk, Bulk+1 Dump, Bulk Officer, CFC, Chart, Cleaning, Cleaning Officer, Clerk, Clinic, Collection, Collection+1 Dump, Collection+2 Dumps, Container Officer, Court, Covid Cleaning, Covid Sick, Crosswalks, Defensive Driving Course, DIF, E-Waste, Emergency, Executive Officer, Export Officer, EZPACK, EZPACK Recycling, Field Officer, Firearm Range, FEL, Floater, FMLA, Garage Foreman, Graduation, GU/Gasman, Half to Half, Half to Half+1 Dump, Half to Half+2 Dumps, Half to MLP, Half to MLP+1 Dump, Half to MLP+2 Dumps, Half to Relays, Half to Relays+1 Dump, Half to Relays+2 Dumps, Handbroom, Hauling, Haulster, Highway Cleaning, Highway Supervisor, Homeless Cleaning, Holder, Honor Guard, Household Refuse, Household Refuse+1 Dump, Household Refuse+2 Dumps, Household Refuse and Organics, Household Refuse and Organics+1 Dump, Household Refuse and Organics+2 Dumps, Impound, Instructor, Jury Duty, Lidding, Litigation, Litter, LODI, LWOPX, MDA, Mech. Broom, Military XWP, Military XWOP, MPG, MPG+1 Dump, MPG+2 Dumps, MLP, NDS, Organics, Organics+1 Dump, Other, Paper, Paper+1 Dump, Paper+2 Dumps, Parade, Parks, Parks Supervisor, Patrol, PCI, Pests, Plow, Porter, Quarantined, Quarter Truck, Quarter Truck+1 Dump, Quarter Truck+2 Dumps, Recycling, Recycling+1 Dump, Recycling+2 Dumps, Relays, Roll On/Roll Off, Salt Receiving, Scale House, Scattering, School Truck, Sector Officer, Security, Short Dump, Sick (First Day), Sick, Sick Chart, Skid Steer, Snow, Snow Battalion, Snow Dumping, Special Function, Spreader, Storm Debris, Summons Officer, Superintendent, Super-sucker (BBM), Supervisor, Super's Clerk/DSOA, Surveillance, Suspended, Tamper, Three-Quarter Truck, Three-Quarter Truck+1 Dump, Three-Quarter Truck+2 Dumps, Tipping Floor, TNT, TNT Supervisor, Transport, Training, Trials, Tree Truck, Truck, Truck+1 Dump, Truck+2 Dumps, Vacation, Wrecker, XWOP, XWP.

Functions with a truck icon should be treated as potentially paid functions until rates/rules are confirmed. Some functions also show a separate expand-looking icon; its meaning needs confirmation.

## Truck And Dump Controls Observed

Truck money selector options observed:

- No Truck
- Eighth Truck
- Quarter Truck
- 3 Hours Truck
- Half Truck
- 5 Hours Truck
- Three Quarter Truck
- 7 Hours Truck
- Full Truck

Dump selector options observed:

- No Partner
- No Dump
- I Dumped
- Partner Dumped
- We Dumped

## Locations Structure

Locations are organized by borough tabs: Manhattan, Bronx, Brooklyn, Queens, Staten Island. Each location detail should preserve:

- Public district label, such as Manhattan 3.
- Operational alias/subtitle, such as Manhattan East 3.
- Police precinct.
- Click-to-call phone number.
- Click-to-navigate address.
- Neighborhood/service description.
- Embedded live map.

Observed Manhattan list entries include Manhattan Boro, Manhattan 1, Manhattan 2, Manhattan 3, Manhattan 3A, Manhattan 4, Manhattan 4A, Manhattan 5, Manhattan 6, Manhattan 7, Manhattan 8, Manhattan 8A, Manhattan 9, Manhattan 10, Manhattan 11 (New Location), Manhattan 11A (Old M11 Location), Manhattan 12, Manhattan Lots, MTS West 59 Street, MTS 91st Street, and 26th Street Repair Shop.

Bronx and Brooklyn location records are now corrected from the refreshed Drive detail screenshots. Screenshot-backed values override the earlier official-source fallback. Queens and Staten Island remain seeded from official DSNY garage-location data and the NYCPS/DSNY district garage contact list until their refreshed Drive detail screenshots are extracted and checked.

Visible location subtitles should use worker-readable district/zone labels, not raw official garage source codes. For example, Manhattan shows `Manhattan 7` with `Manhattan West 7`, Bronx shows `Bronx 2` with `Bronx West 2`, and Brooklyn shows `Brooklyn 6` with `Brooklyn South West 6`. Queens currently uses labels such as `Queens East 11` from fallback data until screenshot extraction replaces or confirms them. Raw labels such as `Q E Garage 14` are kept only as source garage fields for cross-reference when no screenshot-backed subtitle exists.

## Location Details Observed

- Manhattan Boro: Manhattan Boro; precinct 19; 212-360-3520; 427 East 87th Street, New York, NY 10128.
- Manhattan 1: Manhattan West 1; precinct 1; 212-277-4101; 353 Spring Street, New York, NY; Battery Park City, Civic Center, South Street Seaport, Tribeca, Wall Street, World Trade Center.
- Manhattan 3: Manhattan East 3; precinct 5, 7, 9; 212-277-4203; South Street Pier 36, New York, NY 10002; Chinatown, East Village, Lower East Side, NoHo, Two Bridges.
- Manhattan 3A: Manhattan East 3A; precinct 18; 646-746-6760; 786 12th Ave, New York, NY 10019.
- Manhattan 4: Manhattan West 4; precinct 10; 212-277-4104; 650 West 57th Street, New York, NY 10019; Chelsea, Clinton, Hudson Yards.
- Manhattan 5: Manhattan East 5; precinct 10; 212-277-4105; 353 Spring Street, New York, NY; Flatiron, Gramercy Park, Herald Square, Midtown, Midtown South, Murray Hill, Times Square, Union Square.
- Manhattan 6: Manhattan East 6; precinct 17; 212-277-4206; Pier 36, South Street, New York, New York 10002; Beekman Place, Gramercy Park, Murray Hill, Peter Cooper Village, Stuyvesant Town, Sutton Place, Tudor City, Turtle Bay.
- Manhattan 7: Manhattan West 7; precinct 20; 212-277-4107; 650 West 57th Street, New York, NY 10019; Lincoln Square, Manhattan Valley, Upper West Side.
- Manhattan 8: Manhattan East 8; precinct 19; 212-277-4208; 4036 9th Ave, New York, NY 10034; Carnegie Hill, Lenox Hill, Roosevelt Island, Upper East Side, Yorkville.
- Manhattan 8A: Manhattan East 8A; precinct 40; 646-885-0994; 720 East 132 Street, Bronx, NY 10454.
- Manhattan 9: Manhattan West 9; precinct 26; 212-277-4209; 125 East 149th Street, Bronx, NY 10451; Hamilton Heights, Manhattanville, Morningside Heights, West Harlem.
- Manhattan 10: Manhattan East 10; precinct 28; 212-277-4210; 110 East 131st Street, New York, NY 10037; Central Harlem.
- Manhattan 11 (New Location): Manhattan East 11; precinct 25; 212-277-4111; 2495 2nd Avenue, New York, NY 10035; East Harlem, Harlem.
- Manhattan 11A (Old M11 Location): Manhattan East 11A; precinct 25; 646-746-6770; 343 East 99th Street, New York, NY 10029; East Harlem, Harlem.
- Manhattan 12: Manhattan West 12; precinct 33, 34; 212-277-4212; 301 West 215th Street, New York, NY 10034; Inwood, Washington Heights.
- Bronx Boro: Bronx Boro; precinct 48; 347-565-2033; 800 East 176th Street, Bronx, NY 10460.
- Bronx 1: Bronx West 1; precinct 40; 212-277-4221; 680 East 132nd Street, Bronx, NY 10454; Melrose, Mott Haven, Port Morris.
- Bronx 2: Bronx West 2; precinct 41; 212-277-4222; 650 Casanova Street, Bronx, NY 10474; Hunts Point, Longwood.
- Bronx 3: Bronx West 3; precinct 42; 212-277-4223; 680 East 132nd Street, Bronx, NY 10454; Claremont, Crotona Park East, Melrose, Morrisania.
- Bronx 3A: Bronx West 3A; precinct 48; 347-535-8740; 720 East 132nd Street, Bronx, NY 10454.
- Bronx 4: Bronx West 4; precinct 44; 212-277-4224; 720 East 132nd Street, Bronx, NY 10454; Concourse, Concourse Village, East Concourse, Highbridge, Mount Eden, West Concourse.
- Bronx 5: Bronx West 5; precinct 46; 212-277-4225; 1331 Cromwell Ave, Bronx, NY 10452; Fordham, Morris Heights, Mount Hope, University Heights.
- Bronx 6: Bronx East 6; precinct 48; 347-565-2049; 800 East 176th Street, Bronx, NY 10460; Bathgate, Belmont, Bronx Park South, East Tremont, West Farms.
- Bronx 6A: Bronx East 6A; precinct 48; 347-535-8750; 1787 West Farms Rd, Bronx, NY 10460.
- Bronx 7: Bronx West 7; precinct 52; 212-277-4227; 2383 Blackrock Ave, Bronx, NY 10462; Bedford Park, Fordham, Kingsbridge Heights, Norwood, University Heights.
- Bronx 7/8A: Bronx West 7; precinct 52; 347-535-8760; 310 West 215th Street, New York, NY 10034; Bedford Park, Fordham, Kingsbridge Heights, Norwood, University Heights.
- Bronx 8: Bronx West 8; precinct 50; 212-277-4128; 800 East 176th Street, Bronx, NY 10460; Fieldston, Kingsbridge, Marble Hill (MN), North Riverdale, Riverdale, Spuyten Duyvil.
- Bronx 9: Bronx East 9; precinct 43; 212-277-4229; 850 Zerega Ave, Bronx, NY 10473; Bronx River, Castle Hill, Clason Point, Harding Park, Parkchester, Soundview, Soundview-Bruckner, Unionport.
- Bronx 10: Bronx East 10; precinct 45; 212-277-4230; 850 Zerega Ave, Bronx, NY 10473; City Island, Co-op City, Country Club, Edgewater Park, Pelham Bay, Schuylerville, Throgs Neck, Westchester Square.
- Bronx 11: Bronx East 11; precinct 49; 212-277-4231; 850 Zerega Ave, Bronx, NY 10473; Bronxdale, Indian Village, Allerton, Morris Park, Pelham Gardens, Pelham Parkway, Van Nest.
- Bronx 12: Bronx East 12; precinct 47; 212-277-4232; 1635 East 233rd Street, Bronx, NY 10475; Baychester, Eastchester, Edenwald, Olinville, Wakefield, Williamsbridge, Woodlawn.
- Bronx CTU: Bronx East; precinct 41; 718-328-3838; 1381 Randall Ave, Bronx, NY 10474.
- Bronx Lots: Bronx East; precinct 48; 347-565-2065; 2 Farragut Street, Bronx, NY 10474.
- Bronx Squad (San Cop): Bronx East; precinct and phone blank in screenshot; 1635 East 233rd Street, Bronx, NY 10475.
- Brooklyn North Boro: Brooklyn North Boro; precinct 90/94; 718-571-6425; 161 Varick Street, Brooklyn, NY 11237.
- Brooklyn South Boro: Brooklyn South Boro; precinct 62; 718-714-2760; 1824 Shore Parkway, Brooklyn, NY 11214.
- Brooklyn 1: Brooklyn North 1; precinct 90/94; 718-571-6405; 161 Varick Avenue, Brooklyn, NY 11237; East Williamsburg, Greenpoint, Northside, Southside, Williamsburg.
- Brooklyn 2: Brooklyn North 2; precinct 88; 212-277-4242; 465 Hamilton Ave, Brooklyn, NY 11232; Boerum Hill, Brooklyn Heights, Clinton Hill, Downtown Brooklyn, DUMBO, Fort Greene, Fulton Ferry, Navy Yard, Vinegar Hill.
- Brooklyn 3: Brooklyn North 3; precinct 81; 718-685-7044; 559 Park Ave, Brooklyn, NY 11205; Bedford-Stuyvesant, Stuyvesant Heights, Tompkins Park North.
- Brooklyn 4: Brooklyn North 4; precinct 83; 718-571-6415; 161 Varick Avenue, Brooklyn, NY 11237; Bushwick.
- Brooklyn 5: Brooklyn North 5; precinct 75; 212-277-4245; 606 Milford Street, Brooklyn, NY 11208; Broadway Junction, City Line, Cypress Hills, East New York, Highland Park, New Lots, Spring Creek, Starrett City.
- Brooklyn 6: Brooklyn South West 6; precinct 78; 212-277-4246; 127 2nd Ave, Brooklyn, NY 11215; Carroll Gardens, Cobble Hill, Columbia St, Gowanus, Park Slope, Red Hook.
- Brooklyn 6A: Brooklyn South West 6A; precinct 76; 718-685-7490; 93 Van Brunt Street, Brooklyn, NY 11231.
- Brooklyn 7: Brooklyn South West 7; precinct 72; 212-277-4247; 5100 1st Ave, Brooklyn, NY 11232; Sunset Park, Windsor Terrace.
- Brooklyn 8: Brooklyn North 8; precinct 77; 212-277-4248; 1755 Pacific Street, Brooklyn, NY 11213; Crown Heights, Prospect Heights, Weeksville.
- Brooklyn 9: Brooklyn South East 9; precinct 71; 212-277-4249; 690 New York Ave, Brooklyn, NY 11225; Crown Heights South, Prospect Lefferts Gardens, Wingate.
- Brooklyn 10: Brooklyn South West 10; precinct 68; 212-277-4250; 5100 1st Ave, Brooklyn, NY 11232; Bay Ridge, Dyker Heights, Fort Hamilton.
- Brooklyn 11: Brooklyn South West 11; precinct 62; 718-714-2708; 1824 Shore Parkway, Brooklyn, NY 11214; Bath Beach, Bensonhurst, Gravesend, Mapleton.
- Brooklyn 12: Brooklyn South West 12; precinct 66; 212-277-4252; 5602 19th Ave, Brooklyn, NY 11204; Borough Park, Kensington, Ocean Parkway.
- Brooklyn 13: Brooklyn South East 13; precinct 60; 212-277-4253; 2012 Neptune Ave, Brooklyn, NY 11224; Brighton Beach, Coney Island, Gravesend, Homecrest, Sea Gate, West Brighton.
- Brooklyn 14: Brooklyn South East 14; precinct 70; 212-277-4254; 1397 Ralph Ave, Brooklyn, NY 11236; Ditmas Park, Flatbush, Manhattan Terrace, Midwood, Ocean Parkway, Prospect Park South.
- Brooklyn 15 - 49 St: Brooklyn South East 15 - 49 St; precinct 61; 718-685-7480; 1750 East 49th Street, Brooklyn, NY 11234; Gerritsen Beach, Gravesend, Homecrest, Kings Highway, Manhattan Beach, Plumb Beach, Sheepshead Bay.
- Brooklyn 16: Brooklyn South East 16; precinct 73; 212-277-4256; 922 Georgia Ave, Brooklyn, NY 11207; Broadway Junction, Brownsville, Ocean Hill.
- Brooklyn 17: Brooklyn South East 17; precinct 67; 646-885-0831; 10502 Ave D, Brooklyn, NY 11236; East Flatbush, Farragut, Flatbush, Northeast Flatbush, Remsen Village, Rugby, Erasmus.
- Brooklyn 18: Brooklyn South East 18; precinct 69; 212-277-4258; 10501 Foster Ave, Brooklyn, NY 11236; Bergen Beach, Canarsie, Flatlands, Georgetown, Marine Park, Mill Basin, Mill Island, Paerdegat Basin.
- Brooklyn Lots: Brooklyn North; precinct 75; 718-235-8412; 803 Forbell Street, Brooklyn, NY 11208.
- Brooklyn Squad HQ (San Cop): Brooklyn South; precinct blank in screenshot; 718-714-2781; 1824 Shore Parkway, Brooklyn, NY 11214.
- Floyd Bennett Field: Brooklyn South; precinct blank in screenshot; 718-758-7977; 50 Aviation Rd, Brooklyn, NY 11234.
- MTS Hamilton Ave.: Brooklyn South West; precinct 88; 718-840-5900; 500 Hamilton Avenue, Brooklyn, NY 11232.
- Nicholas Cioffe Boro Shop: Brooklyn South East; precinct 67; 718-649-8256; 106-01 Ave D, Brooklyn, NY 11236.

## Calendar Sheet Rule

Do not invent the daily chart-number strings. The app should display/import the actual calendar-sheet line for each date, such as `-4-10-14-20-F3-A-`. That line is a combined daily reference containing sanitation chart numbers, supervisor/officer chart labels, and A/B markers. User-selected chart highlighting should be derived from the imported line.

Calendar data should be stored as positioned fields once digitized:

- officer/supervisor chart: left of date number
- date number: centered
- vacation batch: right of date number on Mondays only
- sanitation worker chart: below date number
- A/B marker: tracked from the sheet without using the Monday vacation-batch slot

## Vacation Batch Picker Rule

Vacation slots in Settings are the worker's selected vacation picks, while `V1` through `V52` are the official paper-calendar week codes. Settings should preserve the reference board layout:

- First tile: `VAC 1`, `VAC 2`, etc. Clicking this tile opens the picker.
- After selecting a batch, the chosen official `V` code appears under the `VAC` label in the same tile.
- Second tile: `WEEK 1`, `WEEK 2`, etc.
- Header row: the six date columns are labeled Monday, Tuesday, Wednesday, Thursday, Friday, Saturday.
- Following tiles: the vacation dates that correspond to the selected official batch.
- Vacation weeks run Monday through Saturday, six days total.

When choosing a vacation slot, the picker must display the code and the week range together. For 2026, the uploaded calendar places `V2` on Monday January 5, so the picker derives:

- V1: Dec 29 To Jan 3
- V2: Jan 5 To Jan 10
- V3: Jan 12 To Jan 17, which fills `1-12` through `1-17`
- V41: Oct 5 To Oct 10
- V42: Oct 12 To Oct 17
- V52: Dec 21 To Dec 26

Vacation rows should go vertically down the Settings board, not as separate left-to-right form fields.

## Observed Sanitation Chart Pattern

The sanitation worker chart is patterned, but it is not a simple one-number repeat like the officer chart. From the imported January-December 2026 sheets:

- Sundays are automatic days off and do not carry a sanitation chart list.
- Mondays generally show 3 sanitation chart numbers.
- Tuesdays generally show 3 sanitation chart numbers.
- Wednesdays generally show 4 sanitation chart numbers.
- Thursdays, Fridays, and Saturdays generally show 5 sanitation chart numbers.
- The 25 sanitation chart numbers appear to rotate through a 5-by-5 matrix:
  - `1-6-11-16-21`
  - `2-7-12-17-22`
  - `3-8-13-18-23`
  - `4-9-14-19-24`
  - `5-10-15-20-25`
- Saturdays show the cleanest version of the matrix: a full 5-number row, stepping backward/up one row each week and wrapping.
- A/B markers appear on Wednesday/Saturday chart days and alternate in pairs.
- Vacation batches advance by Monday week number and are separate from the sanitation chart pattern.

The 2026 app data now uses this scanned-sheet matrix for chart generation, with the scanned month photos still treated as source reference for QA and correction. Future years should still go through scan/import review before being trusted.

## Efficient Build Approach

1. Freeze the 15-piece tracker and unresolved-item log first.
2. Build the mobile-first core: calendar, settings profile, payroll entry, locations, and local persistence.
3. Make rules configurable from the beginning: chart patterns, sick category criteria, function pay, truck values, dump values, holiday credits, contract dates.
4. Add import pipelines after the data model is stable: paper calendar scan/OCR first, then Google Calendar, then ESS/pay-stub reconciliation.
5. Treat paid payroll verification as a later premium module because it needs sample PDFs, screenshot data, privacy decisions, and exact money rules.
6. Keep locations/reference data as editable admin content so phone numbers, addresses, districts, clinic info, and ECB data can be corrected without app rebuilds.
