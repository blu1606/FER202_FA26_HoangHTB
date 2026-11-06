**ĐỀ THI THỰC HÀNH FER202 – ĐỀ MẪU**

**AutoShop Mini – Ứng dụng showroom bán xe ô tô**

_Thời gian: 85 phút · Thang điểm: 10_

## MÔ TẢ ỨNG DỤNG

Bạn sẽ hoàn thiện **AutoShop Mini**, một showroom bán xe ô tô trực tuyến có giỏ hàng, đăng nhập/đăng ký và trang quản lý người dùng cho admin. Dữ liệu gồm 3 collection:
 
- **cars**: danh sách xe (id, name, brandId, price, discount, stock, year, fuel, image, description)
- **brands**: hãng xe (id, name)
- **users**: tài khoản đăng nhập (id, email, password, fullName, role, active, createdAt)

Ứng dụng đã có sẵn cấu trúc project, API (axios), Context (Auth / Cart / Toast), reducer giỏ hàng, hàm validation, `ProtectedRoute` và các trang cơ bản. Nhiệm vụ của bạn là **hoàn thành các TODO** được đánh dấu trong mã nguồn.

> **Lưu ý về trang chủ:** khi chạy ứng dụng và mở `http://localhost:5173/`, màn hình **chỉ hiển thị Navbar** và **không tải** danh sách xe. Đây là hành vi **đúng**, không phải lỗi. Danh sách xe chỉ được tải khi bấm link **"Danh sách xe"** trên Navbar (hoặc gõ URL `/cars`).

**Các trang:**

| Đường dẫn | Trang | Bảo vệ |
| --- | --- | --- |
| `/` | Trang chủ: **chỉ có Navbar** (không tải dữ liệu) | – |
| `/cars` | Danh sách xe (TODO-06, 07; thẻ xe là TODO-04, 05) | – |
| `/cars/:id` | Chi tiết xe (TODO-08, 09) | – |
| `/login` | Đăng nhập (có sẵn) | – |
| `/register` | Đăng ký (TODO-12) | – |
| `/cart` | Giỏ hàng (có sẵn) | Cần đăng nhập |
| `/admin/users` | Danh sách người dùng (TODO-11) | Chỉ `admin` |
| `/403` | Không có quyền truy cập (TODO-10) | – |
| `*` | 404 (có sẵn) | – |

## DỮ LIỆU MẪU (db.json)

- 6 users (2 admin, 4 customer; 1 tài khoản bị khoá)
- 4 brands: 1 Toyota · 2 Honda · 3 Hyundai · 4 VinFast
- 12 cars, giá tính bằng VND; nhiên liệu: Xăng / Dầu / Điện / Hybrid

**Tài khoản dùng để kiểm tra:**

| email | password | fullName | role | active |
| --- | --- | --- | --- | --- |
| admin@autoshop.vn | 12345678 | Quản trị viên | admin | true |
| khach@autoshop.vn | 12345678 | Nguyễn Văn An | customer | true |
| cuong@autoshop.vn | cuong2026 | Lê Văn Cường | customer | **false** (không đăng nhập được) |

**Một số xe dùng để kiểm tra** (giá bán = giá × (1 − giảm/100), tính bằng `getFinalPrice`):

| id | name | Hãng | price | discount | stock | year · fuel | Giá bán |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Toyota Vios G | Toyota | 545.000.000 | 5 | 6 | 2024 · Xăng | 517.750.000 ₫ |
| 2 | Honda City RS | Honda | 609.000.000 | 0 | 4 | 2024 · Xăng | 609.000.000 ₫ |
| 3 | Toyota Camry 2.5Q | Toyota | 1.460.000.000 | 10 | **0** | 2023 · Xăng | 1.314.000.000 ₫ |
| 9 | Toyota Corolla Cross HEV | Toyota | 955.000.000 | 12 | 4 | 2024 · Hybrid | 840.400.000 ₫ |

## CÁCH CHẠY ỨNG DỤNG

