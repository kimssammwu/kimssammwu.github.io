---
title: 블로그 스타일 시트 테스트 페이지
description: 블로그 스타일 시트 테스트 페이지
date: "2024-09-10"
slug: gatsby-blog-test-style-sheet
private: true
---

# Heading

# Heading level 1

## Heading level 2

### Heading level 3

#### Heading level 4

##### Heading level 5

###### Heading level 6

Heading level 1
===============

Heading level 2
---------------



# Bold

I just love **bold text**.

I just love __bold text__.

Love**is**bold



# Italic

Italicized text is the *cat's meow*.

Italicized text is the _cat's meow_.

A*cat*meow



# Complex syntax

This text is ***really important***.

This text is ___really important___.



# Blockquote

> Dorothy followed her through many of the beautiful rooms in her castle.

> Dorothy followed her through many of the beautiful rooms in her castle.
>
> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.


> Dorothy followed her through many of the beautiful rooms in her castle.
>
>> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.

> #### The quarterly results look great!
>
> - Revenue was off the chart.
> - Profits were higher than ever.
>
>  *Everything* is going according to **plan**.


# List

1. First item
2. Second item
3. Third item
4. Fourth item

---

1. First item
2. Second item
3. Third item
    1. Indented item
    2. Indented item
4. Fourth item


---

- First item
- Second item
- Third item
- Fourth item

---

* First item
* Second item
+ Third item
+ Fourth item

---

- First item
- Second item
- Third item
    - Indented item
    - Indented item
- Fourth item

---

* This is the first list item.
* Here's the second list item.

    > A blockquote would look great below the second list item.

* And here's the third list item.


# Fenced Code Block

```python
def helloworld():
    print("hello, world")
```

```c
#include test
```


# Image
![Tux, the Linux mascot](https://mdg.imgix.net/assets/images/tux.png?auto=format&fit=clip&q=40&w=100)


# Code

At the command prompt, type `nano`.


# Escaping Backticks

``Use `code` in your Markdown file.``


# Horizontal Rule

1. `***`
***  
2. `---`
---  
3. `_________________`
_________________  


### 링크

- My favorite search engine is [Duck Duck Go](https://duckduckgo.com).

- (호버메시지 추가) My favorite search engine is [Duck Duck Go](https://duckduckgo.com "The best search engine for privacy").


### URL과 이메일 주소

<https://kimssammwu.github.io>  
<devminwoolee@gmail.com>


### 링크 포멧팅

I love supporting the **[EFF](https://eff.org)**.  
This is the *[Markdown Guide](https://www.markdownguide.org)*.  
See the section on [`code`](#code).  


### Formatting the Second Part of the Link
`미지원`  

[1]: https://en.wikipedia.org/wiki/Hobbit#Lifestyle
[1]: https://en.wikipedia.org/wiki/Hobbit#Lifestyle "Hobbit lifestyles"
[1]: https://en.wikipedia.org/wiki/Hobbit#Lifestyle 'Hobbit lifestyles'
[1]: https://en.wikipedia.org/wiki/Hobbit#Lifestyle (Hobbit lifestyles)
[1]: <https://en.wikipedia.org/wiki/Hobbit#Lifestyle> "Hobbit lifestyles"
[1]: <https://en.wikipedia.org/wiki/Hobbit#Lifestyle> 'Hobbit lifestyles'
[1]: <https://en.wikipedia.org/wiki/Hobbit#Lifestyle> (Hobbit lifestyles)



### 커스텀


>[!NOTE]  
> 사용자가 대충 훑어볼 때도 고려해야 할 정보를 강조합니다.

> [!TIP]
> 사용자가 더 성공할 수 있도록 돕는 추가 정보입니다.

> [!IMPORTANT]  
> 사용자가 성공하기 위해 꼭 필요한 정보입니다.

> [!WARNING]  
> 즉각적인 주의가 필요한 중요한 내용입니다.

> [!CAUTION]
> 행동의 부정적인 결과를 알립니다.



### LaTex

$ (a_1)^2 + 2 $는 Latex 문법으로 작성합니다 `$(a_1)^2$`라고 작성하면 되는 매우 간단한 문법이죠. 레이텍을 지원하게 하는 건 매우 쉬웠습니다.

$$
123
$$

# Table

| Syntax | Description |
| ----------- | ----------- |
| Header | Title |
| Paragraph | Text |  
  


# Footnote

Here's a sentence with a footnote. [^1]

[^1]: This is the footnote.



# Heading ID

### My Great Heading {#custom-id}



# Definition List

`미지원`  
term
: definition



# Strikethrough

~~The world is flat.~~



# Task List

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media



# Emoji
`미지원`
> (see also Copying and Pasting Emoji)
That is so funny! :joy:



# Highlight
`미지원`
I need to highlight these ==very important words==.



# --Subscript--
`미지원, LaTex로 대체 가능`
H~2~O



# --Superscript--
`미지원, LaTex로 대체 가능`
X^2^