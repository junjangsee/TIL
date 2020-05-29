# useCallback

이전에 만들었던 함수를 재사용 할 때 사용합니다. useMemo와 비슷하지만 함수를 위한 Hook입니다.

## useCallback 선언하기

```js
import React, { useCallback } from "react";
```

## useCallback 사용하기

```js
useCallback(function, dependencies);
```

function에는 실행할 함수를, dependencies에는 의존할 값을 나타냅니다.

```js
const onChange = useCallback(
  (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  },
  [inputs]
);
```

위 코드는 inputs를 감지하여 변화가 일어날 때만 onChange 함수를 만들어내게 됩니다. 만약 변화가 없다면 기존에 만들어진 함수를 계속 재사용 합니다.
