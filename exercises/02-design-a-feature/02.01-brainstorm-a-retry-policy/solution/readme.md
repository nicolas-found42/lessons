# Brainstorm a retry policy — example brief

- **Problem.** Each event gets one send. A transient failure that happens
  before any request is sent can lose an otherwise deliverable event.
- **Decision.** Permit one immediate retry per event when the injected
  sender explicitly marks replay safe. The sender owns that classification.
  A timeout after the request leaves the sender is an ambiguous outcome
  and should yield `failed` after one attempt.
- **Compatibility.** Both successful and failed events still yield one
  `{ id, status }` record. After success or exhaustion, the batch continues
  in input order.
- **Alternative.** Single-attempt delivery avoids replays entirely, at the
  cost of discarding failures the sender knows are safe to replay.
- **Out of scope.** Persistent delivery queues, scheduled backoff, receiver
  deduplication, and exactly-once guarantees.

One question to settle in drafting is the precise signal the sender uses.
A generic transport error or a bare timeout supplies too little information.
In the reference design, only `error.replaySafe === true` opts into replay.

[Brainstorm skill](https://github.com/google/elephant-goldfish-model/blob/72d06f52a2482885d9a64bd24b291c6e8628942c/skills/egm-brainstorm/SKILL.md)

Continue to [draft the design](../../02.02-draft-the-design/problem/readme.md).
