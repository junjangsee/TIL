# JSX

JSX는 리액트에서 생김새를 정의할 때 사용하는 문법입니다. HTML 같이 생겼지만 실제로는 자바스크립트입니다.<br/>
리액트 컴포넌트 파일에서 XML 형태로 코드를 작성하면 babel이 JSX를 자바스크립트로 변환을 해줍니다.<br/><br/>

하지만 모든 경우에서 이렇게 변환시켜주지 않고 `규칙`을 따라야 합니다. 이에 대해 알아보겠습니다.

## 꼭 태그를 닫아야한다.

```js
import React from 'react';
import Hello from './Hello';

function App() {
  return (
    <div>
      <Hello />
      <div>
    </div>
  );
}

export default App;
```

쌍으로 필요한 div 태그를 예로 들면 닫힌 태그가 없을 경우 에러를 발생시킵니다.

## self closing을 해야한다.

```js
import React from "react";
import Hello from "./Hello";

function App() {
  return (
    <div>
      <Hello />
      <input />
    </div>
  );
}

export default App;
```

값이 들어가있지 않은 태그라면 self closing을 통해 닫야아합니다.

## 두개 이상의 태그를 사용시 감싸야 한다.

```js
import React from "react";
import Hello from "./Hello";

function App() {
  return (
    <>
      <Hello />
      <div>안녕히계세요.</div>
    </>
  );
}

export default App;
```

App 컴포넌트에 두 개의 태그를 리턴해주기 위해서 하나의 태그로 감싸야 하는데, 그냥 div로 감싸기에는 스타일링 문제나 구조상 문제가 생길 수 있습니다.<br/>
그래서 `프래그먼트 태그`를 사용하여 감싸줍니다.

## 자바스크립트 값을 사용할 땐 {}내에 넣는다.

```js
import React from "react";
import Hello from "./Hello";

function App() {
  const name = "react";
  return (
    <>
      <Hello />
      <div>{name}</div>
    </>
  );
}

export default App;
```

name 변수를 표현하기 위해서는 그냥 name 변수를 삽입하는게 아닌 `{name}`을 입력하여 표현합니다.

## 스타일은 객체로 표현한다.

JSX에서 인라인 스타일은 `객체 형태`로 작성을 해야 하며, background-color 처럼 - 로 구분되어 있는 이름들은 backgroundColor 처럼 `camelCase 형태`로 네이밍 해주어야 합니다.

```js
import React from "react";
import Hello from "./Hello";

function App() {
  const name = "react";
  const style = {
    backgroundColor: "black",
    color: "aqua",
    fontSize: 24, // 기본 단위 px
    padding: "1rem", // 다른 단위 사용 시 문자열로 설정
  };

  return (
    <>
      <Hello />
      <div style={style}>{name}</div>
    </>
  );
}

export default App;
```

## 클래스는 className으로 표현한다.

```js
return (
  <>
    <Hello />
    <div className="gray-box"></div>
  </>
);
```

class와 혼동을 방지하기 위해 JSX에서는 `className`으로 선언합니다.

## 주석

```js
return (
  <>
    {/* 주석은 화면에 보이지 않습니다 */}
    /* 중괄호로 감싸지 않으면 화면에 보입니다 */
    <Hello />
    <div
      // 내부에 주석은 이렇게 표현합니다.
      style={style}
    >
      {name}
    </div>
    <div className="gray-box"></div>
  </>
);
```

중괄호로 감싸서 주석을 표현합니다.<br/>
또한 열린 태그 내에 주석은 `//`로 표현합니다.
