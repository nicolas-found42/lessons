# Run a targeted review loop

Use the clean maintenance copy from the drift exercise. The starter
proposal still needs work. Review its implementation plan with one
reviewer and one rubric.

1. In a new chat rooted at the maintenance copy, select `egm-review-loop`
   and send this configuration.

   > TargetFile is `docs/proposals/retry-on-error.md` in the lab.
   > SemanticTarget is the section headed `## Detailed Implementation Plan`,
   > through the end of the file. Reviewer `implementation_readiness` uses
   > standard `implementation-readiness-standard`. GoldfishContext contains
   > `src/delivery/deliver-batch.mjs` and
   > `test/deliver-batch.test.mjs`. Use a fresh Goldfish subagent.

2. Confirm the configured scope and read the first round's findings.
   Approve one scoped improvement to the plan, such as naming the test
   file and specifying the exact calls and result to assert for a
   successful retry. Record any issue that needs a separate decision
   about the proposed behavior.
3. Add a short constraints paragraph immediately before the implementation
   heading, shifting its line number. Authorize one more round and check
   that the reviewed range follows the heading.
4. Record what changed across the two rounds and which findings remain
   open. If the second round raises an issue you thought you fixed, compare
   the finding with the revised wording.

You're done when you can show the same section reviewed at two different
line ranges and explain what the selected rubric helped you check. End
the exercise at that checkpoint. The plugin has a separate standard for
declaring the overall loop converged.

[Check your work](../solution/readme.md)
