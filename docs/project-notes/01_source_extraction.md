# Pay Stub Source Extraction

Last updated: 2026-06-17

This file records what is visible in the provided screenshots. It does not yet decide the final payroll rules.

## Source Group A - Worker App Input

### A1. Payroll Entry Screenshot

Visible screen: `Payroll Entry`, selected date `January 14, 2025`.

Visible worker-input fields:

| Field | Visible value / behavior |
| --- | --- |
| Work status | `Regular Day` selected. Other choices are `Worked/Holiday`, `Worked Chart`, `Worked Vacation`. |
| Location | `MN06` |
| Function | `Collection+1 Dump` |
| Shift | Start `2400`, end `0800` |
| Route Extension | Checked |
| Truck Money (In Hours) | `8` |
| Partner | Blank name field plus dump-status selector showing `We Dumped` |
| Comp Time Gained | `0` |
| Comp Time Used | `0` |
| Holiday Time Gained | `0` |
| Holiday Time Used | `0` |
| Gains | `0` |
| Losses | `0` |
| Paid For Work | Not paid / red X |
| Note | Blank note area |

### A2. Payroll Calendar Screenshot

Visible screen: `Payroll`, `Payroll for January 2025`.

Visible calendar evidence:

| Date(s) | Visible status |
| --- | --- |
| Jan 1, 2025 | Paid Holiday, New Year's Day, pink holiday highlight |
| Jan 6-11, 2025 | Vacation week, green vacation highlight |
| Jan 7, 2025 | Vacation plus chart-colored section |
| Jan 15, 2025 | Chart-colored section |
| Jan 20, 2025 | Paid Holiday plus Vacation, split pink/green |
| Jan 21-25, 2025 | Vacation week, green vacation highlight |
| Jan 23, 2025 | Vacation plus chart-colored section |
| Jan 31, 2025 | Chart-colored section |

## Source Group B - ESS Pay Stub Summary

Visible screen: `Pay Stub`.

Visible check-level fields:

| Field | Visible value |
| --- | --- |
| Pay Date | `06/12/2026` |
| Pay Period | `05/31/2026 to 06/06/2026` |
| Net Pay Current | `1,274.81` |
| Net Pay YTD | `45,862.83` |
| Gross Pay Current | `2,593.43` |
| Gross Pay YTD | `89,994.42` |
| Total Deductions Current | `1,318.62` |
| Total Deductions YTD | `44,131.59` |

Visible pay rows:

| Pay description | Prior Per Hours | Prior Per Amount | Current Per Hours | Current Per Amount |
| --- | ---: | ---: | ---: | ---: |
| Recurring Regular Gross |  |  | `40:00` | `1,825.98` |
| Premium for Hours Worked on Saturday (San-Worker) |  | `47.30` |  |  |
| Night Differential for Dump on Shift 1st Dump |  | `18.26` |  |  |
| Saturday Night Differential for Dump on Shift 1st Dump |  | `9.98` |  |  |
| 25 Cubic Yard Loader Hourly Differential |  | `310.60` |  |  |
| 25 Cubic Yard Loader Hourly Differential on Saturday |  | `7.77` |  |  |
| Night Differential for 25 Cubic Yard Loader |  | `24.84` |  |  |
| Saturday Night Differential for 25 Cubic Yard Loader |  | `4.66` |  |  |
| Hourly Saturday Night Shift Differential (San-Worker) |  | `28.38` |  |  |
| Hourly Night Shift Differential | `32:00` | `147.84` |  |  |
| Premium for Hrs Wrkd on Sat-Route Ext. |  | `2.27` |  |  |
| Hourly Sat Night Shift Diff-Route Ext. |  | `1.36` |  |  |
| Hourly Night Shift Diff-Route Ext. |  | `7.28` |  |  |
| Hourly Truck Differential - Route Extension |  | `90.85` |  |  |
| Pensionable Longevity Increment |  |  |  | `3.83` |
| New Uniformed Longevity (Not Includ in 10% Night Diff) |  |  |  | `43.97` |
| Uniformed Service Differential (Pens) > 5yr No SA/CDS |  |  |  | `18.26` |

Visible tax deduction rows:

- FICA Tax - Employee Share
- Medicare - Employee Share
- Federal Withholding Tax
- State Withholding Tax
- New York City Withholding Tax

Visible deduction rows:

- Municipal Credit Union
- Sanitation-20YR Health Ins
- NYCE PPO Basic
- Sanitt H414H Enhcd Dis Bnet
- NYCERS Pens Sys (414H)-STD
- Uniform Sanitationmen Assn
- Family Ct Regular

