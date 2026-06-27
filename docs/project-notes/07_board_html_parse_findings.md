# Board HTML Parse Findings

Last updated: 2026-06-18

Purpose: capture what the actual saved board HTML exposes, how it should connect to worker app entries and ESS/pay-stub records, and where the parser/reconciliation logic still needs confirmation.

## Source Files Inspected

- `C:/Users/Black Excellence/Desktop/New folder (5)/MN11 T Tue 06_16_2026.html`
- `C:/Users/Black Excellence/Desktop/New folder (5)/MN11 T Wed 06_17_2026.html`
- `C:/Users/Black Excellence/Desktop/New folder (5)/MN11 T Thu 06_18_2026.html`

The related `_files` folders appear to hold support assets, but the saved `.html` files themselves contain the rendered board data we need to parse.

## Main Finding

The board HTML is much more useful than a screenshot. It includes structured `data-qa-ta` and `ng-reflect-*` markers for shifts, tasks, worker cards, truck/equipment IDs, material/route codes, status buckets, and exception categories. This means a future importer can parse daily board records directly instead of using OCR.

## Fields The Board HTML Can Provide

| Field | Evidence in HTML | Reconciliation use |
| --- | --- | --- |
| District and date | Page title and board attributes, for example `MN11 T Thu 06/18/2026` and `ng-reflect-board-location="MN11"` | Joins board data to app date and pay-stub `Date Earned`. |
| Shift/time block | `shift-title`, examples `0000-0800`, `0500-1300`, `1600-0000` | Base hours, night differential, Saturday/Sunday logic, and shift-finalization status. |
| Shift status/class | `shift-status` plus classes such as `night`, `ended`, `started`, `not-started` | Separates finalized historical work from live/scheduled work. |
| Function/category/subcategory | `subcategory-title`, examples `HouseHold Refuse`, `Paper Rear Loader`, `HH Organics Collection (R/L)`, `MLP - Scheduled Half Truck`, `Baskets - Regular`, `Garage Utility` | Maps board assignment to expected paid or non-paid app function. |
| Task title/route label | `task-title`, examples `H1`, `H2`, `H3`, `GU1` | Helps identify route/position within a function. |
| Section | `section-title`, examples `Section 1`, `Section 2`, `Section 3` | Helps distinguish split routes and movement across sections. |
| Truck/equipment | `equipment-id`, examples `25FA-224`, `25DY-207` | Supports truck/loader/equipment pay checks, but does not by itself prove every premium. |
| Material/route code | `material-type-code`, examples `E`, numeric route codes | Needs mapping to route/material meaning. |
| Worker identity | `personnel-name` and `personnel-rank`, plus role classes such as `SW` and supervisor colors/classes | Links a worker to board assignment and seniority/rank context. |
| Special card markers | `cancelled`, `personnel-special-position-indicator`, examples `V`, `C`, `NS`, `SS`, `GU1` | Must be preserved because they may explain exceptions, next-shift status, cancelled/unavailable state, or special assignment status. |
| Exception buckets | Tags such as `SICK`, `VACATION`, `LODI`, `XWP`, `XWOP`, `APP/CHART`, `SICK/CHART`, `VACATION/CHART`, `SICK/VACATION`, `personnel-detach` | Explains why a worker may not receive normal pay or hours. |
| Detached/out-of-district buckets | `personnel-detach` and grouped location labels | Important for out-of-town and sent-to-another-district logic. |

## Sample Parse Results From June 18

The following examples are intentionally small. They prove the data is parseable and also show why the rules engine matters.

| Board evidence | User explanation | Audit meaning |
| --- | --- | --- |
| `HouseHold Refuse`, route `H3`, truck `25FA-224`, workers Caban and Ortiz, section movement visible | Caban and Ortiz took truck `25FA-224` on a split route and should receive the same kind of money as the comparable route pair. | Expected collection/truck-related premiums, subject to final board status and exact function/rate rules. |
| `HouseHold Refuse`, route `H1`, workers De Sisso and Sohan, no visible truck ID in that task card | User says they took truck `509` and got the same amount as Caban/Ortiz. | The board may not show every truck ID on every card; app entry or other board/equipment context may be needed to complete the evidence. |
| `Garage Utility`, worker Raphael, no truck equipment | User says Raphael was GU for the night and did not receive extras. | Garage Utility should not automatically trigger truck/pay premiums just because it is on a night shift; it may still trigger night differential if the worker qualifies. |
| `Baskets - Regular`, truck `25DY-207`, workers Desmond and Bevza | User says they had no extras on their check. | Truck/equipment on a board card is not enough by itself. The paid-function table must distinguish route/collection pay from non-paying equipment/task cases. |
| `MLP - Scheduled Half Truck` | User says this starts as half-truck and can later be activated to full truck. | Parser should record scheduled half-truck, but reconciliation must know whether the final board showed half or full truck. |

## Finalized Versus Live Board Rule

The board must be imported with a finality confidence.

- Completed/ended/grayed-out shifts are better evidence for historical reconciliation.
- Started/not-started/live shifts are scheduling evidence only.
- A live board can change after the saved snapshot: people can call out, go sick, go APP, be sent to another district, or be moved from half-truck to full-truck.
- A day with all relevant shifts ended/completed is the safest source for a retrospective pay audit.

