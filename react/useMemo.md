# useMemo

이전에 연산된 값을 재사용 할 때, 주로 성능최적화 할 때 사용합니다.

## useMemo 선언하기

```js
import React, { useMemo } from "react";
```

## useMemo 사용하기

```js
useMemo(function, dependencies);
```

function에는 실행할 함수를, dependencies에는 의존할 값을 나타냅니다. useEffect와 구성이 똑같습니다.<br/><br/>
만약에 유저가 활성화 상태인 경우만 찾는다고 가정하겠습니다.

```js
function countActiveUsers(users) {
  console.log("활성 사용자 수 세는 중.....");
  return users.filter((user) => user.active).length;
}

const count = countActiveUsers(users);
```

위의 코드로 표현 될건데 이는 users값 뿐만 아니라 연관된 모든 상태가 변화하서 리렌더링 할 때마다 실행하게 됩니다.<br/>
하지만 단순히 숫자를 세는데 이런 일이 일어나는건 굉장히 성능적인 낭비입니다.

```js
function countActiveUsers(users) {
  console.log("활성 사용자 수 세는 중.....");
  return users.filter((user) => user.active).length;
}

const count = useMemo(() => countActiveUsers(users), [users]);
```

그래서 useMemo를 활용하여 이용자가 변화할 때만 의존값을 준다면 기타 변화에는 반응하지 않고 값을 가지고 있다가, 이용자의 변화만 감지하여 다시 숫자를 세게 됩니다.
