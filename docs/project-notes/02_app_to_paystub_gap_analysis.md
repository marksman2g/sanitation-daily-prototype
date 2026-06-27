# App Input To Pay Stub Gap Analysis

Last updated: 2026-06-18

This compares the worker's current daily input fields against the pay-stub categories visible in the screenshots.

## What The Current App Input Already Captures

| App field | Useful for pay-stub matching |
| --- | --- |
| Date / selected calendar day | Can match pay type `Date Earned`. |
| Work status: Regular, Holiday, Chart, Vacation | Can explain holiday/chart/vacation work and calendar context. |
| Location | Can support home district, out-of-town, route extension, and board comparison logic. |
| Function | Can trigger paid-function expectations such as collection, dump, truck, loader, or special assignment once mapped. |
| Shift start/end | Can calculate regular hours, night hours, overtime, Saturday/Sunday crossing, and some premium triggers. |
| Route Extension checkbox | Can trigger route-extension pay categories once rules are confirmed. |
| Truck Money (In Hours) | Can support truck differential / truck-money expectations. |
| Partner and dump status | Can support dump-pay expectation and who-dumped-last tracking. |
| Comp Time Gained/Used | Can support time-bank changes, but rule definitions are still needed. |
| Holiday Time Gained/Used | Can support holiday bank changes, but rule definitions are still needed. |
| Gains/Losses | Can support staffing/accounting changes, but effect on worker pay is still undefined. |
| Paid For Work | Useful as a worker-facing review flag, not enough for automatic ESS reconciliation by itself. |
| Note | Useful for exception evidence. |

## Pay-Stub Categories Not Directly Captured Yet

These categories appear on the pay stub but are not currently explicit app inputs.

| Missing or partial app category | Pay-stub evidence | Why it matters |
| --- | --- | --- |
| Pay period and pay date metadata | Pay date, pay period, prior/current period columns | The app must know which daily entries should be compared to which check. |
| ESS pay type name/code table | Every pay description line | The app needs stable pay-type labels/codes so pay-stub lines can be imported and matched. |
| Saturday premium trigger | `Premium for Hours Worked on Saturday (San-Worker)` | User clarified this is triggered by working Saturday. The app needs the exact display/calculation rule, because the summary may show amount with blank hours. |
| Sunday premium trigger | `Premium for Hours Worked Sunday (San-Worker)` | Sunday work can produce a large premium and may use actual hours such as `11:00`. |
| Night differential trigger and hours | `Hourly Night Shift Differential` | User clarified this is triggered by working during qualifying night hours. The exact time window and display/calculation behavior still need confirmation. |
| Saturday night differential trigger | `Hourly Saturday Night Shift Differential (San-Worker)` | Saturday plus night work creates a separate line from regular night differential. |
| Dump night differential | `Night Differential for Dump on Shift 1st Dump`; Saturday variant | `We Dumped` is captured, but the app still needs exact rules for which dump differential lines should appear. |
| Number/order/type of dumps | `1st Dump` appears; app functions include `+1 Dump` and `+2 Dumps` | Need map one dump vs two dumps, partner dumped vs I dumped vs we dumped, and whether only first dump appears in these rows. |
| Equipment/vehicle assignment | `25 Cubic Yard Loader Hourly Differential`; Saturday/night variants | Current Payroll Entry has function but no explicit equipment/vehicle field unless represented by function. |
| Loader-specific night/Saturday modifiers | `Night Differential for 25 Cubic Yard Loader`; Saturday loader rows | Equipment can stack with day-of-week and night rules. |
| Route-extension premium split | Sat route extension, sat night route extension, night route extension, truck differential route extension | Current checkbox is too simple unless one checkbox always triggers all relevant route-extension lines by date/shift/truck rules. |
| Regular gross weekly baseline | `Recurring Regular Gross` with `40:00` | The app needs weekly rollup logic and expected base hours. |
| Longevity/service differential profile fields | Pensionable longevity, new uniformed longevity, uniformed service differential | These appear to be worker profile/contract items, not daily entry fields. The app needs profile fields and effective-date rules. |
| Taxes and deductions | FICA, Medicare, withholding, union, pension, health, credit union, family court | Needed only if the app verifies net pay, not just gross pay/premiums. |
| Leave balance snapshots | Holiday comp time, vacation leave, FMLA used | Daily entries alone cannot verify balances unless starting balances and bank rules are stored. |
| Prior period vs current period separation | Pay stub columns split prior/current | The app must handle retro/prior-period adjustments and not assume every amount belongs to the current pay period. |
| Pay type detail drill-down | Detail pages show `Date Earned` rows | The app needs imported detail rows, not only summary pay-stub totals, for daily matching. |
| Exception/event log | User mentioned sick, LODI, death mid-shift, sent to another district, callouts | The app needs a structured exception record so board/app/pay-stub mismatches can be explained. |

