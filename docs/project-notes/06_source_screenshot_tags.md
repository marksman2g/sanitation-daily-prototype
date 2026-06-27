# Source Screenshot Tags

Last updated: 2026-06-18

This file tags the screenshots and external source pages used while recreating app windows. The goal is to prevent UI/data work from drifting away from the uploaded references.

## Source-Of-Truth Protocol

- Uploaded screenshots, scanned calendar sheets, contact sheets, and usable video storyboards are source-of-truth evidence for recreated app screens.
- Before building or revising a screen, identify the matching source image(s), then tag the source group here.
- Each tag should capture the window/screen name, source file or source group, visible evidence, and current handling in the prototype.
- Extract text, field order, menu order, colors, icons, layout, and interactions from the screenshot before filling the app with assumptions.
- If a detail is hidden, unreadable, missing, or contradictory, keep it in `03_unresolved_items.md` instead of guessing.

## Payroll Entry Tags

PAYROLL-ENTRY-LAYOUT
- Source: User-provided Payroll Entry screenshots in the 2026-06-10 message.
- Window: Payroll Entry
- Evidence: Payroll field order is date band, Worked/Holiday/Chart/Vacation status, Location, Function, Shift, Route Extension, Truck Money (In Hours), Partner/Dump, Comp Time Gained, Comp Time Used, Holiday Time Gained, Holiday Time Used, Gains, Losses, Paid For Work, Note, OK, and CANCEL.
- Handling: Prototype Payroll Entry now uses a mobile-first row sheet with that order, round check/X toggles, app-style OK/CANCEL bar, and no bottom navigation while Payroll is active.

PAYROLL-ENTRY-JAN20-CATEGORIES
- Source: User-provided Payroll Entry screenshot in the 2026-06-11 message.
- Window: Payroll Entry for January 20, 2026
- Evidence: Under the gray `January 20, 2026` date band, the screen shows the top work-status choices, then the category rows in this exact order: Location, Function, Shift, Route Extension, Truck Money (In Hours), Partner, Comp Time Gained, Comp Time Used, Holiday Time Gained, Holiday Time Used, Gains, Losses, Paid For Work, and Note.
- User correction: The top status choices also need `Regular Day`. When opening Payroll Entry from the Payroll calendar, the default selected status should come from the selected date: regular day for ordinary days, Worked/Holiday for holidays, Worked Chart for chart days, and Worked Vacation for selected vacation days. Saved entries may preserve the worker's manual choice.
- Handling: Payroll Entry rows now carry explicit `data-payroll-category` markers in this order so the screenshot order can be verified and preserved during future edits. The status row now has `Regular Day`, `Worked/Holiday`, `Worked Chart`, and `Worked Vacation`, with automatic default selection from the calendar date. Wider-view row typography was tuned to match the screenshot more closely while keeping the existing narrow-phone overrides.

PAYROLL-PICKERS
- Source: User-provided function, shift, truck, and dump picker screenshots in the 2026-06-10 message.
- Window: Payroll Entry picker sheets
- Evidence: Function, time, truck, and dump choices appear as tall vertical white option rows inside a gray modal panel. Function choices follow the captured order beginning `Absent`, `Admin. Officer`, `ATV`, `AWOL`, `Baskets`, `BIT`, and continuing through `XWP`. Paid function candidates show truck/config-style indicators in the picker list.
- Handling: Location, Function, Shift Start/End, Truck Money, and Dump now open shared app-style picker sheets. Native selects remain hidden underneath for stable storage and form state.

PAYROLL-CALENDAR-FLOW
- Source files: `work/downloaded_sources/reference_payroll_calendar__18FHCenSwgoMAGsPXFufiTwANfQqrgM9f.jpg`, `work/downloaded_sources/reference_payroll_calendar__1gBzzJCptX_RSsETfpz2yCGIh4kGg_r4G.jpg`, `work/downloaded_sources/reference_payroll_calendar__1kk1kYAS8a-VXuTeyF207zqAJTPcTusC5.jpg`, and `work/downloaded_sources/reference_payroll_calendar__1BmUZM0Xfcwvgk_8AS4I-ffnqfRLjOqh5.jpg`.
- Window: Payroll calendar into Payroll Entry
- Evidence: The Payroll section first shows a calendar-style date picker headed `Payroll for [Month Year]`. Tapping a date opens the Payroll Entry window, and the selected date appears directly under the `Payroll Entry` app bar in a gray date band.
- Handling: Bottom navigation and drawer `Payroll Entry` now route to the Payroll calendar screen. Date buttons on that screen open Payroll Entry and set `entryDate` / `entryDateLabel` to the selected date.

