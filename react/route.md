# Route(라우트)

어떤 `주소`에 어떤 `UI`를 보여줄지 규칙을 정하는 역할을 합니다. 기존에는 서버에서 처리를 했지만 `SPA`환경에서는 서버의 자원을 아끼고 클라이언트는 훨씬 더 좋은 성능의 사용감을 느낄 수 있습니다.

## 주요 컴포넌트

### BrowserRouter

HTML5 HISTORY API를 사용하면 서버측에 **새로운 요청을 하지 않고** `주소만 바꿔` 페이지를 다시 불러오지 않습니다.

### HashRouter

example.com/#/path/to/route 와 같은 주소형식을 사용하며 **옛날 브라우저**에서 주로 사용합니다.

### MemoryRouter

브라우저 주소와 무관하며 **일체 건들이지 않습니다**. 임베디드 웹앱, `리액트 네이티브` 등에서 사용합니다.

### StaticRouter

**서버사이드 렌더링**에서 사용합니다.

### Route

라우트를 정의할 때 사용합니다.

### Link

사용한 Router의 주소를 바꾸는 용도로 사용됩니다. a 태그지만 **새로고침**이 되지 않습니다.<br/>
만약 a 태그를 사용하게 된다면 새로고침이 되기 때문에 Link를 사용하여 라우팅을 해야합니다.

## Router 설치하기

```bash
yarn add react-router-dom
```

## Route 사용하기

### index.js

```js
import { BrowserRouter } from "react-router-dom";
```

index.js에 BrowserRouter를 불러와줍니다.

```js
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
```

App 컴포넌트를 감싸면 벌써 사용준비가 완료된 것입니다.<br/>
만약 HashRouter, MemoryRouter를 사용한다면 해당 라우터를 불러와 사용하면 됩니다.

### Home.js

```js
import React from "react";

function Home() {
  return (
    <div>
      <h1>홈</h1>
      <p>이 곳은 홈입니다. 가장 먼저 보여집니다.</p>
    </div>
  );
}

export default Home;
```

### About.js

```js
import React from "react";

function About() {
  return (
    <div>
      <h1>소개</h1>
      <p>이 프로젝트는 리액트 라우터를 실습해봅니다.</p>
    </div>
  );
}

export default About;
```

### App.js

```js
import React from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";

function App() {
  return (
    <div>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
    </div>
  );
}

export default App;
```

위 컴포넌트들을 Route로 감싸서 주소창에 **http://localhost:3000/about**을 입력해보면 홈과 about 페이지가 동시에 나타나는 것을 볼 수 있습니다.<br/>
그 이유는 about이라는 경로가 첫 번째인 **/**과 **/about** 둘 다 일치해서 두 컴포넌트가 함께 렌더링 되게 됩니다.<br/>
이를 해결하는 방법은 홈 컴포넌트에 `exact`를 추가하면 해결됩니다.

```js
import React from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";

function App() {
  return (
    <div>
      <Route path="/" component={Home} exact />
      <Route path="/about" component={About} />
    </div>
  );
}

export default App;
```

exact 값이 true일 경우엔 완벽히 주소가 **완벽히 일치** 할 때만 보여준다는 의미입니다.

## Link 사용하기

### App.js

```js
import React from "react";
import { Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";

function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
      </ul>
      <hr />
      <Route path="/" component={Home} exact />
      <Route path="/about" component={About} />
    </div>
  );
}

export default App;
```

Link의 특징은 페이지를 **새로고침 하지 않고 바로 렌더링** 할 때 사용합니다. `to`를 사용하여 정의된 Route의 주소를 나타내주면 새로고침 없이 바로 렌더링합니다.

## 파라미터와 쿼리

주소를 통해서 어떤 값을 읽어와야 할 때 사용합니다.

### 파라미터 사용하기

파라미터는 `match` props를 사용하여 파라미터를 받아올 수 있습니다.

#### Profile.js

```js
import React from "react";

const profileData = {
  junjang: {
    name: "김준형",
    description: "will be Frontend Engineer",
  },
  olaf: {
    name: "미스터 고",
    description: "will be best Frontend Engineer",
  },
};

function Profile({ match }) {
  const { username } = match.params;
  const profile = profileData[username];

  if (!profile) {
    return <div>존재하지 않는 사용자입니다.</div>;
  }

  return (
    <div>
      <h3>
        {username} ({profile.name})
      </h3>
      <p>{profile.description}</p>
    </div>
  );
}

export default Profile;
```

