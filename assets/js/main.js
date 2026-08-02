const header = document.querySelector(".site-header");
const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeMeta = document.querySelector('meta[name="theme-color"]');

const syncGiscusTheme = () => {
  const iframe = document.querySelector("iframe.giscus-frame");
  if (!iframe) return;
  iframe.contentWindow?.postMessage(
    { giscus: { setConfig: { theme: root.dataset.theme === "dark" ? "dark_dimmed" : "light" } } },
    "https://giscus.app",
  );
};

const syncThemeControls = () => {
  const isDark = root.dataset.theme === "dark";
  themeToggle?.setAttribute("aria-label", isDark ? "라이트 모드로 전환" : "다크 모드로 전환");
  themeToggle?.setAttribute("aria-pressed", String(isDark));
  themeMeta?.setAttribute("content", isDark ? "#0b0b0c" : "#ffffff");
  syncGiscusTheme();
};

syncThemeControls();

const commentsRoot = document.querySelector(".giscus");
if (commentsRoot && "MutationObserver" in window) {
  const commentsObserver = new MutationObserver(() => {
    if (!commentsRoot.querySelector("iframe.giscus-frame")) return;
    syncGiscusTheme();
    commentsObserver.disconnect();
  });
  commentsObserver.observe(commentsRoot, { childList: true });
}

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

const searchToggle = document.querySelector(".search-toggle");
const searchDialog = document.querySelector("[data-search-dialog]");
const searchClose = searchDialog?.querySelector("[data-search-close]");
const searchForm = searchDialog?.querySelector("[data-search-form]");
const searchInput = searchDialog?.querySelector("[data-search-input]");
const searchStatus = searchDialog?.querySelector("[data-search-status]");
const searchResults = searchDialog?.querySelector("[data-search-results]");
let searchIndexPromise;
let searchEntries = [];

const normalizeSearchText = (value) => String(value || "")
  .normalize("NFKC")
  .toLocaleLowerCase()
  .replace(/\s+/g, " ")
  .trim();

const loadSearchIndex = () => {
  if (!searchDialog) return Promise.resolve([]);
  if (!searchIndexPromise) {
    searchIndexPromise = fetch(searchDialog.dataset.searchIndex)
      .then((response) => {
        if (!response.ok) throw new Error(`Search index request failed: ${response.status}`);
        return response.json();
      })
      .then((entries) => {
        searchEntries = entries;
        return entries;
      });
  }
  return searchIndexPromise;
};

const createSearchResult = (entry) => {
  const item = document.createElement("li");
  item.className = "search-result";

  const link = document.createElement("a");
  link.href = entry.url;

  const meta = document.createElement("div");
  meta.className = "search-result-meta";
  const date = document.createElement("span");
  date.textContent = entry.date;
  meta.append(date);
  if (entry.tags?.length) {
    const tags = document.createElement("span");
    tags.textContent = entry.tags.slice(0, 3).map((tag) => `#${tag}`).join(" ");
    meta.append(tags);
  }

  const title = document.createElement("h3");
  title.textContent = entry.title;
  link.append(meta, title);

  if (entry.description) {
    const description = document.createElement("p");
    description.textContent = entry.description;
    link.append(description);
  }

  item.append(link);
  return item;
};

