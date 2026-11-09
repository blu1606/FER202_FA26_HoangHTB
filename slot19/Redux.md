# Slot Redux — Redux, Redux Thunk & Redux Toolkit

> **Môn:** FER202 – Front-End Web Development with React
> **Mục tiêu:** Hiểu cách quản lý state toàn cục bằng Redux, xử lý bất đồng bộ bằng Redux Thunk, và viết Redux hiện đại bằng Redux Toolkit (RTK). Thực hành qua 5 bài tập step-by-step.
> **Phiên bản tham chiếu:** React 19 + Vite, `redux` 5.x, `react-redux` 9.x, `redux-thunk` 3.x, `@reduxjs/toolkit` 2.x, `axios`, `json-server`, `react-bootstrap` (tùy chọn).

---

## Mục lục

- [Phần A — Redux cơ bản](#phần-a--redux-cơ-bản)
  - [A1. Vì sao cần Redux?](#a1-vì-sao-cần-redux)
  - [A2. Ba nguyên tắc của Redux](#a2-ba-nguyên-tắc-của-redux)
  - [A3. Các khái niệm: Store, Action, Reducer, Dispatch](#a3-các-khái-niệm-store-action-reducer-dispatch)
  - [A4. Luồng dữ liệu một chiều](#a4-luồng-dữ-liệu-một-chiều)
  - [A5. Immutability — cập nhật state bất biến](#a5-immutability--cập-nhật-state-bất-biến)
  - [A6. combineReducers — chia nhỏ reducer](#a6-combinereducers--chia-nhỏ-reducer)
  - [A7. Kết nối React: Provider, useSelector, useDispatch](#a7-kết-nối-react-provider-useselector-usedispatch)
  - [A8. Middleware là gì?](#a8-middleware-là-gì)
- [Phần B — Redux Thunk](#phần-b--redux-thunk)
- [Phần C — Redux Toolkit (RTK)](#phần-c--redux-toolkit-rtk)
  - [C1. Vì sao cần Redux Toolkit?](#c1-vì-sao-cần-redux-toolkit)
  - [C2. configureStore](#c2-configurestore)
  - [C3. createSlice & Immer](#c3-createslice--immer)
  - [C4. createAsyncThunk & extraReducers](#c4-createasyncthunk--extrareducers)
  - [C5. Selector & createSelector](#c5-selector--createselector)
  - [C6. Giới thiệu RTK Query](#c6-giới-thiệu-rtk-query)
  - [C7. Redux Toolkit với TypeScript](#c7-redux-toolkit-với-typescript)
  - [C8. So sánh Redux thuần và Redux Toolkit](#c8-so-sánh-redux-thuần-và-redux-toolkit)
  - [C9. So sánh useContext và Redux — khi nào dùng?](#c9-so-sánh-usecontext-và-redux--khi-nào-dùng)
- [Phần D — 5 bài tập step-by-step](#phần-d--5-bài-tập-step-by-step)
  - [Bài 1: Counter với Redux thuần](#bài-1-counter-với-redux-thuần)
  - [Bài 2: Todo List với Redux thuần + combineReducers](#bài-2-todo-list-với-redux-thuần--combinereducers)
  - [Bài 3: Danh sách User với Redux Thunk](#bài-3-danh-sách-user-với-redux-thunk)
  - [Bài 4: Giỏ hàng với Redux Toolkit (createSlice)](#bài-4-giỏ-hàng-với-redux-toolkit-createslice)
  - [Bài 5: Quản lý Sinh viên CRUD với createAsyncThunk + json-server](#bài-5-quản-lý-sinh-viên-crud-với-createasyncthunk--json-server)
- [Phần E — Lỗi thường gặp & cách sửa](#phần-e--lỗi-thường-gặp--cách-sửa)
- [Phần F — Câu hỏi ôn tập](#phần-f--câu-hỏi-ôn-tập)

---

# Phần A — Redux cơ bản

## A1. Vì sao cần Redux?

Trong React, state nằm trong component. Khi nhiều component ở xa nhau cùng cần một dữ liệu (thông tin đăng nhập, giỏ hàng, theme…), ta phải **truyền props qua nhiều tầng** (*prop drilling*):

```
App (cart)
 ├── Header  ← cần số lượng giỏ hàng
 │    └── CartIcon  ← cần cart
 └── ProductPage
      └── ProductList
           └── ProductItem  ← cần hàm addToCart
```

**Redux** là thư viện quản lý state **toàn cục**: toàn bộ state dùng chung được đặt trong **một kho (store)** duy nhất, component nào cần thì **lấy trực tiếp** từ store, không cần truyền qua trung gian.

```
           ┌──────────── STORE ────────────┐
           │  { cart: [...], user: {...} } │
           └───────▲───────────────┬───────┘
          dispatch │               │ useSelector
         ┌─────────┴──┐     ┌──────▼──────┐
         │ ProductItem│     │  CartIcon   │
         └────────────┘     └─────────────┘
```

**Lợi ích:**
- State tập trung, dễ theo dõi, dễ debug (Redux DevTools xem từng thay đổi, "time-travel").
- Logic cập nhật state tách khỏi UI → dễ test.
- Luồng dữ liệu rõ ràng, dự đoán được.

## A2. Ba nguyên tắc của Redux

| Nguyên tắc | Ý nghĩa |
|---|---|
| **1. Single source of truth** | Toàn bộ state của ứng dụng nằm trong **một** object, trong **một** store. |
| **2. State is read-only** | Không sửa state trực tiếp. Cách duy nhất để thay đổi là **dispatch một action**. |
| **3. Changes are made with pure functions** | Việc thay đổi được mô tả bằng **reducer** — hàm thuần (pure function): `(state, action) => newState`. |

**Pure function** là hàm:
- Cùng input → luôn cùng output.
- Không có *side effect*: không gọi API, không `Math.random()`, không `Date.now()`, không sửa biến bên ngoài, **không sửa tham số đầu vào**.

## A3. Các khái niệm: Store, Action, Reducer, Dispatch

### Action

Là một **object JavaScript thuần** mô tả "điều gì đã xảy ra". Bắt buộc có thuộc tính `type`; dữ liệu đi kèm thường đặt trong `payload`.

```js
{ type: 'counter/increment' }
{ type: 'todos/added', payload: { id: 1, text: 'Học Redux' } }
```

> Quy ước đặt tên `type`: `'tênMiền/sựKiện'` (ví dụ `'cart/itemAdded'`).

### Action Creator

Hàm tạo ra action — tránh gõ sai chuỗi `type`:

```js
export const INCREMENT = 'counter/increment';
export const increment = () => ({ type: INCREMENT });
export const addTodo = (text) => ({ type: 'todos/added', payload: { id: Date.now(), text } });
```

### Reducer

Hàm nhận **state hiện tại** và **action**, trả về **state mới**:

```js
const initialState = { value: 0 };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'counter/increment':
      return { ...state, value: state.value + 1 };
    case 'counter/incrementByAmount':
      return { ...state, value: state.value + action.payload };
    default:
      return state;   // BẮT BUỘC: action không liên quan → trả về state cũ
  }
}
```

### Store

Nơi giữ state. Tạo bằng `createStore` (Redux thuần) hoặc `configureStore` (Redux Toolkit).

```js
import { legacy_createStore as createStore } from 'redux';
const store = createStore(counterReducer);

store.getState();                          // { value: 0 }
store.dispatch({ type: 'counter/increment' });
store.getState();                          // { value: 1 }

const unsubscribe = store.subscribe(() => console.log(store.getState())); // lắng nghe thay đổi
unsubscribe();
```

> 📝 Từ Redux 4.2, `createStore` bị gạch ngang (deprecated) để khuyến khích dùng Redux Toolkit. Hàm vẫn chạy bình thường; import `legacy_createStore` để hết cảnh báo. **Học Redux thuần để hiểu bản chất**, còn dự án thực tế dùng RTK.

### Dispatch

`store.dispatch(action)` — "gửi" action vào store. Store gọi reducer với `(stateHiệnTại, action)` và lưu kết quả làm state mới.

## A4. Luồng dữ liệu một chiều

```
   ┌────────┐  người dùng click   ┌──────────┐
   │   UI   │ ─────────────────▶ │ dispatch │
   └───▲────┘                    │ (action) │
       │                         └────┬─────┘
       │ re-render                    ▼
┌──────┴──────┐  state mới     ┌──────────┐
│ useSelector │ ◀───────────── │ reducer  │ (state, action) => newState
└─────────────┘                └──────────┘
                 STORE lưu state mới
```

1. Người dùng thao tác trên UI (bấm nút "+").
2. Component gọi `dispatch(increment())`.
3. Store chạy reducer → tạo state mới.
4. Các component đang `useSelector` phần state bị thay đổi sẽ tự động render lại.

## A5. Immutability — cập nhật state bất biến

Redux so sánh state cũ/mới **bằng tham chiếu** (`===`). Nếu bạn sửa trực tiếp object cũ, tham chiếu không đổi → **UI không cập nhật**.

```js
// ❌ SAI – mutate state
state.value++;                 return state;
state.todos.push(newTodo);     return state;

// ✅ ĐÚNG – tạo object/array mới
return { ...state, value: state.value + 1 };
return { ...state, todos: [...state.todos, newTodo] };
```

**Bảng mẫu cập nhật mảng bất biến (rất hay dùng):**

| Thao tác | Code |
|---|---|
| Thêm cuối | `[...arr, item]` |
| Thêm đầu | `[item, ...arr]` |
| Xóa theo id | `arr.filter(x => x.id !== id)` |
| Sửa theo id | `arr.map(x => x.id === id ? { ...x, done: !x.done } : x)` |
| Sửa object lồng | `{ ...state, user: { ...state.user, name: 'An' } }` |

> 💡 Redux Toolkit dùng thư viện **Immer**, cho phép viết `state.value++` mà vẫn bất biến (xem C3).

## A6. combineReducers — chia nhỏ reducer

Ứng dụng lớn → chia state thành nhiều "miền" (slice), mỗi miền một reducer:

```js
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  todos: todosReducer,     // quản lý state.todos
  filter: filterReducer,   // quản lý state.filter
});

// state tổng: { todos: [...], filter: 'all' }
```

Mỗi reducer con chỉ nhận **phần state của nó**. Khi dispatch, **mọi** reducer con đều được gọi; reducer nào không xử lý `type` đó thì trả về state cũ.

## A7. Kết nối React: Provider, useSelector, useDispatch

Cài đặt: `npm install redux react-redux`

**1) Bọc ứng dụng bằng `<Provider>`:**

```jsx
// main.jsx
import { Provider } from 'react-redux';
import { store } from './redux/store';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

**2) Đọc state bằng `useSelector`:**

```jsx
import { useSelector } from 'react-redux';
const count = useSelector((state) => state.counter.value);
```

- Component chỉ re-render khi **giá trị trả về** của selector thay đổi (so sánh `===`).
- ⚠️ Không trả về object/array **mới** mỗi lần trong selector (ví dụ `state => state.todos.filter(...)`) vì sẽ re-render liên tục → dùng `createSelector` (C5).

**3) Gửi action bằng `useDispatch`:**

```jsx
import { useDispatch } from 'react-redux';
const dispatch = useDispatch();
<button onClick={() => dispatch(increment())}>+</button>
```

> 📝 Cách cũ dùng HOC `connect(mapStateToProps, mapDispatchToProps)(Component)` vẫn còn trong nhiều dự án cũ, nhưng **hooks là cách khuyến nghị** hiện nay.

## A8. Middleware là gì?

**Middleware** là lớp chen giữa `dispatch(action)` và reducer, cho phép: ghi log, gọi API, xử lý bất đồng bộ, chặn/biến đổi action…

```
dispatch(action) ──▶ middleware 1 ──▶ middleware 2 ──▶ reducer
```

Cấu trúc một middleware (3 hàm lồng nhau):

```js
const logger = (store) => (next) => (action) => {
  console.log('▶ dispatch', action);
  const result = next(action);              // chuyển action cho middleware/reducer tiếp theo
  console.log('◀ state mới', store.getState());
  return result;
};

const store = createStore(rootReducer, applyMiddleware(logger));
```

---

# Phần B — Redux Thunk

## B1. Vấn đề: reducer không được gọi API

Reducer phải **thuần** và **đồng bộ** → không được `fetch`/`axios` trong reducer. Action là object → không chứa được logic bất đồng bộ. Vậy gọi API ở đâu?

→ **Redux Thunk**: middleware cho phép `dispatch` một **hàm** (thunk) thay vì object.

## B2. Thunk là gì?

**Thunk** = hàm trả về một hàm khác để "trì hoãn" công việc. Với Redux Thunk:

```js
// Action creator bình thường → trả về OBJECT
const increment = () => ({ type: 'counter/increment' });

// Thunk action creator → trả về HÀM (dispatch, getState) => {...}
const incrementAsync = () => (dispatch, getState) => {
  setTimeout(() => {
    dispatch(increment());               // sau 1 giây mới dispatch action thật
  }, 1000);
};

dispatch(incrementAsync());
```

Bên trong, redux-thunk chỉ làm đúng một việc:

```js
const thunk = (store) => (next) => (action) =>
  typeof action === 'function'
    ? action(store.dispatch, store.getState)  // là hàm → gọi nó
    : next(action);                            // là object → đi tiếp như thường
```

## B3. Cài đặt

```bash
npm install redux-thunk
```

```js
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';            // v3: named export { thunk }

// Kết hợp với Redux DevTools Extension (nếu đã cài trên trình duyệt)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
```

> ⚠️ Redux Thunk v2 dùng `import thunk from 'redux-thunk'` (default export). **v3 đổi thành `import { thunk } from 'redux-thunk'`**.

## B4. Mẫu 3 action cho một request API

Mỗi lần gọi API có 3 trạng thái → 3 action:

| Action | Khi nào | State |
|---|---|---|
| `users/fetchRequest` | Bắt đầu gọi | `loading: true, error: null` |
| `users/fetchSuccess` | Thành công | `loading: false, items: payload` |
| `users/fetchFailure` | Lỗi | `loading: false, error: payload` |

```js
export const fetchUsers = () => async (dispatch) => {
  dispatch({ type: 'users/fetchRequest' });
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    dispatch({ type: 'users/fetchSuccess', payload: res.data });
  } catch (err) {
    dispatch({ type: 'users/fetchFailure', payload: err.message });
  }
};
```

Thunk còn có thể dùng `getState()` để kiểm tra trước khi gọi API (ví dụ: đã có dữ liệu thì không gọi lại).

> 📝 Các middleware async khác: **redux-saga** (generator), **redux-observable** (RxJS). Thunk là đơn giản nhất và được tích hợp sẵn trong Redux Toolkit.

---

# Phần C — Redux Toolkit (RTK)

## C1. Vì sao cần Redux Toolkit?

Redux thuần có nhiều **boilerplate**: hằng số `type`, action creator, switch-case, spread lồng nhau, cấu hình middleware + DevTools thủ công. **Redux Toolkit** là cách viết Redux **chính thức được khuyến nghị**:

```bash
npm install @reduxjs/toolkit react-redux
```

| API | Thay thế cho |
|---|---|
| `configureStore` | `createStore` + `combineReducers` + `applyMiddleware` + DevTools |
| `createSlice` | action types + action creators + reducer switch-case |
| `createAsyncThunk` | thunk tự viết + 3 action request/success/failure |
| `createSelector` | selector có ghi nhớ (memoized) |
| `createApi` (RTK Query) | toàn bộ logic fetch + cache dữ liệu |

## C2. configureStore

```js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import todosReducer from './todosSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,   // tự combineReducers
    todos: todosReducer,
  },
  // middleware: (getDefault) => getDefault().concat(logger),  // tùy chọn thêm middleware
});
```

`configureStore` **tự động**:
- Gộp reducer (`combineReducers`).
- Thêm sẵn **redux-thunk**.
- Bật **Redux DevTools**.
- Thêm middleware kiểm tra lỗi khi dev: phát hiện **mutate state ngoài reducer** và **giá trị không serialize được** (Date, Promise, function…) trong state/action.

## C3. createSlice & Immer

Một **slice** = reducer + actions của một miền state:

```js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',                 // tiền tố của action type → 'counter/increment'
  initialState: { value: 0 },
  reducers: {
    increment(state) {
      state.value += 1;            // "mutate" được nhờ Immer
    },
    decrement(state) {
      state.value -= 1;
    },
    incrementByAmount(state, action) {
      state.value += action.payload;
    },
    reset() {
      return { value: 0 };         // hoặc trả về state mới hoàn toàn
    },
  },
});

export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions; // action creators tự sinh
export default counterSlice.reducer;
```

```js
increment()              // → { type: 'counter/increment', payload: undefined }
incrementByAmount(5)     // → { type: 'counter/incrementByAmount', payload: 5 }
```

### Immer hoạt động thế nào?

Immer đưa cho reducer một **bản nháp (draft)**. Bạn "sửa" draft thoải mái, Immer ghi lại các thay đổi và **tạo ra state mới bất biến**.

**Quy tắc khi dùng Immer:** trong một case reducer, chọn **một trong hai**:
- **Sửa** `state` và **không return** gì, **hoặc**
- **Return** một giá trị mới và **không sửa** `state`.

```js
// ❌ SAI: vừa sửa vừa return
addTodo(state, action) { state.push(action.payload); return state.filter(...); }

// ✅ Đúng
removeTodo(state, action) { return state.filter((t) => t.id !== action.payload); }
toggleTodo(state, action) {
  const todo = state.find((t) => t.id === action.payload);
  if (todo) todo.done = !todo.done;
}
```

### `prepare` — tùy biến payload

```js
reducers: {
  addTodo: {
    reducer(state, action) { state.push(action.payload); },
    prepare(text) {
      return { payload: { id: nanoid(), text, done: false } };  // nanoid từ @reduxjs/toolkit
    },
  },
}
// dispatch(addTodo('Học RTK'))
```

> 💡 Sinh `id` ngẫu nhiên phải đặt trong `prepare` hoặc component, **không** đặt trong reducer (reducer phải thuần).

## C4. createAsyncThunk & extraReducers

`createAsyncThunk` tạo thunk gọi API và **tự dispatch 3 action**: `pending`, `fulfilled`, `rejected`.

```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',                       // tiền tố type
  async (_, { rejectWithValue }) => {        // tham số 1: arg truyền khi dispatch; tham số 2: thunkAPI
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users');
      return res.data;                       // → action.payload của fulfilled
    } catch (err) {
      return rejectWithValue(err.message);   // → action.payload của rejected
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: { items: [], status: 'idle', error: null }, // idle | loading | succeeded | failed
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? action.error.message;
      });
  },
});
```

| | `reducers` | `extraReducers` |
|---|---|---|
| Xử lý action | do **chính slice này** định nghĩa | được tạo **bên ngoài** (createAsyncThunk, action của slice khác) |
| Tự sinh action creator | ✅ | ❌ |

> ⚠️ RTK 2.x **bỏ** cú pháp object `extraReducers: { [fetchUsers.fulfilled]: ... }`. **Bắt buộc dùng builder callback** như trên.

**`thunkAPI`** (tham số thứ 2) gồm: `dispatch`, `getState`, `rejectWithValue`, `signal` (hủy request)…

**Xử lý kết quả trong component với `.unwrap()`:**

```jsx
try {
  await dispatch(addStudent(data)).unwrap();   // ném lỗi nếu rejected
  alert('Thêm thành công');
} catch (err) {
  alert('Lỗi: ' + err);
}
```

**`condition`** — bỏ qua gọi API nếu không cần:

```js
createAsyncThunk('users/fetch', fetcher, {
  condition: (_, { getState }) => getState().users.status !== 'loading',
});
```

## C5. Selector & createSelector

**Selector** là hàm lấy dữ liệu từ state. Nên viết sẵn trong file slice để tái sử dụng:

```js
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
```

**Dữ liệu dẫn xuất** (lọc, sắp xếp → mảng mới) nên dùng `createSelector` để **ghi nhớ** (chỉ tính lại khi input đổi):

```js
import { createSelector } from '@reduxjs/toolkit';

const selectTodos = (state) => state.todos;
const selectFilter = (state) => state.filter;

export const selectVisibleTodos = createSelector(
  [selectTodos, selectFilter],                 // input selectors
  (todos, filter) => {                         // result function
    if (filter === 'active') return todos.filter((t) => !t.done);
    if (filter === 'done') return todos.filter((t) => t.done);
    return todos;
  }
);
```

> **Nguyên tắc:** Lưu trong state **dữ liệu tối thiểu**; những gì tính được (tổng tiền, số lượng, danh sách đã lọc) thì tính bằng selector, **không** lưu vào state.

## C6. Giới thiệu RTK Query

RTK Query (có sẵn trong `@reduxjs/toolkit`) tự lo fetch, cache, loading, refetch — không cần viết slice/thunk:

```js
// services/studentApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const studentApi = createApi({
  reducerPath: 'studentApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9999/' }),
  tagTypes: ['Student'],
  endpoints: (builder) => ({
    getStudents: builder.query({ query: () => 'students', providesTags: ['Student'] }),
    addStudent: builder.mutation({
      query: (body) => ({ url: 'students', method: 'POST', body }),
      invalidatesTags: ['Student'],   // thêm xong tự fetch lại danh sách
    }),
  }),
});

export const { useGetStudentsQuery, useAddStudentMutation } = studentApi;
```

```js
// store.js
reducer: { [studentApi.reducerPath]: studentApi.reducer },
middleware: (getDefault) => getDefault().concat(studentApi.middleware),
```

```jsx
const { data = [], isLoading, error } = useGetStudentsQuery();
const [addStudent] = useAddStudentMutation();
```

> Dùng **createAsyncThunk** khi muốn hiểu rõ luồng & kiểm soát state; dùng **RTK Query** khi ứng dụng chủ yếu là đọc/ghi dữ liệu từ server.

## C7. Redux Toolkit với TypeScript

Nếu project dùng `.tsx`, thêm các kiểu sau:

```ts
// store.ts
export const store = configureStore({ reducer: { counter: counterReducer } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

```ts
// hooks.ts — dùng thay cho useSelector/useDispatch gốc
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

```ts
// counterSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type CounterState = { value: number };
const initialState: CounterState = { value: 0 };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});
```

```ts
// createAsyncThunk có kiểu: <KiểuTrảVề, KiểuThamSố, { rejectValue: KiểuLỗi }>
export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  'users/fetch',
  async (_, { rejectWithValue }) => { /* ... */ }
);
```

## C8. So sánh Redux thuần và Redux Toolkit

| Tiêu chí | Redux thuần | Redux Toolkit |
|---|---|---|
| Tạo store | `createStore` + `combineReducers` + `applyMiddleware` + compose DevTools | `configureStore({ reducer })` |
| Action type | Tự khai báo hằng số | Tự sinh từ `name` + tên reducer |
| Action creator | Tự viết | Tự sinh (`slice.actions`) |
| Reducer | `switch-case`, spread bất biến | Hàm theo tên, "mutate" nhờ Immer |
| Async | Cài redux-thunk, tự viết 3 action | `createAsyncThunk` (thunk có sẵn) |
| Lượng code | Nhiều | Ít hơn ~50–70% |
| Dùng khi | Học bản chất, bảo trì dự án cũ | **Mọi dự án mới** |

## C9. So sánh useContext và Redux — khi nào dùng?

Không phải lúc nào cũng *phải* dùng Redux. Điểm khác cốt lõi:

> **Context chỉ là cơ chế *truyền* dữ liệu xuống cây component. Redux là công cụ *quản lý* state.**

Context không tự quản lý gì: state vẫn nằm trong `useState`/`useReducer` của một component cha, Context chỉ giúp component con lấy được state đó mà không phải truyền props qua từng tầng. Khi ứng dụng lớn dần, Context gặp 4 hạn chế mà Redux giải quyết được.

### 1. Render lại thừa (lý do quan trọng nhất)

```jsx
const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  return (
    <AppContext.Provider value={{ user, cart, setUser, setCart }}>
      {children}
    </AppContext.Provider>
  );
}

function Avatar() {
  const { user } = useContext(AppContext); // chỉ cần user...
  return <img src={user?.avatar} />;
}
```

Mỗi lần thêm hàng vào giỏ, `value` là một object **mới** → **mọi component dùng `useContext(AppContext)` đều render lại**, kể cả `Avatar` không hề dùng `cart`. Context không cho chọn "chỉ lấy một phần".

Với Redux:

```jsx
const user = useSelector((state) => state.user); // chỉ render lại khi state.user đổi
```

`useSelector` chỉ đăng ký đúng phần state component cần → giỏ hàng thay đổi thì `Avatar` không bị ảnh hưởng.

> Muốn tránh chuyện này với Context, phải tách nhiều Context nhỏ (`UserContext`, `CartContext`, `ThemeContext`…), lồng hàng loạt Provider vào nhau ("Provider hell") và thêm `useMemo` cho `value`.

### 2. Tổ chức logic

Với Context, logic cập nhật state thường nằm rải rác trong các Provider. Redux bắt buộc mọi thay đổi đi qua `dispatch(action)` → reducer, nên luồng dữ liệu luôn rõ "ai đổi cái gì, khi nào". Logic nằm trong các file slice, tách khỏi UI, dễ test.

### 3. Xử lý bất đồng bộ

Context không có cơ chế riêng cho việc gọi API: phải tự viết `useEffect`, tự quản lý loading/lỗi trong Provider. Redux có middleware: Thunk, `createAsyncThunk` (tự sinh `pending/fulfilled/rejected`), RTK Query (lo luôn phần cache).

### 4. Gỡ lỗi

Redux DevTools cho xem từng action, so sánh state trước/sau, "time-travel" về state cũ. Context không có công cụ tương đương.

### Bảng so sánh

| | `useContext` | Redux Toolkit |
|---|---|---|
| Bản chất | Truyền dữ liệu | Quản lý state |
| Render lại | **Mọi** component dùng context | Chỉ component có phần state đổi |
| Tổ chức logic | Rải rác trong Provider | Tập trung trong slice/reducer |
| Bất đồng bộ | Tự viết | Thunk / createAsyncThunk / RTK Query |
| DevTools | Không | Có (time-travel) |
| Cài thêm thư viện | Không | Có |
| Phù hợp | Dữ liệu **ít thay đổi**: theme, ngôn ngữ, user đăng nhập | State **lớn, thay đổi thường xuyên**, nhiều nơi đọc/ghi: giỏ hàng, danh sách dữ liệu, bộ lọc |

### Khi nào dùng cái nào?

| Công cụ | Phù hợp |
|---|---|
| `useState` / `useReducer` | State cục bộ trong 1 component hoặc vài component gần nhau |
| `useContext` (+ `useReducer`) | Dữ liệu toàn cục **ít thay đổi**, app nhỏ |
| **Redux Toolkit** | State toàn cục **lớn, thay đổi thường xuyên**, nhiều nơi cập nhật, nhiều thao tác gọi API, làm việc nhóm cần cấu trúc thống nhất |
| RTK Query / TanStack Query | Dữ liệu từ server (cache, refetch) |

> **Tóm lại:** App nhỏ, state toàn cục ít → `useContext` + `useReducer` là đủ, không cần Redux. Khi state dùng chung nhiều, cập nhật liên tục, nhiều gọi API hoặc dự án nhóm → Redux Toolkit giúp đỡ vất vả hơn.

---

# Phần D — 5 bài tập step-by-step

> **Chuẩn bị chung**
> - Node.js ≥ 20, VS Code.
> - Cài extension trình duyệt **Redux DevTools** (Chrome/Edge/Firefox) để xem state & action.
> - Mỗi bài tạo một project Vite riêng, hoặc làm chung một project và đổi component trong `App.jsx`.
>
> ```bash
> npm create vite@latest redux-labs -- --template react
> cd redux-labs
> npm install
> ```
>
> | Bài | Chủ đề | Thư viện |
> |---|---|---|
> | 1 | Counter | `redux`, `react-redux` |
> | 2 | Todo List | `redux`, `react-redux` |
> | 3 | Danh sách User (API) | + `redux-thunk`, `axios` |
> | 4 | Giỏ hàng | `@reduxjs/toolkit`, `react-redux` |
> | 5 | CRUD Sinh viên | `@reduxjs/toolkit`, `axios`, `json-server` |
>
> Giao diện dùng **React-Bootstrap** cho thống nhất với các Lab trước:
> ```bash
> npm install react-bootstrap bootstrap
> ```
> Thêm vào `src/main.jsx`: `import 'bootstrap/dist/css/bootstrap.min.css';`

---

## Bài 1: Counter với Redux thuần

**🎯 Mục tiêu:** Hiểu rõ Store, Action, Action Creator, Reducer, Dispatch, Provider, `useSelector`, `useDispatch`.

**Kết quả:** Một bộ đếm có các nút `-`, `+`, `+5`, `Reset`, ô nhập số bước, và hiển thị số chẵn/lẻ.

### Bước 1 — Cài thư viện

```bash
npm install redux react-redux
```

### Bước 2 — Cấu trúc thư mục

```
src/
├── redux/
│   ├── counterActions.js   → action types + action creators
│   ├── counterReducer.js   → reducer
│   └── store.js            → tạo store
├── components/
│   └── Counter.jsx
├── App.jsx
└── main.jsx
```

### Bước 3 — Action types & action creators

`src/redux/counterActions.js`:

```js
// 1. Action types (hằng số tránh gõ sai chuỗi)
export const INCREMENT = 'counter/increment';
export const DECREMENT = 'counter/decrement';
export const INCREMENT_BY_AMOUNT = 'counter/incrementByAmount';
export const RESET = 'counter/reset';

// 2. Action creators
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
export const incrementByAmount = (amount) => ({ type: INCREMENT_BY_AMOUNT, payload: amount });
export const reset = () => ({ type: RESET });
```

### Bước 4 — Reducer

`src/redux/counterReducer.js`:

```js
import { INCREMENT, DECREMENT, INCREMENT_BY_AMOUNT, RESET } from './counterActions';

const initialState = { value: 0 };

export default function counterReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, value: state.value + 1 };
    case DECREMENT:
      return { ...state, value: state.value - 1 };
    case INCREMENT_BY_AMOUNT:
      return { ...state, value: state.value + action.payload };
    case RESET:
      return initialState;
    default:
      return state;
  }
}
```

### Bước 5 — Store

`src/redux/store.js`:

```js
import { legacy_createStore as createStore, combineReducers } from 'redux';
import counterReducer from './counterReducer';

const rootReducer = combineReducers({
  counter: counterReducer,          // state.counter.value
});

export const store = createStore(
  rootReducer,
  // Bật Redux DevTools Extension (nếu đã cài)
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
```

### Bước 6 — Bọc App bằng Provider

`src/main.jsx`:

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
import { store } from './redux/store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
```

### Bước 7 — Component Counter

`src/components/Counter.jsx`:

```jsx
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Form, InputGroup, Badge } from 'react-bootstrap';
import { increment, decrement, incrementByAmount, reset } from '../redux/counterActions';

export default function Counter() {
  const count = useSelector((state) => state.counter.value);   // đọc state
  const dispatch = useDispatch();                               // lấy hàm dispatch
  const [step, setStep] = useState(2);                          // state cục bộ của ô nhập

  return (
    <Card className="mx-auto mt-5 text-center shadow" style={{ maxWidth: 420 }}>
      <Card.Header as="h4">Redux Counter</Card.Header>
      <Card.Body>
        <h1 className="display-3">{count}</h1>
        <Badge bg={count % 2 === 0 ? 'success' : 'warning'} className="mb-3">
          {count % 2 === 0 ? 'Số chẵn' : 'Số lẻ'}
        </Badge>

        <div className="d-flex justify-content-center gap-2 mb-3">
          <Button variant="danger" onClick={() => dispatch(decrement())}>-</Button>
          <Button variant="success" onClick={() => dispatch(increment())}>+</Button>
          <Button variant="primary" onClick={() => dispatch(incrementByAmount(5))}>+5</Button>
          <Button variant="secondary" onClick={() => dispatch(reset())}>Reset</Button>
        </div>

        <InputGroup>
          <Form.Control
            type="number"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
          />
          <Button onClick={() => dispatch(incrementByAmount(step))}>Cộng {step}</Button>
        </InputGroup>
      </Card.Body>
    </Card>
  );
}
```

`src/App.jsx`:

```jsx
import Counter from './components/Counter';

export default function App() {
  return <Counter />;
}
```

### Bước 8 — Chạy & kiểm tra

```bash
npm run dev
```

- Bấm các nút → số thay đổi.
- Mở F12 → tab **Redux** → xem từng action (`counter/increment`…), tab *Diff* để thấy state thay đổi, kéo thanh *slider* để "time-travel".

### 💡 Giải thích luồng

```
Bấm "+" → dispatch(increment())
        → dispatch({ type: 'counter/increment' })
        → store gọi rootReducer(state, action)
        → counterReducer trả về { value: value + 1 }
        → useSelector phát hiện state.counter.value thay đổi → Counter re-render
```

**⭐ Mở rộng:**
1. Thêm action `counter/double` (nhân đôi).
2. Không cho giá trị âm: xử lý trong reducer `Math.max(0, state.value - 1)`.
3. Tạo component `CounterDisplay` riêng chỉ hiển thị số → chứng minh 2 component **không truyền props** vẫn dùng chung state.

---

## Bài 2: Todo List với Redux thuần + combineReducers

**🎯 Mục tiêu:** Quản lý mảng trong state bất biến (thêm/sửa/xóa), chia state thành 2 reducer (`todos`, `filter`), dùng selector.

### Bước 1 — Cấu trúc

```
src/redux/
├── actionTypes.js
├── actions.js
├── reducers/
│   ├── todosReducer.js
│   ├── filterReducer.js
│   └── index.js           → combineReducers
├── selectors.js
└── store.js
src/components/
├── TodoForm.jsx
├── TodoList.jsx
├── TodoItem.jsx
└── FilterBar.jsx
```

### Bước 2 — Action types

`src/redux/actionTypes.js`:

```js
export const ADD_TODO = 'todos/add';
export const TOGGLE_TODO = 'todos/toggle';
export const DELETE_TODO = 'todos/delete';
export const EDIT_TODO = 'todos/edit';
export const CLEAR_COMPLETED = 'todos/clearCompleted';
export const SET_FILTER = 'filter/set';
```

### Bước 3 — Action creators

`src/redux/actions.js`:

```js
import * as T from './actionTypes';

// id tạo ở action creator – KHÔNG tạo trong reducer (reducer phải thuần)
export const addTodo = (text) => ({
  type: T.ADD_TODO,
  payload: { id: Date.now(), text, done: false },
});
export const toggleTodo = (id) => ({ type: T.TOGGLE_TODO, payload: id });
export const deleteTodo = (id) => ({ type: T.DELETE_TODO, payload: id });
export const editTodo = (id, text) => ({ type: T.EDIT_TODO, payload: { id, text } });
export const clearCompleted = () => ({ type: T.CLEAR_COMPLETED });
export const setFilter = (filter) => ({ type: T.SET_FILTER, payload: filter }); // 'all' | 'active' | 'done'
```

### Bước 4 — Reducers

`src/redux/reducers/todosReducer.js`:

```js
import * as T from '../actionTypes';

const initialState = [
  { id: 1, text: 'Học Redux cơ bản', done: true },
  { id: 2, text: 'Làm bài tập Todo', done: false },
];

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case T.ADD_TODO:
      return [...state, action.payload];                                   // thêm

    case T.TOGGLE_TODO:
      return state.map((t) => (t.id === action.payload ? { ...t, done: !t.done } : t)); // sửa 1 trường

    case T.EDIT_TODO:
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, text: action.payload.text } : t
      );

    case T.DELETE_TODO:
      return state.filter((t) => t.id !== action.payload);                 // xóa

    case T.CLEAR_COMPLETED:
      return state.filter((t) => !t.done);

    default:
      return state;
  }
}
```

`src/redux/reducers/filterReducer.js`:

```js
import { SET_FILTER } from '../actionTypes';

export default function filterReducer(state = 'all', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.payload;
    default:
      return state;
  }
}
```

`src/redux/reducers/index.js`:

```js
import { combineReducers } from 'redux';
import todosReducer from './todosReducer';
import filterReducer from './filterReducer';

export default combineReducers({
  todos: todosReducer,     // state.todos  : mảng
  filter: filterReducer,   // state.filter : chuỗi
});
```

### Bước 5 — Selectors & Store

`src/redux/selectors.js`:

```js
export const selectTodos = (state) => state.todos;
export const selectFilter = (state) => state.filter;
export const selectRemaining = (state) => state.todos.filter((t) => !t.done).length;
```

> 💡 `selectRemaining` trả về **số** (kiểu nguyên thủy) nên an toàn. Danh sách đã lọc (mảng mới) sẽ được tính trong component bằng `useMemo` — hoặc dùng `createSelector` ở Bài 4.

`src/redux/store.js`:

```js
import { legacy_createStore as createStore } from 'redux';
import rootReducer from './reducers';

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
```

`main.jsx` bọc `<Provider store={store}>` giống Bài 1.

### Bước 6 — Components

`src/components/TodoForm.jsx`:

```jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { addTodo } from '../redux/actions';

export default function TodoForm() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addTodo(text.trim()));
    setText('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Control
          placeholder="Nhập công việc..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button type="submit" disabled={!text.trim()}>Thêm</Button>
      </InputGroup>
    </Form>
  );
}
```

`src/components/FilterBar.jsx`:

```jsx
import { useSelector, useDispatch } from 'react-redux';
import { ButtonGroup, Button } from 'react-bootstrap';
import { setFilter } from '../redux/actions';
import { selectFilter } from '../redux/selectors';

const FILTERS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'active', label: 'Chưa xong' },
  { key: 'done', label: 'Đã xong' },
];

export default function FilterBar() {
  const current = useSelector(selectFilter);
  const dispatch = useDispatch();

  return (
    <ButtonGroup className="my-3">
      {FILTERS.map((f) => (
        <Button
          key={f.key}
          variant={current === f.key ? 'primary' : 'outline-primary'}
          onClick={() => dispatch(setFilter(f.key))}
        >
          {f.label}
        </Button>
      ))}
    </ButtonGroup>
  );
}
```

`src/components/TodoItem.jsx`:

```jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ListGroup, Form, Button } from 'react-bootstrap';
import { toggleTodo, deleteTodo, editTodo } from '../redux/actions';

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const save = () => {
    if (text.trim()) dispatch(editTodo(todo.id, text.trim()));
    setEditing(false);
  };

  return (
    <ListGroup.Item className="d-flex align-items-center gap-2">
      <Form.Check checked={todo.done} onChange={() => dispatch(toggleTodo(todo.id))} />

      {editing ? (
        <Form.Control
          size="sm"
          value={text}
          autoFocus
          onChange={(e) => setText(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => e.key === 'Enter' && save()}
        />
      ) : (
        <span
          className="flex-grow-1"
          style={{ textDecoration: todo.done ? 'line-through' : 'none', cursor: 'pointer' }}
          onDoubleClick={() => setEditing(true)}
          title="Double-click để sửa"
        >
          {todo.text}
        </span>
      )}

      <Button size="sm" variant="outline-danger" onClick={() => dispatch(deleteTodo(todo.id))}>
        Xóa
      </Button>
    </ListGroup.Item>
  );
}
```

`src/components/TodoList.jsx`:

```jsx
import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListGroup, Button } from 'react-bootstrap';
import TodoItem from './TodoItem';
import { selectTodos, selectFilter, selectRemaining } from '../redux/selectors';
import { clearCompleted } from '../redux/actions';

export default function TodoList() {
  const todos = useSelector(selectTodos);
  const filter = useSelector(selectFilter);
  const remaining = useSelector(selectRemaining);
  const dispatch = useDispatch();

  const visible = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.done);
    if (filter === 'done') return todos.filter((t) => t.done);
    return todos;
  }, [todos, filter]);

  return (
    <>
      <ListGroup>
        {visible.length === 0 && <ListGroup.Item className="text-muted">Không có công việc</ListGroup.Item>}
        {visible.map((t) => <TodoItem key={t.id} todo={t} />)}
      </ListGroup>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <small>Còn <b>{remaining}</b> việc chưa xong</small>
        <Button size="sm" variant="link" onClick={() => dispatch(clearCompleted())}>
          Xóa việc đã xong
        </Button>
      </div>
    </>
  );
}
```

`src/App.jsx`:

```jsx
import { Container, Card } from 'react-bootstrap';
import TodoForm from './components/TodoForm';
import FilterBar from './components/FilterBar';
import TodoList from './components/TodoList';

export default function App() {
  return (
    <Container className="py-5" style={{ maxWidth: 600 }}>
      <Card className="shadow">
        <Card.Body>
          <h3 className="mb-3">📝 Redux Todo</h3>
          <TodoForm />
          <FilterBar />
          <TodoList />
        </Card.Body>
      </Card>
    </Container>
  );
}
```

### Bước 7 — Kiểm tra

- Thêm / tick / double-click sửa / xóa công việc.
- Đổi bộ lọc.
- Redux DevTools → tab *State*: thấy `{ todos: [...], filter: 'active' }` — hai reducer độc lập.

**⭐ Mở rộng:** Lưu todos vào `localStorage`:

```js
// store.js
const saved = JSON.parse(localStorage.getItem('todos') || 'null');
export const store = createStore(rootReducer, saved ? { todos: saved, filter: 'all' } : undefined, /* devtools */);
store.subscribe(() => localStorage.setItem('todos', JSON.stringify(store.getState().todos)));
```

> Lưu ý: khi có `preloadedState`, DevTools enhancer là **tham số thứ 3** của `createStore`.

---

## Bài 3: Danh sách User với Redux Thunk

**🎯 Mục tiêu:** Cấu hình middleware `redux-thunk`, viết thunk gọi API bằng axios, mẫu 3 action `request/success/failure`, hiển thị loading/error, dùng `getState` trong thunk.

**API:** `https://jsonplaceholder.typicode.com/users` và `/posts?userId=...`

### Bước 1 — Cài thư viện

```bash
npm install redux react-redux redux-thunk axios
```

### Bước 2 — Cấu trúc

```
src/redux/
├── users/
│   ├── userTypes.js
│   ├── userActions.js    → action creators + thunk
│   └── userReducer.js
├── rootReducer.js
└── store.js
src/components/
├── UserList.jsx
└── UserPosts.jsx
```

### Bước 3 — Action types

`src/redux/users/userTypes.js`:

```js
export const FETCH_USERS_REQUEST = 'users/fetchRequest';
export const FETCH_USERS_SUCCESS = 'users/fetchSuccess';
export const FETCH_USERS_FAILURE = 'users/fetchFailure';

export const FETCH_POSTS_REQUEST = 'posts/fetchRequest';
export const FETCH_POSTS_SUCCESS = 'posts/fetchSuccess';
export const FETCH_POSTS_FAILURE = 'posts/fetchFailure';

export const SELECT_USER = 'users/select';
```

### Bước 4 — Actions & Thunks

`src/redux/users/userActions.js`:

```js
import axios from 'axios';
import * as T from './userTypes';

const API = 'https://jsonplaceholder.typicode.com';

// ----- Action creators thường (trả về object) -----
const fetchUsersRequest = () => ({ type: T.FETCH_USERS_REQUEST });
const fetchUsersSuccess = (users) => ({ type: T.FETCH_USERS_SUCCESS, payload: users });
const fetchUsersFailure = (error) => ({ type: T.FETCH_USERS_FAILURE, payload: error });

export const selectUser = (id) => ({ type: T.SELECT_USER, payload: id });

// ----- Thunk (trả về HÀM) -----
export const fetchUsers = () => async (dispatch, getState) => {
  // Dùng getState: đã có dữ liệu thì không gọi lại API
  if (getState().users.items.length > 0) return;

  dispatch(fetchUsersRequest());
  try {
    const res = await axios.get(`${API}/users`);
    dispatch(fetchUsersSuccess(res.data));
  } catch (err) {
    dispatch(fetchUsersFailure(err.message));
  }
};

// Thunk có tham số + dispatch nhiều action
export const fetchPostsByUser = (userId) => async (dispatch) => {
  dispatch(selectUser(userId));
  dispatch({ type: T.FETCH_POSTS_REQUEST });
  try {
    const res = await axios.get(`${API}/posts`, { params: { userId } });
    dispatch({ type: T.FETCH_POSTS_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: T.FETCH_POSTS_FAILURE, payload: err.message });
  }
};
```

### Bước 5 — Reducer

`src/redux/users/userReducer.js`:

```js
import * as T from './userTypes';

const initialState = {
  items: [],
  loading: false,
  error: null,
  selectedId: null,
  posts: [],
  postsLoading: false,
  postsError: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case T.FETCH_USERS_REQUEST:
      return { ...state, loading: true, error: null };
    case T.FETCH_USERS_SUCCESS:
      return { ...state, loading: false, items: action.payload };
    case T.FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case T.SELECT_USER:
      return { ...state, selectedId: action.payload };

    case T.FETCH_POSTS_REQUEST:
      return { ...state, postsLoading: true, postsError: null, posts: [] };
    case T.FETCH_POSTS_SUCCESS:
      return { ...state, postsLoading: false, posts: action.payload };
    case T.FETCH_POSTS_FAILURE:
      return { ...state, postsLoading: false, postsError: action.payload };

    default:
      return state;
  }
}
```

### Bước 6 — Store với middleware thunk

`src/redux/rootReducer.js`:

```js
import { combineReducers } from 'redux';
import userReducer from './users/userReducer';

export default combineReducers({ users: userReducer });
```

`src/redux/store.js`:

```js
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './rootReducer';

// Middleware tự viết: log mọi action (minh họa A8)
const logger = (store) => (next) => (action) => {
  if (typeof action !== 'function') console.log('[action]', action.type);
  return next(action);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);
```

> ⚠️ Nếu **quên** `applyMiddleware(thunk)` → lỗi *"Actions must be plain objects. Instead, the actual type was: 'function'"*.

`main.jsx` bọc `<Provider store={store}>`.

### Bước 7 — Components

`src/components/UserList.jsx`:

```jsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListGroup, Spinner, Alert, Button } from 'react-bootstrap';
import { fetchUsers, fetchPostsByUser } from '../redux/users/userActions';

export default function UserList() {
  const { items, loading, error, selectedId } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());          // dispatch một HÀM – nhờ redux-thunk
  }, [dispatch]);

  if (loading) return <div className="text-center p-4"><Spinner animation="border" /></div>;
  if (error)
    return (
      <Alert variant="danger">
        {error} <Button size="sm" onClick={() => dispatch(fetchUsers())}>Thử lại</Button>
      </Alert>
    );

  return (
    <ListGroup>
      {items.map((u) => (
        <ListGroup.Item
          key={u.id}
          action
          active={u.id === selectedId}
          onClick={() => dispatch(fetchPostsByUser(u.id))}
        >
          <div className="fw-bold">{u.name}</div>
          <small>{u.email} · {u.company.name}</small>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
```

> 💡 `useSelector((state) => state.users)` trả về **cùng một object** nếu state.users không đổi → không gây re-render thừa. Destructuring nằm **ngoài** selector nên an toàn.

`src/components/UserPosts.jsx`:

```jsx
import { useSelector } from 'react-redux';
import { Card, Spinner, Alert } from 'react-bootstrap';

export default function UserPosts() {
  const { selectedId, posts, postsLoading, postsError, items } = useSelector((state) => state.users);
  const user = items.find((u) => u.id === selectedId);

  if (!selectedId) return <p className="text-muted">← Chọn một user để xem bài viết</p>;
  if (postsLoading) return <Spinner animation="border" size="sm" />;
  if (postsError) return <Alert variant="danger">{postsError}</Alert>;

  return (
    <>
      <h5 className="mb-3">Bài viết của {user?.name} ({posts.length})</h5>
      {posts.map((p) => (
        <Card key={p.id} className="mb-2">
          <Card.Body>
            <Card.Title className="fs-6 text-capitalize">{p.title}</Card.Title>
            <Card.Text className="small text-muted">{p.body}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}
```

`src/App.jsx`:

```jsx
import { Container, Row, Col } from 'react-bootstrap';
import UserList from './components/UserList';
import UserPosts from './components/UserPosts';

export default function App() {
  return (
    <Container className="py-4">
      <h2 className="mb-4">👥 Users — Redux Thunk</h2>
      <Row>
        <Col md={4}><UserList /></Col>
        <Col md={8}><UserPosts /></Col>
      </Row>
    </Container>
  );
}
```

### Bước 8 — Kiểm tra

- Lúc tải trang thấy spinner → danh sách 10 user.
- Click user → spinner nhỏ → danh sách bài viết.
- DevTools → thấy chuỗi action: `users/fetchRequest` → `users/fetchSuccess`; `users/select` → `posts/fetchRequest` → `posts/fetchSuccess`.
- Tắt mạng (F12 → Network → Offline) rồi F5 → hiển thị lỗi + nút "Thử lại".
- Console in log từ middleware `logger`.

**⭐ Mở rộng:**
1. Thêm ô tìm kiếm user theo tên (state cục bộ + `filter`).
2. Thêm cache posts theo userId: `postsByUser: { [userId]: [...] }`, thunk dùng `getState()` để bỏ qua nếu đã có.

---

## Bài 4: Giỏ hàng với Redux Toolkit (createSlice)

**🎯 Mục tiêu:** `configureStore`, `createSlice`, viết reducer kiểu "mutate" với Immer, `prepare`, selector + `createSelector`, nhiều slice tương tác, lưu `localStorage` bằng `store.subscribe`.

### Bước 1 — Cài thư viện

```bash
npm install @reduxjs/toolkit react-redux
```

### Bước 2 — Cấu trúc

```
src/
├── data/products.js
├── features/
│   ├── cart/cartSlice.js
│   └── products/productsSlice.js
├── app/store.js
└── components/
    ├── ProductList.jsx
    ├── CartBadge.jsx
    └── Cart.jsx
```

### Bước 3 — Dữ liệu mẫu

`src/data/products.js`:

```js
export const PRODUCTS = [
  { id: 1, name: 'iPhone 16', price: 22990000, image: 'https://picsum.photos/seed/p1/300/200', stock: 5 },
  { id: 2, name: 'Samsung S25', price: 19990000, image: 'https://picsum.photos/seed/p2/300/200', stock: 3 },
  { id: 3, name: 'AirPods Pro', price: 5990000, image: 'https://picsum.photos/seed/p3/300/200', stock: 10 },
  { id: 4, name: 'iPad Air', price: 15990000, image: 'https://picsum.photos/seed/p4/300/200', stock: 4 },
];
```

### Bước 4 — Products slice (có ô tìm kiếm)

`src/features/products/productsSlice.js`:

```js
import { createSlice, createSelector } from '@reduxjs/toolkit';
import { PRODUCTS } from '../../data/products';

const productsSlice = createSlice({
  name: 'products',
  initialState: { items: PRODUCTS, keyword: '' },
  reducers: {
    setKeyword(state, action) {
      state.keyword = action.payload;
    },
  },
});

export const { setKeyword } = productsSlice.actions;
export default productsSlice.reducer;

// Selectors
const selectItems = (state) => state.products.items;
export const selectKeyword = (state) => state.products.keyword;

export const selectFilteredProducts = createSelector(
  [selectItems, selectKeyword],
  (items, keyword) => items.filter((p) => p.name.toLowerCase().includes(keyword.toLowerCase()))
);
```

### Bước 5 — Cart slice

`src/features/cart/cartSlice.js`:

```js
import { createSlice, createSelector } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },   // item: { id, name, price, image, stock, quantity }
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        if (existing.quantity < product.stock) existing.quantity += 1;   // "mutate" nhờ Immer
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    increaseQty(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity < item.stock) item.quantity += 1;
    },
    decreaseQty(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (!item) return;
      if (item.quantity > 1) item.quantity -= 1;
      else state.items = state.items.filter((i) => i.id !== action.payload);
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart() {
      return { items: [] };       // return state mới → KHÔNG sửa state
    },
  },
});

export const { addToCart, increaseQty, decreaseQty, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

// ---------- Selectors ----------
export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);       // trả về number → an toàn

export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0)
);

export const selectQtyInCart = (id) => (state) =>
  state.cart.items.find((i) => i.id === id)?.quantity ?? 0;
```

> 💡 So sánh với Bài 2: không còn action types, action creators viết tay, switch-case hay spread lồng nhau. Code ngắn hơn rất nhiều.

### Bước 6 — Store (có lưu localStorage)

`src/app/store.js`:

```js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import productsReducer from '../features/products/productsSlice';

// Đọc giỏ hàng đã lưu
function loadCart() {
  try {
    const saved = localStorage.getItem('cart');
    return saved ? { items: JSON.parse(saved) } : undefined;
  } catch {
    return undefined;
  }
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
  preloadedState: { cart: loadCart() ?? { items: [] } },
});

// Ghi giỏ hàng mỗi khi state thay đổi
store.subscribe(() => {
  localStorage.setItem('cart', JSON.stringify(store.getState().cart.items));
});
```

`src/main.jsx`:

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
import { store } from './app/store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
```

### Bước 7 — Components

Hàm định dạng tiền: `const vnd = (n) => n.toLocaleString('vi-VN') + ' ₫';`

`src/components/ProductList.jsx`:

```jsx
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import { selectFilteredProducts, selectKeyword, setKeyword } from '../features/products/productsSlice';
import { addToCart, selectCartItems } from '../features/cart/cartSlice';

const vnd = (n) => n.toLocaleString('vi-VN') + ' ₫';

export default function ProductList() {
  const products = useSelector(selectFilteredProducts);
  const keyword = useSelector(selectKeyword);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const qtyOf = (id) => cartItems.find((i) => i.id === id)?.quantity ?? 0;

  return (
    <>
      <Form.Control
        className="mb-3"
        placeholder="🔍 Tìm sản phẩm..."
        value={keyword}
        onChange={(e) => dispatch(setKeyword(e.target.value))}
      />
      <Row xs={1} sm={2} lg={2} className="g-3">
        {products.map((p) => {
          const qty = qtyOf(p.id);
          const soldOut = qty >= p.stock;
          return (
            <Col key={p.id}>
              <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={p.image} alt={p.name} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{p.name}</Card.Title>
                  <Card.Text className="text-danger fw-bold">{vnd(p.price)}</Card.Text>
                  <small className="text-muted mb-2">Kho: {p.stock}</small>
                  <Button
                    className="mt-auto"
                    disabled={soldOut}
                    onClick={() => dispatch(addToCart(p))}
                  >
                    {soldOut ? 'Đã đạt tối đa' : 'Thêm vào giỏ'}
                    {qty > 0 && <Badge bg="light" text="dark" className="ms-2">{qty}</Badge>}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
```

`src/components/CartBadge.jsx`:

```jsx
import { useSelector } from 'react-redux';
import { Badge } from 'react-bootstrap';
import { selectCartCount } from '../features/cart/cartSlice';

export default function CartBadge() {
  const count = useSelector(selectCartCount);
  return (
    <span className="fs-5">
      🛒 <Badge bg="danger" pill>{count}</Badge>
    </span>
  );
}
```

`src/components/Cart.jsx`:

```jsx
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, ButtonGroup } from 'react-bootstrap';
import {
  selectCartItems, selectCartTotal,
  increaseQty, decreaseQty, removeFromCart, clearCart,
} from '../features/cart/cartSlice';

const vnd = (n) => n.toLocaleString('vi-VN') + ' ₫';

export default function Cart() {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();

  if (items.length === 0) return <p className="text-muted">Giỏ hàng trống.</p>;

  return (
    <>
      <Table size="sm" bordered hover responsive>
        <thead>
          <tr><th>Sản phẩm</th><th className="text-center">SL</th><th className="text-end">Thành tiền</th><th></th></tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.id}>
              <td>{i.name}</td>
              <td className="text-center">
                <ButtonGroup size="sm">
                  <Button variant="outline-secondary" onClick={() => dispatch(decreaseQty(i.id))}>-</Button>
                  <Button variant="light" disabled>{i.quantity}</Button>
                  <Button
                    variant="outline-secondary"
                    disabled={i.quantity >= i.stock}
                    onClick={() => dispatch(increaseQty(i.id))}
                  >+</Button>
                </ButtonGroup>
              </td>
              <td className="text-end">{vnd(i.price * i.quantity)}</td>
              <td className="text-center">
                <Button size="sm" variant="link" className="text-danger" onClick={() => dispatch(removeFromCart(i.id))}>
                  ✕
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={2}>Tổng cộng</th>
            <th className="text-end text-danger">{vnd(total)}</th>
            <th></th>
          </tr>
        </tfoot>
      </Table>
      <Button variant="outline-danger" size="sm" onClick={() => dispatch(clearCart())}>Xóa giỏ hàng</Button>
    </>
  );
}
```

`src/App.jsx`:

```jsx
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CartBadge from './components/CartBadge';

export default function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="px-4 mb-4 justify-content-between">
        <Navbar.Brand>RTK Shop</Navbar.Brand>
        <span className="text-white"><CartBadge /></span>
      </Navbar>
      <Container>
        <Row>
          <Col lg={7}><ProductList /></Col>
          <Col lg={5}>
            <h4>Giỏ hàng</h4>
            <Cart />
          </Col>
        </Row>
      </Container>
    </>
  );
}
```

### Bước 8 — Kiểm tra

- Thêm sản phẩm → badge trên Navbar tăng (Navbar và ProductList **không truyền props** cho nhau).
- Tăng/giảm số lượng, không vượt quá `stock`; giảm về 0 → tự xóa khỏi giỏ.
- Tìm kiếm sản phẩm.
- F5 → giỏ hàng vẫn còn (localStorage).
- DevTools → action có type tự sinh: `cart/addToCart`, `cart/decreaseQty`, `products/setKeyword`.

**⭐ Mở rộng:**
1. Thêm `applyCoupon` (mã `FER202` giảm 10%): lưu `coupon` trong cartSlice, tính `selectFinalTotal` bằng `createSelector`.
2. Khi bấm "Thanh toán" → `clearCart()` và giảm `stock` trong productsSlice: trong `productsSlice` dùng `extraReducers` lắng nghe action `checkout` của cartSlice (minh họa **slice nghe action của slice khác**):
   ```js
   extraReducers: (builder) => {
     builder.addCase(checkout, (state, action) => {
       action.payload.forEach(({ id, quantity }) => {
         const p = state.items.find((x) => x.id === id);
         if (p) p.stock -= quantity;
       });
     });
   }
   ```

---

## Bài 5: Quản lý Sinh viên CRUD với createAsyncThunk + json-server

**🎯 Mục tiêu:** Ứng dụng thực tế với Redux Toolkit: `createAsyncThunk` cho GET/POST/PUT/DELETE, `extraReducers` với builder, trạng thái `status`, `rejectWithValue`, `.unwrap()`, `addMatcher`, form thêm/sửa trong Modal.

### Bước 1 — Cài thư viện & tạo dữ liệu

```bash
npm install @reduxjs/toolkit react-redux axios react-bootstrap bootstrap
npm install -D json-server concurrently
```

> 💡 **`concurrently`** cho phép chạy **nhiều lệnh cùng lúc trong một terminal** — ở đây là json-server (backend giả) và Vite (frontend).

Tạo file `database.json` ở **thư mục gốc** project:

```json
{
  "students": [
    { "id": "1", "code": "HE170001", "name": "Nguyễn Văn An", "email": "anhe170001@fpt.edu.vn", "gpa": 8.2, "major": "SE" },
    { "id": "2", "code": "HE170002", "name": "Trần Thị Bình", "email": "binhhe170002@fpt.edu.vn", "gpa": 7.5, "major": "AI" },
    { "id": "3", "code": "HE170003", "name": "Lê Minh Châu", "email": "chauhe170003@fpt.edu.vn", "gpa": 6.8, "major": "IA" }
  ]
}
```

Thêm/sửa các script trong `package.json`:

```json
"scripts": {
  "dev": "vite",
  "server": "json-server --watch database.json --port 9999",
  "start": "concurrently -n API,WEB -c magenta,cyan \"npm run server\" \"npm run dev\"",
  "build": "vite build",
  "preview": "vite preview"
}
```

| Script | Tác dụng |
|---|---|
| `npm run dev` | Chỉ chạy Vite (frontend) |
| `npm run server` | Chỉ chạy json-server (API) |
| **`npm start`** | **Chạy đồng thời cả hai** trong một terminal |

Giải thích lệnh `start`:
- `concurrently "lệnh 1" "lệnh 2"` — chạy song song các lệnh trong ngoặc kép (trong JSON phải viết `\"` để escape dấu ngoặc kép).
- `-n API,WEB` — đặt tên tiền tố cho log của từng lệnh.
- `-c magenta,cyan` — tô màu log để dễ phân biệt.
- Thêm `-k` (`--kill-others`) nếu muốn khi một lệnh dừng/lỗi thì dừng luôn lệnh còn lại.

Chạy:

```bash
npm start
```

Terminal hiển thị log của cả hai, có tiền tố & màu riêng:

```
[API] JSON Server started on PORT :9999
[API] http://localhost:9999/students
[WEB]   VITE v7.x  ready in 350 ms
[WEB]   ➜  Local:   http://localhost:5173/
```

Bấm **Ctrl + C** một lần để dừng cả hai.

> 💡 Mỗi lần thêm/sửa/xóa, json-server ghi lại `database.json`. Nếu trang web tự tải lại (reload) mỗi khi file này thay đổi, bảo Vite bỏ qua file đó trong `vite.config.js`:
> ```js
> export default defineConfig({
>   plugins: [react()],
>   server: { watch: { ignored: ['**/database.json'] } },
> });
> ```

> 📝 Cách thủ công (không dùng `concurrently`): mở **2 terminal**, terminal 1 chạy `npm run server`, terminal 2 chạy `npm run dev`.

> 📝 json-server bản mới (1.x) tự sinh `id` dạng **chuỗi**. Vì vậy dữ liệu mẫu cũng dùng `"id": "1"`. So sánh id luôn dùng chuỗi.

### Bước 2 — Cấu trúc

```
src/
├── api/studentApi.js
├── features/students/studentsSlice.js
├── app/store.js
└── components/
    ├── StudentTable.jsx
    ├── StudentFormModal.jsx
    └── Toolbar.jsx
```

### Bước 3 — Lớp gọi API

`src/api/studentApi.js`:

```js
import axios from 'axios';

const http = axios.create({ baseURL: 'http://localhost:9999' });

export const studentApi = {
  getAll: () => http.get('/students').then((r) => r.data),
  create: (data) => http.post('/students', data).then((r) => r.data),
  update: (id, data) => http.put(`/students/${id}`, data).then((r) => r.data),
  remove: (id) => http.delete(`/students/${id}`).then(() => id),
};
```

### Bước 4 — Slice với createAsyncThunk

`src/features/students/studentsSlice.js`:

```js
import { createSlice, createAsyncThunk, createSelector, isPending, isRejected } from '@reduxjs/toolkit';
import { studentApi } from '../../api/studentApi';

// Lấy message lỗi chung
const errMsg = (err) => err.response?.data?.message || err.message || 'Có lỗi xảy ra';

// ================= THUNKS =================
export const fetchStudents = createAsyncThunk('students/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await studentApi.getAll();
  } catch (err) {
    return rejectWithValue(errMsg(err));
  }
});

export const addStudent = createAsyncThunk(
  'students/add',
  async (student, { getState, rejectWithValue }) => {
    // Validate trùng mã SV bằng getState
    const exists = getState().students.items.some(
      (s) => s.code.toLowerCase() === student.code.toLowerCase()
    );
    if (exists) return rejectWithValue(`Mã sinh viên ${student.code} đã tồn tại`);
    try {
      return await studentApi.create(student);
    } catch (err) {
      return rejectWithValue(errMsg(err));
    }
  }
);

export const updateStudent = createAsyncThunk(
  'students/update',
  async ({ id, ...data }, { rejectWithValue }) => {
    try {
      return await studentApi.update(id, { id, ...data });
    } catch (err) {
      return rejectWithValue(errMsg(err));
    }
  }
);

export const deleteStudent = createAsyncThunk('students/delete', async (id, { rejectWithValue }) => {
  try {
    return await studentApi.remove(id);     // trả về id đã xóa
  } catch (err) {
    return rejectWithValue(errMsg(err));
  }
});

// ================= SLICE =================
const studentsSlice = createSlice({
  name: 'students',
  initialState: {
    items: [],
    status: 'idle',     // 'idle' | 'loading' | 'succeeded' | 'failed'  (cho lần tải danh sách)
    saving: false,      // đang thêm / sửa / xóa
    error: null,
    keyword: '',
    sortBy: 'code',     // 'code' | 'name' | 'gpa'
  },
  reducers: {
    setKeyword(state, action) { state.keyword = action.payload; },
    setSortBy(state, action) { state.sortBy = action.payload; },
    clearError(state) { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      // ----- FETCH -----
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // ----- ADD -----
      .addCase(addStudent.fulfilled, (state, action) => {
        state.saving = false;
        state.items.push(action.payload);
      })
      // ----- UPDATE -----
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.saving = false;
        const idx = state.items.findIndex((s) => s.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      // ----- DELETE -----
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.saving = false;
        state.items = state.items.filter((s) => s.id !== action.payload);
      })
      // ----- MATCHER: gom xử lý chung cho add/update/delete -----
      .addMatcher(isPending(addStudent, updateStudent, deleteStudent), (state) => {
        state.saving = true;
        state.error = null;
      })
      .addMatcher(isRejected(addStudent, updateStudent, deleteStudent), (state, action) => {
        state.saving = false;
        state.error = action.payload ?? action.error.message;
      });
  },
});

export const { setKeyword, setSortBy, clearError } = studentsSlice.actions;
export default studentsSlice.reducer;

// ================= SELECTORS =================
export const selectStudentsState = (state) => state.students;
const selectItems = (state) => state.students.items;
const selectKeyword = (state) => state.students.keyword;
const selectSortBy = (state) => state.students.sortBy;

export const selectVisibleStudents = createSelector(
  [selectItems, selectKeyword, selectSortBy],
  (items, keyword, sortBy) => {
    const kw = keyword.trim().toLowerCase();
    const filtered = kw
      ? items.filter((s) => s.name.toLowerCase().includes(kw) || s.code.toLowerCase().includes(kw))
      : items;
    return [...filtered].sort((a, b) =>      // copy trước khi sort (sort mutate mảng)
      sortBy === 'gpa' ? b.gpa - a.gpa : String(a[sortBy]).localeCompare(String(b[sortBy]), 'vi')
    );
  }
);

export const selectAverageGpa = createSelector([selectItems], (items) =>
  items.length ? (items.reduce((s, x) => s + Number(x.gpa), 0) / items.length).toFixed(2) : '0.00'
);
```

> 💡 **`addCase` phải đứng trước `addMatcher`** trong chuỗi builder.
> 💡 `isPending(a, b, c)` / `isRejected(...)` tạo "matcher" khớp với action pending/rejected của nhiều thunk → tránh lặp code.

### Bước 5 — Store

`src/app/store.js`:

```js
import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from '../features/students/studentsSlice';

export const store = configureStore({
  reducer: {
    students: studentsReducer,
  },
});
```

`main.jsx` bọc `<Provider store={store}>` (giống Bài 4).

### Bước 6 — Modal thêm/sửa

`src/components/StudentFormModal.jsx`:

```jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button, Spinner } from 'react-bootstrap';
import { addStudent, updateStudent } from '../features/students/studentsSlice';

const EMPTY = { code: '', name: '', email: '', gpa: '', major: 'SE' };

export default function StudentFormModal({ show, onHide, editing }) {
  const dispatch = useDispatch();
  const saving = useSelector((state) => state.students.saving);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  // Mỗi lần mở modal: nạp dữ liệu sửa hoặc form trống
  useEffect(() => {
    if (show) {
      setForm(editing ? { ...editing, gpa: String(editing.gpa) } : EMPTY);
      setErrors({});
      setServerError('');
    }
  }, [show, editing]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const e = {};
    if (!/^[A-Z]{2}\d{6}$/i.test(form.code)) e.code = 'Mã SV dạng HE170001';
    if (form.name.trim().length < 2) e.name = 'Họ tên tối thiểu 2 ký tự';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Email không hợp lệ';
    const gpa = Number(form.gpa);
    if (form.gpa === '' || isNaN(gpa) || gpa < 0 || gpa > 10) e.gpa = 'GPA từ 0 đến 10';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const data = { ...form, code: form.code.toUpperCase(), gpa: Number(form.gpa) };

    try {
      if (editing) await dispatch(updateStudent(data)).unwrap();
      else await dispatch(addStudent(data)).unwrap();
      onHide();                                   // chỉ đóng khi thành công
    } catch (err) {
      setServerError(err);                        // err = giá trị rejectWithValue
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={handleSubmit} noValidate>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? 'Sửa sinh viên' : 'Thêm sinh viên'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {serverError && <div className="alert alert-danger py-2">{serverError}</div>}

          <Form.Group className="mb-2">
            <Form.Label>Mã SV</Form.Label>
            <Form.Control name="code" value={form.code} onChange={handleChange}
              isInvalid={!!errors.code} disabled={!!editing} />
            <Form.Control.Feedback type="invalid">{errors.code}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Họ tên</Form.Label>
            <Form.Control name="name" value={form.name} onChange={handleChange} isInvalid={!!errors.name} />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="email" value={form.email} onChange={handleChange} isInvalid={!!errors.email} />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex gap-2">
            <Form.Group className="flex-fill">
              <Form.Label>GPA</Form.Label>
              <Form.Control name="gpa" type="number" step="0.1" value={form.gpa} onChange={handleChange} isInvalid={!!errors.gpa} />
              <Form.Control.Feedback type="invalid">{errors.gpa}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="flex-fill">
              <Form.Label>Chuyên ngành</Form.Label>
              <Form.Select name="major" value={form.major} onChange={handleChange}>
                <option value="SE">SE – Kỹ thuật phần mềm</option>
                <option value="AI">AI – Trí tuệ nhân tạo</option>
                <option value="IA">IA – An toàn thông tin</option>
              </Form.Select>
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Hủy</Button>
          <Button type="submit" disabled={saving}>
            {saving && <Spinner size="sm" className="me-2" />}
            {editing ? 'Cập nhật' : 'Thêm'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
```

### Bước 7 — Toolbar (tìm kiếm, sắp xếp, thống kê)

`src/components/Toolbar.jsx`:

```jsx
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Badge } from 'react-bootstrap';
import { setKeyword, setSortBy, selectAverageGpa } from '../features/students/studentsSlice';

export default function Toolbar({ onAdd }) {
  const { keyword, sortBy, items } = useSelector((state) => state.students);
  const avg = useSelector(selectAverageGpa);
  const dispatch = useDispatch();

  return (
    <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
      <Form.Control
        style={{ maxWidth: 260 }}
        placeholder="Tìm theo tên / mã SV..."
        value={keyword}
        onChange={(e) => dispatch(setKeyword(e.target.value))}
      />
      <Form.Select style={{ maxWidth: 180 }} value={sortBy} onChange={(e) => dispatch(setSortBy(e.target.value))}>
        <option value="code">Sắp xếp: Mã SV</option>
        <option value="name">Sắp xếp: Họ tên</option>
        <option value="gpa">Sắp xếp: GPA ↓</option>
      </Form.Select>
      <Badge bg="info" className="p-2">Tổng: {items.length}</Badge>
      <Badge bg="success" className="p-2">GPA TB: {avg}</Badge>
      <Button className="ms-auto" onClick={onAdd}>+ Thêm sinh viên</Button>
    </div>
  );
}
```

### Bước 8 — Bảng danh sách

`src/components/StudentTable.jsx`:

```jsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import {
  fetchStudents, deleteStudent, clearError,
  selectVisibleStudents, selectStudentsState,
} from '../features/students/studentsSlice';

export default function StudentTable({ onEdit }) {
  const students = useSelector(selectVisibleStudents);
  const { status, error, saving } = useSelector(selectStudentsState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') dispatch(fetchStudents());
  }, [status, dispatch]);

  const handleDelete = async (s) => {
    if (!window.confirm(`Xóa sinh viên ${s.name}?`)) return;
    try {
      await dispatch(deleteStudent(s.id)).unwrap();
    } catch {
      /* lỗi đã được lưu vào state.error bởi addMatcher */
    }
  };

  if (status === 'loading') return <div className="text-center p-5"><Spinner /></div>;

  if (status === 'failed')
    return (
      <Alert variant="danger">
        Không tải được dữ liệu: {error}. Bạn đã chạy <code>npm start</code> (hoặc <code>npm run server</code>) chưa?{' '}
        <Button size="sm" onClick={() => dispatch(fetchStudents())}>Thử lại</Button>
      </Alert>
    );

  return (
    <>
      {error && (
        <Alert variant="warning" dismissible onClose={() => dispatch(clearError())}>{error}</Alert>
      )}
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th><th>Mã SV</th><th>Họ tên</th><th>Email</th>
            <th className="text-center">GPA</th><th>Ngành</th><th className="text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 && (
            <tr><td colSpan={7} className="text-center text-muted">Không có dữ liệu</td></tr>
          )}
          {students.map((s, i) => (
            <tr key={s.id}>
              <td>{i + 1}</td>
              <td>{s.code}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td className="text-center">
                <Badge bg={s.gpa >= 8 ? 'success' : s.gpa >= 5 ? 'primary' : 'danger'}>{s.gpa}</Badge>
              </td>
              <td>{s.major}</td>
              <td className="text-center text-nowrap">
                <Button size="sm" variant="warning" className="me-1" onClick={() => onEdit(s)}>Sửa</Button>
                <Button size="sm" variant="danger" disabled={saving} onClick={() => handleDelete(s)}>Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
```

### Bước 9 — App

`src/App.jsx`:

```jsx
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Toolbar from './components/Toolbar';
import StudentTable from './components/StudentTable';
import StudentFormModal from './components/StudentFormModal';

export default function App() {
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(null);   // null = thêm mới; object = đang sửa

  const openAdd = () => { setEditing(null); setShow(true); };
  const openEdit = (student) => { setEditing(student); setShow(true); };

  return (
    <Container className="py-4">
      <h2 className="mb-4">🎓 Quản lý Sinh viên — Redux Toolkit</h2>
      <Toolbar onAdd={openAdd} />
      <StudentTable onEdit={openEdit} />
      <StudentFormModal show={show} onHide={() => setShow(false)} editing={editing} />
    </Container>
  );
}
```

> 💡 State của **modal** (`show`, `editing`) là state UI cục bộ → dùng `useState`, **không cần** đưa vào Redux. Chỉ dữ liệu dùng chung (danh sách SV, từ khóa, sắp xếp) mới đặt vào store.

### Bước 10 — Kiểm tra

| # | Thao tác | Kết quả mong đợi |
|---|---|---|
| 1 | Chỉ chạy `npm run dev` (**chưa** có json-server) | Hiện lỗi "Không tải được dữ liệu" + nút Thử lại |
| 2 | Dừng lại, chạy `npm start` (cả API và web), bấm Thử lại | Hiện 3 sinh viên |
| 3 | Thêm SV với mã `HE170001` | Lỗi "Mã sinh viên HE170001 đã tồn tại", modal không đóng |
| 4 | Thêm SV hợp lệ | Modal đóng, SV mới xuất hiện, `database.json` có thêm bản ghi |
| 5 | Nhập GPA = 11 | Báo lỗi dưới ô GPA |
| 6 | Sửa SV | Dữ liệu cập nhật trên bảng và trong file |
| 7 | Xóa SV | SV biến mất |
| 8 | Tìm "an", sắp xếp theo GPA | Danh sách lọc & sắp xếp đúng; GPA TB tự tính lại |
| 9 | Redux DevTools | Thấy `students/add/pending` → `students/add/fulfilled`… |

**⭐ Mở rộng:**
1. Chuyển Bài 5 sang **RTK Query** (xem C6) và so sánh lượng code.
2. Thêm phân trang (`_page`, `_per_page` của json-server).
3. Viết lại bằng TypeScript (`.tsx`) theo mục C7: khai báo `type Student`, `RootState`, `AppDispatch`, `useAppSelector`, `useAppDispatch`.
4. Optimistic update khi xóa: xóa khỏi state ngay ở `deleteStudent.pending` (dùng `action.meta.arg` để lấy id), nếu `rejected` thì tải lại danh sách.

---

# Phần E — Lỗi thường gặp & cách sửa

| Lỗi | Nguyên nhân | Cách sửa |
|---|---|---|
| `could not find react-redux context value; please ensure the component is wrapped in a <Provider>` | Quên bọc `<Provider store={store}>` | Bọc `<App />` trong `main.jsx` |
| `Actions must be plain objects. Instead, the actual type was: 'function'` | Dispatch thunk nhưng chưa cài middleware thunk | `applyMiddleware(thunk)` hoặc dùng `configureStore` |
| `export 'default' (imported as 'thunk') was not found in 'redux-thunk'` | redux-thunk v3 đổi cách export | `import { thunk } from 'redux-thunk'` |
| UI không cập nhật dù đã dispatch | Mutate state trong reducer **Redux thuần** (`state.push`, `state.x = ...`) | Trả về object/array mới bằng spread, `map`, `filter` |
| `[Immer] An immer producer returned a new value *and* modified its draft` | Trong `createSlice` vừa sửa `state` vừa `return` | Chỉ chọn một: sửa state **hoặc** return state mới |
| `Cannot assign to read only property` / `Cannot add property, object is not extensible` | Sửa state lấy từ `useSelector` ngay trong component (ví dụ `items.sort()`) | Copy trước: `[...items].sort()` |
| `A non-serializable value was detected in the state` | Lưu `Date`, `Promise`, function, class instance vào state/action | Lưu dạng chuỗi/số (`date.toISOString()`) |
| `Selector unknown returned a different result when called with the same parameters` (cảnh báo) | Selector trả về mảng/object mới mỗi lần (`state => state.x.filter(...)`) | Dùng `createSelector` hoặc `useMemo` |
| `The object notation for createSlice.extraReducers has been removed` | Dùng cú pháp cũ `extraReducers: { [thunk.fulfilled]: ... }` | Dùng `extraReducers: (builder) => builder.addCase(...)` |
| `addCase` cannot be called after `addMatcher` | Sai thứ tự trong builder | Gọi tất cả `addCase` trước, `addMatcher` sau |
| `useSelector` trả về `undefined` | Sai key trong store (ví dụ store đặt `student`, selector đọc `state.students`) | Kiểm tra tên key trong `reducer: {...}` của store |
| `createStore` bị gạch ngang | Redux khuyến khích RTK | Dùng `legacy_createStore` hoặc chuyển sang `configureStore` |
| `Network Error` / `ERR_CONNECTION_REFUSED` | Chưa chạy json-server hoặc sai cổng | Chạy `npm start` (hoặc `npm run server`), kiểm tra `baseURL` |
| `'concurrently' is not recognized` / `command not found` | Chưa cài `concurrently` | `npm install -D concurrently` |
| `npm start` chỉ chạy một lệnh / báo lỗi cú pháp | Thiếu `\"` quanh từng lệnh trong `package.json` | Viết đúng: `"concurrently \"npm run server\" \"npm run dev\""` |
| `EADDRINUSE: address already in use :::9999` | Cổng 9999 đang bị một json-server khác chiếm (terminal cũ chưa tắt) | Tắt terminal cũ, hoặc đổi `--port 9998` (nhớ sửa `baseURL`) |
| Trang tự reload sau mỗi lần thêm/sửa/xóa | Vite theo dõi `database.json` | Thêm `server.watch.ignored: ['**/database.json']` vào `vite.config.js` |
| Gọi API 2 lần khi mở trang (dev) | `<StrictMode>` chạy `useEffect` 2 lần ở môi trường dev | Bình thường; dùng điều kiện `if (status === 'idle')` hoặc `condition` của createAsyncThunk |

---

# Phần F — Câu hỏi ôn tập

1. Redux giải quyết vấn đề gì của React? *Prop drilling* là gì?
2. Nêu 3 nguyên tắc của Redux.
3. Action, Action Creator, Reducer, Store, Dispatch là gì? Viết ví dụ cho mỗi khái niệm.
4. Vì sao reducer phải là *pure function*? Kể 3 việc **không được** làm trong reducer.
5. Viết reducer Redux thuần cho các thao tác: thêm, xóa, sửa một phần tử trong mảng theo `id`.
6. `combineReducers` hoạt động như thế nào? Khi dispatch một action, reducer nào được gọi?
7. Phân biệt `useSelector` và `useDispatch`. Khi nào `useSelector` gây re-render?
8. Middleware là gì? Viết một middleware `logger`.
9. Vì sao cần Redux Thunk? Thunk khác action thường ở điểm nào? Trình bày mẫu 3 action request/success/failure.
10. `configureStore` tự động làm những gì so với `createStore`?
11. Immer giúp gì trong `createSlice`? Nêu quy tắc "sửa hoặc return".
12. Phân biệt `reducers` và `extraReducers` trong `createSlice`.
13. `createAsyncThunk` tự sinh ra những action nào? `rejectWithValue` và `.unwrap()` dùng để làm gì?
14. Vì sao nên dùng `createSelector`? Cho ví dụ tính tổng tiền giỏ hàng.
15. Khi nào dùng `useState`, `useContext`, Redux Toolkit, RTK Query?
16. So với `useContext`, vì sao cần Redux? Giải thích vấn đề render lại thừa của Context và cách `useSelector` khắc phục.

---

## Tài liệu tham khảo

- Redux Docs: https://redux.js.org
- Redux Essentials (RTK – hướng dẫn chính thức): https://redux.js.org/tutorials/essentials/part-1-overview-concepts
- Redux Fundamentals (Redux thuần): https://redux.js.org/tutorials/fundamentals/part-1-overview
- Redux Toolkit: https://redux-toolkit.js.org
- React Redux: https://react-redux.js.org
- Redux Thunk: https://github.com/reduxjs/redux-thunk
- json-server: https://github.com/typicode/json-server
