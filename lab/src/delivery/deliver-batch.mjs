export async function deliverBatch(events, send) {
  const results = [];

  for (const event of events) {
    try {
      await send(event);
      results.push({ id: event.id, status: "delivered" });
    } catch {
      results.push({ id: event.id, status: "failed" });
    }
  }

  return results;
}
