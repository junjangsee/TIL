# map

배열을 렌더링 할 때 편리하게 렌더링 하도록 도와줍니다.

## map 사용하기

`배열.map()` 으로 선언합니다.

```js
import React from "react";

function User({ user }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
}

function UserList() {
  const users = [
    {
      id: 1,
      username: "junjang1",
      email: "junjang.see1@gmail.com",
    },
    {
      id: 2,
      username: "junjang2",
      email: "junjang.see2@gmail.com",
    },
    {
      id: 3,
      username: "junjang3",
      email: "junjang.see3@gmail.com",
    },
  ];

  return (
    <div>
      {users.map((user) => (
        <User user={user} />
      ))}
    </div>
  );
}

export default UserList;
```

users라는 배열의 객체들을 하나씩 돌면서 **user라는 변수**로 활용 가능하고, User 컴포넌트에서 해당 user를 props로 받아 렌더링을 해줍니다.<br/>
하지만 이 상태로 렌더링 하면 결과는 잘 나오지만 **Warning: Each child in a list should have a unique "key" prop.** 콘솔 에러가 등장합니다.<br/>
이는 각 요소들마다 **고유값**이 없기 때문입니다. 이를 통해서 리렌더링시 **최적화**를 하므로 중요합니다.

## key 에러 해결 방법

```js
import React from "react";

function User({ user }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
}

function UserList() {
  const users = [
    {
      id: 1,
      username: "junjang1",
      email: "junjang.see1@gmail.com",
    },
    {
      id: 2,
      username: "junjang2",
      email: "junjang.see2@gmail.com",
    },
    {
      id: 3,
      username: "junjang3",
      email: "junjang.see3@gmail.com",
    },
  ];

  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
}

export default UserList;
```

위처럼 객체가 고유한 값이 있다면 `key 속성`을 사용하여 고유값을 명시해줍니다.<br/>
하지만 고유값이 없는 경우에는 어떻게 해야할까요?

```js
import React from "react";

function User({ user }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
}

function UserList() {
  const users = [
    {
      id: 1,
      username: "junjang1",
      email: "junjang.see1@gmail.com",
    },
    {
      id: 2,
      username: "junjang2",
      email: "junjang.see2@gmail.com",
    },
    {
      id: 3,
      username: "junjang3",
      email: "junjang.see3@gmail.com",
    },
  ];

  return (
    <div>
      {users.map((user, idx) => (
        <User user={user} key={idx} />
      ))}
    </div>
  );
}

export default UserList;
```

map의 두 번째 파라미터인 `인덱스 값`을 가져와서 선언해주면 됩니다. 하지만 이를 사용하면 성능상의 이점을 볼 수 없게됩니다.
