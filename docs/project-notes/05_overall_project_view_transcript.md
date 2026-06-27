# Sanitation Reconciliation Overview Transcript

Last updated: 2026-06-17

You are building a mobile-first sanitation worker app that does more than record a day. The real goal is to protect the worker by turning daily work, district board assignments, and ESS pay-stub output into one cross-checking system.

There are three sources. First is the worker's app entry: date, location, function, shift, route extension, truck money, dump status, partner, time banks, gains, losses, paid-for-work, and notes. Second is the digital board: who was assigned, what shift they worked, what function they were on, whether the work is live or completed, whether they were on a truck, and whether they were sick, LODI, XWP, detached, unavailable, chart, vacation, or reassigned. Third is ESS/pay-stub information: the pay type, date earned, hours, amount, pay period, gross additives, and leave balances.

Version one should focus on gross additive pay, not full net pay after taxes and deductions. That means the first pass should answer: based on what the worker entered and what the board showed, what should have appeared on the pay stub? Then the app compares that expected output to the actual ESS pay type details.

The board photos show the kind of information we will later consume from HTML. The board has shift blocks like 0000 to 0800, 0500 to 1300, 0700 to 1500, 0800 to 1600, 1100 to 1900, 1200 to 2000, and 1600 to 0000. It has functions like household refuse, relays, baskets, garage utility, transport, loaders, MLP, MDA watchman, cleaning officer, and supervisor roles. It also shows exception buckets like sick, chart, vacation, LODI, XWP, detached, unavailable, and available/unassigned.

The important logic is this: if a worker is on a truck, truck money is expected. Route extension is generally assumed for route work, but the app must allow it to be turned off. Saturday premium comes from working Saturday. Sunday premium comes from working Sunday. Night differential comes from working during the night-differential window, which still needs the exact start and end times. Dump money comes from actually dumping the truck. Loader pay appears connected to truck/loading work, but that rule still needs to be confirmed.

Where we are now: the app prototype has the major screens started, the calendar and payroll flow are in place, and the pay-stub reconciliation packet now records what we extracted from the worker input screenshots, ESS pay-stub screenshots, and board photos. Where we are going next: define the missing payroll rules, parse the future board HTML into structured daily records, import pay-stub detail rows, and build a mismatch report that tells the worker exactly what was expected, what was paid, and what needs to be questioned.

The most important pay-stub lesson so far is that blank hours on the summary page do not automatically mean something is wrong. Some premium rows are triggered by the work itself: working at night creates night differential, working Saturday creates Saturday premium, and dumping creates dump money. The app needs to know the trigger, rate, and ESS display behavior for each pay type so it can tell the difference between a normal blank-hours premium line and a real missing-payment problem.