## Proposed Reconciliation Shape

For each worker and pay period, store three layers:

1. Daily App Entry
   - Date earned, status, location, function, shift, route extension, truck hours, dump status, partner, time banks, gains/losses, notes.

2. Imported Pay Stub / Pay Type Detail
   - Pay date, pay period, pay type name, prior/current bucket, date earned, hours, amount.

3. Future Digital Board Entry
   - Board date, worker, district, assigned function/position, scheduled/actual time, truck/equipment, route/status indicators if shown, exception notes. Dump/no-dump is not shown on the board and must come from another source.

The comparison should flag:

- App expected line exists on pay stub but amount/hours/date do not match.
- Pay stub paid a line the app did not expect.
- App recorded a paid function or premium trigger but pay stub has no matching line.
- Board assignment disagrees with worker input.
- Board/app disagreement is explained by an exception event.

## Board Source Added To The Model

The 2026-06-17 board photos add a third evidence source. The future HTML board should be consumed as daily assignment data, not just as a screenshot. It should help verify or backfill:

- Worker assigned shift/time block.
- Worker assignment/function/position.
- Whether the assignment was live, completed, not started, or in the past.
- Whether the worker was attached to a truck/equipment/route.
- Whether route extension should be presumed.
- Whether the shift time may trigger night differential.
- Whether Saturday or Sunday work should trigger weekend premiums.
- Whether the worker was sick, LODI, XWP, unavailable, detached, chart, vacation, or in another exception bucket.
- Whether the worker was reassigned or sent from one district to another.

The board should not automatically override worker notes. It is a source to compare against, especially because the user confirmed that some boards may not fully account for sick/APP/emergency or mid-shift district changes.

User confirmed on 2026-06-18 that the board does not show dump/no-dump. Dump verification must therefore come from the worker's Payroll Entry, supervisor/payroll confirmation, pay-stub detail rows, or another non-board source.

## Early Matching Rules That Look Likely

These are inferences from the screenshots and user explanations, not final payroll rules:

- `Collection+1 Dump` plus `We Dumped` should likely produce at least one dump-related pay type.
- A `2400` to `0800` shift likely produces night differential hours.
- Working Saturday creates Saturday premium rows.
- Working Sunday creates Sunday premium rows.
- Route Extension checked can create several separate route-extension pay types, depending on date, shift, and truck/route conditions.
- A loader assignment triggers several separate pay types and can stack with Saturday/night modifiers.
- Board truck/route assignment can support truck money and presumed route extension.
- Board status can distinguish completed/past work from active/live assignments.
- A `2400` to `0800` / `0000` to `0800` shift triggers night differential.
- A `1600` to `0000` / 4-to-12 shift triggers night differential.
- A `C` card marker means Chart; working chart pays double rate.
- A `V` marker likely means Vacation; working vacation pays time-and-a-half and the worker also gets paid for the day.
- If chart and vacation overlap, chart takes precedence.
- Paid functions should be mapped from the sanitation app function list: green truck or dollar-sign icon means a paid function.

## Most Important Gaps To Add To The App Later

1. Pay-period/pay-date grouping.
2. Pay type import table with detail rows by Date Earned.
3. Explicit premium trigger rules for Saturday, Sunday, night, dump, route extension, and equipment.
4. Worker profile/contract fields for longevity/service differentials.
5. Starting leave balances plus bank-change rules.
6. Exception log for callouts, sick, LODI, mid-shift changes, sent-out district, and supervisor corrections.
7. Future digital-board import fields and matching rules.
