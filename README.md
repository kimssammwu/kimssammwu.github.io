# sefaul

GitHub Pages에서 무료로 호스팅되는 Jekyll 기반 개발 블로그입니다.

## 브랜치 전략

- `main`: 언제든 배포 가능한 안정 브랜치
- `feature/*`: 화면, 기능, 글 묶음 작업
- `fix/*`: 배포 후 발견한 오류 수정
- `content/*`: 여러 글을 함께 추가하는 편집 작업

작업 브랜치에서 확인한 뒤 Pull Request로 `main`에 병합합니다. `main`에 push되면 GitHub Actions가 Pages 배포를 수행합니다.

## 새 글 작성

1. `_posts/YYYY-MM-DD-slug.md` 파일을 복사해 만듭니다.
2. Front Matter의 `title`, `description`, `tags`, `image`, `image_alt`를 수정합니다.
3. 이미지는 `assets/images/posts/글-이름/` 아래에 넣습니다.

```yaml
---
title: "글 제목"
description: "검색 결과와 공유 미리보기에 보일 한 문장"
tags: [Git, GitHub Pages]
image: /assets/images/posts/my-post/cover.jpg
image_alt: "이미지를 설명하는 대체 텍스트"
---
```

본문 이미지는 다음처럼 넣습니다.

```markdown
![이미지 설명]({{ '/assets/images/posts/my-post/example.png' | relative_url }})
```

### 코드블록

Markdown fenced code에 언어를 지정하면 Rouge 문법 강조와 언어 라벨, 복사 버튼이 자동으로 적용됩니다.

````markdown
```python
def hello():
    print("Hello")
```
````

### 수식

게시글에서는 MathJax가 자동으로 로드됩니다. 한 줄 안의 수식은 `$...$`, 별도 블록 수식은 `$$...$$`로 작성합니다.

```markdown
질량과 에너지의 관계는 $E = mc^2$로 나타냅니다.

$$
\mathcal{L}(\theta) = \sum_{i=1}^{n} \lVert f_\theta(x_i) - y_i \rVert_2^2
$$
```

코드블록과 인라인 코드 안의 `$`는 수식으로 변환하지 않습니다. 본문에서 달러 기호 자체를 쓸 때는 `\$`처럼 이스케이프합니다. 게시글이 아닌 일반 페이지에서 수식이 필요하면 Front Matter에 `math: true`를 추가합니다.

### 목차

본문에 `##` 또는 `###` 제목이 두 개 이상 있으면 포스트 목차가 자동으로 생성됩니다. 데스크톱에서는 본문 왼쪽에 고정되고, 모바일에서는 접을 수 있는 `Contents` 블록으로 표시됩니다.

```markdown
## 첫 번째 주제

### 세부 내용

## 두 번째 주제
```

제목에는 Kramdown이 만든 앵커가 사용되므로 별도의 목차 Front Matter는 필요하지 않습니다.

### 검색

헤더의 검색 아이콘이나 `/`, `Ctrl+K`, `⌘K`로 검색 패널을 열 수 있습니다. 제목, 설명, 태그, 본문을 검색하며 `Esc`로 닫습니다. 검색 데이터는 Jekyll 빌드 중 `search.json`으로 자동 생성됩니다.

### 관련 자료 바로가기

글 상단에 논문·코드·데모 같은 버튼을 표시하려면 Front Matter에 `actions`를 추가합니다.

```yaml
actions:
  - label: 논문 원문
    url: https://arxiv.org/abs/0000.00000
    type: paper
  - label: 공식 코드
    url: https://github.com/example/repository
    type: code
```

지원 유형은 `paper`, `code`, `demo`, `slides`, `data`, `docs`입니다. `new_tab: false`를 추가하면 현재 탭에서 엽니다.

본문 중간에 특수 바로가기를 넣을 수도 있습니다.

```markdown
[논문 원문](https://arxiv.org/abs/0000.00000){: .quick-link data-kind="paper" target="_blank" rel="noreferrer"}
```

