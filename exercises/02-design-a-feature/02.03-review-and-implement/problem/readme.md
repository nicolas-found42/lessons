# Review and implement

Use your saved design to hand off work to a reviewer and then to an
implementer. The linked source and tests give reviewers a shared baseline
for checking feasibility.

1. Select `egm-review` and send the prompt below. Keep the Elephant
   chat available for decisions and document edits.

   > Review `docs/designs/retry-delivery.md` with the interactive preset
   > and fresh Goldfish subagents. GoldfishContext has no additional files.
   > Use the design's local source links where the stage permits them.

2. At the comprehension checkpoint, compare the reviewer's account to your
   intended contract. If the reviewer needed a decision that lived only in
   chat, write it into the design. Resolve any blocking findings and use
   reviewer evidence to decide whether to approve the design.
3. After approval, open a fresh implementation chat in the lab. Ask the
   coding agent to implement the approved design and update the tests. Give
   it the design path and ask it to surface any decision it cannot derive
   from that file and its references.
4. Run `node --test test/deliver-batch.test.mjs`. Inspect the source diff
   and tests for both the retry budget and the behavior after a failed
   event. Trace at least one test assertion to a sentence in the approved
   design.

You're done when you can show the approved design, the implementation,
and a passing test for a case the review helped clarify. If the review
found no gaps, trace one test to a rule it confirmed was clear.

[Check your work](../solution/readme.md)
