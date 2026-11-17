# Retry webhook delivery

## Problem

An intermittent transport failure can leave a webhook undelivered.

## Proposed behavior

Retry every failed send immediately until it succeeds. This guarantees exactly
one delivery per event. A receiver integration will keep retrying invisible to
clients.

## Detailed Implementation Plan

1. Add a retry loop to
   [`deliverBatch`](../../src/delivery/deliver-batch.mjs).
2. Keep its existing function signature and result shape.
3. Add a test for a successful retry.
