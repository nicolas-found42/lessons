# Resolve review findings

Practice deciding what a review changes. Use the report from the previous
exercise, or use `fixtures/sample-findings.md` in the lab for a fixed set of
findings that includes a mistaken claim.

1. Read the findings against the current `docs/proposals/retry-on-error.md`.
   For each, decide if the draft needs a change and write down the evidence
   for your decision.
2. Select `egm-resolve` in the chat where you've discussed the proposal.
   Give it the proposal as the target and `full file` as the scope. Name the
   report you intend to use and ask to supply the findings during standalone
   intake. When asked, paste the findings you chose and confirm the intake.
3. Read the proposed dispositions in `goldfish_review_report.md` at the
   returned path. Use the interactive resolution to approve a justified fix
   and contest any mistaken finding you can disprove from the document.
   Record your reasoning for any issue you defer.
4. Inspect `git diff -- docs/proposals/retry-on-error.md`. Verify that an
   approved change appears in the draft and that the implementation plan
   still matches the proposed behavior.

You're done when you can trace an edit to an approved finding and explain
one disposition using evidence. If you used the sample findings, describe
the result as a resolution exercise using prepared input.

[Check your work](../solution/readme.md)
