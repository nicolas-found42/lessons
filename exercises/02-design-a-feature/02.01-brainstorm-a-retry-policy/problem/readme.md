# Brainstorm a retry policy

Start a new design conversation in your existing lab. Keep this conversation
open for drafting and resolution. The earlier proposal is a practice
artifact. Start from the current source and tests for this design.

1. Read `src/delivery/deliver-batch.mjs` and
   `test/deliver-batch.test.mjs`. Identify the guarantees existing callers
   rely on after one send fails.
2. Select `egm-brainstorm` and send this prompt.

   > Help me design bounded retries for the webhook batch sender in
   > `src/delivery/deliver-batch.mjs`. Some transport failures are safe to
   > retry, but an ambiguous failure may have reached the receiver.
   > Preserve the two-argument API, result order, and per-event result
   > shape. Keep the feature in process, with no queue or receiver changes.
   > Ask me to make the decisions and use fresh Goldfish subagents to
   > challenge the idea.

3. Decide who can classify a failure as safe to replay, how many attempts
   an event gets, and how exhaustion affects the next event. Compare your
   policy with keeping the current single attempt. Ask for a scenario
   that could invalidate your chosen policy.
4. Review the resulting `concepts_brief.md`. Confirm that it captures
   your decisions, an alternative you considered, and the guarantee a
   caller can actually depend on. Choose the draft handoff and keep the
   path to the brief.

You're done when the brief gives another engineer enough information to
describe what happens after both a safe failure and an ambiguous one.

[Check your work](../solution/readme.md)
