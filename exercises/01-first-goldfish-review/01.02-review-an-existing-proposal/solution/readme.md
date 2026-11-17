# Review an existing proposal — reference findings

Two findings to check against your report:

| Claim | Failure scenario | Evidence |
| --- | --- | --- |
| Retry until success | An endpoint permanently rejects event A. The loop never reaches event B because sends are serial. | The proposal gives no stopping condition. `deliverBatch` processes each event before moving to the next. |
| Exactly one delivery | A receiver applies event A, then the acknowledgement is lost. A second send can apply the event again. | The proposal gives no receiver contract for deduplication or way to know whether the first attempt applied the event. |

Follow the link in the proposal to verify the serial implementation.
The test plan also needs a failure case that exercises the retry cap and
confirms that a later event still runs.

The `uninterrupted` preset runs the full design review and produces
`consolidated_review_report.md`. The comprehension stage reads the document
alone. Other stages can use the local source link the skill collects from
the proposal. [Review skill](https://github.com/google/elephant-goldfish-model/blob/72d06f52a2482885d9a64bd24b291c6e8628942c/skills/egm-review/SKILL.md)

Continue to [resolve findings](../../01.03-resolve-review-findings/problem/readme.md).
