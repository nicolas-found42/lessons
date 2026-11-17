# Draft the design — reference contract

One version of the technical plan for
`docs/designs/retry-delivery.md`:

1. Iterate events serially. A successful send yields
   `{ id, status: "delivered" }`.
2. When the first send throws or rejects with a value whose
   `replaySafe` property is strictly `true`, send that same event once
   more. The sender may set this flag when it can establish that the
   first attempt had no receiver-side effect. An unknowable outcome
   such as a lost acknowledgement is ineligible for replay.
3. A failure without that signal, or any failure on the second attempt,
   yields `{ id, status: "failed" }`. Continue with the next event.
4. Keep `deliverBatch(events, send)`, the result shape, and input ordering.

Under `## Detailed Implementation Plan`, link
`../../src/delivery/deliver-batch.mjs` and
`../../test/deliver-batch.test.mjs` from the final design location. Describe
the retry loop and specify test cases for success, safe replay succeeding,
safe replay exhausting the budget, and ambiguous failure. Include assertions
on call sequence so returning the right status after extra sends still
fails a test.

If your brief chose a different retry budget, the technical plan, examples,
and tests should all reflect that same budget.
[Draft skill](https://github.com/google/elephant-goldfish-model/blob/72d06f52a2482885d9a64bd24b291c6e8628942c/skills/egm-draft/SKILL.md)

Continue to [review and implement](../../02.03-review-and-implement/problem/readme.md).
