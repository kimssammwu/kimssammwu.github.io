---
title: "[Python] 코드 실행 전후 관리 (1) - with 문과 컨텍스트 매니저 이해하기"
description: "Python의 with 문 자세히 알아보기"
tags: [Python]
collection_id: intermediate-python
image: /assets/images/posts/branch-workflow-cover.svg
image_alt: ""
read_time: 7
---

> 해당 게시글은 제가 공군 휴머니스트에 작성한 게시글을 기반하여 내용을 다듬어서 올리는 게시글입니다. 해당 사항 참고하시며 봐 주시면 감사드리겠습니다

<br>
<br>

## with 문
with 구문은 특정 객체를 context manager로 다루면서, with 하위 코드 블록의 시작과 종료 시점에 `__enter__`, `__exit__` 던더 메서드를 호출해 주는 문법입니다.

> 던더 메서드란 double underscore method의 줄임말로, 이름 앞뒤에 `__`가 붙은 특수 메서드를 말합니다.


```python
with EXPR as VAR:
    BLOCK
```
이라고 코드를 작성한다면, 다음과 비슷한 흐름으로 수행됩니다

```python
VAR = EXPR
VAR.__enter__()
try:
    BLOCK
finally:
    VAR.__exit__()
```

사실 해당 변환 예시는 [PEP 343 - Motivation](https://peps.python.org/pep-0343/#motivation-and-summary)에서 나오는 예제로, 더 정확한 변환은 [PEP 343 - with statement specification](https://peps.python.org/pep-0343/#specification-the-with-statement) 부분을 참고해 보시기 바랍니다

사실 이렇게 말하면 이해가 잘 가지 않을 테니, 천천히 풀어서 이야기를 진행해 봅시다.




<br>

### 서론; `with open(...) as fp:`


인터넷에서 파이썬 튜토리얼을 찾아보면 마지막 세션 즈음에 파일 입출력을 다루며 with 구문을 사용하는 것을 볼 수 있었을 것입니다. 하지만 여기서는 with 구문 자체가 아니라 파일 입출력이라는 파트에 초점이 맞춰지다 보니, 신경을 쓰지 않는다면 with를 파일 입출력과 관련된 전용 문법이라고 오해할 수 있을 것 같습니다.


우선 기본적으로 파이썬에서 사용하는 파일 입출력의 형태는 다음과 같습니다.

```python
fp = open("foo")
# fp에 대해 다룰 어떠한 처리
fp.readline()
fp.close()
```

open 함수를 통해 파일 객체를 만들고, 만들어진 파일 객체를 사용하여 원하는 작업을 수행한 뒤, 마지막에는 파일 객체를 close 합니다.


사실 `with open(...)`은 `fp.close()`를 내가 직접 작성하지 않아도 수행하게 해 주는 대표적인 사용 예시입니다. 해당 문법을 사용하는 방법은 다음과 같습니다.


```python
with open("foo") as fp:
	# fp에 대해 다룰 어떠한 처리
	fp.readline()
```
기존 예제와 비교해볼까요?


눈에 보이는 차이점은 `open` 함수를 `with` 구문 라인에서 같이 사용하였고, `fp.close()` 구문이 사라졌다는 것입니다.

새로 작성한 구문에서는 `close()`가 없지만, 실제로는 코드 블록이 끝날 때 자동으로 `fp.close()`를 한 것과 같은 효과를 만들어 줍니다. 어떻게 그럴 수 있을까요?

<br>

처음 말했던 것처럼 with 문은 `open("foo")`로부터 만들어진 객체의 `__enter__`와 `__exit__` 메서드를 실행시켜 주기 때문입니다.


조금 더 풀어보면, `with open("foo") as fp:`는 다음과 비슷한 흐름으로 동작합니다.

```python
manager = open("foo")
fp = manager.__enter__()

try:
	fp.readline()
finally:
	manager.__exit__()
```

파일 객체의 경우 `__enter__()`가 자기 자신(self)을 반환하기 때문에, 결과적으로 `fp = open("foo")`처럼 보이는 것입니다.

아래에서 좀 더 자세히 분석해 보겠습니다.

<br>

```bash
>>> fp = open("foo", "w")
>>> type(fp)
<class '_io.TextIOWrapper' ...>
>>> "__enter__" in dir(fp)
True
>>> "__exit__" in dir(fp)
True
>>> fp.close()
```
위 결과는 Python 3.12.3 버전의 REPL 환경에서 테스트한 결과입니다.


위 테스트에서 open은 io.TextIOWrapper 계열의 객체를 반환하고 있으며, 만들어진 객체의 메서드 중에는 계속해서 말하고 있는 `__enter__`와 `__exit__`도 있는 것을 볼 수 있죠.

> `dir` 함수는 해당 객체가 어떤 메서드를 가지고 있는지 확인할 수 있게 해 줍니다.

<br>
<br>

여기까지 오셨다면, 위 두 메서드의 정확한 구현까지는 알 수 없지만 최소한 `io.TextIOWrapper.__exit__`에서 `fp.close()`와 같은 정리 작업을 진행하고 있다는 것을 눈치챌 수 있습니다


`io.TextIOWrapper`가 이번 글의 핵심은 아니니, 더 자세히 궁금하시다면 CPython의 [_pyio.py](https://github.com/python/cpython/blob/main/Lib/_pyio.py) 구현을 참고해 보시면 좋을 것 같습니다


<br>

### 그래서 with는?

지금까지는 with open에 대해 알아보았는데요. 이번 글의 목적은 with open이 아니라 with 문 그 자체에 대해 알아보는 것입니다. 좀 더 세부적으로 with는 어떻게 사용할 수 있을까요?

with 문을 사용하기 위해서는 특별한 객체가 필요합니다. 바로 `__enter__`와 `__exit__` 메서드가 구현된 객체이죠.

<br>

조금 더 정확하게 말하자면, 객체가 `__enter__()`와 `__exit__()`를 구현해 context manager protocol을 만족한다면 우리는 with 구문에서 사용할 수 있습니다(해당 글에서는 context manager protocol을 직접적으로 다루진 않을 겁니다)

간단한 예제를 봐 볼까요?
```python
def add(value, other):
	return value + other

def multiply(value, other):
	return value * other

def subtract(value, other):
	return value - other

def divide(value, other):
	return value / other

if __name__ == "__main__":
	value = 5

	try:
		value = add(value, 5)
		value = multiply(value, 2)
		value = divide(value, 4)
		value = divide(value, 0) # ZeroDivisionError 발생

	except Exception as error:
		print("계산 중 오류 발생:", error)
		print("오류 발생 시점의 계산 결과:", value)
		raise
	else:
		print("계산 완료:", value)
```
이런 예제가 있다고 해봅시다.
(현재는 간단한 사칙연산이지만 해당 함수들이 매우 복잡한 연산이라고 생각해 주세요)

수행 시간이 오래 걸리고 분석에도 긴 시간이 걸릴 만한 함수에 예상치 못한 divide by 0 같은 에러가 발생했을 때를 고려하여 현재 상태를 확인하기 위해 try-except 문으로 오류 정보를 출력하고, raise 구문을 통해 예외는 다시 전파하도록 작성했습니다.

<br>

많이 복잡하지요? 하지만 with 문을 조금 응용해 본다면, 이렇게 바꿀 수 있습니다.

```python
class WithCalculator:
	def __init__(self, init_value=0):
		self.value = init_value

	def __enter__(self):
		print("계산 시작:", self.value)
		return self

	def __exit__(self, exc_type, exc_value, traceback):
		if exc_type is None:
			print("계산 완료:", self.value)
			return False

		print("계산 중 오류 발생:", exc_value)
		print("오류 발생 시점의 계산 결과:", self.value)
		return False

	def add(self, other):
		self.value += other

	def multiply(self, other):
		self.value *= other

	def subtract(self, other):
		self.value -= other

	def divide(self, other):
		self.value /= other

if __name__ == "__main__":
	with WithCalculator(5) as calc:
		calc.add(5)
		calc.multiply(2)
		calc.divide(4)
		calc.divide(0) # ZeroDivisionError 발생
```

코드 수가 더 늘어나긴 했지만, `if __name__ == "__main__":` 아래 작성된 실제 로직 부분을 비교해보면 꽤 간결해진 것을 확인할 수 있습니다.

여기서 `__exit__()`가 False를 반환하고 있는 것도 중요합니다. `__exit__()`가 False를 반환하면, with 블록 안에서 발생한 예외는 그대로 다시 발생합니다. 반대로 True를 반환하면 해당 예외를 처리한 것으로 보고 예외가 바깥으로 전파되지 않습니다.

<br>

조금 억지로 끼워 맞춘 느낌이 있긴 하지만, with 구문은 위에서 든 예시처럼도 사용할 수 있습니다.

좀 더 나아가서 며칠 걸리는 AI 모델 학습이 중간에 코드 한 줄 때문에 예외로 종료되는 경우에도 이런 with 구문 처리를 해 둔다면, 그중 best.pt 값을 계속 저장하다가 파이썬에서 정상적으로 처리할 수 있는 예외라면 `__exit__()`에서 마지막 체크포인트 혹은 에러 로그를 저장하도록 구성할 수도 있습니다.


<br>

## 마무리 1; 기본적인 사용법

실제로 사용되는 몇 가지 사용법을 같이 소개해보면서 마무리 짓겠습니다.

기본적으로 with의 가장 근본적인 사용법은 context manager로 사용하는 것입니다.

<br>

`__enter__`에서는 자원 할당, `__exit__`에서는 자원 반환 같은 작업을 넣어 파일 이외의 자원이나 객체에도 정리 작업이 항상 실행되도록 보장할 수 있습니다. threading.Lock처럼 thread에서 lock을 거는 코드에서도 활용할 수 있습니다.


또 주로 사용하는 방식으로는 코드의 동작 시간을 재는 타이머가 있습니다.

```python
import time

class CodeTimer:
	def __enter__(self):
		self.start_time = time.time_ns()

	def __exit__(self, *args):
		print((time.time_ns() - self.start_time) / 1_000_000_000, "sec")

with CodeTimer():
	time.sleep(1)

# 수행결과
# 1.000125069 sec
```


with 문에서 `with open(...) as fp`와 같이 as fp까지 사용하고 싶다면, `__enter__` 메서드에서 fp에 할당하고 싶은 값을 반환하면 됩니다.


파일 객체처럼 자기 자신을 변수에 할당해서 사용하고 싶다면 `return self`를 해주면 됩니다. 하지만 꼭 self를 반환해야 하는 것은 아니고, `__enter__()`에서 반환한 값이라면 무엇이든 as 뒤의 변수에 할당할 수 있습니다.


```python
class CodeTimer:
	def __enter__(self):
		self.start_time = time.time_ns()
		return self

	def __exit__(self, *args):
		print((time.time_ns() - self.start_time) / 1_000_000_000, "sec")


with CodeTimer() as timer:
	time.sleep(1)

```

<br>

앞에서 등장한 예시들에서는 `__exit__()`의 인자를 대부분 *args로 퉁쳤지만, 실제로는 다음 세 가지 예외 관련 인자를 받습니다.

```python
def __exit__(self, exc_type, exc_value, traceback):
	...
```
예외가 발생하지 않았다면 세 값은 모두 None입니다. 예외가 발생했다면 해당 예외의 타입, 값, traceback이 들어옵니다.


with에 대해 좀 더 공부해 보시면 다양한 방법으로 사용할 수 있으므로 이번 기회에 좀 더 익숙해지면 좋을 것 같습니다


<br>

## 마무리 2: decorator

끝내기 전 사실 decorator까지 한 게시글로 작성하고 싶지만, 호흡을 나눌 겸 다음 편에서 다루겠습니다.

사실 `contextmanager`라는 데코레이터를 쓰면 손쉽게 with 구문에 사용할 객체를 만들 수 있습니다. with를 소개하면서 이 부분을 빼 두면 섭섭하실까 봐 간단하게 소개하고 가겠습니다.

<br>

```python
import time
from contextlib import contextmanager

@contextmanager
def code_timer():
    start_time = time.time_ns()

    try:
        yield
    finally:
        print((time.time_ns() - start_time) / 1_000_000_000, "sec")


if __name__ == "__main__":
	with code_timer():
		time.sleep(1)
```
다음과 같이 마무리 1에서 확인해 본 CodeTimer를 구현할 수 있습니다.


위 함수에 붙은 `@contextmanager`가 데코레이터입니다.

<br>

데코레이터는 함수나 클래스를 다른 함수로 감싸거나 변형할 수 있게 해주는 문법입니다. 자주 쓰이는 방식 중 하나가 함수 실행 전후에 공통 동작을 추가하는 것입니다.


다만 with는 코드 블록 단위로 감싸는 것에 비해 데코레이터는 함수나 클래스 단위를 감싸는 방법이라는 차이가 있지요.

<br>
<br>

데코레이터에 대한 설명은 다음 글에서 계속하겠습니다.


감사합니다 :)