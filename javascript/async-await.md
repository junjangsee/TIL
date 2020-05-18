# Async - Await

비동기 작업을 진행할 수 있도록 도와줍니다. ES7부터 추가되었습니다.
Promise를 기반으로 하고 있기 때문에 Promise 개념을 알고 있어야 이해하기 편합니다.

## async / await

### resolve

기존에 Promise를 사용하여 비동기 로직을 수행할 때는 아래와 같습니다.

```js
function p(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms);
    }, 1000);
  });
}

p(1000).then((ms) => {
  console.log(`${ms} ms 후에 실행됩니다.`); // 1000 ms 후에 실행됩니다.
});
```

만약 위 코드에서 async / await으로 호출하려면 어떻게 할까요?

```js
function p(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms);
    }, 1000);
  });
}

(async function main() {
  const ms = await p(1000);
  console.log(`${ms} ms 후에 실행됩니다.`);
})();
```

Promise와 차이점은 `.then`을 하지 않고 바로 변수로 넘겨준다는 것입니다.<br/>
await은 async를 붙여주는 함수와 `항상 짝`을 이루게 되며, async가 붙어있는 함수는 내부의 로직이 다 끝날 때 까지 종료되지 않고,
await을 만나면 실제로는 비동기 처리를 하고 있지만 **처리가 끝날 때까지 기다렸다가** resolve가 되면 인자값을 리턴 해줍니다.

### reject

resolve와 가장 큰 차이점은 에러를 처리하기 위해 try-catch문을 사용한다는 것입니다.

```js
function p(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("reason"));
    }, 1000);
  });
}

(async function main() {
  try {
    const ms = await p(1000);
  } catch (error) {
    console.log(error); // reason
  }
})();
```

만약 정상적인 처리가 되었다면 try 블럭에서 처리가 되겠지만, 에러 객체를 반환할 경우 catch 블럭에서 에러를 받아 처리합니다.

### async return

async function에서 return 되는 값은 `Promise.resolve` 함수로 감싸서 리턴됩니다.<br/>
즉, 리턴 값을 **fulfilled 상태**로 만들어 리턴한다는 것입니다.

```js
function p(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms);
    }, 1000);
  });
}

async function asyncP() {
  const ms = await p(1000);
  return `Junjang ${ms}`;
}

(async function main() {
  try {
    const name = await asyncP();
    console.log(name); // Junjang 1000
  } catch (error) {
    console.log(error);
  }
})();
```

## 연속된 async / await

### promise의 경우

```js
function p(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms);
    }, 1000);
  });
}

p(1000)
  .then(() => p(1000))
  .then(() => p(1000))
  .then(() => console.log("3000ms 후 실행"));
```

### async / await의 경우

```js
function p(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms);
    }, 1000);
  });
}

(async function main() {
  await p(1000);
  await p(1000);
  await p(1000);
  console.log("3000ms 후 실행");
})();
```

p가 실행되면 resolve가 될 때까지 기다렸다가 되면 내려가는 방식입니다.

## 여러개의 프로미스 객체를 적용할 때

### Promise.all

```js
function p(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms);
    }, 1000);
  });
}

(async function main() {
  const results = await Promise.all([p(1000), p(2000), p(3000)]);
  console.log(results);
})();
```

배열에 있는 전체가 resolve 되었을 때 가져옵니다.

### Promise.race

```js
function p(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms);
    }, 1000);
  });
}

(async function main() {
  const result = await Promise.race([p(1000), p(2000), p(3000)]);
  console.log(result);
})();
```

배열에 있는 가장 빠른 것이 resolve 되었을 때 가져옵니다.