PAYSTUB-RECONCILIATION-01
- Source: User-provided app payroll screenshots and ESS/pay-stub screenshots in the 2026-06-17 message.
- Window/source family: Payroll Entry, Payroll calendar, ESS Pay Stub, and ESS Pay Type Details.
- Evidence: Worker app input captures date/status, location, function, shift, route extension, truck money, partner/dump status, comp/holiday time fields, gains/losses, paid-for-work, and notes. Pay-stub screenshots show pay date/pay period, recurring regular gross, Saturday/Sunday premiums, night differentials, dump differentials, 25 cubic yard loader differentials, route-extension pay types, longevity/service differentials, taxes/deductions, leave balances, and detail pages with `Date Earned`.
- Handling: Extracted source facts, gap analysis, and open pay-stub logic questions are saved in `outputs/paystub_reconciliation/`. Employee-identifying header values are intentionally not copied into the notes.

BOARD-RECONCILIATION-01
- Source: User-provided board photos in the 2026-06-17 message, including old task/display-board photos for MN11 daily board views.
- Window/source family: DSNY digital daily board / display board.
- Evidence: The board shows district/date, shift/time blocks, completed/started/not-started/live status, personnel groups, assignments/functions, worker cards, truck/equipment/route-style identifiers, and exception buckets such as Sick/Chart, Vacation, Sick, LODI, Sick/Vacation, XWP, Detached, Available/Unassigned, Unavailable, and Vacation/Chart.
- User rule: Grayed boxes mean the time has ended. If every box is grayed out, the day is in the past. Non-gray boxes are still live. Truck assignment implies truck money; route extension is generally assumed but must be switchable off; time of day drives night differential; Saturday/Sunday work drives weekend premiums; dumping drives dump money.
- Handling: Board source understanding is saved in `outputs/paystub_reconciliation/04_board_source_understanding.md`. The current photos are treated as preview evidence for the future HTML source, not as final OCR data.

BOARD-HTML-RECONCILIATION-02
- Source: Saved board HTML files from `C:/Users/Black Excellence/Desktop/New folder (5)/` for `MN11 T Tue 06_16_2026.html`, `MN11 T Wed 06_17_2026.html`, and `MN11 T Thu 06_18_2026.html`.
- Window/source family: DSNY digital daily board HTML.
- Evidence: The HTML includes parseable markers for board date/location, shift titles/status/classes, task/subcategory/section labels, worker names/ranks, truck/equipment IDs, material/route codes, special card markers, and exception buckets including SICK, VACATION, LODI, XWP, XWOP, APP/CHART, chart/vacation combinations, and detached personnel.
- Handling: Initial parse findings and board/app/pay-stub audit model are saved in `outputs/paystub_reconciliation/07_board_html_parse_findings.md`. The HTML source should be treated as source-of-truth evidence for future board import work, with finality/live status preserved.

## Location Window Tags

LOC-LIST-01
- Source: `work/downloaded_sources/Screenshot_20260606_090746_Skeemer.jpg__158rf5PtxYrB3ZwEkMJUeJ9NiDNRVcb03.jpg`
- Window: Locations
- Evidence: Original app uses borough tabs for Manhattan, Bronx, Brooklyn, Queens, and Staten Island; Manhattan list starts with Manhattan Boro through Manhattan 12.

LOC-LIST-02
- Source: `work/downloaded_sources/Screenshot_20260606_090754_Skeemer.jpg__1DDwxl1bILH07sI8yXQE5ZssarhOshN0b.jpg`
- Window: Locations
- Evidence: Manhattan list continuation includes Manhattan 3A, Manhattan 4A, Manhattan Lots, MTS West 59 Street, MTS 91st Street, and 26th Street Repair Shop.

LOC-MAN-DETAILS
- Source group: `work/downloaded_sources/Screenshot_20260606_090803_*` through `work/downloaded_sources/Screenshot_20260606_091305_*`
- Window: Location Info
- Evidence: Manhattan detail-page structure: title, district alias, police precinct, phone, address, optional area/neighborhood text, and live map.

LOC-MAN-DUPLICATE
- Source: Manhattan 4 appears twice in the Drive screenshot set.
- Handling: Keep one Manhattan 4 data record. The duplicate remains noted in unresolved item U30.

