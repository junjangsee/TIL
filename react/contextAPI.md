# context API

각 컴포넌트 별로 props를 넘겨줄 때 보다 쉽게 관리 및 이동시킬 때 사용합니다.

## context API 선언하기

```js
import React, { createContext, useContext } from "react";
```

react에 내장되어있는 `createContext, useContext`를 가져옵니다.

```js
import React, { createContext, useContext } from "react";

const Mycontext = createContext("defaultValue");

function Child() {
  const text = useContext(Mycontext);
  return <div>안녕하세요? {text}</div>;
}

function Parent({ text }) {
  return <Child text={text} />;
}

function GrandParent({ text }) {
  return <Parent text={text} />;
}

function ContextSample() {
  return (
    <Mycontext.Provider value="GOOD">
      <GrandParent />
    </Mycontext.Provider>
  );
}

export default ContextSample;
```

createContext로 기본값을 설정하고 이 값을 사용하기 위해서는 Provider를 사용하여 value를 넘겨줍니다. 이 value는 createContext의 값으로 설정됩니다.<br/>
그리고 넘긴 value값을 Child에서 useContext로 사용합니다.
