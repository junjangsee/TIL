# Sass

리액트 컴포넌트를 스타일링 할 때 사용합니다. .sass 혹은 .scss 확장자를 사용하며 주로 .scss 확장자를 많이 사용합니다.<br/>
[Sass 공식문서](https://sass-lang.com/guide)

## Sass 설치하기

```bash
yarn add node-sass
```

위의 명령어를 실행하여 설치해줍니다.

## Sass 사용하기

### 변수 선언

```scss
$blue: #228be6;
```

### 주석

```scss
// 주석
```

### 클래스

```scss
.Button {
  display: inline-flex;
  color: white;
  font-weight: bold;
  outline: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  height: 2.25rem;
  padding-left: 1rem;
  padding-right: 1rem;

  background: $blue;
```

### hover, active

```scss
.Button {
  &:hover {
    background: lighten(
      $color: (
        $blue,
      ),
      $amount: 10%
    );
  }

  &:active {
    background: darken($color: $blue, $amount: 10%);
  }
}
```
