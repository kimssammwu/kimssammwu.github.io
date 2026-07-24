# Design

## Source of truth
- Status: Active
- Last refreshed: 2026-07-25
- Primary product surfaces: 홈, 글 상세, 소개
- Evidence reviewed: 참고 저장소의 `_config.yml`, `index.html`, `_layouts/post.html`; 로컬 저장소에는 기존 UI와 자산이 없었음

## Brand
- Personality: 차분하고 호기심 많은 개발자의 편집 노트
- Trust signals: 작성일, 읽기 시간, 분류, 명확한 글 구조, 실제 코드와 이미지
- Avoid: 과한 그라디언트, 대시보드 같은 밀도, 장식적인 애니메이션

## Product goals
- Goals: 최근 글을 빠르게 찾고, 긴 글을 편안히 읽으며, Markdown과 이미지로 쉽게 새 글을 발행
- Non-goals: CMS, 회원 기능, 댓글 서버, 실시간 검색
- Success signals: 모바일에서도 자연스러운 읽기 흐름, Pages에서 추가 빌드 서비스 없이 배포

## Personas and jobs
- Primary personas: 기술을 기록하는 운영자, 검색이나 링크로 들어온 동료 개발자
- User jobs: 글 훑기, 주제 확인, 본문 읽기, 작성자 정보 확인
- Key contexts of use: 모바일 이동 중 탐색, 데스크톱에서 긴 기술 글 읽기

## Information architecture
- Primary navigation: Home, Notes, About, GitHub
- Core routes/screens: `/`, `/posts/:title/`, `/about/`
- Content hierarchy: 소개 → 대표 글 → 최신 글 → 주제 → 작성자

## Design principles
- Editorial first: 콘텐츠가 장식보다 먼저 보인다.
- Calm contrast: 따뜻한 바탕과 진한 잉크색으로 오래 읽어도 편안하게 한다.
- Images have purpose: 모든 대표 이미지는 글의 주제를 설명하고 대체 텍스트를 가진다.
- Tradeoffs: 복잡한 필터와 검색보다 빠른 정적 페이지와 단순한 탐색을 우선한다.

## Visual language
- Color: warm paper, navy ink, coral accent, sage support
- Typography: 시스템 sans와 Georgia 계열 serif 조합
- Spacing/layout rhythm: 8px 기반, 넉넉한 24–72px 구간
- Shape/radius/elevation: 18–28px 둥근 모서리, 그림자는 제한적으로 사용
- Motion: 짧은 hover/entrance, reduced-motion에서 제거
- Imagery/iconography: 저장소 내부 SVG/JPG/PNG/WebP, 16:10 대표 이미지

## Components
- Existing components to reuse: 없음
- New/changed components: site header, hero, featured card, post card, topic chip, post layout, footer
- Variants and states: 카드 hover, 현재 탐색 링크, 이미지 누락 시 색상 배경
- Token/component ownership: `assets/css/style.css`의 `:root`

## Accessibility
- Target standard: WCAG 2.2 AA 지향
- Keyboard/focus behavior: 모든 링크과 버튼에 명확한 focus-visible
- Contrast/readability: 본문 대비와 1.75 이상의 줄높이
- Screen-reader semantics: landmark, heading 순서, 이미지 alt, skip link
- Reduced motion and sensory considerations: `prefers-reduced-motion` 지원

## Responsive behavior
- Supported breakpoints/devices: 360px 이상 모바일, 태블릿, 데스크톱
- Layout adaptations: 900px 아래 카드 단일 열, 680px 아래 축약 헤더
- Touch/hover differences: 터치에서도 핵심 정보가 항상 노출

## Interaction states
- Loading: 정적 페이지이므로 별도 상태 없음
- Empty: 글이 없을 때 작성 안내 표시
- Error: GitHub Pages 기본 404
- Success: 외부 링크와 글 탐색에 명확한 hover/focus 피드백
- Disabled: 해당 없음
- Offline/slow network: 핵심 CSS/이미지를 로컬 제공

## Content voice
- Tone: 간결하고 솔직한 한국어, 필요한 영문 기술 용어는 그대로 사용
- Terminology: 글은 “기록”, 카테고리는 “주제”
- Microcopy rules: 행동을 짧은 동사로 표현하고 과장하지 않음

## Implementation constraints
- Framework/styling system: GitHub Pages 호환 Jekyll, 의존성 없는 CSS/JavaScript
- Design-token constraints: 모든 주요 색상·간격·폭은 CSS custom properties로 관리
- Performance constraints: 로컬 자산, lazy loading, JavaScript 없이도 핵심 탐색 가능
- Compatibility constraints: 최신 evergreen 브라우저, GitHub Pages 기본 빌드
- Test/screenshot expectations: Jekyll build 또는 구조 검사, 링크/자산 경로 확인

## Open questions
- [ ] 실제 블로그 이름·작성자 소개·GitHub 주소로 교체 / owner / 배포 전
- [ ] 커스텀 도메인 사용 여부 / owner / 선택 사항

