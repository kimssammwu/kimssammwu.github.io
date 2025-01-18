---
title: 클립보드를 활용한 업무 자동화와 효율성 개선
description: 클립보드를 통한 자동화와 관련한 문제 해결 과정을 다룹니다.
date: "2025-01-13"
slug: clipboard-automation-efficiency
private: false
---

## 서론

&nbsp;&nbsp;&nbsp;이번 글은 야간 근무 중 발생한 비효율적인 업무 과정을 개선하기 위해 자동화를 시도했던 경험을 공유하기 위해 작성하였습니다. 기존에는 파이썬을 활용하여 데이터를 전처리한 후 CSV 파일로 저장하고, 몇가지 작업을 진행한 후 이를 한셀과 한글에 각각 붙여넣는 방식으로 작업을 진행했습니다. 하지만 이 작업은 매일 새벽 4시에 반복되었으며, 극심한 피로 속에서 비효율적인 단계들이 더욱 두드러졌습니다. 이를 해결하기 위해 클립보드를 활용한 자동화 방안을 탐구하고 적용해보았습니다.

## 문제 상황

&nbsp;&nbsp;&nbsp;한셀에서는 콤마(,)나 탭(Tab), 줄바꿈 기호(\n)가 포함된 데이터를 클립보드에 복사하면 이를 자동으로 표에 맞추어 붙여넣는 기능을 제공합니다. 이를 활용하기 위해 기존의 CSV 저장 과정을 생략하고, 데이터를 클립보드에 직접 복사하는 방식으로 코드를 수정했습니다. 수정된 코드는 아래와 같습니다

```python @title='간단한 클립보드 예제' @icon='python'
import win32clipboard

target_string = """전처리된 문자열(Tab과 \n으로 구별)"""
win32clipboard.OpenClipboard()
win32clipboard.EmptyClipboard()
win32clipboard.SetClipboardText( target_string,
                                 win32clipboard.CF_TEXT )
win32clipboard.CloseClipboard()
```

&nbsp;&nbsp;&nbsp;이 코드로 클립보드에 저장한 데이터는 한셀에서는 정상적으로 표 형식으로 처리되었으나, 한글에서는 동일한 데이터가 단순 문자열로 인식되었습니다. 이로 인해 한글 문서에서는 데이터가 표로 붙여넣어지지 않는 문제가 발생했습니다.

## 트러블 슈팅

1. 서식 - RTF

&nbsp;&nbsp;&nbsp;첫 번째 시도는 데이터를 서식화하여 처리하는 방법이었습니다. 복사된 데이터가 서식을 가지고 있다는 점에 착안해 서식있는 포맷을 조사하였고, RTF라는 서식을 알게되었습니다. RTF는 마이크로소프트(이하 MS)에서 개발한 문서 형식으로 한글에서도 이를 지원합니다. 따라서 클립보드에 데이터를 RTF 형식으로 저장하면 문제가 해결될 것으로 기대했습니다. 하지만 적합한 RTF 처리 라이브러리를 구하기 어려웠고, 인트라넷 환경 제약으로 인해 이 방식은 적용하지 못했습니다.

2. 객체 - OLE

&nbsp;&nbsp;&nbsp;두 번째 시도는 OLE 프로토콜을 활용하는 것이었습니다. OLE는 프로그램 간 데이터 공유를 가능하게 하는 기술로, 이를 통해 한글에서도 데이터를 표 형태로 붙여넣을 수 있을 것으로 예상했습니다. 하지만 OLE 역시 구현을 위한 라이브러리 제약으로 인해 적용이 불가능했습니다.

3. 한글 디벨로퍼

