import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { zipSync } from "fflate";
import MarkdownIt from "markdown-it";

const root = fileURLToPath(new URL("..", import.meta.url));
const output = path.join(root, "dist");
const upstream = "https://github.com/google/elephant-goldfish-model";
const source = "https://github.com/nicolas-found42/lessons";
const siteTitle = "Elephant–Goldfish Model";
const description = "Learn to design, review, and build software with the Elephant–Goldfish Model.";
const moduleDetails = {
  "01-first-goldfish-review": {
    title: "First Goldfish review",
    description: "Review a flawed proposal and decide which findings to act on.",
  },
  "02-design-a-feature": {
    title: "Design a feature",
    description: "Take a webhook retry policy from a concept brief to tested code.",
  },
  "03-maintain-a-codebase": {
    title: "Maintain a codebase",
    description: "Find drift, focus a review, and document the code for the next designer.",
  },
};

async function readExercise(file) {
  const markdown = await readFile(file, "utf8");
  const heading = markdown.match(/^# (.+)\n+/);
  if (!heading) throw new Error(`Missing title in ${file}`);
  const content = markdown.slice(heading[0].length)
    .replace(/^(?:\[Check your work\]\([^)]+\)|Continue to \[[^\]]+\]\([^)]+\)\.)[ \t]*$/gm, "")
    .trim();
  return { file, title: heading[1], content };
}

const modules = [];
for (const [folder, details] of Object.entries(moduleDetails)) {
  const modulePath = path.join(root, "exercises", folder);
  const lessons = [];
  for (const slug of (await readdir(modulePath)).sort()) {
    if (!/^\d{2}\.\d{2}-/.test(slug)) continue;
    const lessonPath = path.join(modulePath, slug);
    const variants = await readdir(lessonPath);
    const problem = path.join(lessonPath, variants.includes("problem") ? "problem" : "explainer", "readme.md");
    lessons.push({
      slug,
      module: details,
      ...await readExercise(problem),
      solution: variants.includes("solution")
        ? await readExercise(path.join(lessonPath, "solution/readme.md"))
        : null,
    });
  }
  modules.push({ ...details, number: folder.slice(0, 2), lessons });
}
const lessons = modules.flatMap((module) => module.lessons);
const routes = new Map(lessons.map((lesson) => [lesson.file, `${lesson.slug}/`]));
for (const lesson of lessons) {
  if (lesson.solution) routes.set(lesson.solution.file, `${lesson.slug}/#solution`);
}

const md = new MarkdownIt();
const escape = md.utils.escapeHtml;
md.renderer.rules.link_open = (tokens, index, options, env, renderer) => {
  const token = tokens[index];
  const href = token.attrGet("href");
  if (href && !href.startsWith("#") && !/^[a-z]+:/i.test(href)) {
    const [target, anchor] = href.split("#");
    const route = routes.get(path.resolve(path.dirname(env.file), target));
    if (!route) throw new Error(`Missing course route for ${href} in ${env.file}`);
    token.attrSet("href", `${env.base}${route}${anchor ? "#" + anchor : ""}`);
  }
  return renderer.renderToken(tokens, index, options);
};
md.renderer.rules.table_open = () => '<p class="table-hint">Scroll horizontally to see all columns.</p><div class="table-scroll" tabindex="0" role="region" aria-label="Scrollable table"><table>';
md.renderer.rules.table_close = () => "</table></div>";

