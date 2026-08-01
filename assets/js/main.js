const header = document.querySelector(".site-header");
const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeMeta = document.querySelector('meta[name="theme-color"]');

const syncThemeControls = () => {
  const isDark = root.dataset.theme === "dark";
  themeToggle?.setAttribute("aria-label", isDark ? "라이트 모드로 전환" : "다크 모드로 전환");
  themeToggle?.setAttribute("aria-pressed", String(isDark));
  themeMeta?.setAttribute("content", isDark ? "#0b0b0c" : "#ffffff");
};

syncThemeControls();

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  try {
    localStorage.setItem("minwoo-theme", nextTheme);
  } catch (_) {
    // The selected theme still applies for the current page when storage is unavailable.
  }
  syncThemeControls();
});

const systemTheme = window.matchMedia?.("(prefers-color-scheme: dark)");
systemTheme?.addEventListener?.("change", (event) => {
  try {
    if (localStorage.getItem("minwoo-theme")) return;
  } catch (_) {
    return;
  }
  root.dataset.theme = event.matches ? "dark" : "light";
  syncThemeControls();
});

const syncHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

const rows = [...document.querySelectorAll(".story-row")];
const topicButtons = [...document.querySelectorAll(".topic-filter")];
const emptyFilter = document.querySelector(".empty-filter");
const notesGrid = document.querySelector(".notes-grid");

topicButtons.forEach((button) => {
  button.addEventListener("click", () => {
    topicButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    const topic = button.dataset.topic;
    notesGrid?.classList.toggle("is-filtered", topic !== "all");
    let visibleCount = 0;
    rows.forEach((row) => {
      const visible = topic === "all" || row.dataset.category === topic;
      row.hidden = !visible;
      if (visible) {
        visibleCount += 1;
      }
    });
    if (emptyFilter) emptyFilter.hidden = visibleCount !== 0;
  });
});

const languageNames = {
  bash: "Bash",
  css: "CSS",
  html: "HTML",
  javascript: "JavaScript",
  js: "JavaScript",
  json: "JSON",
  markdown: "Markdown",
  md: "Markdown",
  python: "Python",
  py: "Python",
  ruby: "Ruby",
  rb: "Ruby",
  shell: "Shell",
  sh: "Shell",
  sql: "SQL",
  typescript: "TypeScript",
  ts: "TypeScript",
  yaml: "YAML",
  yml: "YAML",
  zsh: "Zsh",
};

const copyText = async (text) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
};

document.querySelectorAll(".prose .highlighter-rouge").forEach((block) => {
  const code = block.querySelector("pre code");
  if (!code || block.dataset.enhanced === "true") return;

  const languageClass = [...block.classList].find((name) => name.startsWith("language-"));
  const language = languageClass?.replace("language-", "") || "text";
  const toolbar = document.createElement("div");
  toolbar.className = "code-toolbar";

  const label = document.createElement("span");
  label.className = "code-language";
  label.textContent = languageNames[language] || language.toUpperCase();

  const button = document.createElement("button");
  button.className = "code-copy";
  button.type = "button";
  button.textContent = "복사";
  button.setAttribute("aria-label", `${label.textContent} 코드 복사`);
  button.addEventListener("click", async () => {
    try {
      await copyText(code.textContent);
      button.textContent = "복사됨";
      button.classList.add("is-copied");
    } catch {
      button.textContent = "복사 실패";
    }
    window.setTimeout(() => {
      button.textContent = "복사";
      button.classList.remove("is-copied");
    }, 1600);
  });

  toolbar.append(label, button);
  block.prepend(toolbar);
  block.dataset.enhanced = "true";
});
