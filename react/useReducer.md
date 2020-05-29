# useReducer

useState처럼 상태를 업데이트할 수 있습니다. 차이점으로는 useState는 다음 상태를 직접 지정하지만,
useReducer는 액션이라는 객체를 기반으로 상태를 바꾸어줍니다.

## useReducer 선언하기

```js
import React, { useReducer } from "react";
```

```js
const [number, dispatch] = useReducer(reducer, 0);
```

number는 현재 상태값, dispatch는 액션을 발생시키며 reducer에는 함수를, 0에는 초기값을 나타냅니다.

## useReducer 사용하기

```js
useReducer(function, dependencies);
```

function에는 실행할 함수를, dependencies에는 의존할 값을 나타냅니다.

```js
function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      throw new Error("Unhandled action");
  }
}
```

useReducer를 사용하기 위해 함수를 만들어줍니다. 두개의 인자를 받는데 state는 상태값, action은 발생시킬 값을 선언해줍니다.

```js
import React, { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      throw new Error("Unhandled action");
  }
}

function Counter() {
  const [number, dispatch] = useReducer(reducer, 0);

  const onIncrease = () => {
    dispatch({
      type: "INCREMENT",
    });
  };
  const onDecrease = () => {
    dispatch({
      type: "DECREMENT",
    });
  };

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
```

이제 만든 reducer 함수를 useReducer에 담고 초기값을 0으로 선언합니다.<br/>
그리고 dispatch를 활용하여 객체의 프로퍼티에 대한 값을 명시해주면 해당 값에 대한 reducer 함수가 리턴되면서 값이 출력됩니다.<br/>
이처럼 컴포넌트 외에서 상태를 관리하는 것을 확인할 수 있습니다.