```bash
npm install

# Chạy JSON Server (port 3001) + React Dev Server (port 5173) cùng lúc
npm start

# Khôi phục db.json về dữ liệu gốc (sau đó tắt và chạy lại npm start)
npm run reset-db

# Chạy test tự kiểm tra
npm test
npm test -- todo06      # chỉ chạy 1 file test (ở đây: todo06-07 → TODO-06, 07)
```

## DANH SÁCH TODO VÀ ĐIỂM

| **TODO** | **Mô tả** | **Điểm** |
| --- | --- | --- |
| TODO-01 | Navbar – link "Giỏ hàng" + Badge số lượng | 0.5 |
| TODO-02 | Navbar – đã đăng nhập: "Xin chào, {fullName}" + nút Đăng xuất | 1.0 |
| TODO-03 | Navbar – chưa đăng nhập: nút "Đăng nhập" và "Đăng ký" | 0.5 |
| TODO-04 | CarCard – tên là Link, Badge hãng xe, "Đời {year} · {fuel}" | 1.0 |
| TODO-05 | CarCard – giá sau giảm, giá gốc gạch ngang, trạng thái hết xe | 1.0 |
| TODO-06 | CarListPage – ô tìm theo tên + select hãng xe | 1.0 |
| TODO-07 | CarListPage – dòng đếm kết quả + thông báo khi rỗng | 0.5 |
| TODO-08 | CarDetailPage – Loading, lỗi, hiển thị thông tin xe | 1.0 |
| TODO-09 | CarDetailPage – tình trạng, Thêm vào giỏ, nút Quay lại | 1.0 |
| TODO-10 | ForbiddenPage – thông tin tài khoản + các nút điều hướng | 0.5 |
| TODO-11 | AdminUserPage – tải danh sách user và hiển thị bảng | 1.0 |
| TODO-12 | RegisterPage – ô Email, Mật khẩu và xử lý submit | 1.0 |
| **Tổng** | | **10.0** |

> Các TODO **độc lập** với nhau, làm theo thứ tự nào cũng được. Gợi ý thứ tự từ dễ đến khó: 03 → 01 → 02 → 04 → 05 → 10 → 06 → 07 → 08 → 09 → 11 → 12.

## CHI TIẾT TODO

### TODO-01 – Navbar: Link "Giỏ hàng" + Badge (0.5 điểm)

**File:** `src/components/AppNavbar.jsx`

**Yêu cầu:** Bên trong `<Nav className="me-auto">`, ngay sau link "Danh sách xe", thêm link "Giỏ hàng" tới `/cart` kèm Badge hiển thị `totalQuantity` (lấy từ `useCart()`, đã khai báo sẵn).

```jsx
<Nav.Link as={NavLink} to="/cart">
  Giỏ hàng{' '}
  <Badge bg="warning" text="dark" pill data-testid="cart-badge">
    {totalQuantity}
  </Badge> 
</Nav.Link>
```

**Checklist:**

- Có link "Giỏ hàng" dẫn tới `/cart`, dùng `NavLink`
- Badge có `data-testid="cart-badge"`, ban đầu hiển thị `0`
- Bấm "Thêm vào giỏ" ở `/cars` thì số trên Badge tăng lên

### TODO-02 – Navbar: Đã đăng nhập (1.0 điểm)

**File:** `src/components/AppNavbar.jsx`

**Yêu cầu:** Trong nhánh `user ? (...)`, hiển thị lời chào và nút "Đăng xuất". Viết thân hàm `handleLogout`.

- Hiển thị `<span>Xin chào, {user.fullName}</span>`
- Nút "Đăng xuất": `<Button variant="outline-light" size="sm" onClick={handleLogout}>Đăng xuất</Button>`
- `handleLogout` lần lượt gọi:

```jsx
const handleLogout = () => {
  logout();
  showToast('Đã đăng xuất', 'info');
  navigate('/');
};
```

**Checklist:**

