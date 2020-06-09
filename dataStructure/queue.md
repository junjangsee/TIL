# Queue(큐)

가장 먼저 넣은 데이터를 가장 먼저 꺼낼 수 있는 구조로 `선입선출, FIFO(First-In, First-Out)`정책을 사용합니다. 음식점에서 줄을 선 사람이 먼저 입장하는 것과 같은 느낌으로 이해하면 됩니다.

![queue](../assets/images/queue.svg)

## 기능

- Enqueue : 큐에 데이터를 넣는 기능
- Dequeue : 큐에 데이터를 뺴는 기능

## 사용 용도

멀티 태스킹을 위한 프로세스 스케쥴링 방식을 구현하는데 자주 사용됩니다.

## 구현

```js
class Queue {
  constructor() {
    this._arr = []; // Queue 객체를 생성할 때 배열을 함께 생성합니다.
  }

  // Queue에 해당되는 두 개의 기능을 만듭니다.

  // 큐에 데이터를 넣는 기능을 만듭니다.
  enqueue(data) {
    this._arr.push(data); // 생성된 배열에 데이터를 넣습니다.
  }

  dequeue() {
    this._arr.shift(); // 배열의 마지막 데이터를 제거합니다.
  }
}
```
