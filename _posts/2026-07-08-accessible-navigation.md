---
title: "키보드로도 자연스러운 내비게이션 만들기"
description: "포커스 순서와 현재 위치 표현을 중심으로 블로그 내비게이션을 점검합니다."
tags: [Accessibility, HTML, Navigation]
collection_id: frontend-systems
image: /assets/images/posts/branch-workflow-cover.svg
image_alt: "접근 가능한 이동 흐름을 표현한 선형 일러스트레이션"
read_time: 6
---

마우스로 편한 메뉴가 키보드에서도 편한 것은 아닙니다. 링크의 순서와 포커스 표시가 화면 구조를 그대로 설명해야 합니다.

## 포커스가 사라지지 않게 하기

기본 윤곽선을 없앴다면 그보다 분명한 대체 스타일을 제공해야 합니다. 배경색이 달라져도 대비가 유지되는지도 확인합니다.

## 현재 페이지를 코드로 알리기

현재 메뉴에는 `aria-current="page"`를 사용합니다. 시각적인 밑줄과 보조 기술이 같은 상태를 공유하게 됩니다.

## 작은 화면에서의 이동 순서

항목을 숨기거나 재배치할 때 DOM 순서와 보이는 순서가 지나치게 달라지지 않도록 유지합니다.
