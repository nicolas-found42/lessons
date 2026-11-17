# Review an existing proposal

Learn how much a reviewer can infer from a short design and the code it
references. Work in the lab from [setup](../../01.01-set-up-the-lab/explainer/readme.md).

1. Before opening the proposal, predict one thing that can go wrong when a
   webhook sender retries. Keep that prediction in your notes.
2. Select `egm-review` and send this prompt.

   > Review `docs/proposals/retry-on-error.md` with the uninterrupted preset.
   > Use fresh Goldfish subagents. Use the proposal and the code it links as
   > review evidence. GoldfishContext has no additional files.

3. Open the consolidated report at the path the agent gives you. For two
   findings, record the affected claim, the concrete failure scenario, and the
   text or code that supports it. Confirm that the reviewers you rely on
   completed.
4. Compare the report with your prediction. Identify one decision a
   reviewer would need to see in the draft to tell whether the proposal
   handles that scenario. Save the report path for the next exercise.

You're done when you can explain one risk the document leaves unresolved and
show the evidence for it. Reviewer wording and finding counts can vary.

[Check your work](../solution/readme.md)
