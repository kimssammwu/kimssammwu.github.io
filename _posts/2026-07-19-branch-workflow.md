---
title: "혼자 개발해도 브랜치가 필요한 이유"
description: "작업의 목적을 분리하고 main을 안전하게 유지하는 가벼운 Git 브랜치 규칙입니다."
category: "Workflow"
tags: [Git, Branch, Pull Request]
image: /assets/images/posts/branch-workflow-cover.svg
image_alt: "서로 갈라졌다 다시 합쳐지는 세 개의 Git 브랜치"
read_time: 4
---

혼자 만드는 프로젝트에서도 브랜치는 작업의 경계를 보여줍니다. 기능, 콘텐츠, 긴급 수정을 이름으로 구분하면 며칠 뒤 돌아와도 무엇을 하던 중인지 빠르게 이해할 수 있습니다.

## 최소한의 규칙

브랜치 종류를 너무 많이 만들 필요는 없습니다. `feature`, `content`, `fix` 세 종류면 작은 블로그에 충분합니다.

## 합치기 전 확인할 것

링크와 이미지 경로를 확인하고, 로컬 빌드가 성공하는지 확인합니다. 커밋 메시지는 바뀐 파일 목록보다 왜 바꿨는지를 남기는 편이 미래의 나에게 더 유용합니다.

