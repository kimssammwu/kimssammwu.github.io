---
title: "변경 내용보다 맥락을 남기는 커밋 메시지"
description: "몇 달 뒤에도 결정을 복원할 수 있도록 제약과 검증 결과를 커밋에 남깁니다."
category: "Workflow"
tags: [Git, Documentation, Workflow]
collection_id: blog-build
image: /assets/images/posts/branch-workflow-cover.svg
image_alt: "커밋의 연결 관계를 분기된 선으로 표현한 일러스트레이션"
read_time: 4
---

파일 목록은 Git이 이미 보여 줍니다. 커밋 메시지에는 왜 이 변경이 필요했고 무엇을 포기했는지가 더 유용합니다.

## 첫 줄에는 의도 적기

구현 이름보다 사용자가 얻게 되는 결과나 해결하려는 문제를 적습니다.

## 제약과 대안 남기기

선택에 영향을 준 외부 조건과 검토했지만 채택하지 않은 방법을 짧게 기록합니다.

## 검증 결과 구체적으로 적기

테스트했다는 말보다 실행한 빌드, 테스트 범위와 확인하지 못한 부분을 함께 남깁니다.
