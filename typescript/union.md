# 유니온 (Union)

타입을 두개 이상 지정하고 사용하는 방법입니다. 사용시 각 데이터 타입에 대해 `타입가드`를 해야한다는 것이 특징입니다.

## 원시형 타입

```ts
function compare(x: string | number, y: string | number) {
  if (typeof x === "number" && typeof y === "number") {
    return x === y ? 0 : x > y ? 1 : -1;
  }

  if (typeof x === "string" && typeof y === "string") {
    return x.localeCompare(y);
  }

  throw new Error("not supported type");
}
```

`|` 연산자를 이용해 두개의 타입을 선언하고 typeof 연산자로 들어온 값을 `타입가드` 후 비교합니다.<br />
두 개가 같은 경우 실행하는 if문을 통해 결과가 리턴되게 됩니다.

## 참조형 타입

```ts
interface User {
  name: string;
}

interface Action {
  do(): void;
}

function isAction(v: User | Action): v is Action {
  return (<Action>v).do !== undefined;
}

function process(v: User | Action) {
  if (isAction(v)) {
    v.do();
  } else {
    v.name;
  }
}
```

만약 process 함수를 실행 시킬 때 두 타입에 대한 각각의 프로퍼티를 가지고 로직을 수행할 땐, 따로 타입가드 함수를 만들어 체크해주면 좋습니다.<br />
`is` 키워드를 이용해 Action 타입인지 체크하고 만약 액션타입에 do 프로퍼티가 undefined가 아니면 Action 타입으로 **true**가 리턴됩니다.
만약 do가 정의되지 않았다면 Action이 아니므로 User가 리턴되겠죠?<br />
이제 본 로직에서 isAction으로 타입가드 한 후 바디에 확인해보면 각 타입에 맞는 프로퍼티가 출력될 것입니다.
