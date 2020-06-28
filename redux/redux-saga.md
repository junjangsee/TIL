# Redux-saga

리덕스 사가는 액션을 모니터링하다가 `특정 액션`이 발생하면 `특정 작업`을 하는 방식입니다.<br />
자바스크립트의 Generator 문법을 사용합니다.

## Redux-saga로 처리할 수 있는 것

1. 비동기 작업을 진행 할 때 기존 요청을 취소할 수 있다.
2. 특정 액션이 발생 헀을 때 이에 따라 다른 액션을 디스패치 하거나 자바스크립트 코드를 실행할 수 있다.
3. 웹 소켓을 사용하는 경우 Channel 이라는 기능을 사용하여 더욱 효율적으로 코드를 관리할 수 있다.
4. 비동기 작업이 실패했을 때 재시도 하는 기능을 구현 할 수 있다.

## Generator

함수의 흐름을 특정 구간에 멈춰놓았다가 **다시 실행**할 수 있으며, 결과값을 **여러번 내보낼** 수 있습니다.

```js
function weirdFuntion() {
  return 1;
  return 2;
  return 3;
  return 4;
}
```

weirdFuntion 함수는 언제 어디서 호출하던 상관없이 항상 1을 반환합니다.

```js
function* generatorFunction() {
  console.log("안녕하세요");
  yield 1;
  console.log("제네레이터 함수");
  yield 2;
  console.log("function*");
  yield 3;
  return 4;
}

const generator = generatorFunction(); // suspended 상태
generator.next(); // {value: 1, done: false} 안녕하세요
generator.next(); // {value: 2, done: false} 제네레이터 함수
generator.next(); // {value: 3, done: false} function*
generator.next(); // {value: 4, done: true} closed 상태
generator.next(); // {value: undefined, done: true} closed 상태
```

하지만 Generator를 사용하면 상황에 따라 다른 yield값을 value에 저장합니다. 만약 최종 값이라면 done을 true로 변경해 리턴합니다.<br />
즉 yield를 사용해서 함수를 멈춘 후 next가 호출 되면 다름 로직을 수행합니다.
