# Pay Stub Reconciliation Packet

Last updated: 2026-06-18

Purpose: preserve the pay-stub/paste-up source review so the payroll verification feature can be built from evidence instead of memory.

Privacy note: the source screenshots show worker-identifying header values. These notes intentionally describe the structure and payroll categories without copying the employee name, employee ID, payroll number, or job sequence number.

## Files

- `01_source_extraction.md` - visible facts extracted from the app payroll screenshots and ESS pay-stub screenshots.
- `02_app_to_paystub_gap_analysis.md` - what the app already captures, what it only partially captures, and what is missing for reconciliation.
- `03_open_questions_paystub_logic.md` - logic questions that must be answered before the app can calculate expected pay with confidence.
- `04_board_source_understanding.md` - what the digital board source appears to contain and how it will become source 3.
- `05_overall_project_view_transcript.md` - plain-language project overview used for the audio file.
- `07_board_html_parse_findings.md` - actual saved board HTML parse findings and board/app/pay-stub audit model.
- `08_logic_to_confirm_with_sources.md` - running checklist of payroll/board/app logic questions to bring back answers for.

## Source Rule

For this feature, the sources are:

1. Sanitation worker daily app input screenshots.
2. ESS/pay-stub summary and Pay Type Details screenshots.
3. Daily digital board screenshot or HTML source.

The current packet covers sources 1 and 2, includes a photo-based preview of source 3, and now includes an initial parse of saved board HTML files for June 16-18, 2026.