const renderSearchResults = (rawQuery) => {
  if (!searchStatus || !searchResults) return;
  const query = normalizeSearchText(rawQuery);
  searchResults.replaceChildren();
  if (!query) {
    searchStatus.textContent = "검색어를 입력하세요.";
    return;
  }

  const terms = query.split(" ");
  const matches = searchEntries
    .map((entry) => {
      const title = normalizeSearchText(entry.title);
      const description = normalizeSearchText(entry.description);
      const tags = normalizeSearchText(entry.tags?.join(" "));
      const content = normalizeSearchText(entry.content);
      const searchable = `${title} ${description} ${tags} ${content}`;
      if (!terms.every((term) => searchable.includes(term))) return null;
      const score = terms.reduce((total, term) => total
        + (title.startsWith(term) ? 12 : title.includes(term) ? 8 : 0)
        + (tags.includes(term) ? 5 : 0)
        + (description.includes(term) ? 3 : 0)
        + (content.includes(term) ? 1 : 0), 0);
      return { entry, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score || Number(b.entry.timestamp) - Number(a.entry.timestamp))
    .slice(0, 12);

  searchStatus.textContent = matches.length ? `${matches.length}개의 글` : "검색 결과 없음";
  searchResults.append(...matches.map(({ entry }) => createSearchResult(entry)));
};

const openSearch = () => {
  if (!searchDialog || searchDialog.open) return;
  if (typeof searchDialog.showModal === "function") searchDialog.showModal();
  else searchDialog.setAttribute("open", "");
  document.body.classList.add("is-search-open");
  searchInput?.focus();
  loadSearchIndex()
    .then(() => renderSearchResults(searchInput?.value))
    .catch(() => {
      if (searchStatus) searchStatus.textContent = "검색을 불러오지 못했습니다.";
    });
};

const closeSearch = () => {
  if (!searchDialog?.open) return;
  if (typeof searchDialog.close === "function") searchDialog.close();
  else searchDialog.removeAttribute("open");
};

searchToggle?.addEventListener("click", openSearch);
searchClose?.addEventListener("click", closeSearch);
searchDialog?.addEventListener("click", (event) => {
  if (event.target === searchDialog) closeSearch();
});
searchDialog?.addEventListener("close", () => {
  document.body.classList.remove("is-search-open");
  if (searchInput) searchInput.value = "";
  renderSearchResults("");
});
searchInput?.addEventListener("input", () => {
  loadSearchIndex()
    .then(() => renderSearchResults(searchInput.value))
    .catch(() => {
      if (searchStatus) searchStatus.textContent = "검색을 불러오지 못했습니다.";
    });
});
searchForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  searchResults?.querySelector("a")?.click();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && searchDialog?.open) {
    event.preventDefault();
    closeSearch();
    return;
  }
  const target = event.target;
  const isEditing = target instanceof HTMLElement
    && (target.matches("input, textarea, select") || target.isContentEditable);
  const isSearchShortcut = event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey;
  const isCommandShortcut = event.key.toLocaleLowerCase() === "k" && (event.metaKey || event.ctrlKey);
  if (!isEditing && (isSearchShortcut || isCommandShortcut)) {
    event.preventDefault();
    openSearch();
  }
});

const rows = [...document.querySelectorAll(".story-row")];
const viewButtons = [...document.querySelectorAll("[data-view]")];
const emptyFilter = document.querySelector(".empty-filter");
const notesGrid = document.querySelector(".notes-grid");

viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    viewButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    const view = button.dataset.view;
    notesGrid?.classList.toggle("is-filtered", view === "popular");
    notesGrid?.classList.toggle("is-list-view", view === "all");
    let visibleCount = 0;
    rows.forEach((row) => {
      const postIndex = Number(row.dataset.postIndex);
      const visible = view === "all"
        || (view === "main" && postIndex < 5)
        || (view === "popular" && row.dataset.popular === "true");
      row.hidden = !visible;
      if (visible) {
        visibleCount += 1;
      }
    });
    if (emptyFilter) emptyFilter.hidden = visibleCount !== 0;
  });
});

const collectionFolders = [...document.querySelectorAll("[data-collection-folder]")];
const collectionDetails = [...document.querySelectorAll("[data-collection-detail]")];
const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");

const hideCollectionDetail = (detail) => {
  detail.classList.remove("is-visible");
  detail.hidden = true;
};

const setCollectionFolderState = (button, isOpen) => {
  const folder = button.closest(".collection-folder");
  const detailId = button.getAttribute("aria-controls");
  const detail = detailId ? document.getElementById(detailId) : null;
  folder?.classList.toggle("is-open", isOpen);
  button.setAttribute("aria-expanded", String(isOpen));
  const title = button.dataset.collectionTitle;
  const count = button.dataset.collectionCount;
  button.setAttribute(
    "aria-label",
    `${title} 컬렉션 폴더 ${isOpen ? "닫기" : "열기"}, 게시글 ${count}개`,
  );
  if (!detail) return;
  if (!isOpen) {
    hideCollectionDetail(detail);
    return;
  }
  detail.hidden = false;
  window.requestAnimationFrame(() => detail.classList.add("is-visible"));
};

