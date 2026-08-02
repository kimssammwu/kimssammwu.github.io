# Design

## Source of truth

- Status: Active
- Last refreshed: 2026-08-03
- Primary product surfaces: landing `/`, unified notes `/notes/`, article `/posts/:title/`, tags `/tags/`, collections `/collections/`, global search, error `/404.html`, intentionally blank about `/about/`
- Evidence reviewed: `assets/css/style.css`, `assets/js/main.js`, `_includes/header.html`, `notes/index.html`, `collections/index.html`, `_layouts/post.html`, `_data/post_collections.yml`, local geometric cover assets, and the user-provided folder/portfolio references
- Approved baseline references: `.omx/artifacts/visual-ralph/clean-publication/reference-copyless.png`, `.omx/artifacts/visual-ralph/404-retro-terminal/reference-v2.png`

## Brand

- Personality: quiet, technical, precise, independent, editorial without magazine ornament
- Trust signals: real post titles and dates, explicit metadata, readable long-form typography, visible source structure
- Avoid: generated-sounding copy, glossy skeuomorphism, decorative gradients, pill-heavy controls, large shadows, noisy dashboards, social-network styling

## Product goals

- Goals: make recent writing discoverable, keep a growing archive scannable, group related posts into meaningful reading sequences, distinguish paper and book reviews by the material being reviewed, preserve excellent technical reading ergonomics
- Non-goals: social feed behavior, engagement gamification, generic personal-brand landing copy, CMS-like administration UI
- Success signals: a reader can distinguish recent/all/popular posts, understand a collection before opening it, and move through a long article without losing context

## Personas and jobs

- Primary personas: the author maintaining a long-lived technical archive; developers and researchers arriving from a shared link
- User jobs: find a relevant post, scan the complete archive, follow a related series, inspect references/code, return to the current reading position
- Key contexts of use: desktop deep reading, mobile link visits, dark-mode browsing, keyboard navigation

## Information architecture

- Primary navigation: Home, Notes, Tags, Collections, About, global search, theme control
- Core routes/screens: copy-free landing, type-separated Notes main view, compact typed archive, curated popular view, tag index, collection index/detail anchors, article, 404 recovery page, blank About
- Content hierarchy: collection → ordered related posts; review type → paper or book; tag → cross-cutting keyword; `popular: true` → manually curated discovery signal

## Design principles

- Real content creates hierarchy: titles, dates, counts, covers, and relationships replace explanatory marketing copy.
- Functional ornament only: a visual metaphor must explain structure or state, not merely decorate empty space.
- Density follows intent: Main can be expressive, while All and collection detail lists stay compact and scalable.
- References are translated, not copied: retain the folder references' layering and grouping cues while using the site's monochrome publication language.
- Progressive enhancement: content, links, and collection membership remain useful without JavaScript.
- Tradeoff: the collection index may use slightly stronger object-like visuals than Notes, but it must keep the same typography, rules, spacing, and dark-mode behavior.

## Visual language

- Color: neutral white/black surfaces with one restrained cobalt accent; folder layers use existing `--surface`, `--surface-strong`, `--line`, and `--accent` tokens
- Typography: `Inter` and `Noto Sans KR`; no serif display face and no novelty folder labels
- Spacing/layout rhythm: 1340px page grid, 720px article measure, broad section whitespace, compact 90–105px archive rows
- Shape/radius/elevation: 6px control radius, mostly square media; depth is made with 1px outlines and offset layers rather than drop shadows
- Motion: 3–6px paper/folder layer movement on hover or focus; no whole-card zoom, parallax, or entrance animation
- Imagery/iconography: local monochrome geometric SVGs and actual post covers; folder previews may expose up to three recent covers, with neutral paper fallbacks

### Review visual direction: Figure Grid and Bookshelf

- Paper reviews use wide `16 / 10` thumbnails so diagrams, tables, and representative figures remain legible before opening the article.
- Book reviews use a denser four-column shelf; real cover art fills the card width at its intrinsic aspect ratio without cropping, while empty placeholders retain a portrait `2 / 3` frame; author and publication metadata sit below rather than over the cover.
- On hover-capable devices, book cover imagery rests at 20% opacity and returns to 100% on hover or keyboard focus with a restrained scale transition; touch devices keep full-opacity covers because hover is unavailable.
- Do not force both review types into one generic card. Their thumbnail proportions communicate the source material.
- Keep review-channel headings and their zero counts visible when empty, but do not render empty shelves, layout-preview copy, or placeholder cards.

### Error visual direction: Editorial System Failure

- The 404 page reuses the global header, footer, 1340px grid, typography, rules, and cobalt accent instead of becoming a separate poster-like experience.
- One original, unbranded CRT photograph communicates the missing-page state; it remains a content image inside a square-edged black media field and never replaces accessible HTML text or links.
- Keep copy factual and brief. Home and Notes are the only recovery actions.
- Motion is limited to the text cursor and link arrows, with a complete reduced-motion fallback.

### Collection visual direction: Monochrome Archive Folder

- Translate the supplied folder references into a flat archive object: two or three offset document layers sit behind a solid folder front.
- Use an approximately `4 / 3` cover area. The folder front owns the title, post count, and optional last-updated date.
- Recent post covers may peek above the folder front as clipped rectangles. They remain secondary and decorative.
- Keep folder geometry monochrome; do not add decorative index marks or unrelated colors to collections.
- The folder front is one continuous inline SVG path so its tab and body share a clean outline; papers and labels remain HTML/CSS.
- Hover/focus slightly fans the document layers and strengthens the border. The title and target remain stable.