&nbsp;&nbsp;&nbsp;세 번째로, [한글 디벨로퍼](https://developer.hancom.com/) 사이트를 통해 제공되는 win32com 라이브러리 활용 예제를 사용하여 한글 문서를 제어하려 했습니다. 이 방법은 문서 작업 자동화에 적합했지만, 현재 환경에서는 이 라이브러리를 사용할 수 없었습니다.

#

위 3가지 방법 모두 환경적인 제약이 없다면 좋은 해결방법이 될 수 있을 것이라 생각합니다.

## 원인

&nbsp;&nbsp;&nbsp;Apriorit 블로그와 Microsoft, Wikipedia 문서를 통해 클립보드가 단순한 문자열 형태로만 데이터를 다루는 것이 아니라 데이터 타입과 데이터가 한 쌍으로 저장되어 처리된다는 점을 이해하게 되었습니다. 이는 한셀에서 표 형태로 데이터를 인식할 수 있었던 이유를 설명해 주었습니다. 한셀은 데이터를 문자열보다 셀로 처리하는 방식이기 때문에, 문자열 형식에서도 표 형태로 자동으로 변환하던 것입니다. 반면, 한글은 문서 작성 프로그램이기 때문에 문자열을 다른 데이터로 변환하는 것보다 문자열로 처리하는 방식이 맞기 때문에 데이터가 표로 인식되지 않은 것입니다.

## 문제 해결

&nbsp;&nbsp;&nbsp;문제의 원인은 분석할 수 있었지만 중요한 점은 어떻게 문제를 해결할 수 있을까 입니다. 한글 프로그램에서 **ctrl** + **alt** + **v**를 통해 붙여넣기를 시도하게 되면 "골라 붙이기" 라는 팝업이 뜨게 됩니다. 골라 붙이기는 클립보드에 붙여있는 타입을 선택하여 붙여넣을 수 있는 기능입니다. 한셀에서 데이터를 복사하고 시도해보면 어려가지 타입을 지원하는데 여기에 **인터넷 문서 소스**가 있습니다.

#

&nbsp;&nbsp;&nbsp;HTML이 군대 안에서 가장 쉽게 접근할 수 있는 수단이기 때문에 인터넷 문서 소스를 한 것 이지 다른 조작 가능한 포맷이 있다면 원하는 방법으로도 가능합니다. MS 공식 홈페이지에 HTML 포맷에 대한 문서가 잘 정리되어 있어 따로 해당 게시글에 자세한 내용을 적진 않고 아래(참조)에 링크를 걸어두겠습니다. 코드 상에서 주요 수정 포인트는 아래에 적어두겠습니다.

```python @title='적용 후' @icon='python'
target_string = """전처리된 문자열"""

# 기존 문자열 데이터를 HTML 테이블로 만들기
html_main = convert_html_table(target_string)
# 클립보드 데이터에 맞추어 HEADER 붙이기
html_header = generate_html_headers(html_main)
html_data = html_header + html_main

win32clipboard.OpenClipboard()
win32clipboard.EmptyClipboard()
# 1. 기존 SetClipboardText() 에서 SetClipboardData() 함수로 변경
# 2. 데이터 포맷을 TEXT 형식에서 HTML 형식으로 변경
win32clipboard.SetClipboardData(html_data, win32clipboard.CF_HTML) # [!code ++]
win32clipboard.CloseClipboard()
```

## 결론

1. 처음 클립보드에 대한 다른 글들을 읽었을 때에는 다들 SetClipboardText 함수로 단순하게 문자열을 복사하는 예제만 사용하였던 것에 비해, 클립보드 안에 단순히 문자열 데이터 뿐만 아니라 문서 혹은 프로그램 간 데이터 전송을 위한 다양한 타입이 존재하고 목적에 맞게 타입을 설정해야한다는 점을 알게 되었습니다.

#

2. 원초 목표인 야간 근무 내 기존 자동화 프로세스에서 데이터 전처리 부분을 건들였고 문제였던 한글 내 표 데이터 붙여넣기를 HTML Table 태그와 인라인 style을 넣어 해결하였습니다. 결과적으로 기존에 5분 이상 걸리던 작업을 클릭 -> 붙여넣기 2번으로 `단 5초` 만에 끝낼 수 있었습니다. (수치적으로 약 60 배의 능률 확보 😎)

## Reference.

- [apriorit 블로그 - https://www.apriorit.com/dev-blog/166-clipboard-protection5](https://www.apriorit.com/dev-blog/166-clipboard-protection5)
- [microsoft 문서 - https://learn.microsoft.com/ko-kr/windows/win32/dataxchg/html-clipboard-format](https://learn.microsoft.com/ko-kr/windows/win32/dataxchg/html-clipboard-format)