컴포넌트에서 `match`로 받아오는 props는 **Route에의 파라미터 값을 가져올 때** 사용합니다. 가져온 값을 profileData에서 찾아서 렌더링 합니다.

#### App.js

```js
import React from "react";
import { Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Profile from "./Profile";

function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
      </ul>
      <hr />
      <Route path="/" component={Home} exact />
      <Route path="/about" component={About} />
      <Route path="/profiles/:username" component={Profile} />
    </div>
  );
}

export default App;
```

path를 "/profiles/:username"을 나타냈는데, `:`이후 username을 보냈다는 것은 Profile 컴포넌트에서 받아오는 **match의 params** 값은 `username`이라는 것을 알 수 있습니다.

### 쿼리 사용하기

쿼리는 `location` props를 사용하여 쿼리를 받아올 수 있습니다. location의 값을 받아오면 `search`값으로 받아옵니다.<br/>
이를 추출하기 더 쉽게 `qs 라이브러리`를 사용하겠습니다.

#### About.js

```js
import React from "react";
import qs from "qs";

function About({ location }) {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  return (
    <div>
      <h1>소개</h1>
      <p>이 프로젝트는 리액트 라우터를 실습해봅니다.</p>
    </div>
  );
}

export default About;
```

location에서 받아오는 search를 파싱하는데, 이 때 `ignoreQueryPrefix`를 true로 해주지 않으면 ?가 함께 파싱되기 때문에 항상 true로 설정합니다.<br/>
그렇다면 특정 값이 들어올 경우 추가 렌더링을 해야할 땐 어떻게 해야할까요?

```js
import React from "react";
import qs from "qs";

function About({ location }) {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const detail = query.detail === "true";

  return (
    <div>
      <h1>소개</h1>
      <p>이 프로젝트는 리액트 라우터를 실습해봅니다.</p>
      {detail && <p>detail 값이 true 입니다!!!</p>}
    </div>
  );
}

export default About;
```

파싱한 query에 detail이 true인 조건을 가진 변수를 하나 만듭니다. 여기서 true가 **문자열인 이유**는 주소로 넘어오는 값은 무조건 문자열로 넘어오기 때문에 문자열로 비교해주어야 합니다.

## 서브라우트

라우트 내부에서 또 다른 라우트를 사용하는 것을 말합니다.

### Profiles.js

```js
import React from "react";
import Profile from "./Profile";
import { Link, Route } from "react-router-dom";

function Profiles() {
  return (
    <div>
      <h3>사용자 목록</h3>
      <ul>
        <li>
          <Link to="/profiles/junjang">junjang</Link>
        </li>
        <li>
          <Link to="/profiles/olaf">olaf</Link>
        </li>
      </ul>

      <Route
        path="/profiles"
        exact
        render={() => <div>사용자를 선택해주세요</div>}
      />
      <Route path="/profiles/:username" component={Profile} />
    </div>
  );
}

export default Profiles;
```

먼저 컴포넌트에 이동할 주소를 Link를 통해 명시해줍니다. 그리고 클릭시 해당 주소로 가게 되는데 이 경로를 외부에서 컨트롤 하지 않고 내부에 Route를 통해 파라미터값을 가진 컴포넌트로 이동합니다.<br/>기존에 만들었던 Profile 컴포넌트를 Profiles 라는 컴포넌트 내부에서 선택시 보여질 수 있도록 합니다.

### App.js

```js
import React from "react";
import { Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Profiles from "./Profiles";

function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/profiles">프로필 목록</Link>
        </li>
      </ul>
      <hr />
      <Route path="/" component={Home} exact />
      <Route path="/about" component={About} />
      <Route path="/profiles" component={Profiles} />
    </div>
  );
}

export default App;
```

프로필 목록을 추가해주고 목록을 보여주어야 할 컴포넌트를 Route에 선언합니다.<br/>
서브라우트는 페이지 내에 탭을 다룰 때 주로 사용합니다.
