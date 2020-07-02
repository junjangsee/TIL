# 인터섹션 (Intersection)

여러타입을 하나도 합친 것을 말합니다. 보통 두 인터페이스의 타입을 가져야 할 때 사용하며 추가로 인터페이스를 만들필요가 없게 됩니다.

## 예제

```ts
interface User {
  name: string;
}

interface Action {
  do(): void;
}

function createUserAction(u: User, a: Action): User & Action {
  return {
    ...u,
    ...a,
  };
}

const userAction = createUserAction({ name: "junjang" }, { do() {} });
```

두 인터페이스를 하나의 함수에서 가져와 함수의 타입은 `&`연산자를 사용해 선언합니다.<br />
그리고 전개 연산자를 사용해 인터페이스 타입에 포함된 것들을 리턴 해주면 파라미터로 가져온 두 타입을 사용할 수 있습니다.
