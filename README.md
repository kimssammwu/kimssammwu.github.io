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
description: "목록과 검색 결과에 보일 한 문장"
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

## 로컬 실행

```bash
bundle install
bundle exec jekyll serve
```

`http://localhost:4000`에서 확인할 수 있습니다.

## GitHub Pages 배포

저장소의 Settings → Pages → Build and deployment → Source를 **GitHub Actions**로 설정합니다. 이후 `main` 브랜치에 변경이 들어올 때마다 `.github/workflows/pages.yml`이 사이트를 빌드하고 배포합니다.

