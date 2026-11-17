# Sample findings for the resolution exercise

These findings are authored examples for practice when you lack a completed
review. They refer to the original `docs/proposals/retry-on-error.md`.

1. **Blocker · Proposed behavior.** If an endpoint always rejects event A,
   the retry loop never ends and event B never starts. Define when to retry,
   how to stop, and what the batch does next.
2. **Major · Proposed behavior.** The receiver can apply an event before the
   sender observes a timeout. A second send could apply it again. Specify
   when replay is safe and revise the guarantee.
3. **Major · Detailed Implementation Plan, item 2.** The plan adds a required
   third parameter to `deliverBatch`, breaking existing two-argument callers.
4. **Nit · Title.** Use “Retry policy for webhook delivery” as the title.
