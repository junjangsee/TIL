# enum (열거형)

상수들의 집합을 나타낼 때 사용합니다.

## enum 선언

```ts
enum StarbucksGrade {
  WELCOME,
  GREEN,
  GOLD,
}
```

enum 명령어를 통해 StarbucksGrade를 선언하고 상수들을 나열합니다.<br />
enum을 node로 출력해보면 아래와 같은 값이 출력됩니다.

```js
{ '0': 'WELCOME',
  '1': 'GREEN',
  '2': 'GOLD',
  WELCOME: 0,
  GREEN: 1,
  GOLD: 2 }
```

## enum 사용

```ts
function getDiscountPercent(grade: StarbucksGrade) {
  switch (grade) {
    case StarbucksGrade.WELCOME:
      return 0;
    case StarbucksGrade.GREEN:
      return 5;
    case StarbucksGrade.GOLD:
      return 10;
  }
}

console.log(getDiscountPercent(StarbucksGrade.GREEN));
```

enum 또한 타입이기 때문에 함수형타입에 선언하여 입력타입에 따라 출력할 수 있습니다.<br />
또한 enum은 각 상수에 대하여 숫자, 문자로 된 고유의 값을 가지게 되기 때문에 아래와 같이 출력이 가능합니다.

```js
console.log(StarbucksGrade[0]);
console.log(StarbucksGrade["1"]);
console.log(StarbucksGrade["GOLD"]);
```

그렇다면 숫자값으로 enum의 정보를 가져올 때 enum에 또 다른 등급이 생겨 순서가 바뀐다면 기존의 코드를 전부 수정해야 하는 사항이 있을 수 있겠죠?<br />
그래서 enum을 선언할 때 처음부터 값을 선언해주는 방식이 안전합니다.

```ts
enum StarbucksGrade {
  WELCOME = 0,
  DIAMOND = 3
  GREEN = 1,
  GOLD = 2,
}
```

가독성은 조금 떨어지지만 안정성을 위해서 초기값을 선언해주는 것이 좋습니다. 추가적으로 초기값에 문자열을 선언할 수도 있습니다.

```ts
enum StarbucksGrade {
  WELCOME = "WELCOME",
  GREEN = "GREEN",
  GOLD = "GOLD",
}
```
