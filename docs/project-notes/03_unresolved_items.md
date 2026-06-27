# Sanitation App Rebuild - Unresolved Items

Last updated: 2026-06-18

Current count: 34 open, 2 resolved.

## Open Items

U01. Define B category and C category sick-time rules.
Status: Open

U02. Confirm A category sick rule exactly: maximum 8 days/year, 360-day lookback, three-day/two-day limits, and same-month restriction.
Status: Open

U03. Confirm which sick-rule criteria must be configurable in Settings because of federal regulation changes.
Status: Open

U04. Define what APP stands for and exactly how it affects gains/losses.
Status: Open

U05. Confirm whether Bulk counts as truck money and under what conditions.
Status: Open

U06. Define Holiday Time Gained and Holiday Time Used.
Status: Open
Note: The 2026 chart holiday analyzer can identify chart holiday hits, before-holiday charts, and after-holiday charts, but the exact banking/use rules remain unresolved.

U07. Define Piggy Bank (WIP): purpose, inputs, calculations, and output.
Status: Open
Note: The screenshot-backed pay-week shell is now populated: pay-week title, Sunday-Saturday week grid, pay check date range, pay date, standard hours worked, weekly gains, and weekly losses. The meaning and calculations remain open.

U08. Define exact out-of-town/hours logic, including home district, previous district, repeat district, borough, distance, and reset rules.
Status: Open
Note: The Hours screen now matches the screenshot structure with "Today I'm in" and "Tomorrow I'm in" location selectors plus a YES/NO result area. The exact rule engine still needs the district comparison matrix.

U09. Confirm every paid function and every non-paid function.
Status: Open
Note: User confirmed on 2026-06-18 that paid function source should come from the sanitation app function list: functions with a green truck or dollar-sign icon are paid functions. The full paid/non-paid function map still needs to be extracted and verified.

U10. Define rates/values for paid functions, truck money, dumps, route extension, overtime, holiday work, chart work, and vacation work.
Status: Open
Note: User confirmed on 2026-06-18 that working a chart pays double rate; working vacation pays time-and-a-half and the worker also gets paid for the day; if chart and vacation overlap, chart takes precedence. Exact rates, ESS pay type mapping, and edge cases remain open.

U11. Define contract/versioning model: effective dates, changed rates, and how old entries keep old rules.
Status: Open

U12. Confirm pay cycle structure and what week/day/time ranges should be tallied.
Status: Open

U13. Provide ESS/pay-stub PDF samples and daily webpage samples for premium reconciliation.
Status: Open
Note: Initial ESS Pay Stub and Pay Type Details screenshots were provided on 2026-06-17 and extracted into `outputs/paystub_reconciliation/`. Saved board HTML files for June 16-18, 2026 were provided on 2026-06-18 and initial parse findings were saved in `outputs/paystub_reconciliation/07_board_html_parse_findings.md`. This remains open because exact calculation rules, same-period app/board/pay-stub samples, PDF import path, and finalized-board criteria still need to be confirmed.

U14. Confirm whether the app should store actual dollar amounts, hour-equivalents, or both.
Status: Resolved 2026-06-06
Resolution: Store both hour-equivalent values and dollar values/rate snapshots. Hours support worker-facing time/additive tracking; dollars support future ESS/pay-stub reconciliation.

U15. Define exact Paid For Work workflow and source of truth: supervisor answer, ESS, pay stub, or all of them.
Status: Open

U16. Define shift/overtime logic beyond default 8 hours and 15-minute intervals.
Status: Open
Note: User confirmed on 2026-06-18 that `0000-0800` / 12-to-8 and `1600-0000` / 4-to-12 get night differential. Exact night-differential start/stop times and partial-overlap rules remain open and are tracked in `outputs/paystub_reconciliation/08_logic_to_confirm_with_sources.md`.

U17. Provide full citywide locations dataset: borough, district name, alias, address, phone, precinct, neighborhoods, map coordinates.
Status: Open
Note: Bronx location records are now corrected from the refreshed Drive detail screenshots, including Bronx 2 as `Bronx West 2`, precinct `41`, phone `212-277-4222`, address `650 Casanova Street, Bronx, NY 10474`, and areas `Hunts Point, Longwood`. Bronx CTU, Bronx Lots, and Bronx Squad (San Cop) were also added from screenshots; Bronx Squad keeps blank precinct/phone because the screenshot is blank. Brooklyn is now screenshot-backed from the refreshed Drive detail sequence, including Brooklyn North/South Boro, Brooklyn 1-14, Brooklyn 15 - 49 St, Brooklyn 16-18, Brooklyn Lots, Brooklyn Squad HQ (San Cop), Floyd Bennett Field, MTS Hamilton Ave., and Nicholas Cioffe Boro Shop. Queens and Staten Island are still seeded from official DSNY fallback data until their refreshed Drive detail screenshots are structured and checked. Manhattan special locations still need to be wired in.