- Đăng nhập `khach@autoshop.vn` → Navbar hiện "Xin chào, Nguyễn Văn An"
- Có nút "Đăng xuất" khi đã đăng nhập
- Bấm "Đăng xuất" → `logout()` được gọi, hiện toast "Đã đăng xuất"
- Sau khi đăng xuất, chuyển về `/` (chỉ còn Navbar)

### TODO-03 – Navbar: Chưa đăng nhập (0.5 điểm)

**File:** `src/components/AppNavbar.jsx`

**Yêu cầu:** Trong nhánh `: (...)` (chưa đăng nhập), hiển thị 2 nút điều hướng.

```jsx
<Button as={Link} to="/login" variant="outline-light" size="sm">Đăng nhập</Button>
<Button as={Link} to="/register" variant="warning" size="sm">Đăng ký</Button>
```

**Checklist:**

- Chưa đăng nhập → có nút "Đăng nhập" dẫn tới `/login`
- Chưa đăng nhập → có nút "Đăng ký" dẫn tới `/register`
- Đã đăng nhập → **không** hiện 2 nút này

### TODO-04 – CarCard: Tên, hãng xe, đời xe (1.0 điểm)

**File:** `src/components/CarCard.jsx`

**Props:** `car = { id, name, image, price, discount, stock, year, fuel, brand? }`, `onAddToCart`.

**Yêu cầu:**

- Tên xe là link tới trang chi tiết: `<Link to={`/cars/${id}`}>{name}</Link>` (đặt trong `Card.Title`)
- Nếu có `brand` → hiển thị `<Badge bg="info">{brand.name}</Badge>`
- Hiển thị đời xe và nhiên liệu: `<small className="text-muted">Đời {year} · {fuel}</small>`

**Checklist:**

- "Toyota Vios G" là link có href `/cars/1`
- Thẻ "Toyota Vios G" có Badge "Toyota"
- Thẻ hiển thị "Đời 2024 · Xăng"
- Không lỗi khi `car.brand` không có

### TODO-05 – CarCard: Giá và hết xe (1.0 điểm)

**File:** `src/components/CarCard.jsx`

**Yêu cầu:**

- Giá sau giảm: `<span className="text-danger fw-bold">{formatVND(getFinalPrice(car))}</span>` (`formatVND`, `getFinalPrice` đã được import)
- **Chỉ khi** `discount > 0`: hiển thị giá gốc gạch ngang và Badge phần trăm giảm

```jsx
{discount > 0 && (
  <div className="small">
    <span className="text-muted text-decoration-line-through">{formatVND(price)}</span>
    <Badge bg="danger" className="ms-2">-{discount}%</Badge>
  </div>
)}
```

- Khi `stock === 0` (biến `outOfStock` đã có sẵn): hiện `<Badge bg="secondary">Hết xe</Badge>`; nút bị `disabled` và đổi chữ thành "Hết xe"

**Checklist:**

- Toyota Vios G: giá đỏ đậm **517.750.000 ₫**, có 545.000.000 ₫ gạch ngang và "-5%"
- Honda City RS: 609.000.000 ₫, **không** có giá gạch ngang
- Toyota Camry 2.5Q: có Badge "Hết xe", nút "Hết xe" bị disabled
- Không ghi cứng giá, phải tính từ `car`

### TODO-06 – CarListPage: Ô tìm kiếm + select hãng xe (1.0 điểm)

**File:** `src/pages/CarListPage.jsx`

**Đã có sẵn:** tải `cars` + `brands`, state `keyword`, `brandId`, dòng `visible = filterCars(...)`, ô **Sắp xếp**, switch **Còn xe** và nút **Xóa lọc**. Bạn chỉ cần nối 2 ô vào state (controlled component).

```jsx
<Form.Control
  type="search"
  aria-label="Tìm theo tên"
  placeholder="Tìm theo tên xe..."
  value={keyword}
  onChange={(e) => setKeyword(e.target.value)}
/>

<Form.Select aria-label="Hãng xe" value={brandId} onChange={(e) => setBrandId(e.target.value)}>
  <option value="">Tất cả hãng xe</option>
  {brands.map((b) => (
    <option key={b.id} value={b.id}>{b.name}</option>
  ))}
</Form.Select>
```