논문 리뷰 시작 템플릿은 `_templates/paper-review.md`에 있습니다.

## 태그

Front Matter의 `tags` 배열은 게시글 상단과 `/tags/` 인덱스에 자동으로 연결됩니다.

```yaml
tags: [GitHub Pages, Jekyll, Git]
```

태그 이름을 바꾸면 URL 앵커도 달라지므로 같은 의미의 태그 표기를 일관되게 유지합니다.

## 리뷰

`/notes/`의 메인 탭은 블로그 게시글, 논문, 도서를 서로 다른 썸네일 레이아웃으로 보여 줍니다. 논문 리뷰는 `16:10` 도판형, 도서 리뷰는 `2:3` 표지형 이미지를 권장합니다. 전체 탭에서는 유형 레이블로 세 종류를 구분합니다.

새 글은 `_templates/paper-review.md` 또는 `_templates/book-review.md`를 복사해 작성합니다. `review_type` 값에 따라 Notes 메인의 해당 영역에 자동으로 배치됩니다.

```yaml
review_type: paper # 또는 book
image: /assets/images/posts/review-name/cover.jpg
image_alt: "썸네일 설명"
```

도서 리뷰가 없을 때도 `Books` 채널 제목과 `0` 카운트는 유지되며, 더미 카드나 미리보기 문구는 표시하지 않습니다.

## 컬렉션

여러 글을 같은 맥락으로 묶을 때 `_data/post_collections.yml`에 컬렉션을 등록합니다.

```yaml
- id: blog-build
  title: Blog Build
```

포함할 게시글의 Front Matter에는 같은 `collection_id`를 지정합니다.

```yaml
collection_id: blog-build
```

컬렉션은 `/collections/`에 자동으로 나타나며, 글 상단과 Notes 목록에서도 연결됩니다. 한 게시글은 하나의 컬렉션에만 속하고, 컬렉션 내부에서는 최신 글부터 표시됩니다.

## 댓글

댓글은 GitHub Discussions 기반의 [Giscus](https://giscus.app/ko)를 사용하도록 준비되어 있습니다.

1. 댓글을 저장할 공개 GitHub 저장소에서 Discussions를 활성화합니다.
2. 해당 저장소에 Giscus GitHub App을 설치합니다.
3. Giscus 설정 페이지에서 저장소와 `Announcements` 카테고리를 선택합니다.
4. 생성된 `repo-id`와 `category-id`를 `_config.yml`의 `comments` 항목에 입력합니다.
5. `comments.enabled`를 `true`로 바꿉니다.

경로 기반으로 게시글과 Discussion을 연결하며, 사이트 테마가 바뀌면 댓글 프레임도 라이트·다크 테마로 동기화됩니다.

## 로컬 실행

```bash
bundle install
bundle exec jekyll serve
```

`http://localhost:4000`에서 확인할 수 있습니다.

첫 방문에는 운영체제 테마를 따르고, 헤더의 테마 버튼으로 선택한 값을 저장합니다. 캡처나 디자인 확인 시에는 `?theme=light` 또는 `?theme=dark`를 URL에 붙여 테마를 고정할 수 있습니다.

## GitHub Pages 배포

저장소의 Settings → Pages → Build and deployment → Source를 **GitHub Actions**로 설정합니다. 이후 `main` 브랜치에 변경이 들어올 때마다 `.github/workflows/pages.yml`이 사이트를 빌드하고 배포합니다.

## SEO

GitHub Pages에서 지원하는 `jekyll-seo-tag`, `jekyll-sitemap`, `jekyll-feed`를 사용합니다. 빌드하면 canonical URL, Open Graph/Twitter 메타데이터, JSON-LD, `/sitemap.xml`, `/feed.xml`, `/robots.txt`가 자동으로 생성됩니다.

대표 주소는 `https://kimssammwu.github.io`이며 `_config.yml`의 `url`에 설정합니다. 게시글의 `title`, `description`, `image`, `image_alt`는 검색 결과와 링크 공유 미리보기에 사용되므로 새 글을 작성할 때 반드시 입력합니다.
