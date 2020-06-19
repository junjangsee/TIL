# 모듈

리덕스에서 액션타입, 액션 생성 함수, 리듀서를 `한 파일에 몰아넣는` **Ducks 패턴**을 활용합니다. 물론 전부 다른 파일로 분류하는 방법이 있지만 분리하는데에 있어 정답이 없기 때문에 필요시 본인에 취향에 맞게 설계하면 됩니다.

## 모듈 구성하기

### counter.js

```js
// 액션 타입
// 문자열 앞에 접두사를 붙임으로서 다른 파일과 혼동되지 않도록 합니다.
const SET_DIFF = "counter/SET_DIFF";
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

// 액션 생성 함수
export const setDiff = (diff) => ({
  type: SET_DIFF,
  diff,
});
export const increase = () => ({
  type: INCREASE,
});
export const decrease = () => ({
  type: DECREASE,
});

// 모듈의 초기상태
// counter에 대한 초기 상태를 선언합니다.
const initialState = {
  number: 0,
  diff: 1,
};

// 리듀서
export default function counter(state = initialState, action) {
  switch (action.type) {
    case SET_DIFF:
      return {
        ...state,
        diff: action.diff,
      };
    case INCREASE:
      return {
        ...state,
        number: state.number + state.diff,
      };
    case DECREASE:
      return {
        ...state,
        number: state.number - state.diff,
      };
    default:
      return state;
  }
}
```

객체를 카운팅 하는 역할을 하는 모듈을 생성합니다.

### todos.js

```js
// 액션 타입
// 문자열 앞에 접두사를 붙임으로서 다른 파일과 혼동되지 않도록 합니다.
const ADD_TODO = "todos/ADD_TODO";
const TOGGLE_TODO = "todos/TOGGLE_TODO";

// 액션 생성 함수
export const addTodo = (text) => ({
  type: ADD_TODO,
  todo: {
    id: new Date(),
    text,
  },
});
export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id,
});

// 모듈의 초기상태
const initialState = [
  /*
    {
        id: 1,
        text: '예시',
        done: false,
    }
     */
];

// 리듀서
export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat(action.todo);
    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    default:
      return state;
  }
}
```

객체를 생성하고 토글하는 하는 역할을 하는 모듈을 생성합니다.<br/>
이렇게 만든 두 모듈을 하나의 파일로 합쳐서 내보내야합니다.

### index.js

```js
import { combineReducers } from "redux";
import counter from "./counter";
import todos from "./todos";

const rootReducer = combineReducers({
  counter,
  todos,
});

export default rootReducer;
```

`combineReducers`를 가져와서 두 모듈을 한 번에 담아 내보내줍니다. 이제 이 리덕스를 리액트에 적용시킬 일만 남았습니다.

## 리액트에 적용하기

```bash
yarn add react-redux
```

### index.js

```js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./moduls";

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

react-redux에서 가져온 `Provider`로 App 컴포넌트를 감싸는데 이 때 기존에 만들었던 두개의 모듈을 합친 **스토어 하나를 생성**하여 props로 넣어줍니다.
