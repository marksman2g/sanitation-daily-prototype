# Digital Board Source Understanding

Last updated: 2026-06-18

This file captures the board-photo evidence, actual saved board HTML evidence, and the user's explanation. The photos are not being treated as perfect OCR sources. The saved HTML files are now treated as parseable source data.

## What The Board Is

The board is a digital representation of daily district activity. It appears to show who is assigned, what function they are assigned to, what shift/time block they are working, whether the task is still live, and exception buckets such as sick, chart, vacation, LODI, XWP, detached, unavailable, and available/unassigned.

The URL pattern visible in the photos looks like an internal DSNY board path with district and date, such as:

- `smart.dsnyad.nycnet/.../MN11/20260617/task`
- `smart.dsnyad.nycnet/.../MN11/20260618/display-board`

## Board Status Meaning From User

- If boxes are grayed out, that time has ended.
- If all boxes are grayed out, that day is in the past.
- If a box is not grayed out, the time has not ended and the function is still live.
- If a person is on a truck, truck money is expected.
- If a person is on a truck, route extension is generally assumed, but the app must allow route extension to be turned off.
- Time of day should help determine night differential.
- Saturday premium is triggered by working Saturday.
- Sunday premium is triggered by working Sunday.
- Night differential is triggered by working during a night-differential time window that still needs exact confirmation.
- User confirmed that a `0000-0800` / 12-to-8 shift gets night differential.
- User confirmed that a `1600-0000` / 4-to-12 shift also gets night differential.
- Dump money is triggered when the sanitation worker dumps the truck. If they do not dump, they do not get dump money.
- User confirmed that the board does not show dump/no-dump, so dump status must come from worker app input, supervisor/payroll confirmation, or pay-stub detail evidence.
- Loader pay is believed to apply when somebody is on a truck/loading route, but this needs confirmation.
- Calling out, going sick, going APP/emergency, going LODI, or being reassigned can change hours and must be captured.
- Working a holiday does not automatically mean extra banked hours, but if chart/vacation falls on a holiday the worker gets 8 hours in the book. If vacation and chart both hit the holiday, likely only one 8-hour credit applies, but this still needs verification.

## Board Layout Observations

Visible board sections and patterns:

- Left side has a personnel panel with tabs such as Personnel and Equipment.
- Personnel is grouped into sections such as Available/Unassigned, MDA, Assigned, shifts, Supervisor, Sanitation Worker, District Superintendent, and other titles.
- Main board is organized by time blocks/shifts, including visible examples such as `0000-0800`, `0500-1300`, `0600-1400`, `0700-1500`, `0800-1600`, `1100-1900`, `1200-2000`, `1300-2100`, and `1600-0000`.
- Rows can show statuses such as `COMPLETED`, `STARTED`, and `NOT STARTED`.
- Assignments are grouped by functions/positions such as NDS Shift, Garage Supervisor, Garage Utility, Household Refuse, Relays, Baskets - Regular, TNT, MDA - Watchman, Superintendent, Sector Officer, Cleaning Officer, Messenger, Wrecker Operator, Transport, Paper Rear Loader, MGP Rear Loader, HH Organics Collection, MLP, and special-event/support functions.
- Assignment rows show workers attached to positions, often with worker names, worker numbers, short codes, truck/equipment identifiers, and small colored tags.
- Side or right-side exception/holding sections appear to include Sick/Chart, Vacation, Sick, LODI, Sick/Vacation, XWP, Detached, Available/Unassigned, Unavailable, Vacation/Chart, DVO, and other district/bucket groupings.
- Card/status markers now partly decoded: `C` means Chart, `V` likely means Vacation, `NS` means Night Signee, `SS` means Shop Steward, and `GU1` / similar labels are Garage Utility positions.
- Chart takes precedence over vacation when both apply. Working chart pays double rate. Working vacation pays time-and-a-half and the worker also gets paid for the day.
- Night Signee, Shop Steward, and Garage Utility are tissue-holder positions that lock into a shift and receive an officer chart.

## How This Becomes Source 3

The HTML is now available for sample dates. The app should parse board data into structured daily records:

| Field | Why it matters |
| --- | --- |
| Board date | Joins to app entry date and pay-stub `Date Earned`. |
| District / board source | Distinguishes home district from worked district. |
| Worker identity | Matches board person to app user and pay-stub worker. |
| Shift/time block | Calculates regular hours, night differential, Saturday/Sunday work, and overtime candidates. |
| Assignment/function | Maps to app function and pay-type expectations. |
| Equipment/truck identifier | Supports truck money, loader pay, route work, and possible route extension. |
| Route/section/position | Helps distinguish household refuse, relays, baskets, loader, etc. |
| Status live/completed/not started | Separates planned work from completed work and current work. |
| Exception bucket | Explains sick, chart, vacation, LODI, APP/emergency, unavailable, detached, or reassigned status. |
| Reassignment/source district | Needed when a worker starts in one district and is sent to another. |
| Last-updated time | Helps interpret live-board state versus final daily board state. |

## Reconciliation Role

The future reconciliation should compare:

1. Worker app entry: what the worker recorded.
2. Board record: what the district board showed.
3. Pay stub / Pay Type Detail: what ESS paid.

The board can fill gaps for workers who did not use the app, but it may not capture every real-world exception. That is why the app needs notes and structured exception events.

## Still Open From Board Source

- Exact night-differential start/stop time window beyond the confirmed `0000-0800` and `1600-0000` qualifying shifts.
- Exact loader-pay trigger.
- Exact route-extension rule and when it should be turned off.
- How APP/emergency changes hours and pay.
- How LODI appears on board and pay stub.
- How to prove from the board that an `MLP - Scheduled Half Truck` became a full truck.
- How to represent mid-shift reassignment to another district.
- Which board fields are stable in HTML and which are only display labels. Initial markers found include `shift-title`, `shift-status`, `subcategory-title`, `section-title`, `task-title`, `equipment-id`, `material-type-code`, `personnel-name`, `personnel-rank`, `personnel-special-position-indicator`, `cancelled`, `partial-route`, and exception tags such as `SICK`, `VACATION`, `LODI`, `XWP`, `XWOP`, and `APP/CHART`.
- How to match worker identity safely across board, app, and pay stub.

See `07_board_html_parse_findings.md` for the first HTML parse findings and the proposed board import record.