LOC-BOROUGH-TABS
- Source: LOC-LIST-01
- Window: Locations
- Evidence: Other borough tabs exist in the app: Bronx, Brooklyn, Queens, Staten Island.

LOC-BRONX-DETAILS
- Source group: `work/downloaded_sources/Screenshot_20260606_091511_*` through `work/downloaded_sources/Screenshot_20260606_091956_*`
- Window: Location Info
- Evidence: Bronx detail pages for Bronx Boro, Bronx 1, Bronx 2, Bronx 3, Bronx 3A, Bronx 4, Bronx 5, Bronx 6, Bronx 6A, Bronx 7, Bronx 7/8A, Bronx 8, Bronx 9, Bronx 10, Bronx 11, Bronx 12, Bronx CTU, Bronx Lots, and Bronx Squad (San Cop).
- Bronx 2 correction source: `work/downloaded_sources/Screenshot_20260606_091535_Skeemer.jpg__1EeL6lv4re5ZsTYj0hc1XEwPk9am7j75K.jpg`
- Bronx 2 evidence: Title `Bronx 2`, subtitle `Bronx West 2`, police precinct `41`, phone `212-277-4222`, address `650 Casanova Street, Bronx, NY 10474`, areas `Hunts Point, Longwood`.
- Handling: Bronx app records now use this screenshot group as source of truth. Screenshot-backed values override the earlier official-source fallback when the two disagree.

LOC-BROOKLYN-DETAILS
- Source group: `work/downloaded_sources/Screenshot_20260606_093342_*` through `work/downloaded_sources/Screenshot_20260606_093948_*`
- Window: Locations and Location Info
- Evidence: Brooklyn list page shows Brooklyn North Boro, Brooklyn South Boro, Brooklyn 1-14, and the start of `Brooklyn 15 - 49 St`. Detail pages confirm Brooklyn North/South Boro, Brooklyn 1-14, Brooklyn 15 - 49 St, Brooklyn 16-18, Brooklyn Lots, Brooklyn Squad HQ (San Cop), Floyd Bennett Field, MTS Hamilton Ave., and Nicholas Cioffe Boro Shop.
- Brooklyn 2 evidence: Title `Brooklyn 2`, subtitle `Brooklyn North 2`, police precinct `88`, phone `212-277-4242`, address `465 Hamilton Ave, Brooklyn, NY 11232`, areas `Boerum Hill, Brooklyn Heights, Clinton Hill, Downtown Brooklyn, DUMBO, Fort Greene, Fulton Ferry, Navy Yard, Vinegar Hill`.
- Brooklyn 15 evidence: The source uses `Brooklyn 15 - 49 St` with subtitle `Brooklyn South East 15 - 49 St`, police precinct `61`, phone `718-685-7480`, address `1750 East 49th Street, Brooklyn, NY 11234`, and areas `Gerritsen Beach, Gravesend, Homecrest, Kings Highway, Manhattan Beach, Plumb Beach, Sheepshead Bay`.
- Special-location evidence: The tail of the sequence includes `Brooklyn Lots`, `Brooklyn Squad HQ (San Cop)`, `Floyd Bennett Field`, `MTS Hamilton Ave.`, and `Nicholas Cioffe Boro Shop`.
- Handling: Brooklyn app records now use this screenshot group as source of truth. Screenshot-backed values override the earlier official-source fallback when the two disagree.

LOC-NON-MANHATTAN-DATA
- Source: Official DSNY Sanitation Districts & Garages page.
- Evidence used: Queens and Staten Island garage names, addresses, and cross streets where refreshed Drive detail screenshots have not yet been structured into app data.
- URL: https://www.nyc.gov/site/dsny/about/about-dsny/garage-locations.page

LOC-NON-MANHATTAN-PHONES
- Source: NYCPS / DSNY Communication Protocol PDF, DSNY District Garage Contact List.
- Evidence used: Queens West, Queens East, and Staten Island district telephone numbers where refreshed Drive detail screenshots have not yet been structured into app data.
- URL: https://www.nyc.gov/assets/dsny/downloads/collection/agencies-nonprofits/schools/nycps-dsny-communication-protocol.pdf