## Components

- Existing components to reuse: site header/footer, Notes metadata rows, story cover treatment, collection membership metadata, theme tokens, focus rings
- New/changed components: collection shelf grid, interactive archive-folder card, on-demand collection detail list, Notes content channels, archive type labels, paper figure grid, book cover shelf, global search dialog, static search index, 404 error grid, empty states
- Variants and states: default, hover, keyboard focus, current anchor, no-cover fallback, empty/hidden collection
- Token/component ownership: `assets/css/style.css`; collection metadata remains in `_data/post_collections.yml`

### Collection page composition

1. Keep the existing `Collections` title and total count as a restrained page header.
2. Keep the resting page limited to a responsive shelf of archive-folder cards; no detail list is visible by default.
3. Hover/focus fans the document layers slightly. Click opens one folder, closes the previous folder, and reveals that collection's compact post list below the shelf.
4. The revealed list is replaced in place when another folder is selected and can be closed without navigation.
5. Preserve `#collection-id` anchors so article-level collection links open the matching folder and detail state.

### Notes main composition

1. Keep reviews inside `/notes/`; do not add a separate Reviews route or primary-navigation item.
2. The Main tab separates `Blog`, `Papers`, and `Books` into thumbnail-led sections on one continuous page; Blog shows only its three latest entries.
3. Paper cards prioritize a wide thumbnail, then title and a short abstract-like description.
4. Book cards prioritize the cover, then title, author, and publication metadata in a compact stack.
5. The All tab stays visually flat without decorative left-edge markers; type is communicated by outlined Blog labels, cobalt-tinted Paper labels, and inverse Book labels.
6. `review_type: paper|book` is the durable content switch; existing `Paper`-tagged notes may temporarily populate the paper layout until dedicated reviews are written.

## Accessibility

- Target standard: WCAG 2.2 AA for contrast, focus visibility, semantics, and touch target sizing
- Keyboard/focus behavior: every folder card is a real disclosure button with `aria-expanded`/`aria-controls`; search is a native modal dialog opened by its header button, `/`, or `⌘/Ctrl+K` and closed by `Esc`; hover motion is mirrored on `:focus-visible`
- Contrast/readability: folder layers must remain distinguishable in both themes without relying on color alone
- Screen-reader semantics: folder artwork is `aria-hidden`; accessible names include collection title and post count; contained posts remain an ordered list
- Reduced motion and sensory considerations: layer movement is disabled by the existing reduced-motion rule; information does not depend on motion

## Responsive behavior

- Supported breakpoints/devices: wide desktop, tablet around 900–1180px, mobile around 390px, narrow mobile around 320px
- Layout adaptations: three folder cards on wide desktop, two on tablet and normal mobile, one below roughly 340px; paper reviews move from two columns to one; book reviews move from four columns to two; detail lists become title-first mobile rows
- Touch/hover differences: touch receives no required reveal behavior; all metadata needed to choose a collection is visible at rest

## Interaction states

- Loading: static HTML renders complete collection names and links without a loading skeleton; the search index loads once on first use
- Empty: collections with no posts are omitted from the primary shelf; an empty search shows a single compact status line
- Error: `/404.html` offers direct Home and Notes recovery links; missing cover art falls back to neutral paper layers without a broken-image icon; search-index failure is announced in its live status region
- Success: the selected anchor receives a brief accent rule/current marker, not a toast
- Disabled: not used for navigable collections
- Offline/slow network: CSS folder geometry and text render before optional cover images

## Content voice

- Tone: factual, compact, author-written, Korean-first with established technical English terms
- Terminology: use `Collection` consistently in navigation and metadata; use `N notes` or a localized equivalent consistently after implementation review
- Microcopy rules: show title, count, and date; paper cards may show venue/year and book cards may show author/publisher when provided; omit generic descriptions unless the author provides meaningful copy

## Implementation constraints

- Framework/styling system: GitHub Pages-compatible Jekyll, Liquid templates, vanilla CSS and JavaScript; search data is generated at build time in `search.json`
- Design-token constraints: extend existing variables before introducing tokens; no new component framework or icon dependency
- Performance constraints: no large folder bitmap assets or search dependency; preview images use existing optimized post covers and lazy loading; client search caps rendered results
- Compatibility constraints: light/dark themes, reduced motion, keyboard access, optional images, collections and review types with varying post counts
- Test/screenshot expectations: `bundle exec jekyll build`, `node --check assets/js/main.js` when JavaScript changes, desktop 1440px and mobile 390/320px screenshots for changed visual surfaces, horizontal-overflow checks

## Open questions

- [ ] Implementation review: should preview papers show actual recent post covers or remain fully abstract for stronger visual consistency?
- [ ] Content owner: should collection order be manually defined in `_data/post_collections.yml` or derived from the most recently updated post?
- [ ] Architecture threshold: move to dedicated collection routes only when the shelf/detail page becomes difficult to scan (working threshold: more than 8 collections or 20 posts in one collection).
- [ ] Deployment: set `_config.yml` `url` and `baseurl` for the final GitHub Pages repository.
- [ ] Comments: enable Discussions/Giscus only after real repository IDs are available.
