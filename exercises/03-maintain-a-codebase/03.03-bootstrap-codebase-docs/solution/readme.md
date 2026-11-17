# Bootstrap codebase docs — reference navigation

At the end, the lab's `src/README.md` should point readers to
`delivery/README.md`, and that child document should point to
`deliver-batch.mjs` and describe `deliverBatch(events, send)`.

Check that the description agrees with this contract: the function
processes events serially, calls the injected sender once per event,
returns one ordered status record per event, and keeps going after a
failure. A README that describes the earlier capstone retry policy is
inaccurate for the clean maintenance copy.

The source diff should be empty and both starter tests should pass.
The documentation files should be visible in Git status from the lab root.
[Bootstrap skill](https://github.com/google/elephant-goldfish-model/blob/72d06f52a2482885d9a64bd24b291c6e8628942c/skills/egm-bootstrap/SKILL.md)