LOC-LOCATION-LABELS
- Source: LOC-MAN-DETAILS plus official DSNY zone names.
- Evidence used: The visible detail header should show the district name first and the operational district/zone label second, matching examples like `Manhattan 7` over `Manhattan West 7`.
- Handling: Raw official garage labels such as `Q E Garage 14` and `SI Garage 03` are stored as source garage labels, not used as the visible subtitle. Bronx now uses screenshot-backed aliases such as `Bronx West 2` and `Bronx East 10`; Brooklyn now uses screenshot-backed aliases such as `Brooklyn South West 6` and `Brooklyn South East 15 - 49 St`.

## Settings Window Tags

SET-VACATION-BATCHES
- Source group: `work/downloaded_sources/Screenshot_20260606_100126_*` through `work/downloaded_sources/Screenshot_20260606_100209_*`
- Window: Settings, Vacation Batches
- Evidence: Vacation batch settings are grouped under `Vacation Batches For 2025` in the reference app. The chooser is a dialog titled `Choose A Vacation Batch`.
- Picker evidence: Batch rows show the actual batch code first, such as `V41`, then the week range, such as `Oct 6 To Oct 11` in the 2025 reference screenshot.
- Board evidence: The Settings display itself should stay in the original board layout: each row starts with a `VAC` tile, then a `WEEK` tile, then date tiles for the chosen vacation batch.
- Current handling: Clicking the `VAC 1`, `VAC 2`, etc. tile opens the screenshot-style picker with `V1` through `V52`. After selection, the chosen `V` code appears inside that same `VAC` tile and the row fills with six Monday-Saturday date tiles for that batch. A weekday header row labels the six date columns as Monday, Tuesday, Wednesday, Thursday, Friday, and Saturday. For 2026, ranges follow the uploaded paper calendar pattern where `V2` starts Monday January 5, so `V3` fills `1-12` through `1-17`, `V41` is `Oct 5 To Oct 10`, and `V42` is `Oct 12 To Oct 17`.

## Reference Module Tags

CLINIC-INFO-LIST
- Source group: `work/downloaded_sources/Screenshot_20260606_095013_*` through `work/downloaded_sources/Screenshot_20260606_095020_*`
- Window: Clinic, Clinic Info list
- Evidence: The Clinic page opens to a `Clinic Info` topic list. Visible topics include Authorization To Leave Home, Clinic Address, Clinic Supervisor, Coronavirus Email Address, Coronavirus Fax Number, Coronavirus Hotline, Disability Retirement Unit, Email Sick Leave Documents To:, Employee Assistance Unit, General Info and Resumptions, Fax Number (Main Floor), Fax Number (2nd Floor), Hospitalization, LODI Info, LODI Billing/Worker's Comp., Mail Documentation To:, Medical Authorizations(LODI), Nurses Station, Reporting Medications, and Supervised Sick Leave.
- Handling: The prototype now uses that list as the Clinic landing screen.

CLINIC-INFO-DETAILS
- Source group: `work/downloaded_sources/Screenshot_20260606_095027_*` through `work/downloaded_sources/Screenshot_20260606_095617_*`
- Window: Clinic Info detail pages
- Evidence: Detail pages show the selected topic title and one or more phone/email/address/text values. Captured values include `212-785-1013`, `44 Beaver St, New York, NY 10004`, Clinic Supervisor `212-437-4848` / `212-437-4821`, `covid19hotline@dsny.nyc.gov`, `212-514-5726`, `212-437-4655`, `212-437-4870`, `medicalrecords@dsny.nyc.gov`, Employee Assistance `212-437-4867` / `212-437-4862`, General Info `212-437-4828` / `212-437-4837`, fax numbers, Hospitalization, LODI text, LODI Billing, Mail Documentation, Medical Authorizations, Nurses Station, Reporting Medications, and Supervised Sick Leave.
- Handling: Detail rows are clickable where possible: phone uses `tel:`, email uses `mailto:`, and address opens Google Maps search.

ECB-SUMMONS-RETURN-DATES
- Source group: `work/downloaded_sources/Screenshot_20260606_095635_*` through `work/downloaded_sources/Screenshot_20260606_095833_*`
- Window: ECB Summonses
- Evidence: The screen contains Date and Boro picker rows, text stating return dates exclude Officer chart, vacation days, and paid holidays and are at least 90 days in the future, plus picker values for Manhattan, Bronx grouped borough rows, Brooklyn, Queens, Staten Island, and district names across the city.
- Handling: The prototype now preserves the source structure, visible rule text, borough options, and captured district picker values. Exact return-date logic remains unresolved.

