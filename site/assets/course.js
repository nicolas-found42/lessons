const progressKey = "elephant-goldfish-completed";
const rows = [...document.querySelectorAll("[data-step]")];
const stepIds = new Set(rows.map((row) => row.dataset.step));
const completed = new Set();
try {
  const saved = JSON.parse(localStorage.getItem(progressKey) ?? "[]");
  if (Array.isArray(saved)) {
    for (const id of saved) {
      if (stepIds.has(id)) completed.add(id);
    }
  }
} catch {
  // The course can still be read when browser storage is unavailable.
}

const progress = document.querySelector("[data-progress]");
const current = document.querySelector("[data-current-step]")?.dataset.currentStep;
const complete = document.querySelector("[data-complete]");
const resume = document.querySelector("[data-resume]");

function updateProgress() {
  for (const row of rows) {
    const done = completed.has(row.dataset.step);
    row.querySelector(".row-arrow").hidden = done;
    row.querySelector(".row-check").hidden = !done;
  }
  if (progress) {
    progress.querySelector("progress").value = completed.size;
    progress.querySelector("[data-progress-label]").textContent = `${completed.size} of ${stepIds.size} complete`;
    progress.hidden = false;
  }
  if (complete) {
    const done = completed.has(current);
    complete.setAttribute("aria-pressed", String(done));
    complete.textContent = done ? "✓ Completed" : "Mark complete";
    complete.closest(".completion").hidden = false;
  }
}

updateProgress();
complete?.addEventListener("click", () => {
  if (completed.has(current)) completed.delete(current);
  else completed.add(current);
  try {
    localStorage.setItem(progressKey, JSON.stringify([...completed]));
  } catch {
    // Keep the current page interactive even if progress cannot be saved.
  }
  updateProgress();
});

if (resume && completed.size > 0) {
  const next = rows.find((row) => !completed.has(row.dataset.step));
  if (next) {
    resume.href = next.href;
    resume.firstChild.textContent = "Continue the course ";
  } else {
    resume.firstChild.textContent = "Revisit the course ";
  }
}

const menu = document.querySelector(".lesson-menu");
if (menu) {
  const compact = matchMedia("(max-width: 860px)");
  const sizeMenu = () => { menu.open = !compact.matches; };
  sizeMenu();
  compact.addEventListener("change", sizeMenu);
}

const solution = document.querySelector("details.solution");
if (solution) {
  const openLinkedSolution = () => {
    if (location.hash === "#solution") solution.open = true;
  };
  openLinkedSolution();
  window.addEventListener("hashchange", openLinkedSolution);
}

for (const block of document.querySelectorAll(".prose pre, .prose blockquote")) {
  const content = block.querySelector("code:only-child") ?? block;
  const copy = document.createElement("button");
  copy.type = "button";
  copy.className = "copy-button";
  const isCode = block.matches("pre");
  copy.textContent = "Copy";
  copy.setAttribute("aria-label", isCode ? "Copy code" : "Copy quoted text");
  copy.setAttribute("aria-live", "polite");
  const text = isCode ? content.textContent : stripLineWraps(block);
  let reset;
  copy.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(text.trim());
      copy.textContent = "Copied";
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(content);
      selection.removeAllRanges();
      selection.addRange(range);
      copy.textContent = "Text selected";
    }
    clearTimeout(reset);
    reset = setTimeout(() => { copy.textContent = "Copy"; }, 2200);
  });
  const box = document.createElement("div");
  box.className = `copy-box ${isCode ? "code-box" : "quote-box"}`;
  block.before(box);
  box.append(block, copy);
}

function stripLineWraps(block) {
  return [...block.children].map((child) => child.textContent.replaceAll("\n", " ")).join("\n\n");
}