Visible leave balance rows as of `05/30/2026`:

| Leave balance | Available Hours/Days |
| --- | ---: |
| Holiday Comp Time | `24:00` |
| Vacation Leave (HH:MM) | `128:00` |
| Leave Used for FMLA Purposes | `-8:00` |

## Source Group C - ESS Pay Type Detail Screens

These detail screens expose a critical matching field: `Date Earned`.

| Pay type detail | Paid date shown | Date earned rows | Hours shown | Amount shown |
| --- | --- | --- | ---: | ---: |
| Recurring Regular Gross | `06/18/2026` | `06/13/2026` | `40:00` | `1,825.98` |
| Premium for Hours Worked Sunday (San-Worker) | `06/18/2026` | `05/31/2026` | `11:00` | `1,040.62` |
| Premium for Hours Worked on Saturday (San-Worker) | `06/18/2026` | `06/06/2026` | `0:00` | `47.30` |
| Night Differential for Dump on Shift 1st Dump | `06/18/2026` | `06/05`, `06/04`, `06/03`, `06/01` | `0:00` each | `9.13` each, total `36.52` |
| Saturday Night Differential for Dump on Shift 1st Dump | `06/18/2026` | `06/06/2026` | `0:00` | `9.98` |
| 25 Cubic Yard Loader Hourly Differential | `06/18/2026` | `06/06`, `06/05`, `06/04`, `06/03`, `06/01` | `0:00` each | `62.12` each, total `310.60` |
| 25 Cubic Yard Loader Hourly Differential on Saturday | `06/18/2026` | `06/06/2026` | `0:00` | `7.77` |
| Night Differential for 25 Cubic Yard Loader | `06/18/2026` | `06/05`, `06/04`, `06/03`, `06/01` | `0:00` each | `6.21` each, total `24.84` |
| Saturday Night Differential for 25 Cubic Yard Loader | `06/18/2026` | `06/06/2026` | `0:00` | `4.66` |
| Hourly Saturday Night Shift Differential (San-Worker) | `06/18/2026` | `06/06/2026` | `0:00` | `28.38` |
| Hourly Night Shift Differential | `06/18/2026` | `06/05`, `06/04`, `06/03`, `06/01` | `8:00` each, total `32:00` | `36.96` each, total `147.84` |
| Premium for Hrs Wrkd on Sat-Route Ext. | `06/18/2026` | `06/06/2026` | `0:00` | `2.27` |
| Hourly Sat Night Shift Diff-Route Ext. | `06/18/2026` | `06/06/2026` | `0:00` | `1.36` |
| Hourly Night Shift Diff-Route Ext. | `06/18/2026` | `06/05`, `06/04`, `06/03`, `06/01` | `0:00` each | `1.82` each, total `7.28` |
| Hourly Truck Differential - Route Extension | `06/18/2026` | `06/06`, `06/05`, `06/04`, `06/03`, `06/01` | `0:00` each | `18.17` each, total `90.85` |
| Pensionable Longevity Increment | `06/18/2026` | `06/13/2026` | `0:00` | `3.83` |
| New Uniformed Longevity (Not Includ in 10% Night Diff) | `06/18/2026` | `06/13/2026` | `0:00` | `43.97` |
| Uniformed Service Differential (Pens) > 5yr No SA/CDS | `06/18/2026` | `06/13/2026` | `0:00` | `18.26` |

## Important Extraction Notes

- On the main pay-stub summary, some premium pay types show a blank hours cell but still show a dollar amount. User clarification: this can be normal. For example, night differential is triggered by working qualifying night hours, and Saturday premium is triggered by working Saturday.
- On the separate Pay Type Details screens, some of those same pay types may show `0:00` hours but still show a dollar amount.
- The reconciliation engine should not treat blank summary hours as a problem by itself. It must know the trigger and expected display behavior for each pay type: some are hour-displayed rows, some are premium/assignment/date/function-triggered rows, and some may show amount without summary hours.
- `Date Earned` is the most important join key between a daily app entry, a future digital board row, and ESS pay type details.
- The visible app input screenshot is from January 2025, while the pay-stub screenshots are from May/June 2026. Treat this packet as category/rule mapping evidence, not a same-week reconciliation sample.
- The pay-stub summary screenshot shows pay date `06/12/2026`, while the detail screenshots show paid date `06/18/2026`. This must be confirmed before building date-matching logic.
