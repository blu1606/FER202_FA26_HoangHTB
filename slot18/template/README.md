**ĐỀ THI THỰC HÀNH FER202_FA26 – ĐỀ 3**

**FPT Food Mini – Ứng dụng đặt món & đặt bàn nhà hàng**

_Thời gian: 85 phút · Thang điểm: 10_

## MÔ TẢ ỨNG DỤNG

Bạn sẽ hoàn thiện **FPT Food Mini**, ứng dụng của một nhà hàng: khách xem thực đơn, thêm món vào giỏ và đặt món, đặt bàn trước; admin xem danh sách đơn hàng và doanh thu. Dữ liệu gồm 5 collection:

- **dishes**: món ăn (id, name, categoryId, price, discount, available, spicy, prepTime, sold, rating, image, description)
  - `available`: món còn phục vụ hay tạm hết · `spicy`: độ cay 0–3 · `prepTime`: thời gian chuẩn bị (phút) · `sold`: số phần đã bán
- **categories**: danh mục (id, name)
- **users**: tài khoản đăng nhập (id, email, password, fullName, role, active, createdAt)
- **orders**: đơn đặt món (id, userId, receiver, items: [{ dishId, quantity, price }], total, status, createdAt)
- **reservations**: phiếu đặt bàn (id, userId, name, phone, date, time, guests, note, status, createdAt)

Ứng dụng đã có sẵn cấu trúc project, API (axios), Context (Auth / Cart / Toast), reducer giỏ món, hàm validation, `ProtectedRoute`, trang Giỏ món (có nút "Đặt món") và các trang cơ bản. Nhiệm vụ của bạn là **hoàn thành các TODO** được đánh dấu trong mã nguồn.

> **Lưu ý về trang chủ:** khi chạy ứng dụng và mở `http://localhost:5173/`, màn hình **chỉ hiển thị Navbar** và **không tải** thực đơn. Đây là hành vi **đúng**, không phải lỗi. Thực đơn chỉ được tải khi bấm link **"Thực đơn"** trên Navbar (hoặc gõ URL `/dishes`).

**Các trang:**

| Đường dẫn | Trang | Bảo vệ |
| --- | --- | --- |
| `/` | Trang chủ: **chỉ có Navbar** (không tải dữ liệu) | – |
| `/dishes` | Thực đơn (TODO-06, 07; thẻ món là TODO-04, 05) | – |
| `/dishes/:id` | Chi tiết món (TODO-08, 09) | – |
| `/reservation` | Đặt bàn (TODO-12) | – (khách vãng lai vẫn đặt được) |
| `/login`, `/register` | Đăng nhập, Đăng ký (có sẵn) | – |
| `/cart` | Giỏ món + nút "Đặt món" (có sẵn) | Cần đăng nhập |
| `/admin/orders` | Quản lý đơn hàng (TODO-11) | Chỉ `admin` |
| `/403` | Không có quyền truy cập (có sẵn) | – |
| `*` | Trang 404 (TODO-10) | – |

## DỮ LIỆU MẪU (db.json)

- 6 users (2 admin, 4 customer; 1 tài khoản bị khoá)
- 4 categories: 1 Cơm · 2 Bún – Phở · 3 Đồ uống · 4 Tráng miệng
- 12 dishes (giá VND, 2 món tạm hết), 6 orders mẫu, `reservations` rỗng

**Tài khoản dùng để kiểm tra:**

| email | password | fullName | role | active |
| --- | --- | --- | --- | --- |
| admin@fpt.edu.vn | 12345678 | Quản trị viên | admin | true |
| sv@fpt.edu.vn | 12345678 | Nguyễn Văn An | customer | true |
| cuong@fpt.edu.vn | cuong2026 | Lê Văn Cường | customer | **false** (không đăng nhập được) |

**Một số món dùng để kiểm tra** (giá bán = giá × (1 − giảm/100), tính bằng `getFinalPrice`):

