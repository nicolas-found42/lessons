# Resolve review findings — reference dispositions

- **Propose a fix for the unbounded loop.** Allow at most two attempts per
  event and use the second only when the sender can explicitly attest that
  replay is safe. Once attempts end in failure, record the event as failed
  and process the next event.
- **Propose a fix for the delivery guarantee.** Explain that ambiguous
  failures such as lost acknowledgements lack the assurance needed to
  replay. Remove the promise of exactly-once delivery.
- **Contest the sample signature finding.** Item 2 of the implementation
  plan explicitly retains the existing signature, and the source shows
  `deliverBatch(events, send)`.
- **Decline the title nit** if you prefer the original title.

One possible replacement for the proposed behavior:

> Attempt each event once. If the attempt fails and the sender explicitly
> marks replay as safe, attempt the event one more time. A failure without
> that signal, or a failure on the final attempt, yields `failed`. Continue
> with the next event in input order. An unknown outcome stays unknown to
> the sender, and this policy provides no exactly-once guarantee.

Update the plan to define the sender's signal and to test both exhaustion
and ambiguous failures. If the reviewer cites a decision known only from
conversation, use the interactive gate to assess whether the decision belongs
in the draft. [Resolve skill](https://github.com/google/elephant-goldfish-model/blob/72d06f52a2482885d9a64bd24b291c6e8628942c/skills/egm-resolve/SKILL.md)

Continue to [brainstorm a policy](../../../02-design-a-feature/02.01-brainstorm-a-retry-policy/problem/readme.md).
