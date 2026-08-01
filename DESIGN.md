# Design

## Source of truth
- Status: Active
- Last refreshed: 2026-08-02
- Primary product surfaces: Medium-inspired landing `/`, blog home `/notes/`, article `/posts/:title/`, about `/about/`
- Evidence reviewed: live 1440×1100 capture of `https://medium.com/`; user rejected mixed technical-dashboard and generic blog directions

## Brand
- Personality: human, thoughtful, editorial, technically grounded
- Trust signals: restrained layout, clear authorship/date/read time, comfortable long-form typography
- Avoid: generic portfolio cards, technical briefing dashboards, competing sidebars, decorative motion, mixed visual metaphors

## Product goals
- Goals: clearly separate brand introduction from reading; make the landing memorable and the blog home efficient
- Non-goals: Medium feature clone, CMS, authentication, recommendation engine, comments
- Success signals: `/` reads as a focused publication landing; `/notes/` immediately supports browsing and filtering

## Personas and jobs
- Primary personas: the author and readers arriving from shared technical links
- User jobs: understand the publication, enter the archive, scan stories, read long-form content
- Key contexts of use: mobile link visits and desktop long-form reading

## Information architecture
- Primary navigation: 소개, 기록, GitHub, 읽기 시작
- Core routes/screens: `/`, `/notes/`, `/posts/:title/`, `/about/`
- Content hierarchy: landing statement → reading CTA; notes introduction → topics → story feed → contextual rail

## Design principles
- Separate promise from content: the landing explains why; the notes home shows what.
- One reading axis: text and imagery support one clear scan path.
- Typography carries hierarchy: use scale and whitespace before containers or decoration.
- Tradeoffs: an external font request improves Korean typographic consistency but depends on Google Fonts availability.

## Visual language
- Color: Medium-like warm paper, white reading surfaces, near-black type, green only for small active states
- Typography: Noto Serif KR for publication/display/reading; Noto Sans KR for navigation, metadata, controls
- Spacing/layout rhythm: broad 48–100px editorial sections with compact 8–20px text rhythm
- Shape/radius/elevation: pills only for primary actions and topics; no card shadows
- Motion: short scroll reveal, clipped thumbnail zoom, title/arrow hover; reduced-motion fallback
- Imagery/iconography: original green/black collage on landing; small post thumbnails in the feed

## Components
- Existing components to reuse: Jekyll header/footer, post front matter and cover assets
- New/changed components: landing hero, collage, landing utility links, notes header, topic filters, story rows, context rail
- Variants and states: active topic, empty filter, hover, revealed story, scrolled header
- Token/component ownership: CSS tokens and components in `assets/css/style.css`

## Accessibility
- Target standard: WCAG 2.2 AA oriented
- Keyboard/focus behavior: visible green focus rings; filters are native buttons
- Contrast/readability: black/cream and black/white primary contrast; limited muted copy
- Screen-reader semantics: landmark navigation, labeled filters, ordered headings, meaningful landing image alt
- Reduced motion and sensory considerations: nonessential animation disabled with `prefers-reduced-motion`

## Responsive behavior
- Supported breakpoints/devices: 360px mobile through wide desktop
- Layout adaptations: landing collage moves below copy; notes rail stacks after feed; story thumbnails become square
- Touch/hover differences: no information exists only on hover; topic row scrolls horizontally on narrow screens

## Interaction states
- Loading: static document, font-display behavior handled by browser
- Empty: filter-specific empty message
- Error: GitHub Pages default 404
- Success: active filter, hover underline/arrow, scrolled-header divider
- Disabled: none
- Offline/slow network: system serif/sans fallbacks preserve layout when Google Fonts is unavailable

## Content voice
- Tone: concise, reflective Korean with technical terms only where useful
- Terminology: publication is `MINWOO.LOG`; posts are `기록`
- Microcopy rules: short actions such as `기록 읽기`, `읽기 시작`, `더 알아보기`

## Implementation constraints
- Framework/styling system: GitHub Pages-compatible Jekyll, native CSS and JavaScript
- Design-token constraints: color, typography, and page widths remain in `:root`
- Performance constraints: one local SVG landing image; post images lazy-loaded; no frontend framework
- Compatibility constraints: evergreen browsers with graceful IntersectionObserver fallback
- Test/screenshot expectations: Jekyll build plus 1440×1100 and mobile screenshots; Visual Ralph score target >= 90 against live Medium hierarchy

## Open questions
- [ ] Replace placeholder GitHub URL with the owner's repository / owner / before deployment
- [ ] Confirm final publication name and author copy / owner / before public launch
