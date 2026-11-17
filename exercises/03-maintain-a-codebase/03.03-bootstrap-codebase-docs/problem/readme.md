# Bootstrap codebase docs

Use the maintenance copy to practice giving an Elephant navigable project
context for future work. Scope the job to the source tree.

1. Select `egm-bootstrap` and pass the absolute path to the maintenance
   lab's `src/` directory. Ask for the default `README.md` contracts and
   authorize subagent workers if the skill uses them.
2. Inspect the generated README in `src/` and the one in
   `src/delivery/`. Follow the source links from both files. Locate the
   description of the exported batch sender and check it against the code.
3. From the lab root, run `git status --short -- src`,
   `git diff HEAD -- src/delivery/deliver-batch.mjs`, and
   `node --test test/deliver-batch.test.mjs`.
4. Give a new Elephant chat the source README as its starting point.
   Ask it to locate the batch sender, identify its caller-facing contract,
   and cite the source function.

You're done when the generated notes lead the new chat to the right file
and describe behavior that agrees with the starter tests.

[Check your work](../solution/readme.md)
