# LinkedList(링크드리스트)

떨어진 곳에 존재하는 데이터를 화살표로 `연결해서 관리`하는 데이터 구조입니다. **두 가지 개념**으로 기본 구조를 이해하면 됩니다.

- 노드 : 데이터 저장 단위로 구성
- 포인터 : 각 노드 안에서 다음 혹은 이전 노드와의 정보를 가지고 있는 공간 즉, 다음 데이터의 주소를 가리키는 공간입니다.

서로의 노드들이 연결되어 있어서 연결되어있는 데이터들은 **어느 위치에 있던 상관없이** 데이터를 가져올 수 있습니다. 데이터를 추가한다면 마지막에 연결되어 있지 않은(null 상태인) 노드의 주소를 새롭게 추가된 데이터에 연결하여 줍니다.

![linkedList](../assets/images/linkedList.svg)

## 기능

- append : 맨 마지막에 노드를 추가하는 기능
- preappend : 맨 처음에 노드를 추가하는 기능
- delete : 특정 노드를 삭제하는 기능
- desc : 전체 노드의 값을 출력하는 기능
- contains : 노드 중 값이 있는지 확인하는 기능

## 장점과 단점

- 장점
  - 데이터 공간을 미리 할당하지 않아도 된다.
- 단점
  - 연결을 위한 별도의 공간이 필요하므로 저장 효율이 좋지 않음
  - 연결 정보를 찾기 위한 소요로 인해 데이터에 접근하는 속도가 느림
  - 중간 데이터를 삭제시 노드를 재구성 해주어야 하는 부가적인 작업이 필요

## 구현

**Node**

```js
class Node {
  // 노드 생성시 데이터 값과 포인터(다음 노드의 주소를 나타낼 공간)를 생성
  constructor(data, next = null) {
    this.data = data;
    this.next = next; // next는 최초 null로 초기화
  }
}
```

**LinkedList**

```js
class LinkedList {
  // 링크드리스트 생성시 처음과 끝을 생성
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(data) {
    const node = new Node(data); // 새로운 데이터를 추가 할 때 새로운 노드 객체를 생성

    // 첫 노드가 없을 때 생성한 노드를 head, tail에 위치
    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      // 노드가 있다면 기존에 있는 노드가 새로 추가된 다음 주소를 가리키도록 하고, 끝에는 새롭게 추가된 노드를 삽입
      this.tail.next = node;
      this.tail = node;
    }
  }

  preappend(data) {
    const node = new Node(data);

    // 첫 노드가 없을 때 첫 노드에 생성
    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head; // 기존 head 노드는 새로운 노드의 다음이 됨
      this.head = node; // 새로운 노드는 첫 번째가 됨
    }
  }

  delete(data) {
    let currentNode = this.head; // 첫 노드로 초기화

    // 첫 노드 부터 순회하며 해당 값이 있는 노드가 있는지 확인
    while (currentNode) {
      // 다음 노드의 값과 같다면
      if (currentNode?.next?.data === data) {
        currentNode.next = currentNode.next.next; // 다음 노드를 다다음 노드로 삽입
      } else {
        currentNode = currentNode.next; // 다음 노드를 현재 노드로 바꾸어줌
      }
    }
  }
}
```