| id | name | Danh mục | price | discount | available | spicy | prepTime | sold | Giá bán |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Cơm tấm sườn bì chả | Cơm | 55.000 | 10 | true | 0 | 10 | 320 | 49.500 ₫ |
| 2 | Cơm gà xối mỡ | Cơm | 50.000 | 0 | true | 1 | 12 | 95 | 50.000 ₫ |
| 4 | Bún bò Huế | Bún – Phở | 65.000 | 20 | true | 3 | 10 | 150 | 52.000 ₫ |
| 5 | Mì Quảng gà | Bún – Phở | 55.000 | 0 | **false** | 1 | 15 | 60 | 55.000 ₫ |
| 7 | Cà phê sữa đá | Đồ uống | 29.000 | 10 | true | 0 | 3 | **100** | 26.100 ₫ |

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
| TODO-01 | Navbar – link "Giỏ món" + Badge số phần (chỉ hiện khi > 0) | 0.5 |
| TODO-02 | Navbar – đã đăng nhập: avatar chữ cái + họ tên + nút Đăng xuất | 1.0 |
| TODO-03 | Navbar – chưa đăng nhập: nút "Đăng nhập" và "Tạo tài khoản" | 0.5 |
| TODO-04 | DishCard – tên là Link, Badge danh mục, độ cay, thời gian chuẩn bị | 1.0 |
| TODO-05 | DishCard – giá sau giảm, giá gốc, "Bán chạy", "Tạm hết" | 1.0 |
| TODO-06 | DishListPage – ô tìm món + nhóm nút danh mục | 1.0 |
| TODO-07 | DishListPage – dòng đếm kết quả + thông báo rỗng | 0.5 |
| TODO-08 | DishDetailPage – Loading, lỗi, hiển thị thông tin món | 1.0 |
| TODO-09 | DishDetailPage – trạng thái, tạm tính, Thêm vào giỏ, Quay lại | 1.0 |
| TODO-10 | NotFoundPage – hiện đường dẫn sai + 2 nút điều hướng | 0.5 |
| TODO-11 | AdminOrderPage – tải đơn hàng, bảng, doanh thu | 1.0 |
| TODO-12 | ReservationPage – ô Ngày, Số khách và xử lý đặt bàn | 1.0 |
| **Tổng** | | **10.0** |

> Các TODO **độc lập** với nhau, làm theo thứ tự nào cũng được. Gợi ý thứ tự từ dễ đến khó: 03 → 01 → 10 → 02 → 04 → 05 → 06 → 07 → 08 → 09 → 11 → 12.

## CHI TIẾT TODO

### TODO-01 – Navbar: Link "Giỏ món" + Badge (0.5 điểm)

**File:** `src/components/AppNavbar.jsx`

**Yêu cầu:** Bên trong `<Nav className="me-auto">`, ngay sau link "Đặt bàn", thêm link "Giỏ món" tới `/cart`. Badge hiển thị `totalQuantity` (đã khai báo sẵn) **chỉ khi** giỏ có món.

```jsx
<Nav.Link as={NavLink} to="/cart">
  Giỏ món{' '}
  {totalQuantity > 0 && (
    <Badge bg="warning" text="dark" pill data-testid="cart-badge">
      {totalQuantity}
    </Badge>
  )}
</Nav.Link>
```

**Checklist:**

- Có link "Giỏ món" dẫn tới `/cart`, dùng `NavLink`
- Giỏ trống → **không** có Badge (và không hiện số 0)
- Bấm "Thêm vào giỏ" ở `/dishes` → Badge xuất hiện, đếm **tổng số phần** (không phải số món)

> Lưu ý: viết `{totalQuantity && <Badge … />}` sẽ in ra chữ số `0` khi giỏ trống. Hãy so sánh `> 0`.

### TODO-02 – Navbar: Đã đăng nhập (1.0 điểm)

**File:** `src/components/AppNavbar.jsx`

**Yêu cầu:**

1\. Tính `initial` = chữ cái đầu (**viết hoa**) của **từ cuối cùng** trong họ tên (tên gọi của người Việt):

```jsx
const initial = user ? user.fullName.trim().split(' ').pop().charAt(0).toUpperCase() : '';
```

"Nguyễn Văn An" → `A`, "Quản trị viên" → `V`.

2\. Trong nhánh `user ? (...)`:

```jsx
<span className="badge rounded-circle bg-light text-success" data-testid="avatar">{initial}</span>
<span>{user.fullName}</span>
<Button variant="outline-light" size="sm" onClick={handleLogout}>Đăng xuất</Button>
```

3\. Thân `handleLogout`:

```jsx
const handleLogout = () => {
  logout();
  showToast('Đã đăng xuất', 'secondary');
  navigate('/');
};
```

**Checklist:**

- Đăng nhập `sv@fpt.edu.vn` → Navbar có avatar tròn "A" và "Nguyễn Văn An"
- Đăng nhập `admin@fpt.edu.vn` → avatar "V"
- Bấm "Đăng xuất" → hiện toast xám "Đã đăng xuất", về `/` (chỉ còn Navbar)

