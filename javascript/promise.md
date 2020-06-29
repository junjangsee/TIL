# 프로미스(Promise)

비동기 작업을 순차적으로 진행할 수 있도록 도와줍니다. ES6부터 추가되었습니다.

## 프로미스 객체 생성

`생성자`를 통해 프로미스 객체를 만들 수 있습니다. 생성자의 인자로는 `executor` 라는 함수를 사용합니다.

```js
new Promise(/* execuotor*/);
```

### executor

여기서 executor는 `resolve`와 `reject`를 인자로 가집니다. 이 두가지는 함수로서 resolve(), reject()로 표현됩니다.

```js
new Promise(/* execuotor*/ (resolve, reject) => {});
```

## pending(대기)

생성자를 통해서 프로미스 객체를 만드는 순간 pending 상태가 됩니다.

```js
new Promise((resolve, reject) => {});
```

위 현상이 pending 현상입니다.

## fulfilled(이행)

executor 함수 인자 중 하나인 `resolve` 함수를 실행하면 `fulfilled 상태`가 됩니다.

```js
new Promise((resolve, reject) => {
  // pending
  // do something..
  // 처리 완료
  resolve(); // fulfilled 상태
});
```

비동기 코드를 처리하고 resolve();를 실행하면 **이행 상태**가 됩니다.<br/>
예를들어 객체가 1000ms 후에 fulfilled 상태로 돌입하는 코드는 어떨까요?

```js
new Promise((resolve, reject) => {
  // pending 상태..

  setTimeout(() => {
    resolve(); // fulfilled 상태
  }, 1000); // 1초 후
});
```

먼저 Promise객체를 생성하고 pending 상태에서 1초 후 resolve();를 호출하여 fulfilled 상태로 만들어줍니다.

## rejected(거부)

executor 함수 인자 중 하나인 `reject` 함수를 실행하면 `rejected 상태`가 됩니다.

```js
new Promise((resolve, reject) => {
  reject(); // rejected 상태
});
```

## 프로미스 객체 사용

위에서는 프로미스 객체를 생성하는 법을 배웠고 이제 사용하는 방법에 대해 알아보겠습니다.

```js
const p = new Promise((resolve, reject) => {
  // pending 상태..

  setTimeout(() => {
    resolve(); // fulfilled 상태
  }, 1000); // 1초 후
});

p.then(
  /* CallBack */ () => {
    console.log("1000ms 후에 fulfilled 됩니다.");
  }
);
```

Promise 객체를 p에 담고, resolve 된 시점인 fulfilled 상태에서 `.then`으로 넘어가게 되고 .then 안에 있는 **콜백 함수**가 실행됩니다.<br/>
즉 이 코드는 .then이 1초 후에 실행되게 될 것입니다.<br/>
그렇다면 `reject`는 어떻게 사용될까요?

```js
const p = new Promise((resolve, reject) => {
  // pending 상태..

  setTimeout(() => {
    reject(); // rejected 상태
  }, 1000); // 1초 후
});

p.then(
  /* CallBack */ () => {
    console.log("1000ms 후에 fulfilled 됩니다.");
  }
).catch(() => {
  console.log("1000ms 후에 rejected 됩니다.");
});
```

작동 방식은 동일하지만 .catch를 통하여 콜백합니다.

### 함수 내 사용

then, catch를 설정하는 시점을 명확히 하고, 함수의 실행과 동시에 Promise 객체를 만들면서 pending이 시작되도록 하기 위함입니다.

```js
function p() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

p()
  .then(() => {
    console.log("1000ms 후에 fulfilled 됩니다.");
  })
  .catch(() => {
    console.log("1000ms 후에 rejected 됩니다.");
  });
```

### executor 인자 전달

executor의 resolve, reject 함수를 실행할 때 `인자`를 넣어주면 then, catch의 `콜백 함수의 인자`로 받을 수 있습니다.

```js
function p() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("hello");
      //   reject("error");
    }, 1000);
  });
}

p()
  .then((message) => {
    console.log("1000ms 후에 fulfilled 됩니다.", message); // 1000ms 후에 fulfilled 됩니다. hello
  })
  .catch((reason) => {
    console.log("1000ms 후에 rejected 됩니다.", reason); // 1000ms 후에 fulfilled 됩니다. error
  });
```

인자를 받아와 사용할 수 있게 되었습니다. 하지만 실무에서는 대부분 reject를 콜백 시 `Error 객체`를 넘겨주게 됩니다.

```js
function p() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("bad"));
    }, 1000);
  });
}

p()
  .then((message) => {
    console.log("1000ms 후에 fulfilled 됩니다.", message); // 1000ms 후에 fulfilled 됩니다. hello
  })
  .catch((error) => {
    console.log("1000ms 후에 rejected 됩니다.", error); // Error: bad
  });
```

## 최종 실행

fulfilled 되거나 reject 된 후에 최종적으로 실행할 것이 있다면, `.finally()` 를 설정하고, 함수를 인자로 넣습니다.

```js
function p() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("bad"));
    }, 1000);
  });
}

p()
  .then((message) => {
    console.log("1000ms 후에 fulfilled 됩니다.", message); // 1000ms 후에 fulfilled 됩니다. hello
  })
  .catch((error) => {
    console.log("1000ms 후에 rejected 됩니다.", error); // Error: bad
  })
  .finally(() => {
    console.log("end"); // end
  });
```

then, catch 실행 여부와 관계없이 모든게 끝나면 최종적으로 실행합니다.

## 여러개의 프로미스 객체

### all

프로미스 객체를 여러개 생성하여 배열로 만든 후 인자로 넣고 `Promise.all`을 실행하면,
배열의 **모든 프로미스 객체들이 fulfilled 되었을 때**, then의 함수가 실행됩니다. 그리고 resolve 인자값을 **배열로 돌려줍니다.**

```js
function p(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  });
}

Promise.all([p(1000), p(2000), p(3000)]).then((messages) => {
  console.log("모두 fulfilled 된 상태로 실행됩니다.", messages); // 모두 fulfilled 된 상태로 실행됩니다. (3) [1000, 2000, 3000]
});
```

배열로 넘긴 Promise 객체를 then으로 받아 배열로 돌려준 것을 확인할 수 있습니다.

### race

프로미스 객체를 여러개 생성하여 배열로 만든 후 인자로 넣고 `Promise.race`을 실행하면,
배열의 모든 프로미스 객체들 중`가장 먼저 fulfilled 된 것`으로 then이 실행되고, then의 함수의 인자로 가장 먼저 fulfilled 된 프로미스 객체의 resolve 인자값을 돌려줍니다.

```js
function p(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  });
}

Promise.race([p(1000), p(2000), p(3000)]).then((message) => {
  console.log("가장 빠르게 fulfilled 된 것이 실행됩니다.", message); // 가장 빠르게 fulfilled 된 객체가 실행됩니다. 1000
});
```