**Checklist:**

- Gõ "toyota" → còn 3 thẻ (Toyota Vios G, Toyota Camry 2.5Q, Toyota Corolla Cross HEV)
- Select có option đầu "Tất cả hãng xe" (`value=""`) và 4 hãng lấy từ API
- Mỗi `<option>` có `key`
- Chọn "VinFast" → còn 3 thẻ
- Bấm "Xóa lọc" (có sẵn) → 2 ô trở về trống, hiện lại 12 thẻ

### TODO-07 – CarListPage: Đếm kết quả + thông báo rỗng (0.5 điểm)

**File:** `src/pages/CarListPage.jsx`

**Yêu cầu:** Phía trên lưới xe:

```jsx
<p data-testid="result-count">Tìm thấy {visible.length}/{cars.length} mẫu xe</p>
```

Khi `visible` rỗng → hiện `<Alert variant="warning">Không có mẫu xe phù hợp</Alert>` **thay cho** lưới thẻ.

**Checklist:**

- Mở `/cars` → "Tìm thấy 12/12 mẫu xe"
- Bật switch "Còn xe" → "Tìm thấy 10/12 mẫu xe"
- Gõ "xyz" → Alert vàng "Không có mẫu xe phù hợp"

### TODO-08 – CarDetailPage: Loading, lỗi, thông tin xe (1.0 điểm)

**File:** `src/pages/CarDetailPage.jsx`

**Đã có sẵn:** `useEffect` tải xe theo `id`, state `car`, `loading`, `error`, `quantity`, ảnh và tên `<h2>`.

**Yêu cầu:**

**Khi đang tải:** `if (loading) return <Loading />;`

**Khi có lỗi:**

```jsx
if (error)
  return (
    <>
      <ErrorAlert message={error} />
      <Link to="/cars">← Về danh sách xe</Link>
    </>
  );
```

**Khi có dữ liệu, hiển thị:**

- Badge hãng xe: `<Badge bg="info">{car.brand?.name}</Badge>` và `<span>Đời {car.year} · {car.fuel}</span>`
- Giá sau giảm: `<span className="text-danger fw-bold fs-3">{formatVND(getFinalPrice(car))}</span>`
- Mô tả: `<p>{car.description}</p>`

**Checklist:**

- Có spinner khi đang tải
- `/cars/9999` → hiện "Không tìm thấy dữ liệu" + link "← Về danh sách xe"
- `/cars/9` → Badge "Toyota", "Đời 2024 · Hybrid"
- `/cars/9` → giá **840.400.000 ₫** màu đỏ, chữ lớn
- `/cars/9` → mô tả "SUV đô thị động cơ hybrid, tiết kiệm nhiên liệu."

### TODO-09 – CarDetailPage: Tình trạng, Thêm vào giỏ, Quay lại (1.0 điểm)

**File:** `src/pages/CarDetailPage.jsx`

**Đã có sẵn:** `<QuantityPicker ... onChange={setQuantity} />`, biến `outOfStock`, khung hàm `handleAdd`.

**Yêu cầu:**

- Tình trạng: còn xe → `<Badge bg="success">Còn {car.stock} xe</Badge>`, hết xe → `<Badge bg="secondary">Hết xe</Badge>`
- Nút "Thêm vào giỏ": `disabled={outOfStock}`, `onClick={handleAdd}`
- Thân `handleAdd`:

```jsx
const handleAdd = () => {
  addToCart(car, quantity);
  showToast(`Đã thêm ${quantity} "${car.name}" vào giỏ`);
};
```

- Nút "← Quay lại": `onClick={() => navigate(-1)}`

**Checklist:**

- `/cars/9` → "Còn 4 xe"; `/cars/3` → "Hết xe"
- `/cars/9` chọn số lượng 2 → bấm "Thêm vào giỏ" → toast `Đã thêm 2 "Toyota Corolla Cross HEV" vào giỏ`, Badge giỏ hàng tăng 2
- `/cars/3` → nút "Thêm vào giỏ" bị disabled
- Từ `/cars` vào chi tiết, bấm "← Quay lại" → về đúng `/cars`