collectionFolders.forEach((button) => {
  button.addEventListener("click", () => {
    const folder = button.closest(".collection-folder");
    const nextOpen = !folder?.classList.contains("is-open");
    collectionFolders.forEach((item) => setCollectionFolderState(item, item === button && nextOpen));
    if (!folder || !history.replaceState) return;
    const nextUrl = nextOpen
      ? `${location.pathname}${location.search}#${folder.id}`
      : `${location.pathname}${location.search}`;
    history.replaceState(null, "", nextUrl);
    if (nextOpen) {
      const detail = document.getElementById(button.getAttribute("aria-controls"));
      window.setTimeout(
        () => detail?.scrollIntoView({ behavior: reducedMotion?.matches ? "auto" : "smooth", block: "nearest" }),
        reducedMotion?.matches ? 0 : 220,
      );
    }
  });
});

collectionDetails.forEach((detail) => {
  detail.querySelector("[data-collection-close]")?.addEventListener("click", () => {
    const button = collectionFolders.find((item) => item.getAttribute("aria-controls") === detail.id);
    if (!button) return;
    setCollectionFolderState(button, false);
    history.replaceState?.(null, "", `${location.pathname}${location.search}`);
    button.focus();
  });
});

if (location.hash) {
  const hashFolder = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  const hashButton = hashFolder?.querySelector("[data-collection-folder]");
  if (hashButton) setCollectionFolderState(hashButton, true);
}

const toc = document.querySelector("[data-post-toc]");
const tocList = toc?.querySelector("[data-toc-list]");
const tocCount = toc?.querySelector("[data-toc-count]");
const proseHeadings = [...document.querySelectorAll(".prose h2, .prose h3")];

const createHeadingId = (heading, index) => {
  const base = heading.textContent
    .trim()
    .toLocaleLowerCase()
    .normalize("NFKC")
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-|-$/g, "") || `section-${index + 1}`;
  let candidate = base;
  let suffix = 2;
  while (document.getElementById(candidate)) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
  return candidate;
};

