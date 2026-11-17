# Set up the lab

The **Elephant** keeps the design conversation, including decisions you make
along the way. A **Goldfish** reviews the document, its assigned rubric, and
selected source material from a fresh conversation context. As the designer,
you decide which findings to act on and when the design is ready.

## Open a disposable project

You'll need Git and Node.js 22 or later. From the course repository root, run
the following in a terminal. The final line prints the directory to open in
your coding agent.

```sh
lab_dir=$(mktemp -d "${TMPDIR:-/tmp}/egm-webhooks.XXXXXX")
cp -R lab/. "$lab_dir"
cd "$lab_dir"
git init -b main
git add .
git commit -m "Start EGM webhook lab"
node --test test/deliver-batch.test.mjs
pwd
```

Expect two passing tests. The lab uses a fake sender, so the tests need no
server or credentials. Keep the printed lab path for the next exercises and
leave the course checkout available to read the problems and solutions.

## Load EGM in a new session

In Codex desktop, use the skill picker in a new chat rooted at the lab. If
the EGM skills are missing, install the published plugin, then start a new
chat. Pick the named skill in each exercise and paste the exercise prompt
into the chat. [Published EGM plugin](https://chatgpt.com/plugins/plugins_6aeb90f47ec88191a3c107e01d3eb357)

In Codex CLI, install the plugin with the two commands below, start a new
session in the lab, and select the installed skill. Claude Code and
Antigravity CLI use commands such as `/egm:egm-review` followed by the
exercise inputs. Install the complete plugin so the host can find the bundled
reviewers and rubrics. [Installation by host](https://github.com/google/elephant-goldfish-model/blob/main/docs/harnesses.md)

```sh
codex plugin marketplace add google/elephant-goldfish-model
codex plugin add egm@egm
```

For Goldfish exercises, use a session with fresh-context subagents and
explicitly authorize their use in the exercise prompt. In Codex, ask the
parent to confirm that the reviewers ran with parent-conversation forking
disabled and completed. Project instructions and workspace files can still
be accessible to those reviewers. If your session lacks fresh-context
delegation, switch to a supported session before marking a live review
complete. [Codex integration](https://github.com/google/elephant-goldfish-model/blob/main/docs/codex.md)

Continue to [your first review](../../01.02-review-an-existing-proposal/problem/readme.md).
