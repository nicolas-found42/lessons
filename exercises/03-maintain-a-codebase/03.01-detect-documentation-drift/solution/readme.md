# Detect documentation drift — reference correction

The current documentation says failure stops the batch. In
`deliverBatch`, the catch block adds a `failed` result inside the loop.
The next event still reaches `send`. The starter test verifies the call
order `["a", "b", "c"]` and results
`["delivered", "failed", "delivered"]`.

Replace the last paragraph of `docs/current/delivery.md` with:

> If sending an event fails, its result is recorded as `failed` and
> delivery continues with the next event.

Your second report should show no drift for that document. If it cites
another discrepancy, trace it back to the actual source before editing
anything. [Drift report skill](https://github.com/google/elephant-goldfish-model/blob/72d06f52a2482885d9a64bd24b291c6e8628942c/skills/egm-drift-report/SKILL.md)

Continue to [run a targeted review loop](../../03.02-run-a-targeted-review-loop/problem/readme.md).