### TODO-10 – ForbiddenPage: Trang 403 (0.5 điểm)

**File:** `src/pages/ForbiddenPage.jsx`

**Đã có sẵn:** tiêu đề "403 – Không có quyền truy cập", câu mô tả, các biến `user`, `isLoggedIn`, `navigate`.

**Yêu cầu:**

- Nếu `isLoggedIn`: hiện `Bạn đang đăng nhập với tài khoản {user.email} (vai trò: {user.role})`
- Nút "← Quay lại": `onClick={() => navigate(-1)}`
- Nút "Về danh sách xe": `<Button as={Link} to="/cars">`

**Checklist:**

- Đăng nhập `khach@autoshop.vn`, gõ URL `/admin/users` → được chuyển tới `/403`
- Hiện "Bạn đang đăng nhập với tài khoản khach@autoshop.vn (vai trò: customer)"
- Nút "← Quay lại" về trang trước; nút "Về danh sách xe" tới `/cars`

### TODO-11 – AdminUserPage: Danh sách người dùng (1.0 điểm)

**File:** `src/pages/admin/AdminUserPage.jsx`

**Đã có sẵn:** state `users`, `loading`, `error`; khung `useEffect`; phần `<thead>` của bảng (ID · Họ tên · Email · Vai trò · Trạng thái).

**Yêu cầu:** Trong `useEffect`, tải danh sách user bằng `async/await` + `try/catch/finally`:

```jsx
useEffect(() => {
  const load = async () => {
    try {
      setUsers(await userApi.getAll());
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };
  load();
}, []);
```

**Hiển thị:**

- Đang tải → `<Loading text="Đang tải người dùng..." />`; có lỗi → `<ErrorAlert message={error} />`
- Tiêu đề: **"Quản lý người dùng ({users.length})"**
- Mỗi user là một `<tr key={u.id}>` gồm 5 ô: ID · Họ tên · Email · Vai trò · Trạng thái
  - Vai trò: `admin` → `<Badge bg="danger">Admin</Badge>`, còn lại → `<Badge bg="secondary">Khách hàng</Badge>`
  - Trạng thái: `active` → `<Badge bg="success">Hoạt động</Badge>`, ngược lại → `<Badge bg="dark">Đã khoá</Badge>`

**Checklist:**

- Đăng nhập `admin@autoshop.vn`, vào `/admin/users` → Network có request `GET /users`
- Có spinner khi tải; tắt json-server rồi F5 → Alert đỏ báo lỗi
- Tiêu đề "Quản lý người dùng (6)"
- Bảng có đủ 6 dòng, mỗi dòng có `key`
- Badge vai trò và trạng thái đúng (dòng Lê Văn Cường là "Đã khoá")

### TODO-12 – RegisterPage: Form đăng ký (1.0 điểm)

**File:** `src/pages/RegisterPage.jsx`

**Đã có sẵn:** state `values`, `touched`, `submitted`, `submitting`, `serverError`; `errors = validateRegister(values)`, `errorCount`, `handleChange`, `handleBlur`, `showError`; ô **Họ tên** (làm mẫu), ô Số điện thoại, ô Nhập lại mật khẩu, checkbox điều khoản, Alert `serverError` và nút "Đăng ký".

**Yêu cầu 1:** Làm **tương tự ô Họ tên** cho 2 ô:

| Nhãn | name | type | controlId |
| --- | --- | --- | --- |
| Email | email | email | `register-email` |
| Mật khẩu | password | password | `register-password` |

Mỗi ô có `value`, `onChange={handleChange}`, `onBlur={handleBlur}`, `isInvalid={Boolean(showError('...'))}` và `<Form.Control.Feedback type="invalid">`.

**Yêu cầu 2:** Viết thân `handleSubmit`:

