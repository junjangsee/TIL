# Redux-thunk Promise

리덕스 thunk와 Promise를 함께 사용하며 API를 호출할 수 있습니다.<br/>
이전 TIL 리덕스 관련 코드가 작성되어있다는 전제하에 학습합니다.

## API

```js
const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n));

// 데이터
// { id, title, body }
const posts = [
  {
    id: 1,
    title: "리덕스의 난이도",
    body: "어렵네용",
  },
  {
    id: 2,
    title: "리덕스의 활용도",
    body: "엄청 높네용",
  },
  {
    id: 3,
    title: "리덕스는?",
    body: "재미지네용",
  },
];

export const getPosts = async () => {
  await sleep(500);
  return posts;
};

export const getPostById = async (id) => {
  await sleep(500);
  return posts.find((post) => post.id === id);
};
```

sleep Promise 함수를 만들었고 임의의 데이터 3개와 데이터를 불러오는 함수 두 개를 만들었습니다.<br/>

## module

API에서 만들었던 함수들을 가져와서 상태를 관리해줄 모듈을 생성합니다. 중복되는 코드가 많은 관계로 유틸 함수를 따로 만들어 관리하였습니다.

### 유틸 함수

```js
// API를 가져오는 함수
export const createPromiseThunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return (param) => async (dispatch) => {
    dispatch({ type });

    try {
      const payload = await promiseCreator(param);
      dispatch({
        type: SUCCESS,
        payload,
      });
    } catch (e) {
      dispatch({
        type: ERROR,
        payload: e,
        error: true,
      });
    }
  };
};

// 리듀서를 만드는 함수
export const handleAsyncActions = (type, key) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(),
        };
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(action.payload),
        };
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.payload),
        };
      default:
        return state;
    }
  };
};

// 리듀서 상태를 만드는 함수
export const reducerUtils = {
  initial: (data = null) => ({
    loading: false,
    data,
    error: null,
  }),
  loading: (prevState = null) => ({
    data: prevState,
    loading: true,
    error: null,
  }),
  success: (data) => ({
    data,
    loading: false,
    error: null,
  }),
  error: (error) => ({
    data: null,
    loading: false,
    error,
  }),
};
```

위 코드들처럼 용도에 맞는 함수를 분리하였습니다.

### 모듈

```js
import * as postsAPI from "../api/posts";
import {
  reducerUtils,
  createPromiseThunk,
  handleAsyncActions,
} from "../lib/asyncUtils";

// 액션 생성
const GET_POSTS = "GET_POSTS";
const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
const GET_POSTS_ERROR = "GET_POSTS_ERROR";

const GET_POST = "GET_POST";
const GET_POST_SUCCESS = "GET_POST_SUCCESS";
const GET_POST_ERROR = "GET_POST_ERROR";

// API 호출
export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById);

// 기본 상태
const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial(),
};

// 리듀서 생성
const getPostsReducer = handleAsyncActions(GET_POSTS, "posts");
const getPostReducer = handleAsyncActions(GET_POST, "post");

// 리듀서
export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return getPostsReducer(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return getPostReducer(state, action);
    default:
      return state;
  }
}
```

유틸 함수를 적용하여 최종 리듀서까지 생성합니다.

```js
import { combineReducers } from "redux";
import counter from "./counter";
import posts from "./posts";

const rootReducer = combineReducers({
  counter,
  posts,
});

export default rootReducer;
```

store에서 사용할 리듀서를 내보냅니다.

### 컴포넌트

```js
import React from "react";

function PostList({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

export default PostList;
```

posts 배열을 받아와 그려주는 컴포넌트를 만듭니다.

### 컨테이너

```js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../modules/posts";
import PostList from "../components/PostList";

function PostListContainer() {
  const { data, error, loading } = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return <PostList posts={data} />;
}

export default PostListContainer;
```

게시글의 상태들을 가져와 최초 렌더링 될 때 모듈에서 API 호출한 함수를 가져와 렌더링 후 조건문을 다 통과하면 해당 데이터를 가져와 props로 넘겨줍니다.
