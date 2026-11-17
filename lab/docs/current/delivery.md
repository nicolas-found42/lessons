# Current batch delivery

[`deliverBatch(events, send)`](../../src/delivery/deliver-batch.mjs) calls
`send(event)` once per event and waits for each call before starting the next.
Each event has an `id`. The result array follows input order and contains
`{ id, status }` records with status `delivered` or `failed`.

If sending an event fails, delivery stops and later events in the batch are
skipped.