```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitted(true);
  if (errorCount > 0) return;            // còn lỗi → KHÔNG gọi API
  setSubmitting(true);
  try {
    await userApi.register({
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      password: values.password,
    });
    showToast('Đăng ký thành công, vui lòng đăng nhập');
    navigate('/login', { state: { email: values.email.trim() } });
  } catch (err) {
    setServerError(err.message);
  } finally {
    setSubmitting(false);
  }
};
```

**Checklist:**

- Có ô Email (`register-email`) và Mật khẩu (`register-password`), gõ được
- Email "abc" → hiện "Email không đúng định dạng"; mật khẩu "abcdefgh" → "Mật khẩu phải có cả chữ và số"
- Bấm "Đăng ký" khi form trống → hiện lỗi, **không** có request `/users` trong Network
- Đăng ký hợp lệ (ví dụ `mai@autoshop.vn` / `mai12345`) → toast thành công, chuyển `/login` và ô email đã được điền sẵn
- Dùng email `khach@autoshop.vn` → Alert đỏ "Email đã được sử dụng"

## TỔNG HỢP ĐIỂM

| **TODO** | **File** | **Điểm** |
| --- | --- | --- |
| TODO-01: Navbar Giỏ hàng + Badge | src/components/AppNavbar.jsx | 0.5 |
| TODO-02: Navbar đã đăng nhập + Đăng xuất | src/components/AppNavbar.jsx | 1.0 |
| TODO-03: Navbar chưa đăng nhập | src/components/AppNavbar.jsx | 0.5 |
| TODO-04: CarCard tên, hãng xe, đời xe | src/components/CarCard.jsx | 1.0 |
| TODO-05: CarCard giá + hết xe | src/components/CarCard.jsx | 1.0 |
| TODO-06: Ô tìm kiếm + select hãng xe | src/pages/CarListPage.jsx | 1.0 |
| TODO-07: Đếm kết quả + thông báo rỗng | src/pages/CarListPage.jsx | 0.5 |
| TODO-08: Chi tiết – Loading, lỗi, thông tin | src/pages/CarDetailPage.jsx | 1.0 |
| TODO-09: Chi tiết – tình trạng, giỏ hàng, quay lại | src/pages/CarDetailPage.jsx | 1.0 |
| TODO-10: Trang 403 | src/pages/ForbiddenPage.jsx | 0.5 |
| TODO-11: Danh sách người dùng | src/pages/admin/AdminUserPage.jsx | 1.0 |
| TODO-12: Form đăng ký | src/pages/RegisterPage.jsx | 1.0 |
| **TỔNG** | | **10.0** |

## CẤU TRÚC THƯ MỤC

```
template/
├── DeThi_Sample.md                  # Đề thi (file này)
├── db.json, db.backup.json          # Dữ liệu mẫu (KHÔNG sửa)
├── package.json, vite.config.js     # Cấu hình (KHÔNG sửa)
├── vitest.config.js                 # Cấu hình test (KHÔNG sửa)
├── public/images/                   # Ảnh minh hoạ xe (SVG, chạy offline)
├── test/                            # Test tự kiểm tra (KHÔNG sửa), xem test/README.md
└── src/
    ├── main.jsx                     # Có sẵn (KHÔNG sửa)
    ├── App.jsx                      # Bảng route, "/" chỉ hiện Navbar (KHÔNG sửa)
    ├── api/
    │   ├── axiosClient.js           # Có sẵn (KHÔNG sửa)
    │   ├── authApi.js               # Có sẵn (KHÔNG sửa)
    │   ├── carApi.js                # Có sẵn (KHÔNG sửa) – carApi + brandApi
    │   └── userApi.js               # Có sẵn (KHÔNG sửa)
    ├── context/
    │   ├── AuthContext.jsx          # Có sẵn (KHÔNG sửa)
    │   ├── CartContext.jsx          # Có sẵn (KHÔNG sửa)
    │   └── ToastContext.jsx         # Có sẵn (KHÔNG sửa)
    ├── reducers/
    │   └── cartReducer.js           # Có sẵn (KHÔNG sửa)
    ├── utils/
    │   ├── format.js                # Có sẵn (KHÔNG sửa)
    │   ├── filterCars.js            # Có sẵn (KHÔNG sửa)
    │   └── validation.js            # Có sẵn (KHÔNG sửa)
    ├── components/
    │   ├── AppNavbar.jsx            # TODO-01, 02, 03
    │   ├── CarCard.jsx              # TODO-04, 05
    │   ├── ProtectedRoute.jsx       # Có sẵn (KHÔNG sửa)
    │   ├── Loading.jsx              # Có sẵn (KHÔNG sửa)
    │   ├── ErrorAlert.jsx           # Có sẵn (KHÔNG sửa)
    │   └── QuantityPicker.jsx       # Có sẵn (KHÔNG sửa)
    └── pages/
        ├── LoginPage.jsx            # Có sẵn (KHÔNG sửa)
        ├── CartPage.jsx             # Có sẵn (KHÔNG sửa)
        ├── NotFoundPage.jsx         # Có sẵn (KHÔNG sửa)
        ├── CarListPage.jsx          # TODO-06, 07
        ├── CarDetailPage.jsx        # TODO-08, 09
        ├── ForbiddenPage.jsx        # TODO-10
        ├── RegisterPage.jsx         # TODO-12
        └── admin/
            └── AdminUserPage.jsx    # TODO-11
```

