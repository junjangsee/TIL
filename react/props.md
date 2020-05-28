# props

properties의 줄임말이며 컴포넌트를 사용할 때 `특정 값을 전달`해주고 싶을 때 사용하는 것입니다.

## props 전달하기

```js
import React from "react";
import Hello from "./Hello";

function App() {
  return <Hello name="react" />;
}

export default App;
```

Hello JSX에 name=react 라는 값을 보냅니다.

## props 받아내기

```js
import React from "react";

function Hello(props) {
  console.log(props); // {name: "react"}
  console.log(props.name); // react
  return <div>안녕하세요</div>;
}

export default Hello;
```

받아온 props는 파라미터로 객체로 넘어오게 됩니다.<br/>
그 객체의 프로퍼티를 가져와서 해당 값을 출력하면 됩니다.<br/><br/>

만약 `비구조화 할당` 문법을 사용한다면 보다 편하게 할당이 가능합니다.

```js
import React from "react";

function Hello({ name }) {
  return <div>안녕하세요 {name}</div>;
}

export default Hello;
```

## 기본 props값 선언하기

```js
import React from "react";

function Hello({ name }) {
  return <div>안녕하세요 {name}</div>;
}

Hello.defaultProps = {
  name: "이름없음",
};

export default Hello;
```

만약 props로 기존에 react 문자가 `넘어오지 않는다면` 이름없을을 렌더링 합니다.

## 컴포넌트 내부의 내용을 알아내기

`children`을 사용하여 내부에 있는 내용을 표현할 수 있습니다.

```js
import React from "react";
import Hello from "./Hello";
import Wrapper from "./Wrapper";

function App() {
  return (
    <Wrapper>
      <Hello name="react" />
      <Hello name="javascript" />
    </Wrapper>
  );
}

export default App;
```

Wrapper라는 컴포넌트가 Hello 컴포넌트를 자식으로 가지고 있습니다. 이 자식들을 표현하기 위해서는 `children` props를 통해 가져올 수 있습니다.

```js
import React from "react";

function Wrapper({ children }) {
  const style = {
    border: "2px solid black",
    padding: 16,
  };

  return <div style={style}>{children}</div>;
}

export default Wrapper;
```

스타일 내부에 Hello 컴포넌트 2개가 표현되게 됩니다.