### TODO-03 – Navbar: Chưa đăng nhập (0.5 điểm)

**File:** `src/components/AppNavbar.jsx`

```jsx
<Button as={Link} to="/login" variant="outline-light" size="sm">Đăng nhập</Button>
<Button as={Link} to="/register" variant="warning" size="sm">Tạo tài khoản</Button>
```

**Checklist:**

- Chưa đăng nhập → có nút "Đăng nhập" (`/login`) và "Tạo tài khoản" (`/register`)
- Đã đăng nhập → **không** hiện 2 nút này

### TODO-04 – DishCard: Tên, danh mục, độ cay, thời gian (1.0 điểm)

**File:** `src/components/DishCard.jsx`

**Props:** `dish = { id, name, image, price, discount, available, spicy, prepTime, sold, rating, category? }`, `onAddToCart`.

**Yêu cầu:**

- Tên món là link tới trang chi tiết (đặt trong `Card.Title as="h6"` có sẵn): `<Link to={`/dishes/${id}`}>{name}</Link>`
- Có `category` → `<Badge bg="success">{category.name}</Badge>`
- `spicy > 0` → `<Badge bg="danger">Cay cấp {spicy}</Badge>` (món không cay thì **không** hiện)
- Thời gian chuẩn bị: `<small className="text-muted">⏱ {prepTime} phút</small>`

**Checklist:**

- "Cơm tấm sườn bì chả" là link có href `/dishes/1`, có Badge "Cơm" và "⏱ 10 phút"
- "Bún bò Huế" có Badge đỏ "Cay cấp 3"; "Cơm tấm" không có Badge cay
- Không lỗi khi `dish.category` không có

### TODO-05 – DishCard: Giá, Bán chạy, Tạm hết (1.0 điểm)

**File:** `src/components/DishCard.jsx`

**Đã có sẵn:** biến `soldOut = available === false`, `bestSeller = sold >= BEST_SELLER_MIN` (100).

**Yêu cầu:**

- Giá sau giảm: `<span className="text-danger fw-bold">{formatVND(getFinalPrice(dish))}</span>`
- **Chỉ khi** `discount > 0`: giá gốc trong **thẻ `<del>`** và Badge giảm giá

```jsx
{discount > 0 && (
  <>
    <del className="text-muted ms-2 small">{formatVND(price)}</del>
    <Badge bg="warning" text="dark" className="ms-2">Giảm {discount}%</Badge>
  </>
)}
```

- `bestSeller` → `<Badge bg="info">Bán chạy</Badge>`
- `soldOut` → `<Badge bg="secondary">Tạm hết</Badge>`; nút `disabled={soldOut}` và đổi chữ thành "Tạm hết"

**Checklist:**

- Cơm tấm: giá đỏ đậm **49.500 ₫**, có ~~55.000 ₫~~ và "Giảm 10%", có "Bán chạy"
- Cơm gà xối mỡ (bán 95): **không** có "Bán chạy", không có giá gạch
- Cà phê sữa đá (bán đúng 100): **có** "Bán chạy"
- Mì Quảng gà: Badge "Tạm hết", nút "Tạm hết" bị disabled

### TODO-06 – DishListPage: Ô tìm món + nhóm nút danh mục (1.0 điểm)

**File:** `src/pages/DishListPage.jsx`

**Đã có sẵn:** tải `dishes` + `categories`, state `keyword`, `categoryId` (chuỗi, `''` = tất cả), dòng `visible = filterDishes(...)`, ô **Sắp xếp**, switch **Chỉ món đang phục vụ**, nút **Xóa lọc**.

**Yêu cầu 1 – ô tìm (controlled):**

```jsx
<Form.Control
  type="search"
  aria-label="Tìm món"
  placeholder="Nhập tên món..."
  value={keyword}
  onChange={(e) => setKeyword(e.target.value)}
/>
```

**Yêu cầu 2 – nhóm nút danh mục** (thay cho ô select): nút đang chọn được tô màu đặc và có `aria-pressed`.

