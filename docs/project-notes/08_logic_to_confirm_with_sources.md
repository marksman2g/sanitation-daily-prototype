# Logic To Confirm With Sources

Last updated: 2026-06-18

Purpose: running checklist of rules the user needs to confirm with experienced workers, payroll, contract/rate sources, supervisor knowledge, or better board/pay-stub examples. When an answer comes back, move it into the reconciliation logic notes and update the status here.

Current count: 18 open, 2 partly answered.

## Partly Answered

L01. Night differential qualifying shifts and exact start/stop times.
Status: Partly answered.
Known so far:
- `0000-0800` / 12-to-8 gets night differential.
- `1600-0000` / 4-to-12 gets night differential.
Still need:
- Exact night-differential start time.
- Exact night-differential stop time.
- How night diff is calculated when a shift only partly overlaps the night window.
- How night diff works when a shift crosses midnight into Saturday, Sunday, or a holiday.

L02. Board marker for half truck becoming full truck.
Status: Partly answered.
Known so far:
- `MLP - Scheduled Half Truck` means half-truck scheduled, then after lunch/manual litter patrol.
- User believes a second/additional function may appear and say full truck when activated, but needs a source example.
Still need:
- Actual board example of half truck changing to full truck.
- Whether the final board, app entry, or supervisor/payroll source is the best proof.

## Open

L03. Exact paid/non-paid function map.
Known so far: in the sanitation app function picker, green truck or dollar-sign icon means paid function.
Need: full list of functions, paid status, trigger conditions, and matching ESS pay type names.

L04. Dump pay rules.
Known so far: board does not show dump/no-dump; if the truck is dumped, dump money is expected.
Need: exact pay difference between `I Dumped`, `Partner Dumped`, `We Dumped`, `No Dump`, `+1 Dump`, and `+2 Dumps`.

L05. Route extension rules.
Known so far: generally assumed on route/truck work but must be removable.
Need: exact trigger, when it does not apply, and which ESS lines should appear.

L06. Loader / truck differential rules.
Known so far: believed to apply when someone is on a truck/loading route.
Need: exact trigger for loader pay, 25-cubic-yard loader lines, Saturday loader lines, and night loader lines.

L07. Chart pay rules.
Known so far: `C` means Chart; working chart pays double.
Need: exact ESS pay type mapping, how chart stacks with paid functions, dumps, night, Saturday/Sunday, and overtime.

L08. Vacation-work pay rules.
Known so far: working vacation pays time-and-a-half and the worker also gets paid for the day; chart takes precedence over vacation.
Need: exact ESS pay type mapping and edge cases when vacation overlaps chart, holiday, Saturday/Sunday, and night.

L09. Holiday/chart/vacation banked hours.
Known so far: if chart or vacation falls on a holiday and the worker does not work, the worker gets hours in the book.
Need: exact hours, whether chart+vacation+holiday gives only one 8-hour credit, where it appears in ESS, and how used hours reduce the bank.

L10. APP/emergency rules.
Known so far: APP means an emergency/absence event and can affect hours.
Need: exact meaning/spelling, how it affects pay, hours, gains/losses, sick category, and board/pay-stub matching.

L11. LODI rules.
Need: how LODI appears on the board, whether it affects regular pay or leave balance, and how it appears on ESS.

L12. Out-of-district / sent-to-another-district rules.
Need: whether home district, starting district, destination district, previous actual district, or distance controls hours; how repeat districts reset; how board/app should store mid-shift movement.

L13. Finalized board source rule.
Need: whether historical audit should use the task page, display-board page, or both; what exact state means final enough to compare to pay stub.

L14. Board card marker meanings.
Known so far: `C` Chart, `V` likely Vacation, `NS` Night Signee, `SS` Shop Steward, `GU1`/`GU2` Garage Utility.
Need: official meanings for all markers and whether each affects pay, schedule, chart type, or only display context.

L15. Sick-time A/B/C category rules.
Need: B and C category definitions, exact A-category limits, and configurable federal-rule criteria.

L16. Comp time gained/used rules.
Need: what events create comp time, what uses it, where it appears on pay stub/leave balance, and how to audit it.

L17. Holiday time gained/used rules.
Need: what events create holiday time, what uses it, where it appears on pay stub/leave balance, and how to audit it.

L18. Gains and losses.
Need: what gains/losses mean operationally, how they affect the sanitation worker, and whether they affect pay, hours, staffing counts, or recordkeeping only.

L19. Pay-period and retro/prior-period handling.
Need: how date earned maps to pay date, how prior-period rows should be audited, and whether retro corrections should appear as new mismatches or resolved old mismatches.

L20. Contract/rate versioning.
Need: effective dates, rate tables, and how old entries keep old contract rules after rates change.
