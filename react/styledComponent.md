# styled-Component

스타일을 JS 내부에 사용하는 방법으로, CSS in JS 라는 기술입니다.

## styled-Component 설치하기

```bash
yarn add styled-components
```

## styled-Component 사용하기

### 일반적인 방법

```js
import React from "react";
import styled from "styled-components";

const Circle = styled.div`
  width: 5rem;
  height: 5rem;
  background: black;
  border-radius: 50%;
`;

function App() {
  return <Circle />;
}

export default App;
```

### props를 활용한 방법

```js
import React from "react";
import styled from "styled-components";

const Circle = styled.div`
  width: 5rem;
  height: 5rem;
  background: ${(props) => props.color};
  border-radius: 50%;
`;

function App() {
  return <Circle color="blue" />;
}

export default App;
```

Circle 컴포넌트에서 color의 props를 넘겨주면 props 객체를 받아와 사용할 수 있습니다.<br/>
만약 flag 변수를 사용하게 되면 어떻게 해야할까요?

```js
import React from "react";
import styled, { css } from "styled-components";

const Circle = styled.div`
  width: 5rem;
  height: 5rem;
  background: ${(props) => props.color};
  border-radius: 50%;
  ${(props) =>
    props.huge &&
    css`
      width: 10rem;
      height: 10rem;
    `}
`;

function App() {
  return (
    <>
      <Circle color="black" />;
      <Circle color="blue" huge />;
    </>
  );
}

export default App;
```

마찬가지로 huge라는 props를 가져와 true면 더 커지는 스타일을 적용했습니다. 하지만 여기에 대한 props를 추가로 작성할 수 없는 제약사항이 존재하는데요, 이 때는 `css`를 import 하여 작성하고 **props 내부에 추가적인 props**가 필요할 경우 사용 가능해집니다.

## polished

간단한 문법으로 원하는 스타일을 처리할 수 있는 스타일 유틸 라이브러리입니다.

### polished 설치하기

```bash
yarn add polished
```

### polished 사용하기

```js
import { darken, lighten } from "polished";

const colorStyles = css`
  ${({ theme, color }) => {
    const selected = theme.palette[color];
    return css`
      background: ${selected};
      &:hover {
        background: ${lighten(0.1, selected)};
      }
      &:active {
        background: ${darken(0.1, selected)};
      }
    `;
  }}
`;
```

polished에 포함된 darken, lighten를 가져와 사용이 가능합니다.