```jsx
<ButtonGroup aria-label="Danh mục" className="mb-3 flex-wrap">
  <Button
    variant={categoryId === '' ? 'success' : 'outline-success'}
    aria-pressed={categoryId === ''}
    onClick={() => setCategoryId('')}
  >
    Tất cả
  </Button>
  {categories.map((c) => (
    <Button
      key={c.id}
      variant={categoryId === String(c.id) ? 'success' : 'outline-success'}
      aria-pressed={categoryId === String(c.id)}
      onClick={() => setCategoryId(String(c.id))}
    >
      {c.name}
    </Button>
  ))}
</ButtonGroup>
```

**Checklist:**

- Gõ "bún" → còn 2 thẻ (Bún bò Huế, Bún chả Hà Nội)
- Nhóm nút có "Tất cả" + 4 danh mục lấy từ API; ban đầu "Tất cả" được tô
- Bấm "Đồ uống" → còn 3 thẻ, nút "Đồ uống" được tô, "Tất cả" trở thành viền
- Bấm "Xóa lọc" (có sẵn) → ô tìm trống, "Tất cả" được tô, hiện lại 12 thẻ

### TODO-07 – DishListPage: Đếm kết quả + thông báo rỗng (0.5 điểm)

**File:** `src/pages/DishListPage.jsx`

**Yêu cầu:** Phía trên lưới thẻ (bên trong khối `!loading && !error` có sẵn):

```jsx
<p data-testid="result-count">Tìm được {visible.length}/{dishes.length} món</p>
```

Khi `visible` rỗng → `<Alert variant="secondary">Chưa có món phù hợp</Alert>` **thay cho** lưới thẻ.

**Checklist:**

- Mở `/dishes` → "Tìm được 12/12 món"; bật "Chỉ món đang phục vụ" → "Tìm được 10/12 món"
- Gõ "pizza" → Alert xám "Chưa có món phù hợp", không còn thẻ nào

### TODO-08 – DishDetailPage: Loading, lỗi, thông tin món (1.0 điểm)

**File:** `src/pages/DishDetailPage.jsx`

**Đã có sẵn:** `useEffect` tải món theo `id`, state `dish`, `loading`, `error`, `quantity`, ảnh, tên `<h2>`, dòng "Đã bán … · ★ …", giá gốc trong `<del>`, biến `unitPrice = getFinalPrice(dish)`.

**Khi đang tải / có lỗi** (đặt **phía trên** dòng `if (!dish) return null;` có sẵn):

```jsx
if (loading) return <Loading text="Đang tải món ăn..." />;
if (error)
  return (
    <>
      <ErrorAlert message={error} />
      <Link to="/dishes">← Về thực đơn</Link>
    </>
  );
```

**Khi có dữ liệu:**

- `{dish.category && <Badge bg="success">{dish.category.name}</Badge>}`
- `<p className="mt-2 mb-0">Thời gian chuẩn bị: {dish.prepTime} phút</p>`
- Giá: `<span className="text-danger fw-bold fs-2">{formatVND(unitPrice)}</span>`
- Mô tả: `<p>{dish.description}</p>`

**Checklist:**

- Có spinner "Đang tải món ăn..." khi đang tải
- `/dishes/9999` → "Không tìm thấy dữ liệu" + link "← Về thực đơn"
- `/dishes/4` → Badge "Bún – Phở", "Thời gian chuẩn bị: 10 phút", giá **52.000 ₫** đỏ chữ lớn, mô tả "Bún bò cay nồng chuẩn vị cố đô."

### TODO-09 – DishDetailPage: Trạng thái, tạm tính, Thêm vào giỏ, Quay lại (1.0 điểm)

**File:** `src/pages/DishDetailPage.jsx`

**Đã có sẵn:** `<QuantityPicker ... onChange={setQuantity} />`, khung hàm `handleAdd`.

**Yêu cầu:**

- Trạng thái: `dish.available` → `<Badge bg="success">Đang phục vụ</Badge>`, ngược lại `<Badge bg="secondary">Tạm hết</Badge>`
- Tạm tính (cập nhật theo số phần): `<span data-testid="subtotal">Tạm tính: {formatVND(unitPrice * quantity)}</span>`
- Nút "Thêm vào giỏ": `<Button variant="success" disabled={!dish.available} onClick={handleAdd}>Thêm vào giỏ</Button>` (giữ nguyên chữ)
- Thân `handleAdd`:

```jsx
const handleAdd = () => {
  addToCart(dish, quantity);
  showToast(`Đã thêm ${quantity} phần ${dish.name}`);
};
```

- Nút "← Quay lại": `<Button variant="outline-secondary" onClick={() => navigate(-1)}>← Quay lại</Button>`

