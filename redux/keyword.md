# Redux(리덕스)

전역적인 상태관리를 대신 해주는 라이브러리 입니다.

## Context API와의 차이점

1. 미들웨어를 사용하여 비동기 작업을 더욱 체계적으로 관리할 수 있다.
2. 유용한 함수와, Hooks - connect, useSelector, useDispatch, useStore ...
3. 기본 최적화
4. 모든 상태를 커다란 상태에서 관리
5. DevTools
6. 기존 프로젝트에서 사용된 예시가 많다.

## 리덕스 키워드

### Action(액션)

상태에 어떠한 변화가 필요하게 될 땐 액션을 발생시킵니다.

```js
{
  type: "TOGGLE_VALUE";
  data: {
      id: 0,
      text: "리덕스 배우기"
  }
}
```

type 값이 필수적으로 있어야합니다. 어떤 액션을 취할 때 어떻게 할지 정의한다고 생각하면 됩니다.

### Action Creator(액션 생성함수)

액션을 만들어주는 함수입니다.

```js
export function addTodo(data) {
  return {
    type: "ADD_TODO",
    data,
  };
}

export const changeInput = text => {
  type: "CHANGE_INPUT",
  text,
};
```

### Reducer(리듀서)

변화를 일으키는 함수입니다.

```js
function counter(state, action) {
  switch (action.type) {
    case "INCREASE":
      return state + 1;
    case "DECREASE":
      return state - 1;
    default:
      return state;
  }
}
```

리덕스에서 default는 에러를 발생시키는 것이 아닌 state 자체를 반환시켜야합니다.

### Store(스토어)

한 애플리케이션당 하나의 스토어를 가지게 되는데 현재 앱의 상태와 리듀서, 내장함수들이 들어있습니다.

#### Dispatch(디스패치)

액션을 발생시키거나 스토어에게 전달하는 역할을 합니다.

```js
dispatch({ type: "INCREASE" });
```

#### Subscribe(구독)

호출시 특정 함수를 파라미터로 넣어주면 액션이 디스패치 될 때마다 설정한 함수가 호출됩니다.

## 리덕스의 3가지 규칙

1. 하나의 애플리케이션엔 하나의 스토어가 있다. (두개 이상의 스토어가 있으면 안된다.)
2. 상태는 읽기전용이다. (불변성을 지킨다.)
3. 변화를 일으키는 함수 리듀서는 순수한 함수여야한다. (똑같은 파라미터로 호출된 리듀서 함수는 언제나 똑같은 결과값을 반환한다.)

## 리덕스 설치하기

```bash
yarn add redux
```

## 리덕스 사용하기

```js
// 스토어 생성
import { createStore } from "redux";

// 최초 데이터
const initialState = {
  counter: 0,
  text: "",
  list: [],
};

// 액션 타입 생성
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const CHANGE_TEXT = "CHANGE_TEXT";
const ADD_TO_LIST = "ADD_TO_LIST";

// 액션 생성함수(객체를 만들어줌)
const increase = () => ({
  type: INCREASE,
});

const decrease = () => ({
  type: DECREASE,
});

const changeText = (text) => ({
  type: CHANGE_TEXT,
  text,
});

const addToList = (item) => ({
  type: ADD_TO_LIST,
  item,
});

// 리듀서
// 리덕스에서 초기 상태를 만들 때 리듀서를 호출하기 때문에 최초 값을 넣어주어야 합니다.
function reducer(state = initialState, action) {
  switch (action.type) {
    case "INCREASE":
      return {
        ...state,
        counter: state.counter + 1,
      };
    case "DECREASE":
      return {
        ...state,
        counter: state.counter - 1,
      };
    case "CHANGE_TEXT":
      return {
        ...state,
        text: action.text,
      };
    case "ADD_TO_LIST":
      return {
        ...state,
        list: state.list.concat(action.item),
      };
    default:
      return state;
  }
}

// 스토어 생성
// 만들어낸 리듀서를 넣습니다.
const store = createStore(reducer);

// 스토어를 구독
// 상태를 가져오는 함수를 생성합니다.
const listener = () => {
  const state = store.getState();
  console.log(state);
};

// 생성한 함수를 구독합니다.
const unsubscribe = store.subscribe(listener);

// 액션을 디스패치
// 구독 후 액션이 디스패치 될 때마다 구독 함수가 호출될 것입니다.(linster 함수가 호출 된다는 말)
store.dispatch(increase());
store.dispatch(decrease());
store.dispatch(changeText("안녕하세요"));
store.dispatch(addToList({ id: 1, text: "와우" }));

// 구독을 하지 않으면 listener를 실행하지 않습니다.
unsubscribe();
```
