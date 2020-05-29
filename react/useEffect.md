# useEffect

컴포넌트가 최초, 업데이트, 사라질 때 특정 작업을 할 수 있도록 해줍니다.

## useEffect 선언하기

```js
import React, { useEffect } from "react";
```

## useEffect 사용하기

```js
useEffect(function, dependencies);
```

function에는 실행할 함수를, dependencies에는 의존할 값을 나타냅니다.

### 컴포넌트가 최초 화면에 렌더링 될 때만 실행

```js
useEffect(() => {
  console.log("컴포넌트가 화면에 나타남"); // mount
}, []);
```

빈 배열을 넣게 되면 의존하는 값이 없어 `최초 화면에 렌더링` 될 때만 실행됩니다. 이를 `mount` 된다라고 표현합니다.<br/>
보통 mount에 사용되는 기능에는 아래와 같습니다.

- props를 state로 바꿀 때
- REST API를 요청할 때
- 라이브러리 사용
- setInterval, setTimeout 등

### 컴포넌트가 사라질 때 실행

```js
useEffect(() => {
  console.log("컴포넌트가 화면에 나타남"); // mount
  return () => {
    console.log("컴포넌트가 화면에서 사라짐"); // unmount
  };
}, []);
```

콜백에 `리턴`을 해주면 사라질 때 실행됩니다.<br/>
보통 unmount에 사용되는 기능에는 아래와 같습니다.

- clearInterval, clearTimeout
- 라이브러리 인스턴스 제거

### 컴포넌트가 지정된 값이 설정 혹은 업데이트 될 때만 실행

```js
useEffect(() => {
  console.log(user);
}, [user]);
```

최초 로딩과는 반대로 빈 배열이 아니라 의존값을 넣어주었습니다. 이렇게 되면 user라는 값이 `설정 혹은 변경`될 때마다 이를 감지해서 console.log(user)가 동작합니다.<br/>
물론 최초 렌더링 될 때도 동작합니다.<br/>
그러면 만약 값이 업데이트가 되서 다시 렌더링 될 때는 어떤 순서로 그려질까요?

```js
useEffect(() => {
  console.log("user가 설정됨");
  console.log(user);
  return () => {
    console.log("user 값 바뀌기 전");
    console.log(user);
  };
}, [user]);
```

위 코드를 보면 최초에 렌더링 된 후, user의 변화에 따라 다시 렌더링 된다는 사실은 이제 파악할 수 있습니다.<br/>
만약 user의 속성이 바뀌게 되면 먼저 return인 unmount가 실행되어 `user가 바뀌기 전의 내용`이 출력되게 되며, 다음 다시 mount되어 user가 설정됨 이라는 결과가 출력됩니다.

### 만약 의존값을 넣지 않게 된다면?

```js
useEffect(() => {
  console.log(user);
});
```

어떤 작업을 하던 컴포넌트의 변화를 감지하고 `컴포넌트 전체`를 다시 렌더링 시킵니다.
