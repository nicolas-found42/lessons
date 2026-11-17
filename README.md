# Learn the Elephant-Goldfish Model

Practice Google's [Elephant-Goldfish Model (EGM)](https://github.com/google/elephant-goldfish-model) in a small webhook delivery project. You'll learn how to give a fresh reviewer enough context to find gaps, turn findings into decisions, and use an approved design to guide implementation.

Start with [the lab setup](exercises/01-first-goldfish-review/01.01-set-up-the-lab/explainer/readme.md). Open each problem first, then use its solution to check your work. Keep one lab copy for the first two sections and make a clean copy for maintenance.

## First Goldfish review

1. [Set up the lab](exercises/01-first-goldfish-review/01.01-set-up-the-lab/explainer/readme.md)
2. [Review an existing proposal](exercises/01-first-goldfish-review/01.02-review-an-existing-proposal/problem/readme.md)
3. [Resolve review findings](exercises/01-first-goldfish-review/01.03-resolve-review-findings/problem/readme.md)

## Design a feature

4. [Brainstorm a retry policy](exercises/02-design-a-feature/02.01-brainstorm-a-retry-policy/problem/readme.md)
5. [Draft the design](exercises/02-design-a-feature/02.02-draft-the-design/problem/readme.md)
6. [Review and implement](exercises/02-design-a-feature/02.03-review-and-implement/problem/readme.md)

## Maintain a codebase

7. [Detect documentation drift](exercises/03-maintain-a-codebase/03.01-detect-documentation-drift/problem/readme.md)
8. [Run a targeted review loop](exercises/03-maintain-a-codebase/03.02-run-a-targeted-review-loop/problem/readme.md)
9. [Bootstrap codebase docs](exercises/03-maintain-a-codebase/03.03-bootstrap-codebase-docs/problem/readme.md)

## Validate the course

```sh
pnpm dlx ai-hero-cli@0.4.1 internal lint
node --test lab/test/deliver-batch.test.mjs
```
