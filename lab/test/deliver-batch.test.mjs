import assert from "node:assert/strict";
import test from "node:test";
import { deliverBatch } from "../src/delivery/deliver-batch.mjs";

test("returns an empty result for an empty batch", async () => {
  const results = await deliverBatch([], () => assert.fail("unexpected send"));
  assert.deepEqual(results, []);
});

test("preserves order and continues after a permanent delivery failure", async () => {
  const sent = [];
  const events = [{ id: "a" }, { id: "b" }, { id: "c" }];

  const results = await deliverBatch(events, async (event) => {
    sent.push(event.id);
    if (event.id === "b") throw new Error("endpoint rejected payload");
  });

  assert.deepEqual(sent, ["a", "b", "c"]);
  assert.deepEqual(results, [
    { id: "a", status: "delivered" },
    { id: "b", status: "failed" },
    { id: "c", status: "delivered" },
  ]);
});