This matters because a scheduled money assignment should not automatically become an expected pay line until the shift is final or manually confirmed.

## Three-Source Reconciliation Model

The audit should compare three layers:

1. Worker app entry
   - What the worker says they worked: date, location, function, shift, route extension, truck hours, dump status, partner, notes, paid-for-work flag.

2. Board HTML record
   - What the district board shows: date, district, shift, status/finality, assignment category, route/task title, section, truck/equipment, workers, exception buckets, detached/out-of-district status.

3. ESS pay-stub / Pay Type Details
   - What was actually paid: pay date, pay period, pay description, prior/current bucket, date earned, hours if shown, amount.

## Mistakes The App Should Be Able To Catch

- Worker app says they were on a paid collection/truck function, but pay stub has no matching premium.
- Board says worker was on a paid route/function, but pay stub has no matching pay line.
- Pay stub shows a premium the worker did not enter and the board does not support.
- Worker entered dump pay, but pay stub has no dump differential, or board/app evidence does not support dump.
- Worker worked a Saturday or Sunday, but weekend premium is missing.
- Worker worked a night-qualifying shift, but night differential is missing.
- Board shows a half-truck assignment, but pay stub appears to pay full truck, or the reverse.
- Board shows sick, APP, LODI, XWP/XWOP, chart/vacation, or detached status that should explain reduced hours, extra hours, or no premium.
- Worker was sent to another district and the app/board/pay stub disagree on location or qualifying hours.

## What The Board Cannot Prove By Itself Yet

- Exact dump status. User confirmed on 2026-06-18 that the board does not show when a worker dumps. Dump status must come from the worker app entry, supervisor/payroll confirmation, or another source.
- Whether a live/scheduled route was actually completed if the board was captured before finalization.
- Supervisor/payroll corrections made after the board snapshot.
- Exact contract rates and pay formulas.
- Whether a missing truck ID on a task card exists elsewhere in the board data or only in real-world knowledge.
- Whether `C`, `V`, `NS`, `SS`, and other small card markers have pay/hour meaning or are only status/context labels.

## Proposed Board Import Record

Each parsed board assignment should become a structured record like this:

```text
source_file
board_date
board_location
snapshot_type: task | display-board
shift_start
shift_end
shift_status
shift_class_flags: night, ended, started, not-started
finality_confidence: final | live | uncertain
subcategory
task_title
section
equipment_id
material_or_route_code
partial_route_or_link_group
worker_name
worker_rank
worker_role
worker_card_markers
exception_bucket
detached_location
raw_text_excerpt
parser_confidence
```

## First Logic Questions To Verify

1. Resolved: dump/no-dump is not on the board. The app/supervisor/payroll source must supply it.
2. Partly resolved: night differential can be triggered from the shift time. User confirmed that a `0000-0800` / 12-to-8 shift and a `1600-0000` / 4-to-12 shift qualify for night differential. Exact full night-differential start/stop times still need confirmation.
3. Still open: what exact board marker proves that `MLP - Scheduled Half Truck` became a full truck instead of staying half truck? User believes another function may be added that says full truck, but this must be confirmed from a source example.
4. Partly resolved: small card markers have meaning. `C` means Chart. `V` likely means Vacation. `NS` means Night Signee. `SS` means Shop Steward. `GU1` / `GU2` are Garage Utility positions. Official spellings and any extra marker meanings should still be confirmed.
5. Partly resolved: paid/unpaid function source should come from the sanitation app function list. Functions with the green truck or dollar icon are paid functions. The full function-to-pay-type map still needs to be built from screenshots and pay-stub evidence.
6. Still open: when a worker is detached or sent to another district, which board location should drive out-of-town/hours logic: home district, starting board district, destination district, or last actual district worked?
7. Still open: for historical auditing, what is the safest source snapshot: task page after all shifts ended, display-board page, or both together?

## Logic Answers Added On 2026-06-18

- The board does not show dump/no-dump.
- A 12-to-8 / `0000-0800` worker gets night differential.
- A 4-to-12 / `1600-0000` worker gets night differential.
- `C` on a card means Chart.
- Working a chart pays double rate.
- `V` likely means Vacation.
- If a worker is both on chart and vacation, chart takes precedence.
- Working vacation pays time-and-a-half and the worker also gets paid for the day.
- If a chart or vacation falls on a holiday and the worker does not work, the worker gets hours in the book.
- `NS` means Night Signee.
- Night Signee, Shop Steward (`SS`), and Garage Utility (`GU1`, etc.) are tissue-holder positions, lock into a shift, and receive an officer chart.
- Paid board/function logic should be tied back to the sanitation app function list: green truck or dollar-sign icon means paid function.

## Next Implementation Step

Build a parser prototype that reads the saved HTML and exports one JSON/CSV row per worker assignment plus one row per exception bucket. Then compare those rows against:

- the worker's app entry for the same date, and
- ESS Pay Type Detail rows for the same pay period/date earned.

Version 1 should stay focused on gross/additive pay verification, not net pay after deductions.
