# 펼침 연산자

ES6이후 사용되다가 ES8에 정식적으로 포함된 기능입니다. ...을 통해 객체를 복사할 수 있습니다.

## 기존 객체에 추가

```js
const book = {
  title: '코딩의 기술',
  author: 'Joe Morgan',
};
const update = { ...book, year: 2019 };
// {title: "코딩의 기술", author: "Joe Morgan", year: 2019}
```

## 기존 객체를 갱신

```js
const book = {
  title: '코딩의 기술',
  author: 'Joe Morgan',
};
const update = { ...book, title: '자바스크립트 코딩의 기술' };
// {title: "자바스크립트 코딩의 기술", author: "Joe Morgan"}
```

## 객체를 객체로 갱신

```js
const book = {
  title: '코딩의 기술',
  author: 'Joe Morgan',
};
const bookDetail = {
  year: 2019,
  price: 24000,
};
const update = { ...book, ...bookDetail };
// {title: "코딩의 기술", author: "Joe Morgan", year: 2019, price: 24000}
```