**Checklist:**

- `/dishes/4` → "Đang phục vụ", "Tạm tính: 52.000 ₫"; bấm "+" → "Tạm tính: 104.000 ₫"
- Bấm "Thêm vào giỏ" với 2 phần → toast "Đã thêm 2 phần Bún bò Huế", Badge giỏ món = 2
- `/dishes/5` → "Tạm hết", nút "Thêm vào giỏ" bị disabled
- Từ `/dishes` vào chi tiết, bấm "← Quay lại" → về đúng `/dishes`

### TODO-10 – NotFoundPage: Trang 404 (0.5 điểm)

**File:** `src/pages/NotFoundPage.jsx`

**Đã có sẵn:** số 404, tiêu đề "Không tìm thấy trang", các biến `location` (`useLocation()`), `navigate`.

**Yêu cầu:**

```jsx
<p className="text-muted">
  Đường dẫn <code>{location.pathname}</code> không tồn tại.
</p>

<Button variant="outline-secondary" onClick={() => navigate(-1)}>← Quay lại</Button>
<Button as={Link} to="/dishes" variant="success">Xem thực đơn</Button>
```

**Checklist:**

- Gõ URL `/abc/xyz` → "Đường dẫn `/abc/xyz` không tồn tại." (đường dẫn trong thẻ `<code>`)
- Nút "← Quay lại" về trang trước; nút "Xem thực đơn" tới `/dishes`

### TODO-11 – AdminOrderPage: Quản lý đơn hàng (1.0 điểm)

**File:** `src/pages/admin/AdminOrderPage.jsx`

**Đã có sẵn:** state `orders`, `loading`, `error`; khung `useEffect`; phần `<thead>` (Mã đơn · Khách hàng · Số phần · Tổng tiền · Trạng thái); dòng "Doanh thu (đơn đã giao)" với `data-testid="revenue"`; hàm `getOrderStatus(status)` (trả về `{ bg, label }`).

**Yêu cầu:**

1\. Tải đơn hàng bằng `async/await` + `try/catch/finally`:

```jsx
useEffect(() => {
  const load = async () => {
    try {
      setOrders(await orderApi.getAll());
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };
  load();
}, []);
```

2\. Đang tải → `<Loading text="Đang tải đơn hàng..." />`; có lỗi → `<ErrorAlert message={error} />`

3\. Tiêu đề **"Đơn hàng ({orders.length})"**

4\. Doanh thu = tổng `total` của các đơn có `status === 'delivered'`:

```jsx
const revenue = orders.filter((o) => o.status === 'delivered').reduce((sum, o) => sum + o.total, 0);
```

5\. Mỗi đơn một `<tr key={o.id}>` gồm 5 ô:
- `#{o.id}` · `{o.receiver}` · **tổng số phần** `o.items.reduce((sum, i) => sum + i.quantity, 0)` · `formatVND(o.total)`
- Trạng thái: `const status = getOrderStatus(o.status);` → `<Badge bg={status.bg}>{status.label}</Badge>`

**Checklist:**

- Đăng nhập `admin@fpt.edu.vn` → Quản trị → Đơn hàng → Network có request `GET /orders`
- Tiêu đề "Đơn hàng (6)"; doanh thu **281.400 ₫**
- Dòng đầu "#6 · Hoàng Văn Em · 3 · 109.500 ₫ · Chờ xác nhận" (Badge vàng)
- Tắt json-server rồi F5 → Alert đỏ báo lỗi

### TODO-12 – ReservationPage: Đặt bàn (1.0 điểm)

**File:** `src/pages/ReservationPage.jsx`

**Đã có sẵn:** state `values` (đã đăng nhập thì "Tên người đặt" được điền sẵn họ tên; "Giờ" mặc định `18:00`; "Số khách" mặc định `2`), `touched`, `submitted`, `submitting`, `serverError`, `lastBooking`; `errors = validateReservation(values)`, `errorCount`, `handleChange`, `handleBlur`, `showError`, `initialValues()`; ô **Tên người đặt** (làm mẫu), ô **Số điện thoại**, ô **Giờ**, ô **Ghi chú**, Alert kết quả, Alert `serverError`, nút "Xác nhận đặt bàn". Hàm `todayISO()` đã import.

**Yêu cầu 1:** Làm **tương tự ô Tên người đặt** cho 2 ô:

| Nhãn | name | type | controlId | Thuộc tính thêm |
| --- | --- | --- | --- | --- |
| Ngày * | date | date | `reservation-date` | `min={todayISO()}` |
| Số khách * | guests | number | `reservation-guests` | `min={1}` `max={20}` |

Mỗi ô có `value`, `onChange={handleChange}`, `onBlur={handleBlur}`, `isInvalid={Boolean(showError('...'))}` và `<Form.Control.Feedback type="invalid">`.

**Yêu cầu 2:** Viết thân `handleSubmit`:

```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitted(true);
  if (errorCount > 0) return;            // còn lỗi → KHÔNG gọi API
  setSubmitting(true);
  try {
    const booking = await reservationApi.create({
      userId: user?.id ?? null,            // khách vãng lai → null
      name: values.name.trim(),
      phone: values.phone.trim(),
      date: values.date,
      time: values.time,
      guests: Number(values.guests),       // gửi SỐ, không gửi chuỗi
      note: values.note.trim(),
    });
    setLastBooking(booking);
    showToast(`Đặt bàn thành công cho ${booking.guests} khách`);
    setValues(initialValues());            // làm sạch form
    setTouched({});
    setSubmitted(false);
  } catch (err) {
    setServerError(err.message);
  } finally {
    setSubmitting(false);
  }
};
```

**Checklist:**

- Có ô Ngày (`reservation-date`) và Số khách (`reservation-guests`, mặc định 2)
- Chọn ngày đã qua → "Không thể đặt bàn cho ngày đã qua"; số khách 25 → "Số khách từ 1 đến 20"
- Bấm "Xác nhận đặt bàn" khi chưa nhập gì → "Còn 3 mục chưa hợp lệ", **không** có request `/reservations`
- Đặt hợp lệ → toast "Đặt bàn thành công cho n khách", Alert xanh "Mã đặt bàn #…", form trở về ban đầu; `db.json` có phiếu mới
- Chưa đăng nhập vẫn đặt được (`userId` = `null`)

## TỔNG HỢP ĐIỂM

| **TODO** | **File** | **Điểm** |
| --- | --- | --- |
| TODO-01: Navbar Giỏ món + Badge | src/components/AppNavbar.jsx | 0.5 |
| TODO-02: Navbar đã đăng nhập (avatar) + Đăng xuất | src/components/AppNavbar.jsx | 1.0 |
| TODO-03: Navbar chưa đăng nhập | src/components/AppNavbar.jsx | 0.5 |
| TODO-04: DishCard tên, danh mục, độ cay, thời gian | src/components/DishCard.jsx | 1.0 |
| TODO-05: DishCard giá, Bán chạy, Tạm hết | src/components/DishCard.jsx | 1.0 |
| TODO-06: Ô tìm món + nhóm nút danh mục | src/pages/DishListPage.jsx | 1.0 |
| TODO-07: Đếm kết quả + thông báo rỗng | src/pages/DishListPage.jsx | 0.5 |
| TODO-08: Chi tiết – Loading, lỗi, thông tin | src/pages/DishDetailPage.jsx | 1.0 |
| TODO-09: Chi tiết – trạng thái, tạm tính, giỏ, quay lại | src/pages/DishDetailPage.jsx | 1.0 |
| TODO-10: Trang 404 | src/pages/NotFoundPage.jsx | 0.5 |
| TODO-11: Quản lý đơn hàng | src/pages/admin/AdminOrderPage.jsx | 1.0 |
| TODO-12: Đặt bàn | src/pages/ReservationPage.jsx | 1.0 |
| **TỔNG** | | **10.0** |

## CẤU TRÚC THƯ MỤC