WHO-DUMPED-LAST
- Source: `work/downloaded_sources/Screenshot_20260606_095723_*`
- Window: Who Dumped Last?
- Evidence: Empty state card reads `No Dump Records`.
- Handling: The prototype now shows the same empty state; rotation behavior remains unresolved.

HOURS-SCREEN
- Source: `work/downloaded_sources/Screenshot_20260606_095904_*`
- Window: Hours?
- Evidence: Screen asks `Do You Get Hours? Select Two Locations To Find Out`, then shows `Today I'm in` and `Tomorrow I'm in` location rows and a large `YES!` answer.
- Handling: The prototype now uses two location selectors and the screenshot-style result area. Exact out-of-town logic remains unresolved.

PIGGY-BANK
- Source: `work/downloaded_sources/Screenshot_20260606_095951_*`
- Window: Piggy Bank
- Evidence: Screen shows `Pay For Week 1 In 2025 December 29 To January 4`, week tiles, Pay Check Dates, Pay Date, Standard Hours Worked, Weekly Gains, and Weekly Losses.
- Handling: The prototype now keeps that structure as a source-backed shell. Calculations remain unresolved.

EVENT-CALENDAR-SCHEDULES
- Source: `work/downloaded_sources/Screenshot_20260606_100553_*`
- Window: Select Calendar Schedules
- Evidence: Source list includes San Worker Raises, African American Benevolent Society Events 2025/2024/2023, NY Yankees 2025, NY Mets 2025, NY Knicks 2024-25, BK Nets 2024-25, NJ Devils 2024-25, NY Islanders 2024-25, NY Rangers 2024-25, and `TAP HERE TO BUILD SCHEDULES`.
- Handling: Event Planner now includes this source-backed schedule-selection shell.

BACKUP-RESTORE
- Source group: `work/downloaded_sources/Screenshot_20260606_100628_*` through `work/downloaded_sources/Screenshot_20260606_100701_*`
- Window: Backup / Restore
- Evidence: Screen shows Previous Skeemer Cloud Backup Time, Local File backup/restore with `skeemerdata.xml`, Skeemer Cloud backup/restore, Auto Backup choices, and Skeemer Cloud Account Settings with email/password fields and account buttons.
- Handling: The prototype now mirrors the visible structure. Real backup provider, conflict behavior, and restore safety remain unresolved.

NOTIFICATIONS
- Source: `work/downloaded_sources/Screenshot_20260606_100730_*`
- Window: Notifications
- Evidence: Text says users can still get Skeemer experience at `skeemerapp.com`, and Version 3.0 works on Android, iOS, Windows, Mac, Linux, and more.
- Handling: Notification content was transcribed into the prototype.

TUTORIALS
- Source: `work/downloaded_sources/Screenshot_20260606_100754_*`
- Window: Tutorial
- Evidence: Tile grid includes New Features, Calendar Features, Event Planner, Using Payroll, Payroll Good Practices, Vacation Batches, Settings + Calendar Schedules, Backup and Restore, and Auto Backup.
- Handling: Tutorial tile grid was added.

ABOUT
- Source group: `work/downloaded_sources/Screenshot_20260606_101344_*` through `work/downloaded_sources/Screenshot_20260606_101350_*`
- Window: About
- Evidence: About text identifies Skeemer (c)2024 Marcus Linkert, Version 2.38, purchased icon/banner licenses, Apache License reference for AChartEngine, User Agreement/EULA text, fun facts, and privacy-policy link.
- Handling: Visible About content was transcribed into the prototype.

## Source Gaps Still Tracked

- The current shared Drive folder was refreshed and 221 screenshots were downloaded into `work/downloaded_sources`; `work/source_gallery.html` was rebuilt across 23 pages for review.
- Bronx and Brooklyn detail-page screenshots are now found and tagged. Bronx and Brooklyn app records should be treated as screenshot-backed.
- Queens and Staten Island detail pages still need structured extraction/review from the refreshed Drive screenshots before official fallback fields can be fully replaced.
- Bronx Squad (San Cop) shows blank precinct/phone fields in the visible screenshot; those fields remain intentionally blank until a source confirms them.
- Manhattan 4A, Manhattan Lots, MTS West 59 Street, MTS 91st Street, and 26th Street Repair Shop are visible in the original list/detail screenshot sequence but still need to be wired into the app records.
- Contact Me detail content was not visible in the reviewed screenshot pass and remains open.
- Stats exact metric formulas were not visible in the reviewed screenshot pass and remain open.
