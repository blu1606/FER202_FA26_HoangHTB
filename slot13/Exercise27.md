# Exercise 27: Demo about AXIOS

## Objectives and Outcomes

Bài tập này hướng dẫn cách dùng **Axios** – thư viện JavaScript phổ biến để gửi HTTP request – trong ứng dụng React.

Sau khi hoàn thành, sinh viên có thể:
- Gửi request **GET** và hiển thị dữ liệu (phần gốc của đề).
- Gửi các request khác: **GET có tham số, POST, PUT, PATCH, DELETE**.
- Cấu hình request: **headers, params, timeout**.
- Xử lý trạng thái **loading / data / error** cho từng loại request.

**API sử dụng:** [JSONPlaceholder](https://jsonplaceholder.typicode.com) – REST API giả lập miễn phí.

> ⚠️ JSONPlaceholder **không lưu thật** dữ liệu của POST/PUT/PATCH/DELETE. Server vẫn trả về response đúng chuẩn (status 201/200 và dữ liệu) để mô phỏng, nhưng gọi GET lại sẽ thấy dữ liệu cũ.

**Chuẩn bị:**
```bash
npm create vite@latest exercise27 -- --template react
cd exercise27
npm install axios
npm run dev
```

---

## Exercises

### Phần 1 – GET một bài viết (đề gốc)

Tạo component mới tên `AxiosDemo`:

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AxiosDemo = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Axios Demo</h1>
      {data ? (
        <div>
          <h2>{data.title}</h2>
          <p>{data.body}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default AxiosDemo;
```

Trong component này, ta import Axios và các hook cần thiết (`useState`, `useEffect`). Hai state được khởi tạo: `data` lưu dữ liệu lấy về, `error` lưu thông báo lỗi.

Trong `useEffect`, ta gửi request **GET** tới `https://jsonplaceholder.typicode.com/posts/1`. Thành công thì gán `response.data` vào `data`; lỗi thì gán `error.message` vào `error`.

Phần JSX hiển thị theo trạng thái: có lỗi → hiện lỗi; có dữ liệu → hiện `title` và `body`; đang chờ → hiện "Loading...".

**Kết quả mong đợi:**
```
Axios Demo
sunt aut facere repellat provident occaecati excepturi optio reprehenderit
quia et suscipit suscipit recusandae consequuntur expedita et cum ...
```

---

### Phần 2 – Bổ sung các HTTP request khác

Tổng quan các request sẽ làm:

| Bài | Method | URL | Body gửi lên | Response mong đợi |
|---|---|---|---|---|
| 2.1 | GET + params | `/posts?userId=1&_limit=5` | – | `200` – mảng 5 bài viết |
| 2.2 | POST | `/posts` | `{ title, body, userId }` | `201` – object mới, `id: 101` |
| 2.3 | PUT | `/posts/1` | `{ id, title, body, userId }` (**đầy đủ**) | `200` – object đã thay |
| 2.4 | PATCH | `/posts/1` | `{ title }` (**một phần**) | `200` – object đã gộp |
| 2.5 | DELETE | `/posts/1` | – | `200` – `{}` |
| 2.6 | Cấu hình request | `/posts` | headers, params, timeout | `200` |

**Cú pháp axios cần nhớ:**

```js
axios.get(url, config)            // config: { params, headers, timeout }
axios.delete(url, config)
axios.post(url, data, config)     // data = body, axios tự chuyển sang JSON
axios.put(url, data, config)
axios.patch(url, data, config)
```

---

#### Bài 2.1 – GET danh sách có tham số (query params)

**Yêu cầu:** Tạo component `PostList` lấy **5 bài viết của user 1**. Truyền tham số qua `params` (không tự ghép chuỗi vào URL).

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts', {
        params: { userId: 1, _limit: 5 },   // → /posts?userId=1&_limit=5
      })
      .then(response => setPosts(response.data))
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>GET – Danh sách bài viết của user 1</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>#{post.id} – {post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
```

**Giải thích:**
- `params` được axios chuyển thành query string `?userId=1&_limit=5` và tự encode ký tự đặc biệt.
- `.finally()` luôn chạy (dù thành công hay lỗi) nên dùng để tắt `loading`.
- Mỗi phần tử trong danh sách cần `key` duy nhất (`post.id`).

**Kết quả mong đợi:** danh sách 5 bài viết, từ #1 đến #5.

---

#### Bài 2.2 – POST: tạo bài viết mới

**Yêu cầu:** Tạo component `CreatePost` có form nhập **Title** và **Body**. Khi submit, gửi POST và hiển thị dữ liệu server trả về.

```jsx
import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    axios
      .post('https://jsonplaceholder.typicode.com/posts', {
        title: title,
        body: body,
        userId: 1,
      })
      .then(response => {
        setResult({ status: response.status, data: response.data });
        setTitle('');
        setBody('');
      })
      .catch(error => setError(error.message))
      .finally(() => setSubmitting(false));
  };

  return (
    <div>
      <h2>POST – Tạo bài viết</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <br />
        <textarea placeholder="Body" value={body} onChange={e => setBody(e.target.value)} required />
        <br />
        <button type="submit" disabled={submitting}>
          {submitting ? 'Đang gửi...' : 'Tạo bài viết'}
        </button>
      </form>

      {error && <div>Error: {error}</div>}
      {result && (
        <div>
          <p>Status: {result.status}</p>
          <pre>{JSON.stringify(result.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
```

**Giải thích:**
- Tham số thứ 2 của `axios.post` là **body**. axios tự `JSON.stringify` và gắn header `Content-Type: application/json`.
- Request POST được gửi trong **event handler** (`handleSubmit`), **không** đặt trong `useEffect`, vì nó là phản hồi cho hành động của người dùng.
- `submitting` dùng để disable nút, tránh gửi trùng khi bấm nhiều lần.

**Kết quả mong đợi:**
```
Status: 201
{
  "title": "Hello",
  "body": "My first post",
  "userId": 1,
  "id": 101
}
```

---

#### Bài 2.3 – PUT: cập nhật toàn bộ bài viết

**Yêu cầu:** Tạo component `UpdatePost`:
1. Khi mount, **GET** `/posts/1` và đổ dữ liệu vào form.
2. Người dùng sửa Title/Body rồi bấm **Cập nhật (PUT)** → gửi **toàn bộ** object.

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const URL = 'https://jsonplaceholder.typicode.com/posts/1';

const UpdatePost = () => {
  const [post, setPost] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // 1. Lấy dữ liệu cũ
  useEffect(() => {
    axios
      .get(URL)
      .then(response => setPost(response.data))
      .catch(error => setError(error.message));
  }, []);

  // 2. Gửi PUT với đầy đủ các trường
  const handleUpdate = () => {
    axios
      .put(URL, {
        id: post.id,
        userId: post.userId,
        title: post.title,
        body: post.body,
      })
      .then(response => setResult({ status: response.status, data: response.data }))
      .catch(error => setError(error.message));
  };

  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h2>PUT – Cập nhật bài viết #{post.id}</h2>
      <input value={post.title} onChange={e => setPost({ ...post, title: e.target.value })} />
      <br />
      <textarea value={post.body} onChange={e => setPost({ ...post, body: e.target.value })} />
      <br />
      <button onClick={handleUpdate}>Cập nhật (PUT)</button>

      {result && (
        <div>
          <p>Status: {result.status}</p>
          <pre>{JSON.stringify(result.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default UpdatePost;
```

**Giải thích:**
- **PUT = thay thế toàn bộ** tài nguyên, nên phải gửi **đủ** các trường. Trường nào thiếu, server có thể xóa mất.
- Cập nhật state dạng object phải dùng spread: `setPost({ ...post, title: ... })`, giữ nguyên các trường còn lại.

**Kết quả mong đợi:** `Status: 200` cùng object có `title`/`body` mới và `id: 1`.

---

#### Bài 2.4 – PATCH: cập nhật một phần

**Yêu cầu:** Tạo component `PatchPost` chỉ sửa **title** của bài viết #1.

```jsx
import React, { useState } from 'react';
import axios from 'axios';

const PatchPost = () => {
  const [title, setTitle] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handlePatch = () => {
    axios
      .patch('https://jsonplaceholder.typicode.com/posts/1', { title })   // chỉ gửi 1 trường
      .then(response => setResult({ status: response.status, data: response.data }))
      .catch(error => setError(error.message));
  };

  return (
    <div>
      <h2>PATCH – Sửa tiêu đề bài viết #1</h2>
      <input placeholder="Tiêu đề mới" value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={handlePatch} disabled={!title.trim()}>Cập nhật (PATCH)</button>

      {error && <div>Error: {error}</div>}
      {result && (
        <div>
          <p>Status: {result.status}</p>
          <pre>{JSON.stringify(result.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PatchPost;
```

**So sánh PUT và PATCH:**

| | PUT | PATCH |
|---|---|---|
| Ý nghĩa | Thay **toàn bộ** tài nguyên | Sửa **một phần** |
| Body gửi lên | Tất cả các trường | Chỉ các trường thay đổi |
| Ví dụ | `{ id, userId, title, body }` | `{ title }` |

**Kết quả mong đợi:** `Status: 200`. Response có `title` mới, còn `body`, `userId`, `id` giữ nguyên giá trị cũ (server tự gộp).

---

#### Bài 2.5 – DELETE: xóa bài viết

**Yêu cầu:** Tạo component `DeletePost`:
1. Lấy 5 bài viết đầu tiên (GET).
2. Mỗi bài có nút **Xóa**. Khi bấm thì hỏi xác nhận, gửi DELETE, thành công thì xóa bài khỏi danh sách trên giao diện.

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https://jsonplaceholder.typicode.com/posts';

const DeletePost = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(API, { params: { _limit: 5 } })
      .then(response => setPosts(response.data))
      .catch(error => setError(error.message));
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm(`Xóa bài viết #${id}?`)) return;

    axios
      .delete(`${API}/${id}`)
      .then(response => {
        setPosts(posts.filter(p => p.id !== id));   // cập nhật giao diện
        setMessage(`Đã xóa bài #${id} – Status: ${response.status}`);
      })
      .catch(error => setError(error.message));
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>DELETE – Xóa bài viết</h2>
      {message && <p>{message}</p>}
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            #{post.id} – {post.title}{' '}
            <button onClick={() => handleDelete(post.id)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeletePost;
```

**Giải thích:**
- `axios.delete(url)` không có body. Id nằm trên URL.
- JSONPlaceholder không xóa thật, nên ta **tự cập nhật state** bằng `filter` để giao diện phản ánh đúng thao tác.

**Kết quả mong đợi:** bấm Xóa bài #2 → dòng #2 biến mất, hiện `Đã xóa bài #2 – Status: 200`.

---

#### Bài 2.6 – Cấu hình request: headers, params, timeout

**Yêu cầu:** Tạo component `RequestConfig` gửi request bằng **cú pháp đầy đủ `axios(config)`**, sau đó hiển thị **status, một số response headers** và **dữ liệu**.

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RequestConfig = () => {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/posts',
      params: { _page: 1, _limit: 3 },
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer demo-token-123',   // ví dụ header xác thực
      },
      timeout: 5000,                               // quá 5 giây → lỗi
    })
      .then(response => {
        setInfo({
          status: response.status,
          contentType: response.headers['content-type'],
          total: response.headers['x-total-count'],
          data: response.data,
        });
      })
      .catch(error => {
        if (error.code === 'ECONNABORTED') setError('Request quá thời gian (timeout)');
        else if (error.response) setError(`Server trả lỗi ${error.response.status}`);
        else setError(error.message);
      });
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!info) return <div>Loading...</div>;

  return (
    <div>
      <h2>Cấu hình request</h2>
      <p>Status: {info.status}</p>
      <p>Content-Type: {info.contentType}</p>
      <p>Tổng số bài viết (x-total-count): {info.total}</p>
      <ul>
        {info.data.map(p => <li key={p.id}>{p.title}</li>)}
      </ul>
    </div>
  );
};

export default RequestConfig;
```

**Giải thích:**
- `axios(config)` là dạng tổng quát. `axios.get/post/...` thực chất là các dạng viết tắt của nó.
- Tên **response headers** trong axios luôn ở dạng **chữ thường** (`x-total-count`).
- Phân loại lỗi qua `error.code` (timeout), `error.response` (server trả 4xx/5xx), các trường hợp còn lại là lỗi mạng.
- Mở **DevTools → Network → Request Headers** để thấy header `Authorization` đã được gửi đi.

**Kết quả mong đợi:**
```
Status: 200
Content-Type: application/json; charset=utf-8
Tổng số bài viết (x-total-count): 100
- sunt aut facere repellat provident ...
- qui est esse
- ea molestias quasi exercitationem ...
```

---

#### Hiển thị tất cả component

Để dùng các component vừa tạo, render chúng ở gốc ứng dụng (`src/App.jsx`):

```jsx
import React from 'react';
import AxiosDemo from './AxiosDemo';
import PostList from './PostList';
import CreatePost from './CreatePost';
import UpdatePost from './UpdatePost';
import PatchPost from './PatchPost';
import DeletePost from './DeletePost';
import RequestConfig from './RequestConfig';

function App() {
  return (
    <div>
      <AxiosDemo />
      <hr />
      <PostList />
      <hr />
      <CreatePost />
      <hr />
      <UpdatePost />
      <hr />
      <PatchPost />
      <hr />
      <DeletePost />
      <hr />
      <RequestConfig />
    </div>
  );
}

export default App;
```

> Với React 18 + Vite, `<React.StrictMode>` đã được đặt sẵn trong `src/main.jsx`, nên `App` không cần bọc thêm.
> Ở chế độ dev, StrictMode cố tình chạy `useEffect` **2 lần**, vì vậy tab Network sẽ thấy mỗi request GET xuất hiện 2 lần. Đây là hành vi bình thường.

---

### Phần 3 – Yêu cầu nâng cao

Các yêu cầu sau **không có lời giải sẵn**. Sinh viên tự làm, có gợi ý kèm theo.

#### NC1 – Chuyển sang async/await

Viết lại **tất cả** component ở Phần 1 và 2 bằng `async/await` + `try/catch/finally` thay cho `.then/.catch`.

*Gợi ý:* không truyền hàm async trực tiếp vào `useEffect`. Hãy khai báo hàm async bên trong rồi gọi nó:
```jsx
useEffect(() => {
  const fetchData = async () => {
    try { const res = await axios.get(url); setData(res.data); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };
  fetchData();
}, []);
```

#### NC2 – axios instance và interceptors

1. Tạo file `src/api/axiosClient.js` dùng `axios.create({ baseURL, timeout, headers })`. Mọi component dùng `axiosClient` thay cho URL đầy đủ.
2. **Request interceptor:** log `method + url` ra console và gắn `Authorization: Bearer <token>` nếu `localStorage` có `token`.
3. **Response interceptor:** đo thời gian xử lý mỗi request (ms), và chuyển lỗi thành câu tiếng Việt dễ hiểu (404 → "Không tìm thấy", mất mạng → "Không kết nối được server", 5xx → "Máy chủ lỗi").
4. Tách các hàm gọi API ra `src/api/postApi.js`: `getAll`, `getById`, `create`, `update`, `patch`, `remove`.

#### NC3 – Nhiều request cùng lúc

1. Component `PostDetail`: lấy bài viết, **sau đó** lấy song song tác giả (`/users/:userId`) và bình luận (`/posts/:id/comments`) bằng `Promise.all`.
2. Đo và so sánh thời gian khi gọi **tuần tự** với gọi **song song**.
3. Đổi sang `Promise.allSettled` để nếu phần bình luận lỗi thì vẫn hiển thị bài viết và tác giả.

#### NC4 – Chọn id và hủy request (AbortController)

1. `AxiosDemo` có ô nhập **Post ID** (1–100). Đổi id thì gọi lại API (`useEffect` deps `[postId]`).
2. Dùng `AbortController` truyền `signal` cho axios, và gọi `abort()` trong hàm cleanup.
3. Trong `catch`, bỏ qua lỗi hủy bằng `axios.isCancel(error)`.
4. Kiểm tra: bật **Slow 3G**, đổi id thật nhanh. Request cũ phải hiện *(canceled)* và màn hình chỉ hiển thị bài cuối cùng.

#### NC5 – Giao diện bằng react-bootstrap

```bash
npm install react-bootstrap bootstrap
```
- Loading → `Spinner`; Error → `Alert variant="danger"`; dữ liệu → `Card` / `Table` / `ListGroup`.
- Form POST/PUT dùng `Form`, `Form.Control`, có kiểm tra dữ liệu (`isInvalid` + `Form.Control.Feedback`): title ≥ 5 ký tự, body ≥ 10 ký tự.
- Xác nhận xóa bằng `Modal` thay cho `window.confirm`. Thông báo kết quả bằng `Toast`.

#### NC6 – Ứng dụng CRUD với React Router

```bash
npm install react-router-dom
```

| Route | Trang | Request |
|---|---|---|
| `/posts` | Danh sách + phân trang + lọc theo tác giả | GET `?_page=&_limit=&userId=` |
| `/posts/new` | Tạo bài viết | POST |
| `/posts/:id` | Chi tiết + bình luận + sửa nhanh tiêu đề + xóa | GET, PATCH, DELETE |
| `/posts/:id/edit` | Sửa toàn bộ | GET + PUT |
| `*` | Trang 404 | – |

- Dùng `useParams`, `useNavigate`, `useSearchParams` (lưu `page` và `userId` trên URL).
- Có Layout chung (`Navbar` + `<Outlet />`), menu dùng `NavLink`.
- Sau khi POST/PUT/DELETE thành công: `navigate()` về trang phù hợp, kèm thông báo qua `state`.
- Tổng số trang lấy từ header `x-total-count`.

#### NC7 – Lưu dữ liệu thật với json-server

1. Cài `npm install -D json-server@0.17.4`, tạo `db.json` gồm `posts`, `users`, `comments`.
2. Thêm script `"server": "json-server --watch db.json --port 3001"`.
3. Đổi `baseURL` sang biến môi trường: tạo `.env` với `VITE_API_URL=http://localhost:3001`, đọc bằng `import.meta.env.VITE_API_URL`.
4. Kiểm tra: sau POST/PUT/PATCH/DELETE, file `db.json` thay đổi thật và F5 vẫn còn dữ liệu.

#### NC8 – Custom hook `useAxios`

Gom logic lặp lại (loading, error, data, AbortController) thành hook:
```js
const { data, loading, error, refetch } = useAxios(
  (signal) => postApi.getAll({ _limit: 10 }, signal),   // hàm gọi API
  []                                                     // deps
);
```
Áp dụng hook cho mọi component chỉ có GET. Thêm nút **Thử lại** gọi `refetch()` khi có lỗi.

#### NC9 – Tìm kiếm có debounce

Thêm ô tìm kiếm ở danh sách bài viết, gọi API với `params: { q: keyword }` (json-server) **sau khi ngừng gõ 500ms**. Dùng `setTimeout` trong `useEffect` và `clearTimeout` trong cleanup. Lưu `q` trên URL.

#### NC10 – Thao tác hàng loạt và optimistic update

1. Danh sách có checkbox. Nút **Xóa đã chọn** gửi nhiều DELETE song song bằng `Promise.allSettled`, rồi báo "Xóa thành công X/Y".
2. Xóa một bài theo kiểu **optimistic**: xóa khỏi giao diện ngay, sau đó gọi API, lỗi thì **khôi phục** lại.

---

### Checklist tự đánh giá

**Phần 1–2**
- [ ] GET `/posts/1` hiển thị đúng title/body; có Loading và Error.
- [ ] GET dùng `params`, không tự ghép chuỗi query.
- [ ] POST trả `201` và `id: 101`; nút bị disable khi đang gửi.
- [ ] PUT gửi đủ các trường; PATCH chỉ gửi trường thay đổi. Giải thích được sự khác nhau.
- [ ] DELETE trả `200`, giao diện cập nhật bằng `filter`.
- [ ] Dùng được `axios(config)` với `headers`, `params`, `timeout`; đọc được response headers.
- [ ] POST/PUT/PATCH/DELETE nằm trong **event handler**, không nằm trong `useEffect`.

**Phần 3**
- [ ] async/await + try/catch/finally.
- [ ] axios instance + interceptors + tầng service.
- [ ] `Promise.all` / `allSettled`; AbortController + `axios.isCancel`.
- [ ] react-bootstrap (Spinner, Alert, Card, Form, Modal, Toast).
- [ ] React Router: routes lồng nhau, `useParams`, `useNavigate`, `useSearchParams`, trang 404.
- [ ] json-server + `.env`; custom hook `useAxios`; debounce; optimistic update.

---

## Conclusion

Bài tập đã minh họa cách dùng Axios trong component React để gửi đầy đủ các loại HTTP request: **GET** (kèm params), **POST**, **PUT**, **PATCH**, **DELETE**, cùng cách cấu hình **headers, timeout** và đọc **response headers**. Phần nâng cao mở rộng sang các kỹ thuật dùng trong dự án thực tế: async/await, axios instance và interceptors, xử lý nhiều request song song, hủy request, giao diện react-bootstrap, điều hướng bằng React Router và lưu dữ liệu thật với json-server.