```
fer202-pe-food/
├── db.json, db.backup.json          # Dữ liệu mẫu (KHÔNG sửa)
├── package.json, vite.config.js     # Cấu hình (KHÔNG sửa)
├── vitest.config.js                 # Cấu hình test (KHÔNG sửa)
├── test/                            # Test tự kiểm tra (KHÔNG sửa), xem test/README.md
└── src/
    ├── main.jsx, App.jsx            # Có sẵn (KHÔNG sửa) – "/" chỉ hiện Navbar
    ├── api/
    │   ├── axiosClient.js, authApi.js, userApi.js   # Có sẵn (KHÔNG sửa)
    │   ├── dishApi.js               # dishApi, categoryApi (KHÔNG sửa)
    │   ├── orderApi.js              # Có sẵn (KHÔNG sửa)
    │   └── reservationApi.js        # Có sẵn (KHÔNG sửa)
    ├── context/                     # Auth / Cart / Toast (KHÔNG sửa)
    ├── reducers/cartReducer.js      # Có sẵn (KHÔNG sửa)
    ├── utils/
    │   ├── format.js                # formatVND, getFinalPrice, formatDate (KHÔNG sửa)
    │   ├── filterDishes.js          # filterDishes, SORT_OPTIONS, BEST_SELLER_MIN (KHÔNG sửa)
    │   ├── orderStatus.js           # getOrderStatus (KHÔNG sửa)
    │   └── validation.js            # validateReservation, TIME_SLOTS, todayISO ... (KHÔNG sửa)
    ├── components/
    │   ├── AppNavbar.jsx            # TODO-01, 02, 03
    │   ├── DishCard.jsx             # TODO-04, 05
    │   └── ProtectedRoute.jsx, Loading.jsx, ErrorAlert.jsx, QuantityPicker.jsx   # Có sẵn (KHÔNG sửa)
    └── pages/
        ├── LoginPage.jsx, RegisterPage.jsx, CartPage.jsx, ForbiddenPage.jsx      # Có sẵn (KHÔNG sửa)
        ├── DishListPage.jsx         # TODO-06, 07
        ├── DishDetailPage.jsx       # TODO-08, 09
        ├── NotFoundPage.jsx         # TODO-10
        ├── ReservationPage.jsx      # TODO-12
        └── admin/
            └── AdminOrderPage.jsx   # TODO-11
```

## CÁC HÀM CÓ SẴN (chỉ cần dùng)

| Gọi | Trả về |
| --- | --- |
| `dishApi.getAll()` / `dishApi.getById(id)` | Mảng món / 1 món (có `category: { id, name }`) |
| `categoryApi.getAll()` | Mảng danh mục |
| `orderApi.getAll()` | Mảng đơn hàng (mới nhất trước) |
| `reservationApi.create(data)` | Phiếu đặt bàn vừa tạo (có `id`) |
| `getOrderStatus(status)` | `{ bg, label }`, ví dụ `getOrderStatus('delivered')` → `{ bg: 'success', label: 'Đã giao' }` |
| `useAuth()` | `{ user, isLoggedIn, isAdmin, login, logout }` |
| `useCart()` | `{ items, totalQuantity, totalPrice, addToCart(dish, quantity), clear, ... }` |
| `useToast()` | `{ showToast(message, variant = 'success') }` |
| `formatVND(n)`, `getFinalPrice(dish)` | `formatVND(49500)` → "49.500 ₫" |
| `todayISO()` | Ngày hôm nay dạng `"YYYY-MM-DD"` |
| `getErrorMessage(err)` | Chuỗi thông báo lỗi từ object lỗi |

## LƯU Ý QUAN TRỌNG

1\. **KHÔNG sửa** các file không có TODO (kể cả `App.jsx` và thư mục `test/`), sửa sai file sẽ bị trừ điểm.

2\. **Chạy ứng dụng:** `npm start` (chạy cùng lúc JSON Server và React Dev Server).

3\. **Trang chủ `/` chỉ hiển thị Navbar**, không tải thực đơn. Bấm link **"Thực đơn"** để vào `/dishes`.

4\. **Tài khoản kiểm tra:** `admin@fpt.edu.vn` / `12345678` (admin), `sv@fpt.edu.vn` / `12345678` (customer).

5\. Đổi tài khoản khi chưa làm nút "Đăng xuất": mở DevTools → Console, gõ `localStorage.clear(); location.reload()`.

6\. Gọi API qua các hàm có sẵn (`dishApi`, `categoryApi`, `orderApi`, `reservationApi`), dùng `async/await` + `try/catch`. **Không** dùng `.then()`, **không** dùng `alert()` (dùng `showToast`), **không** ghi cứng `http://localhost:3001` trong component.

7\. Giữ đúng `aria-label`, `aria-pressed`, `controlId`, `data-testid`, `className`, màu `bg`/`variant`, loại thẻ/control (`<del>`, `<code>`, `Button as={Link}`, `Link`, `NavLink`, `ButtonGroup`, `<Loading />`) và câu thông báo như đề ghi, vì phần chấm dựa vào đó. Không tách chữ cần hiển thị ra nhiều thẻ khi đề không yêu cầu.