U18. Confirm why district aliases such as "Manhattan 3" and "Manhattan East 3" matter in later logic.
Status: Open

U19. Provide full clinic topic hierarchy, phone numbers, and detail pages.
Status: Open
Note: Visible Clinic Info screenshots have been populated into the app, including topic rows and detail values for Authorization To Leave Home, Clinic Address, Clinic Supervisor, coronavirus contacts, Disability Retirement Unit, sick-document email, Employee Assistance Unit, General Info and Resumptions, fax numbers, Hospitalization, LODI Info, LODI Billing/Worker's Comp., Mail Documentation To, Medical Authorizations(LODI), Nurses Station, Reporting Medications, and Supervised Sick Leave. Keep open until the full hierarchy is confirmed against any hidden/off-screen entries.

U20. Define ECB Summons purpose, fields, date options, borough options, and stored data.
Status: Open
Note: ECB Summonses now has the visible return-date shell from screenshots: Date row, Boro row, the rule text excluding officer chart/vacation/paid holidays and requiring at least 90 days in the future, plus the captured borough/district picker values. Purpose, exact calculation, and storage remain open.

U21. Define Who Dumped Last? behavior.
Status: Open
Note: The source-backed empty state now shows `No Dump Records`. Rotation behavior and how it reads payroll partner/dump entries remain open.

U22. Define Stats screen metrics.
Status: Open
Note: The prototype now shows draft local-entry metrics only. The exact Stats formulas and source screenshot details remain open.

U23. Define Friends and Foes fields and how their charts are displayed/used.
Status: Open

U24. Define Notifications, Contact Me, Tutorials, and About content.
Status: Open
Note: Notifications, Tutorial tiles, and About content were populated from visible screenshots. Contact Me remains open because no detail screenshot was visible in this source pass.

U25. Provide future official annual calendar samples and cleaner source files for scan/OCR digitization.
Status: Open
Note: 2026 scanned calendar photos have been imported into the prototype; repeatable future-year intake and cleaner OCR source handling remain open.

U26. Define scan/import review flow: who uploads, who approves corrections, and how users receive updated calendars.
Status: Open

U27. Confirm Google Calendar import behavior: account connection, filters, event categories, duplicates, sync direction.
Status: Open
Note: The Calendar Schedules selection list is now screenshot-backed, but Google account connection/import/sync behavior remains open.

U28. Replace or confirm the five Instagram reel links; current visible content is unrelated or unavailable.
Status: Resolved 2026-06-06
Resolution: Exclude current Instagram links from Phase 1 evidence. They appeared unrelated or unavailable, and the user said they are probably not relevant and trusts judgment.

U29. Confirm whether YouTube storyboard review is sufficient for old tutorial behavior or if full video review/manual walkthrough is needed.
Status: Open

U30. Confirm duplicate screenshot handling; Manhattan 4 location detail appears twice, Brooklyn 3 appears twice in the Brooklyn detail pass, and Nicholas Cioffe Boro Shop appears twice.
Status: Open

U31. Define user roles: worker, clerk, supervisor, admin, or others.
Status: Open

U32. Define personnel/seniority fields for clerk-entered district rosters.
Status: Open

U33. Define Sunday list wrapping, transfer effects, and seniority list update rules.
Status: Open

U34. Define backup/restore/autobackup provider, file format, schedule, conflict handling, and restore safety.
Status: Open
Note: The visible Backup/Restore screen is now populated from screenshots, including Local File, Skeemer Cloud, Auto Backup options, and account settings. Real provider integration, file handling, conflicts, and restore safety remain open.

U35. Define sound effects: which actions play sounds, which sounds, and whether users can disable them.
Status: Open

U36. Decide privacy/security requirements for payroll, medical/sick, notes, PDFs, and district rosters.
Status: Open

## Resolved Items

- U14. Store both money dollars and hour-equivalent values.
- U28. Exclude current Instagram reels from Phase 1 evidence unless replacement app-specific links arrive.

## Still Open Count Check

Open unresolved items remaining: 34.
