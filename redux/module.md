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

serviceWorker.unregister();
```

react-redux에서 가져온 `Provider`로 App 컴포넌트를 감싸는데 이 때 기존에 만들었던 두개의 모듈을 합친 **스토어 하나를 생성**하여 props로 넣어줍니다.

### 프리젠테이셔널 컴포넌트

프리젠테이셔널 컴포넌트는 `UI`에 집중을 하는 컴포넌트입니다.

```js
import React from "react";

function Counter({ number, diff, onIncrease, onDecrease, onSetDiff }) {
  const onChange = (e) => {
    onSetDiff(parseInt(e.target.value, 10));
  };
  return (
    <div>
      {number}
      <div>
        <input type="number" value={diff} onChange={onChange}></input>
        <button onClick={onIncrease}>+</button>
        <button onClick={onDecrease}>-</button>
      </div>
    </div>
  );
}

export default Counter;
```

카운터 컴포넌트를 만들고 props로 상태 값들을 다 받아옵니다. input의 value는 **문자열**로 넘어오기 때문에 항상 **숫자**로 만들어주어야 합니다.

### 컨테이너 컴포넌트

프리젠테이셔널 컴포넌트와는 반대로 `상태관리`에만 집중을 하는 컴포넌트입니다.

```js
import React from "react";
import Counter from "../components/Counter";
// 상태를 조회하기 위해 사용
import { useSelector, useDispatch } from "react-redux";
import { increase, decrease, setDiff } from "../moduls/counter";

function CounterContainer() {
  const { number, diff } = useSelector((state) => ({
    number: state.counter.number,
    diff: state.counter.diff,
  }));
  const dispatch = useDispatch();

  const onIncrease = () => dispatch(increase());
  const onDecrease = () => dispatch(decrease());
  const onSetDiff = (diff) => dispatch(setDiff(diff));

  return (
    <Counter
      number={number}
      diff={diff}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onSetDiff={onSetDiff}
    />
  );
}

export default CounterContainer;
```

`useSelector`를 이용하면 **store**에 있는 상태들을 가져와 조회를 할 수 있습니다. 그래서 조회한 데이터 두 가지를 가져왔습니다.<br/>
`useDispatch`는 단순하게 dispatch를 사용할 수 있게 해주어 액션 생성 함수를 호출해 액션을 만들어줍니다.<br/>
그리고 프리젠테이셔널 컴포넌트에 **useSelector**로 조회한 상태값과 **useDispatch**로 만들어낸 액션을 넘겨줍니다.

### App.js

```js
import React from "react";
import CounterContainer from "./containers/CounterContainer";

function App() {
  return <CounterContainer />;
}

export default App;
```

CounterContainer를 렌더링하여줍니다.