8\. **Không ghi cứng dữ liệu mẫu** (ví dụ "49.500 ₫", "Nguyễn Văn An", "(6)", "281.400"). Khi chấm có test ẩn dùng dữ liệu khác.

9\. Nhớ thêm `key` khi render danh sách bằng `map()`.

10\. **Nộp bài:** nén thư mục project **không có `node_modules`**, đặt tên `MSSV_HoTen.zip`.

**CHÚC CÁC BẠN LÀM BÀI TỐT!**

---

## PHỤ LỤC (dành cho giảng viên, KHÔNG phát cho sinh viên)

> **Thang điểm chi tiết:** xem file `DeThi3_thangDiem.md` (cùng thư mục).

### Project đi kèm

| Thư mục / file | Nội dung |
| --- | --- |
| `template/` | Project khởi đầu phát cho sinh viên (12 TODO chưa làm) + 52 test tự kiểm tra trong `test/` |
| `solution/` | Project đáp án đầy đủ, đạt **132/132** test (52 visible + 80 ẩn trong `test/hidden/`) |
| `DeThi3_thangDiem.md` | Thang điểm, cách tính, trừ điểm, tiêu chí từng TODO, lỗi thường gặp (điểm thực đo), danh sách test |

- Bản khởi đầu chạy được ngay, mở `/` chỉ thấy Navbar; `npm test` chỉ đạt 3 test phụ (dấu `-`) và test trang chủ.
- **Kiểm tra độc lập:** chép **1 file đáp án** vào bản khởi đầu thì toàn bộ test (visible + ẩn) của TODO trong file đó đạt (đã kiểm chứng cả 7 file).
- Đã chạy thử toàn bộ luồng với json-server thật: đăng nhập → thêm món → đặt món (đơn #7 hiện ở trang admin) → đặt bàn (ghi vào `db.json`) → trang 404.
- Ảnh món lấy từ `placehold.co`, máy chấm cần có Internet để hiện ảnh (không ảnh hưởng điểm).

### Điểm mới so với Đề 1 / Đề 2

| Phần | Đề 1 / Đề 2 | Đề 3 |
| --- | --- | --- |
| Badge giỏ | Luôn hiện | **Chỉ hiện khi > 0** (bẫy `{n && …}` in ra "0") |
| Đã đăng nhập | Lời chào | **Avatar chữ cái** – xử lý chuỗi (trim, split, pop, toUpperCase) |
| Giá gốc | `text-decoration-line-through` | Thẻ **`<del>`** |
| Lọc danh mục | `Form.Select` | **`ButtonGroup`** + `aria-pressed` + đổi `variant` |
| Trang chi tiết | Thông tin + thêm giỏ | Thêm **Tạm tính** cập nhật theo số phần |
| TODO-10 | Trang 403 / Hồ sơ | **Trang 404** dùng `useLocation` |
| TODO-11 | Bảng user / sách | Bảng **đơn hàng** + `reduce` (số phần, **doanh thu**) + bảng trạng thái |
| TODO-12 | Form đăng ký / đặt hàng | Form **đặt bàn**: `type="date"`, `type="number"`, `Number(...)`, khách vãng lai, **reset form** sau khi thành công |

### Kịch bản chấm nhanh (~8 phút/bài)

| Bước | Thao tác | TODO |
| --- | --- | --- |
| 1 | `npm start`, mở `/`: chỉ Navbar, có "Đăng nhập" / "Tạo tài khoản", **không** có Badge giỏ | 01, 03 |
| 2 | Gõ `/abc/xyz`: trang 404 hiện đường dẫn, 2 nút | 10 |
| 3 | Bấm "Thực đơn": kiểm tra thẻ Cơm tấm / Cơm gà / Bún bò / Mì Quảng / Cà phê | 04, 05 |
| 4 | Gõ "bún", bấm "Đồ uống", gõ "pizza", Xóa lọc, bật "Chỉ món đang phục vụ" | 06, 07 |
| 5 | `/dishes/4` (bấm +, thêm 2 phần, Quay lại), `/dishes/5`, `/dishes/9999` | 08, 09, 01 |
| 6 | `/reservation`: bấm trống, ngày đã qua, 25 khách, đặt hợp lệ → `db.json` | 12 |
| 7 | Đăng nhập `sv@` → avatar "A" → Giỏ món → Đặt món → Đăng xuất | 02 |
| 8 | Đăng nhập `admin@` → Quản trị → Đơn hàng: tiêu đề, doanh thu, Badge trạng thái | 11 |