function layout({ title, base, content, home = false }) {
  const pageTitle = home ? siteTitle + " | A hands-on course" : title + " | " + siteTitle;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#faf8f1">
  <meta name="description" content="${description}">
  <title>${escape(pageTitle)}</title>
  <link rel="icon" href="${base}assets/favicon.png">
  <link rel="stylesheet" href="${base}assets/course.css">
  <script src="${base}assets/course.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="wrap header-inner">
      <a class="brand" href="${base}"><span class="brand-mark" aria-hidden="true">E<span>·</span>G</span><span>Elephant–Goldfish</span></a>
      <nav class="header-nav" aria-label="Site">
        <a href="${base}#curriculum">Curriculum</a>
        <a href="${source}">GitHub <span aria-hidden="true">↗</span></a>
      </nav>
    </div>
  </header>
  ${content}
  <footer class="site-footer">
    <div class="wrap footer-inner">
      <span>Elephant–Goldfish Model · A hands-on course</span>
      <a href="${upstream}">Original EGM project <span aria-hidden="true">↗</span></a>
    </div>
  </footer>
</body>
</html>
`;
}

function lessonRow(lesson, base, index, current) {
  const selected = lesson === current ? ' aria-current="page"' : "";
  return `<li>
    <a class="lesson-row" href="${base}${lesson.slug}/" data-step="${lesson.slug}"${selected}>
      <span class="lesson-number" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
      <span>${escape(lesson.title)}</span>
      <span class="row-arrow" aria-hidden="true">→</span>
      <span class="row-check" hidden><span aria-hidden="true">✓</span><span class="visually-hidden">Completed</span></span>
    </a>
  </li>`;
}

function homePage() {
  const curriculum = modules.map((module) => `<section class="module-card">
    <p class="module-number">Module ${module.number}</p>
    <h3>${escape(module.title)}</h3>
    <p class="module-description">${escape(module.description)}</p>
    <ol>
      ${module.lessons.map((lesson) => lessonRow(lesson, "./", lessons.indexOf(lesson))).join("\n")}
    </ol>
  </section>`).join("\n");

  return layout({ title: siteTitle, home: true, base: "./", content: `
    <main id="main">
      <section class="hero wrap">
        <div class="hero-copy">
          <p class="eyebrow">A hands-on software design course</p>
          <h1>Elephant–<br><em>Goldfish</em> Model</h1>
          <p class="hero-description">Design with context. Review with fresh eyes. Use Google’s open-source EGM plugin to take a webhook feature from an idea to tested code.</p>
          <div class="hero-actions">
            <a class="button primary" href="./${lessons[0].slug}/" data-resume>Start the course <span aria-hidden="true">→</span></a>
            <a class="text-link" href="#curriculum">Browse the exercises <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <figure class="hero-art">
          <img src="./assets/elephant-goldfish.webp" alt="An elephant faces a goldfish in a glass bowl" width="1536" height="1024" fetchpriority="high">
          <figcaption>
            <span><strong>Elephant</strong> Design partner</span>
            <span><strong>Goldfish</strong> Fresh-context reviewer</span>
          </figcaption>
        </figure>
      </section>
      <section class="curriculum" id="curriculum">
        <div class="wrap curriculum-inner">
          <div class="section-heading">
            <h2>The curriculum</h2>
            <p>${lessons.length} exercises across ${modules.length} modules</p>
          </div>
          <div class="module-grid">${curriculum}</div>
        </div>
      </section>
    </main>` });
}

function lessonPage(lesson, index) {
  const base = "../";
  const problem = md.render(lesson.content, { file: lesson.file, base });
  const solution = lesson.solution ? `<details class="solution" id="solution">
    <summary>Reference answer</summary>
    <div class="prose">${md.render(lesson.solution.content, { file: lesson.solution.file, base })}</div>
  </details>` : "";
  const sidebar = modules.map((module) => `<div class="sidebar-module">
    <h2>${escape(module.title)}</h2>
    <ol>${module.lessons.map((item) => lessonRow(item, base, lessons.indexOf(item), lesson)).join("\n")}</ol>
  </div>`).join("\n");
  const download = index === 0 ? `<div class="lab-download">
    <div>
      <p><strong>Get the webhook lab</strong></p>
      <p>Unzip the download into an empty directory, then run the setup commands from the directory containing <code>lab/</code>.</p>
    </div>
    <a class="button secondary" href="../egm-webhook-lab.zip" download>Download ZIP <span aria-hidden="true">↓</span></a>
  </div>` : "";
  const previous = lessons[index - 1];
  const next = lessons[index + 1];

  return layout({ title: lesson.title, base, content: `
    <div class="wrap lesson-layout">
      <aside class="sidebar" aria-label="Course navigation">
        <details class="lesson-menu" open>
          <summary>Course contents</summary>
          <div class="sidebar-inner">
            <p class="sidebar-caption">Course contents</p>
            <div class="progress" data-progress hidden>
              <progress max="${lessons.length}" value="0" aria-label="Course progress"></progress>
              <span data-progress-label></span>
            </div>
            <nav aria-label="Exercises">${sidebar}</nav>
          </div>
        </details>
      </aside>
      <main id="main" class="lesson-main" data-current-step="${lesson.slug}">
        <article>
          <header class="lesson-heading">
            <p class="eyebrow">${escape(lesson.module.title)} <span aria-hidden="true">/</span> Exercise ${index + 1} of ${lessons.length}</p>
            <h1>${escape(lesson.title)}</h1>
          </header>
          ${download}
          <div class="prose">${problem}</div>
          ${solution}
        </article>
        <div class="completion" hidden>
          <button class="button secondary" type="button" data-complete aria-pressed="false">Mark complete</button>
        </div>
        <nav class="lesson-pagination" aria-label="Previous and next exercise">
          ${previous ? `<a href="../${previous.slug}/"><span>← Previous</span>${escape(previous.title)}</a>` : "<span></span>"}
          ${next ? `<a href="../${next.slug}/"><span>Next →</span>${escape(next.title)}</a>`
            : '<a href="../#curriculum"><span>Finish →</span>Back to curriculum</a>'}
        </nav>
      </main>
    </div>` });
}

async function archiveLab(folder) {
  const entries = {};
  for (const item of await readdir(path.join(root, folder), { withFileTypes: true })) {
    if (item.name.startsWith(".")) continue;
    const relative = path.posix.join(folder, item.name);
    if (item.isDirectory()) Object.assign(entries, await archiveLab(relative));
    else if (item.isFile()) entries[relative] = await readFile(path.join(root, relative));
  }
  return entries;
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(path.join(root, "site/assets"), path.join(output, "assets"), { recursive: true });
for (const [font, files] of [
  ["@fontsource-variable/dm-sans", ["dm-sans-latin-wght-normal.woff2"]],
  ["@fontsource/instrument-serif", ["instrument-serif-latin-400-normal.woff2", "instrument-serif-latin-400-italic.woff2"]],
]) {
  const fontRoot = path.join(root, "node_modules", font);
  for (const file of files) {
    await cp(path.join(fontRoot, "files", file), path.join(output, "assets", file));
  }
  await cp(path.join(fontRoot, "LICENSE"), path.join(output, "assets", `${font.split("/")[1]}-LICENSE.txt`));
}
await writeFile(path.join(output, "index.html"), homePage());
await writeFile(path.join(output, "egm-webhook-lab.zip"), zipSync(await archiveLab("lab")));
for (const [index, lesson] of lessons.entries()) {
  const folder = path.join(output, lesson.slug);
  await mkdir(folder);
  await writeFile(path.join(folder, "index.html"), lessonPage(lesson, index));
}
console.log(`Built the course and ${lessons.length} lesson pages in dist/.`);
