const header = document.querySelector(".site-header");

const syncHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

const rows = [...document.querySelectorAll(".story-row")];
const topicButtons = [...document.querySelectorAll(".topic-filter")];
const emptyFilter = document.querySelector(".empty-filter");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }),
    { threshold: 0.12 },
  );
  rows.forEach((row) => observer.observe(row));
} else {
  rows.forEach((row) => row.classList.add("is-visible"));
}

topicButtons.forEach((button) => {
  button.addEventListener("click", () => {
    topicButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    const topic = button.dataset.topic;
    let visibleCount = 0;
    rows.forEach((row) => {
      const visible = topic === "all" || row.dataset.category === topic;
      row.hidden = !visible;
      if (visible) {
        visibleCount += 1;
        row.classList.add("is-visible");
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
