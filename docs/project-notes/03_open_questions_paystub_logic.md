# Pay Stub Logic Questions

Last updated: 2026-06-18

Current count: 18 pay-stub logic questions: 6 answered/directionally answered, 12 open.

## Questions To Verify

P01. When you say `paste-up`, do you mean the ESS pay-stub/pay-type-detail pages shown here, or is `paste-up` a separate DSNY payroll document/screen?
Status: Still unclear. User said the goal is screenshots or a detailed summary to know what information must be written down by the sanitation worker so it corresponds tightly to the paycheck.

P02. The pay-stub summary screenshot shows pay date `06/12/2026`, while the pay-type detail screenshots show paid date `06/18/2026`. Are these from different checks, or does ESS show a different date on details?
Status: Open.

P03. Should the first reconciliation target be gross/additive pay only, or should it also verify net pay after taxes and deductions?
Status: Directionally answered. Version one should verify gross additive pay.

P04. For a normal 8-hour shift, how should base pay be calculated against `Recurring Regular Gross`? Is the app expected to know hourly base rates, or only verify hours?
Status: Open.

P05. How exactly is Sunday premium calculated? Does it use actual worked hours, scheduled shift hours, or a special rule when the shift crosses midnight?
Status: Partly answered. Sunday premium is triggered when the worker works Sunday. Exact shift-crossing and hour-counting rules remain open.

P06. How exactly is Saturday premium calculated and displayed on ESS?
Status: Partly answered. Saturday premium is triggered when the worker works Saturday. Exact rate/display behavior remains open because the summary can show amount with blank hours, and detail screens may show `0:00` hours with money.

P07. What shift window qualifies for `Hourly Night Shift Differential`?
Status: Partly answered. User confirmed that anyone working the `0000-0800` / 12-to-8 shift gets night differential and that the `1600-0000` / 4-to-12 shift also gets night differential. The exact full night-differential start/stop times still need confirmation.

P08. If a shift starts at `2400` and ends at `0800`, which date earns the night differential and Saturday/Sunday premiums?
Status: Open.

P09. For dump pay, what is the exact difference between `I Dumped`, `Partner Dumped`, `We Dumped`, and `No Dump` for pay purposes?
Status: Partly answered. If the route truck is dumped, dump money is expected; if it is not dumped, no dump money. User confirmed the board does not show dump/no-dump, so dump status must come from app/supervisor/payroll evidence. The exact effect of who dumped still needs confirmation.

P10. If the app function says `+2 Dumps`, should ESS show a second dump pay type, a larger amount under first dump, or a different pay description not visible here?
Status: Open.

P11. Which app functions map to `25 Cubic Yard Loader Hourly Differential`? Is loader an equipment/vehicle field, a function, or both?
Status: Partly answered. User believes loader pay applies when somebody is on a truck/loading route. Exact rule remains open.

P12. Does route extension pay come only from the Route Extension checkbox, or does it also require specific function, truck-money hours, actual extension time, district, or supervisor entry?
Status: Partly answered. Route extension is generally assumed for routes/truck work, but must be optional/off if a route does not receive it. Exact rule remains open.

P13. How should `Truck Money (In Hours)` map to `Hourly Truck Differential - Route Extension` and other truck-related pay lines?
Status: Open. User confirmed truck assignment implies truck money, but exact pay-stub mapping remains open.

P14. Are longevity and service differentials automatic profile/contract items? What worker profile fields determine them?
Status: Open.

P15. Do `Comp Time Gained`, `Comp Time Used`, `Holiday Time Gained`, and `Holiday Time Used` show up directly on the pay stub, only in leave balances, or somewhere else in ESS?
Status: Open.

P16. How do `Gains` and `Losses` affect a sanitation worker: pay, time bank, assignment order, staffing count, or only recordkeeping?
Status: Open.

P17. How should out-of-district work be stored when the worker starts in the home district and is then sent to another district mid-shift?
Status: Open. User confirmed this can happen and can affect money functions/hours.

P18. For future digital-board imports, which board fields are final source of truth and which can be overridden by app notes/supervisor corrections when someone calls out sick, goes LODI, dies mid-shift, or is reassigned?
Status: Open. User confirmed boards may not fully account for these exceptions.

## New Answers Captured On 2026-06-18

- Board does not show dump/no-dump.
- `0000-0800` / 12-to-8 shift gets night differential.
- `1600-0000` / 4-to-12 shift gets night differential.
- `C` means Chart; working chart pays double rate.
- `V` likely means Vacation.
- If chart and vacation overlap, chart takes precedence.
- Working vacation pays time-and-a-half and the worker also gets paid for the day.
- If chart or vacation falls on a holiday and the worker does not work, the worker gets hours in the book.
- `NS` means Night Signee.
- `SS` means Shop Steward.
- `GU1` / similar labels mean Garage Utility.
- Night Signee, Shop Steward, and Garage Utility are tissue-holder positions that lock into a shift and receive an officer chart.
- Paid functions should be taken from the app function list where the green truck or dollar-sign icon marks a paid function.

## Fields To Consider Adding Later

- Pay period start/end
- Pay date
- Pay-stub import ID or PDF/source file reference
- ESS pay type name/code
- Pay type detail `Date Earned`
- Prior/current period bucket
- Expected hours
- Expected amount
- Actual pay-stub hours
- Actual pay-stub amount
- Mismatch reason
- Equipment/vehicle assignment
- Night differential eligibility
- Saturday/Sunday premium eligibility
- Route-extension eligibility breakdown
- Exception event type
- Exception effective time
- Exception source: worker app, supervisor, board, ESS, or manual correction
