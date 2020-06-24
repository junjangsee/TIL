# Redux-thunk

리덕스 미들웨어 중 정말 많이 사용되는 미들웨어로서 **액션 객체**가 아닌 `함수`를 디스패치를 할 수 있습니다.

## 작동 원리

```js
const thunk = (store) => (next) => (action) =>
  typeof action === "function"
    ? action(store.dispatch, store.getState)
    : next(action);
```

만약 action이 함수 타입이라면 action에 두 파라미터를 넘겨서 실행하고, 함수가 아니면 다음 액션으로 넘어가는 것이 기본 작동 원리입니다.

## redux-thunk 설치하기

```bash
yarn add redux-thunk
```

## redux-thunk 사용하기

```js
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk, logger))
);
```

devtools, logger를 사용을 함께 하며 redux의 applyMiddleware에 선언해줍니다.

### counter.js

```js
// 액션 타입
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

// 액션 생성 함수
export const increase = () => ({
  type: INCREASE,
});
export const decrease = () => ({
  type: DECREASE,
});

// 1초 후 dispatch하는 thunk 함수
export const increaseAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(increase());
  }, 1000);
};

export const decreaseAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(decrease());
  }, 1000);
};

// 초기 데이터
const initialState = 0;

// 리듀서
export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return state + 1;
    case DECREASE:
      return state - 1;
    default:
      return state;
  }
}
```

dispatch를 받아와서 1초 후에 액션 생성 함수를 디스패치하는 thunk 함수를 만들었습니다.

![thunk_counter](../assets/gifs/thunk_counter.gif)
