# MINWOO.LOG

GitHub Pages에서 무료로 호스팅되는 Jekyll 기반 개발 블로그입니다.

## 브랜치 전략

- `main`: 언제든 배포 가능한 안정 브랜치
- `feature/*`: 화면, 기능, 글 묶음 작업
- `fix/*`: 배포 후 발견한 오류 수정
- `content/*`: 여러 글을 함께 추가하는 편집 작업

작업 브랜치에서 확인한 뒤 Pull Request로 `main`에 병합합니다. `main`에 push되면 GitHub Actions가 Pages 배포를 수행합니다.

## 새 글 작성

1. `_posts/YYYY-MM-DD-slug.md` 파일을 복사해 만듭니다.
2. Front Matter의 `title`, `description`, `category`, `tags`, `image`, `image_alt`를 수정합니다.
3. 이미지는 `assets/images/posts/글-이름/` 아래에 넣습니다.

```yaml
---
title: "글 제목"
description: "검색 결과와 공유 미리보기에 보일 한 문장"
category: "Engineering"
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

## 로컬 실행

```bash
bundle install
bundle exec jekyll serve
```

`http://localhost:4000`에서 확인할 수 있습니다.

첫 방문에는 운영체제 테마를 따르고, 헤더의 테마 버튼으로 선택한 값을 저장합니다. 캡처나 디자인 확인 시에는 `?theme=light` 또는 `?theme=dark`를 URL에 붙여 테마를 고정할 수 있습니다.

## GitHub Pages 배포

저장소의 Settings → Pages → Build and deployment → Source를 **GitHub Actions**로 설정합니다. 이후 `main` 브랜치에 변경이 들어올 때마다 `.github/workflows/pages.yml`이 사이트를 빌드하고 배포합니다.
