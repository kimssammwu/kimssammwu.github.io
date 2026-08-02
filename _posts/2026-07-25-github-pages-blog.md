---
title: "GitHub Pages로 나만의 기술 블로그 시작하기"
description: "저장소 하나로 글쓰기부터 무료 배포까지 이어지는 가장 단순한 블로그 흐름을 정리합니다."
category: "Engineering"
tags: [GitHub Pages, Jekyll, Git]
collection_id: blog-build
popular: true
image: /assets/images/posts/github-pages-cover.svg
image_alt: "브라우저 창과 Git 브랜치를 추상화한 일러스트레이션"
read_time: 6
actions:
  - label: GitHub Pages 공식 문서
    url: https://docs.github.com/pages
    type: docs
---

블로그를 시작할 때 가장 먼저 필요한 것은 화려한 도구가 아니라 **계속 쓸 수 있는 작은 흐름**입니다. 이 블로그는 Markdown 파일을 쓰고 Git에 올리면 GitHub Pages가 공개 사이트로 만들어 주는 구조를 사용합니다.

## 왜 정적 블로그인가

정적 사이트는 서버와 데이터베이스를 운영하지 않습니다. 미리 만들어진 HTML, CSS, 이미지만 전달하므로 빠르고 관리할 부분이 적습니다.

- Markdown 파일 자체가 글의 원본이 됩니다.
- 변경 이력이 Git에 그대로 남습니다.
- GitHub Pages의 공개 저장소 호스팅을 사용할 수 있습니다.
- 백업과 이전이 쉽습니다.

## 이미지 넣는 방법

글과 관련된 이미지는 `assets/images/posts/` 아래에 보관합니다. 파일 이름은 영문 소문자와 하이픈을 사용하면 URL 문제를 줄일 수 있습니다.

```markdown
![배포 흐름 설명]({{ '/assets/images/posts/deploy-flow.png' | relative_url }})
```

대체 텍스트는 장식이 아니라 이미지를 보지 못하는 독자에게 같은 정보를 전달하는 문장으로 작성합니다.

## 브랜치로 안전하게 작업하기

`main`은 항상 배포 가능한 상태로 두고, 새 기능은 `feature/*`, 글 묶음은 `content/*`, 오류 수정은 `fix/*`에서 작업합니다.

```bash
git switch -c content/new-jekyll-post
git add _posts assets/images
git commit -m "새 글의 배경과 결론을 기록"
git push -u origin content/new-jekyll-post
```

Pull Request에서 미리보거나 변경 내용을 검토한 뒤 `main`에 합치면 배포가 시작됩니다.

[GitHub Pages 배포 문서 바로가기](https://docs.github.com/pages/getting-started-with-github-pages/creating-a-github-pages-site){: .quick-link data-kind="docs" target="_blank" rel="noreferrer"}

## 작은 시스템으로 오래 쓰기

좋은 블로그 도구는 글을 대신 써주는 도구가 아니라, 쓰려는 순간 방해하지 않는 도구입니다. 이 구조는 파일 하나와 이미지 몇 장만 추가하면 다음 기록을 공개할 수 있도록 설계했습니다.
