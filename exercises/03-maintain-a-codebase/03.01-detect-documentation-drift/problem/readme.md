# Detect documentation drift

Make a clean lab copy by repeating [the setup commands](../../../01-first-goldfish-review/01.01-set-up-the-lab/explainer/readme.md).
Open the new copy in your agent. The earlier retry implementation belongs
to your first lab copy.

1. Read `docs/current/delivery.md`. Write down what it predicts for events
   A, B, and C when the sender fails on B.
2. Select `egm-drift-report` and give it `docs/current/`. Ask it to compare
   the documents with the current source and identify divergences. Keep
   the dated report path.
3. Verify the report against `src/delivery/deliver-batch.mjs` and run
   `node --test test/deliver-batch.test.mjs`. Treat the passing tests and
   current code as the intended contract for this exercise. Correct the
   stale sentence, then rerun drift detection on the same directory.

You're done when you can show the original mismatch, evidence for
correcting it, and a follow-up report with no remaining divergence in
`docs/current/delivery.md`. Save the first report outside
`docs/current/` before the second run if the skill reuses its filename.

[Check your work](../solution/readme.md)