if (toc && tocList && proseHeadings.length >= 2) {
  const links = new Map();
  proseHeadings.forEach((heading, index) => {
    if (!heading.id) heading.id = createHeadingId(heading, index);

    const item = document.createElement("li");
    item.dataset.level = heading.tagName === "H3" ? "3" : "2";

    const link = document.createElement("a");
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;
    item.append(link);
    tocList.append(item);
    links.set(heading, link);
  });

  toc.hidden = false;
  if (tocCount) tocCount.textContent = String(proseHeadings.length).padStart(2, "0");

  const desktopToc = window.matchMedia("(min-width: 901px)");
  const syncTocMode = () => {
    toc.open = desktopToc.matches;
  };
  syncTocMode();
  desktopToc.addEventListener?.("change", syncTocMode);

  let tocFrame;
  const syncActiveHeading = () => {
    let activeHeading = proseHeadings[0];
    proseHeadings.forEach((heading) => {
      if (heading.getBoundingClientRect().top <= 150) activeHeading = heading;
    });
    links.forEach((link, heading) => {
      const isActive = heading === activeHeading;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    tocFrame = undefined;
  };

  syncActiveHeading();
  window.addEventListener("scroll", () => {
    if (tocFrame) return;
    tocFrame = window.requestAnimationFrame(syncActiveHeading);
  }, { passive: true });
}

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

const languageIconTypes = {
  bash: "terminal",
  css: "braces",
  html: "markup",
  javascript: "javascript",
  js: "javascript",
  json: "braces",
  markdown: "document",
  md: "document",
  python: "python",
  py: "python",
  ruby: "ruby",
  rb: "ruby",
  shell: "terminal",
  sh: "terminal",
  sql: "database",
  typescript: "typescript",
  ts: "typescript",
  yaml: "yaml",
  yml: "yaml",
  zsh: "terminal",
};

const iconMarkup = {
  terminal: '<path d="m4 7 4 4-4 4M10 16h7"/>',
  braces: '<path d="M9 4H7a2 2 0 0 0-2 2v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h2M15 4h2a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a2 2 0 0 1-2 2h-2"/>',
  markup: '<path d="m9 5-6 7 6 7M15 5l6 7-6 7"/>',
  javascript: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M10 8v6.5c0 1-.6 1.5-1.5 1.5H7M14 15c.6.7 1.4 1 2.3 1 1 0 1.7-.5 1.7-1.3 0-1.8-3.7-1.3-3.7-4 0-1.5 1.2-2.7 3-2.7.8 0 1.5.2 2.1.7"/>',
  typescript: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 9h6M10 9v7M14 15c.6.7 1.4 1 2.3 1 1 0 1.7-.5 1.7-1.3 0-1.8-3.7-1.3-3.7-4 0-1.5 1.2-2.7 3-2.7.8 0 1.5.2 2.1.7"/>',
  document: '<path d="M6 3h8l4 4v14H6zM14 3v5h5M9 13h6M9 17h5"/>',
  python: '<path d="M12 3H8a3 3 0 0 0-3 3v4h8a2 2 0 0 1 2 2v1M12 21h4a3 3 0 0 0 3-3v-4h-8a2 2 0 0 1-2-2v-1M9 6h.01M15 18h.01"/>',
  ruby: '<path d="m12 3 7 6-7 12L5 9zM5 9h14M8 9l4 12 4-12M9 3 5 9M15 3l4 6"/>',
  database: '<ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v7c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 12v7c0 1.7 3.1 3 7 3s7-1.3 7-3v-7"/>',
  yaml: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="m7 8 3 4 3-4M10 12v4M15 8v8M15 8l3 4 3-4M18 12v4"/>',
  code: '<path d="m9 5-6 7 6 7M15 5l6 7-6 7M14 3l-4 18"/>',
  copy: '<rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  error: '<path d="M6 6l12 12M18 6 6 18"/>',
};

const createToolbarIcon = (type, className) => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  svg.classList.add(className);
  svg.innerHTML = iconMarkup[type] || iconMarkup.code;
  return svg;
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

  const languageInfo = document.createElement("span");
  languageInfo.className = "code-language-info";
  languageInfo.append(createToolbarIcon(languageIconTypes[language] || "code", "code-language-icon"));

  const label = document.createElement("span");
  label.className = "code-language";
  label.textContent = languageNames[language] || language.toUpperCase();
  languageInfo.append(label);

  const button = document.createElement("button");
  button.className = "code-copy";
  button.type = "button";
  button.title = "코드 복사";
  button.setAttribute("aria-label", `${label.textContent} 코드 복사`);
  button.append(createToolbarIcon("copy", "code-copy-icon"));
  button.addEventListener("click", async () => {
    try {
      await copyText(code.textContent);
      button.replaceChildren(createToolbarIcon("check", "code-copy-icon"));
      button.title = "복사됨";
      button.setAttribute("aria-label", `${label.textContent} 코드 복사됨`);
      button.classList.add("is-copied");
    } catch {
      button.replaceChildren(createToolbarIcon("error", "code-copy-icon"));
      button.title = "복사 실패";
      button.setAttribute("aria-label", `${label.textContent} 코드 복사 실패`);
    }
    window.setTimeout(() => {
      button.replaceChildren(createToolbarIcon("copy", "code-copy-icon"));
      button.title = "코드 복사";
      button.setAttribute("aria-label", `${label.textContent} 코드 복사`);
      button.classList.remove("is-copied");
    }, 1600);
  });

  toolbar.append(languageInfo, button);
  block.prepend(toolbar);
  block.dataset.enhanced = "true";
});