## CÁC HÀM CÓ SẴN (chỉ cần dùng)

| Gọi | Trả về |
| --- | --- |
| `carApi.getAll()` / `carApi.getById(id)` | Mảng xe / 1 xe (có `brand: { id, name }`) |
| `brandApi.getAll()` | Mảng hãng xe |
| `userApi.getAll()` | Mảng user (không có `password`) |
| `userApi.register({ fullName, email, password, phone })` | User mới; trùng email → lỗi "Email đã được sử dụng" |
| `useAuth()` | `{ user, isLoggedIn, isAdmin, login, logout }` |
| `useCart()` | `{ items, totalQuantity, totalPrice, addToCart(car, quantity), ... }` |
| `useToast()` | `{ showToast(message, variant = 'success') }` |
| `formatVND(n)`, `getFinalPrice(car)` | `formatVND(517750000)` → "517.750.000 ₫" |
| `getErrorMessage(err)` | Chuỗi thông báo lỗi từ object lỗi |

## LƯU Ý QUAN TRỌNG

1\. **KHÔNG sửa** các file không có TODO (kể cả `App.jsx` và thư mục `test/`), sửa sai file sẽ bị trừ điểm.

2\. **Chạy ứng dụng:** `npm start` (chạy cùng lúc JSON Server và React Dev Server).

3\. **Trang chủ `/` chỉ hiển thị Navbar**, không tải danh sách xe. Bấm link **"Danh sách xe"** để vào `/cars`.

4\. **Tài khoản kiểm tra:** `admin@autoshop.vn` / `12345678` (admin), `khach@autoshop.vn` / `12345678` (customer).

5\. Đổi tài khoản khi chưa làm nút "Đăng xuất": mở DevTools → Console, gõ `localStorage.clear(); location.reload()`.

6\. Gọi API qua các hàm có sẵn (`carApi`, `brandApi`, `userApi`), dùng `async/await` + `try/catch`. **Không** dùng `.then()`, **không** dùng `alert()` (dùng `showToast`), **không** ghi cứng `http://localhost:3001` trong component.

7\. Giữ đúng `aria-label`, `controlId`, `data-testid` và câu thông báo như đề ghi, vì phần chấm dựa vào đó.

8\. **Không ghi cứng dữ liệu mẫu** (ví dụ "517.750.000 ₫", "Nguyễn Văn An", "(6)", "Đời 2024"). Khi chấm có test ẩn dùng dữ liệu khác.

9\. Nhớ thêm `key` khi render danh sách bằng `map()`.

10\. **Nộp bài:** nén thư mục project **không có `node_modules`**, đặt tên `MSSV_HoTen.zip`.

**CHÚC CÁC BẠN LÀM BÀI TỐT!**
