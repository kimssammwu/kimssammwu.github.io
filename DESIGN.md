# Design

## Source of truth

- Status: Active
- Last refreshed: 2026-08-02
- Approved reference: `.omx/artifacts/visual-ralph/clean-publication/reference-copyless.png`
- Primary surfaces: landing `/`, notes index `/notes/`, article `/posts/:title/`, about `/about/`
- Reference principles: Linear-like grid restraint with Vercel-like technical clarity, implemented as an original light/dark publication system

## Product direction

- The landing and notes index are separate routes.
- The interface does not explain itself with a slogan. Actual post titles, dates, categories, and navigation provide the content hierarchy.
- Long-form reading and technical utilities remain the priority on article pages.
- Avoid generated-sounding introductions, decorative editorial copy, and placeholder social links.

## Visual language

- Typography: `Inter` and `Noto Sans KR` only; no serif display or reading face.
- Color: neutral white/black surfaces with one restrained cobalt accent.
- Layout: 1340px content grid, 720px reading measure, thin rules, broad whitespace.
- Shape: 6px control radius, mostly square media, no pill-heavy UI or shadows.
- Imagery: local monochrome geometric SVGs with one cobalt element.
- Motion: subtle hover transitions only; content is never hidden behind entrance animation.

## Theme tokens

- Token owner: `assets/css/style.css` under `:root` and `html[data-theme="dark"]`.
- Light: `#ffffff` background, `#0a0a0a` text, `#e7e7e9` rules, `#4f46e5` accent.
- Dark: `#0b0b0c` background, `#f5f5f5` text, `#29292d` rules, `#818cf8` accent.
- Theme selection follows the OS on first visit, switches from the header button, and persists in `localStorage`.
- `?theme=light` and `?theme=dark` are deterministic preview states for screenshots.
- The `theme-color` meta value and accessible theme-toggle label update with the selected theme.
- An active Giscus frame receives the same light/dark theme through its supported `postMessage` configuration.

## Components and states

- Header: centered navigation, active underline, compact theme toggle.
- Landing: publication wordmark plus an index of real posts; no promotional copy.
- Notes: `Notes` title, text-only category filters, one featured entry, two-column archive grid.
- Article: factual metadata, optional research actions, geometric cover, readable prose.
- TOC: generated from article `h2`/`h3`; sticky with active-section state on desktop and collapsible on mobile.
- Tags: factual hash labels on cards/articles and a dedicated `/tags/` index grouped by tag.
- Collections: centrally named groups in `_data/post_collections.yml`, linked from cards/articles and listed at `/collections/`; membership is optional and single-valued.
- Comments: optional Giscus embed backed by GitHub Discussions; absent from the DOM until configuration is complete.
- Code: Rouge language color, monochrome language icon and label, icon-only copy/copy-success/copy-error states.
- Research links: front-matter action list and inline `.quick-link`, both rectangular and theme-aware.
- Empty filter: short factual message.

## Accessibility and responsive behavior

- Visible keyboard focus uses the theme accent and native buttons/links retain their semantics.
- Color pairs target WCAG AA contrast.
- Mobile uses one-column stories, horizontally scrollable category tabs, and a 40px reading gutter.
- Reduced-motion preference disables nonessential transitions.
- SVG cover descriptions remain available on article pages; list thumbnails are decorative.

## Verification contract

- Build: `bundle exec jekyll build`.
- JavaScript syntax: `node --check assets/js/main.js`.
- Desktop visual viewport: `1440x1100` for `/notes/?theme=light` and `/notes/?theme=dark`.
- Mobile visual viewport: `390x844` for `/notes/?theme=light`.
- Artifacts live in `.omx/artifacts/visual-ralph/clean-publication/`.

## Open deployment items

- Add a real GitHub/profile URL only when the owner supplies it.
- Set `_config.yml` `url` and `baseurl` for the final GitHub Pages repository.
- Enable repository Discussions, install Giscus, fill `repo_id` and `category_id`, then set `comments.enabled: true`.
