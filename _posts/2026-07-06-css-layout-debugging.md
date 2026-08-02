---
title: "레이아웃이 한 픽셀씩 밀릴 때 확인하는 순서"
description: "가로 넘침과 정렬 오류를 빠르게 좁혀 가는 CSS 디버깅 순서입니다."
category: "Workflow"
tags: [CSS, Debugging, Layout]
collection_id: frontend-systems
image: /assets/images/posts/branch-workflow-cover.svg
image_alt: "분기된 선으로 레이아웃 디버깅 과정을 표현한 일러스트레이션"
read_time: 5
---

가로 스크롤은 대부분 자식 하나가 부모보다 조금 더 넓어서 생깁니다. 전체 요소에 `overflow: hidden`을 먼저 넣으면 원인을 찾기 어려워집니다.

## 넘치는 요소부터 찾기

개발자 도구에서 요소의 `scrollWidth`와 `clientWidth`를 비교합니다. 고정 너비, 긴 문자열, 음수 여백을 우선 확인합니다.

## Grid 자식의 최소 너비

Grid와 Flex 자식은 내용의 최소 너비 때문에 줄어들지 않을 수 있습니다. 필요한 위치에 `min-width: 0`을 명시합니다.

## 스크롤이 필요한 영역 구분하기

코드블록처럼 내부 스크롤이 필요한 요소와 페이지 전체가 밀리는 오류를 분리해서 처리합니다.
