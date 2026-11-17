# Run a targeted review loop — reference check

An implementation readiness finding might observe that “Add a test for a
successful retry” gives the implementer no assertion to write. A sharper
plan adds a case in `test/deliver-batch.test.mjs`: the fake sender fails
once for event A, then succeeds. The test asserts the send sequence
A, A, B and a `delivered` result for each event. An exhaustion test needs
a retry limit, so record that design decision as open until it can be
resolved in the proposed behavior and the plan.

Compare the target ranges in the two rounds. After adding the paragraph,
the second reviewer should read from the new `## Detailed Implementation
Plan` line. The intent of the target stayed the same.

Two rounds of practice can include open issues. EGM declares convergence
after two consecutive rounds with all reviewers run and no unsettled
Blocker or Major findings. [Review loop skill](https://github.com/google/elephant-goldfish-model/blob/72d06f52a2482885d9a64bd24b291c6e8628942c/skills/egm-review-loop/SKILL.md)

Continue to [bootstrap codebase docs](../../03.03-bootstrap-codebase-docs/problem/readme.md).
