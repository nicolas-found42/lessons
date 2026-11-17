# Review and implement — reference implementation

The full review proceeds through zoom out, comprehension, critique, a
second zoom out, and implementation readiness. Use comprehension to see
whether a reader can reconstruct the policy from the document. Use
implementation readiness to check that the plan translates the policy
into code changes and tests.
[Review skill](https://github.com/google/elephant-goldfish-model/blob/72d06f52a2482885d9a64bd24b291c6e8628942c/skills/egm-review/SKILL.md)

For the two-attempt policy, each event can be retried locally inside the
existing serial loop:

```js
export async function deliverBatch(events, send) {
  const results = [];

  for (const event of events) {
    let status = "failed";
    for (let attempt = 1; attempt <= 2; attempt += 1) {
      try {
        await send(event);
        status = "delivered";
        break;
      } catch (error) {
        if (error?.replaySafe !== true) break;
      }
    }
    results.push({ id: event.id, status });
  }

  return results;
}
```

Keep the original tests passing. This runnable check covers the three new
behaviors together. Run it from the lab directory after implementing the
reference policy.

```sh
node --input-type=module <<'JS'
import assert from "node:assert/strict";
import { deliverBatch } from "./src/delivery/deliver-batch.mjs";

const events = [
  { id: "recovers" },
  { id: "exhausts" },
  { id: "ambiguous" },
  { id: "after" },
];
const calls = [];
const results = await deliverBatch(events, async ({ id }) => {
  calls.push(id);
  if (id === "ambiguous") throw new Error("acknowledgement lost");
  if (id === "exhausts" || (id === "recovers" && calls.length === 1)) {
    throw Object.assign(new Error("request was never sent"), { replaySafe: true });
  }
});

assert.deepEqual(calls, [
  "recovers", "recovers", "exhausts", "exhausts", "ambiguous", "after",
]);
assert.deepEqual(results, [
  { id: "recovers", status: "delivered" },
  { id: "exhausts", status: "failed" },
  { id: "ambiguous", status: "failed" },
  { id: "after", status: "delivered" },
]);
JS
```

Continue to [detect documentation drift](../../../03-maintain-a-codebase/03.01-detect-documentation-drift/problem/readme.md).
