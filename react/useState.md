# useState

동적인 상태값을 관리할 때 사용합니다. 기존에 함수형 컴포넌트에서는 상태관리가 불가능 했지만 16.8 버전 이후에는 useState를 활용하여 상태값을 관리할 수 있게 되었습니다.<br/>
카운팅 예제를 통해서 상태값 관리를 알아보겠습니다.

## 이벤트 선언

```js
import React from "react";

function Counter() {
  const onIncrease = () => {
    console.log("+1");
  };
  const onDecrease = () => {
    console.log("-1");
  };
  return (
    <div>
      <h1>0</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
```

각각의 버튼별 onClick 이벤트를 가지며 해당 함수를 정의하여 선언해줍니다. 이 때 **주의할 점**으로 `즉시실행하지 않도록` 합니다.<br/>
만약 즉시 실행할 경우 최초 렌더링 될 때 한 번 실행하기 때문입니다.

## useState 선언하기

```js
import React, { useState } from "react";
```

react를 가져올 때 useState 함수를 함께 가져옵니다.

```js
import React, { useState } from "react";

function Counter() {
  const [number, setNumber] = useState(0);

  const onIncrease = () => {
    console.log("+1");
  };
  const onDecrease = () => {
    console.log("-1");
  };
  return (
    <div>
      <h1>0</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
```

여기서 number는 `상태를 나타내는` 변수이고 setNumber는 `상태를 바꿔주는` 역할을 하게 됩니다.<br/>
useState 안에 있는 값은 생성된 `최초의 값`을 선언합니다.

## useState 사용하기

```js
import React, { useState } from "react";

function Counter() {
  const [number, setNumber] = useState(0);

  const onIncrease = () => {
    setNumber(number + 1);
  };
  const onDecrease = () => {
    setNumber(number - 1);
  };

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
```

number는 `현재의 상태값`이고, setNumber는 `상태값을 바꿔준다`고 했었죠?<br/>
그러면 증가 함수에서는 number를 1 증가시키고 감소 함수는 number를 1 감소 시켜야하니 setNumber를 통해 현재의 number를 증감 시켜준다면 상태 값이 바뀌게 될 것입니다.<br/>
그리고 현재 값을 h1태그에 나타내주게 되면 변화되는 상태를 보여주게 됩니다.

## Input 상태관리

useState를 input에서 사용하게 되었을 때 주의할 점이 있습니다. 바로 `value` 에 관한 것인데요 코드를 보겠습니다.

```js
import React, { useState } from "react";

function InputSample() {
  const [text, setText] = useState("");
  const onChange = (e) => {
    setText(e.target.value);
  };

  const onReset = () => {
    setText("");
  };

  return (
    <div>
      <input onChange={onChange} value={text} />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값:</b>
        {text}
      </div>
    </div>
  );
}

export default InputSample;
```

input에 값을 입력하고 초기화를 클릭하면 빈 텍스트로 만드는 코드입니다.<br/>
여기서 input에 `value가 없으면` **초기화가 안되므로** value를 꼭 `상태변화의 현재값`을 넣어주어야 합니다.

### input이 여러개일 때

input이 여러개일 뿐만 아니라 객체를 상태관리 할 때 중요한 부분이며 `불변성을 유지`하는데 아주 중요한 개념입니다.

```js
import React, { useState } from "react";

function InputSample() {
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
  });
  const { name, nickname } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;

    setInputs({ ...inputs, [name]: value });
  };

  const onReset = () => {
    setInputs({
      name: "",
      nickname: "",
    });
  };

  return (
    <div>
      <input name="name" placeholder="이름" onChange={onChange} value={name} />
      <input
        name="nickname"
        placeholder="닉네임"
        onChange={onChange}
        value={nickname}
      />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값:</b>
        {name} ({nickname})
      </div>
    </div>
  );
}

export default InputSample;
```

먼저 최초 상태값을 객체로 선언하였습니다. 이 두가지에 해당되는 input이 두개 있고 이 두개의 이벤트에는 객체를 **...inputs로 복사**한 후 input name별로 value를 업데이트 하고 있으며,<br/>
초기화의 경우 공백으로 다시 변경합니다.<br/>
