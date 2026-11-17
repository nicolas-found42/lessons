# Draft the design

Turn the decisions from your brief into a document another engineer can
implement. Work in the same Elephant chat.

1. Select `egm-draft` and give it the saved path to `concepts_brief.md`.
   Ask for the finalized design at `docs/designs/retry-delivery.md` and
   point it at the current source and tests. Use the brief to resolve
   conflicts that arise as the skill reads the code.
2. Open `design_draft.md` at the returned path. Use the section checkpoints
   to confirm the problem and goals, technical plan, alternatives, and
   implementation plan. For example, ask the agent to turn “retry
   transient errors” into a condition a developer can implement and test.
3. Check that your technical plan defines the replay signal, attempt limit,
   outcome on exhaustion, and batch order. Ask for Markdown links to the
   source and test files, relative to the final design file.
4. Ask the skill to finalize the design at the specified path. Resolve any
   differences it flags between the draft and the brief. Open the
   finalized file and follow the local links.

You're done when the expected outputs for success, an ambiguous failure,
and exhaustion can all be derived from the saved design alone.

[Check your work](../solution/readme.md)
