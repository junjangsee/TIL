# 클래스

클래스는 객체를 만들 수 있는 새로운 방법으로 ES6에서 추가되었습니다.

## 클래스 생성 방법

클래스는 함수와 다르게 `호이스팅`이 **일어나지 않기** 때문에 순서에 맞게 선언해주어야 합니다.

### 선언 방식

```js
class A {}

new A();
```

### 변수 할당(표현식) 방식

```js
const B = class {};

new B();
```

## 생성자

class를 활용해 객체를 만들 때도 인자를 넣어서 생성할 수 있는데, 이 방법에 대해 알아보겠습니다.

```js
class Person {
  constructor(name, age) {
    console.log(`이 사람의 이름은 ${name}이며 나이는 ${age}입니다.`);
  }
}

new Person("junjang", 28); // 이 사람의 이름은 junjang이며 나이는 28입니다.
new Person(); // undefined 이 사람의 이름은 undefined이며 나이는 undefined입니다.
```

인자를 넣을 경우 해당 인자를 가진 객체를 생성하지만, 만약 인자를 넣지 않고 생성한다면 `undefined`가 출력됩니다.

## 멤버 변수

class에서 멤버 변수를 선언하는 방법을 알아보겠스빈다.

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

new Person("junjang", 28); // Person {name: "junjang", age: 28}
```

Person 객체는 생성자에 넣어준 인자를 가지고 객체를 만들었습니다.<br/>
이보다 더 간단한 방법이 있습니다.

```js
class Person {
  name = "no name";
  age = 0;

  constructor(name, age) {
    this.name = name || this.name;
    this.age = age || this.age;
  }
}

new Person("junjang", 28); // Person {name: "junjang", age: 28}
```

`Unexpected token` 에러가 뜨는 경우는 **런타임 환경이 낮기 때문**입니다. node 혹은 크롬 버전이 최신이라면 가능한 문법입니다.<br/>
만약 저 문법을 사용한다면 어떤 이점이 있을까요? 바로 `초기값 설정`입니다.

## 멤버 함수

멤버 함수를 선언하는 방법에 대해 알아보겠습니다.

```js
class Person {
  name = "junajang";

  hello1() {
    console.log(this.name);
  }

  hello2 = () => {
    console.log("arrow", this.name);
  };
}

new Person().hello1();
new Person().hello2();
```

일반 함수와 화살표 함수를 사용하여 만들 수 있으며, this로 접근하여 해당 객체의 멤버 변수를 함께 출력 할 수 있습니다.

## get, set

get과 set은 외부에서 접근할 수 있도록 만들어주며 해당 함수를 이용해 객체를 조작할 수 있습니다.

```js
class Person {
  _name = "no name";

  get name() {
    return this._name + "@@@";
  }

  set name(value) {
    this._name = value + "!!!";
  }
}

const person = new Person();
console.log(person); // Person {_name: "no name"}
person.name = "junjang"; // Person {_name: "junjang!!!"}
person.name; // "junjang!!!@@@"
```

만들어진 객체에 name이라는 함수를 이용하여 `객체.함수`로 접근합니다.<br/>
get은 만들어진 객체의 **정보를 가져오는 역할**을 하며 set은 만들어진 **객체를 조작하는 역할**을 합니다.

## static

static으로 선언된 변수와 함수는 객체의 생성과는 별개로 언제든 class에 접근해서 사용할 수 있게 합니다.

```js
class Person {
  static age = 28;
  static hello() {
    console.log(Person.age);
  }
}

Person.age; // 28
Person.hello(); // 28
```

new 연산자를 통해 객체를 생성하지 않았음에도 불구하고 접근하는 것을 확인할 수 있습니다.<br/>
만약 new 연산자를 통해 객체로 접근하면 어떻게 될까요?

```js
class Person {
  age = 28;
  static hello() {
    console.log(this.age);
  }
}

new Person().hello(); // (intermediate value).hello is not a function
```

객체를 생성하고 접근해도 생성한 객체에 속해있지 않기 때문에 찾지 못합니다.

## 상속

자식 클래스에서 부모 클래스를 상속받는 방법에 대해 알아보겠습니다.

```js
class Parent {
  name = "kim";

  hello() {
    console.log("hello", this.name);
  }
}

class Child extends Parent {}

const parent = new Parent(); // Parent {name: "kim"}
const child = new Child(); // Parent {name: "kim"}

child.hello(); // hello kim
child.name = "junjang"; // "junjang"
```

Parent라는 부모 클래스와 Child라는 자식 클래스를 생성하고 자식에서 부모를 상속받게 되면, 자식의 객체를 생성하였을 때 부모의 멤버 변수와 멤버 함수를 가져와서 함께 생성합니다.<br/>
물론 자식에서 부모의 것에 접근하여 수정도 가능합니다.

### 오버라이드

자식 클래스에서 부모의 것들을 재정의 하여 사용하는 것을 말합니다.

```js
class Parent {
  name = "kim";

  hello() {
    console.log("hello", this.name);
  }
}

class Child extends Parent {
  age = "28";

  hello() {
    console.log("hello", this.name, this.age);
  }
}

const parent = new Parent(); // Parent {name: "kim"}
const child = new Child(); // Child {name: "kim", age: "28"}

child.hello(); // hello kim 28
```

상속받은 name이 정상적으로 출력되는 것과 hello 함수가 자식 클래스에서 오바리이딩 된 방식으로 출력되는 것을 볼 수 있습니다.<br/>
static 변수도 마찬가지로 동일하게 상속됩니다.

### super

자식이 생성자에 무언가를 추가할 떄 super를 사용해야합니다.

```js
class Parent {
  name;

  constructor(name) {
    this.name = name;
  }

  hello() {
    console.log("hello", this.name);
  }
}

class Child extends Parent {
  age;

  constructor(name, age) {
    super(name); // super 호출
    this.age = age; // 나중에 자식의 this를 호출해야합니다.
  }

  hello() {
    console.log("hello", this.name, this.age);
  }
}

const parent = new Parent(); // Parent {name: "kim"}
const child = new Child(); // Child {name: "junjang", age: 28}

child.hello(); // hello junjang 28
```

생성자에 super를 추가한 이유는 부모도 생성자가 있기 때문에 부모 것을 먼저 super로 받아 오고 자식의 **this를 통해 생성자**를 만들어줍니다.<br/>
super의 인자에는 부모에서 가져온 인자를 동일하게 선언해주어야 합니다.<br/>
