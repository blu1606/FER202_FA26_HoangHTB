# Slot 20 — Next.js + Tailwind CSS + Redux Toolkit (TypeScript)

> **Môn:** FER202 – Front-End Web Development with React
> **Mục tiêu:** Nắm vững Next.js (App Router) và Tailwind CSS, rồi kết hợp **Redux Toolkit (RTK)** để quản lý state phía client đúng cách trong Next.js. Thực hành qua 5 bài tập step-by-step, mỗi bài có checklist tự kiểm tra.
> **Phiên bản tham chiếu:** Next.js 15/16 (App Router), React 19, **TypeScript**, Tailwind CSS v4, `@reduxjs/toolkit` 2.x, `react-redux` 9.x, Node.js ≥ 20.
> **Kiến thức cần có trước:** `useState`, `useEffect`, Redux cơ bản (xem `Redux.md`).

---

## Mục lục

- [Phần A — Kiến thức cơ bản Next.js](#phần-a--kiến-thức-cơ-bản-nextjs)
  - [A1. Next.js là gì? So sánh với React + Vite](#a1-nextjs-là-gì-so-sánh-với-react--vite)
  - [A2. Cấu trúc project & App Router](#a2-cấu-trúc-project--app-router)
  - [A3. File-based Routing & các file đặc biệt](#a3-file-based-routing--các-file-đặc-biệt)
  - [A4. Server Component vs Client Component](#a4-server-component-vs-client-component)
  - [A5. Điều hướng & Data Fetching](#a5-điều-hướng--data-fetching)
  - [A6. Route Handlers (API), Metadata, Image](#a6-route-handlers-api-metadata-image)
- [Phần B — Kiến thức cơ bản Tailwind CSS](#phần-b--kiến-thức-cơ-bản-tailwind-css)
  - [B1. Utility-first & cài đặt v4](#b1-utility-first--cài-đặt-v4)
  - [B2. Các nhóm utility thường dùng](#b2-các-nhóm-utility-thường-dùng)
  - [B3. Responsive, State variants, Dark mode](#b3-responsive-state-variants-dark-mode)
  - [B4. Best practices với TypeScript](#b4-best-practices-với-typescript)
- [Phần C — Redux Toolkit trong Next.js](#phần-c--redux-toolkit-trong-nextjs)
  - [C1. Ôn nhanh Redux Toolkit](#c1-ôn-nhanh-redux-toolkit)
  - [C2. Vì sao dùng Redux trong Next.js khác với React + Vite?](#c2-vì-sao-dùng-redux-trong-nextjs-khác-với-react--vite)
  - [C3. State nào đặt ở đâu?](#c3-state-nào-đặt-ở-đâu)
  - [C4. Mẫu chuẩn: makeStore + StoreProvider + typed hooks](#c4-mẫu-chuẩn-makestore--storeprovider--typed-hooks)
  - [C5. createSlice, createAction & extraReducers](#c5-createslice-createaction--extrareducers)
  - [C6. createAsyncThunk](#c6-createasyncthunk)
  - [C7. Selector & createSelector](#c7-selector--createselector)
  - [C8. Lưu localStorage mà không lỗi Hydration](#c8-lưu-localstorage-mà-không-lỗi-hydration)
  - [C9. RTK Query + Route Handlers](#c9-rtk-query--route-handlers)
- [Phần D — 5 bài tập step-by-step](#phần-d--5-bài-tập-step-by-step)
  - [Bài 1: Khởi tạo project + Store + Counter](#bài-1-khởi-tạo-project--store--counter)
  - [Bài 2: Layout, Navbar & Dark mode bằng uiSlice](#bài-2-layout-navbar--dark-mode-bằng-uislice)
  - [Bài 3: Todo App với createSlice + createSelector](#bài-3-todo-app-với-createslice--createselector)
  - [Bài 4: Shop — Sản phẩm (createAsyncThunk) + Giỏ hàng](#bài-4-shop--sản-phẩm-createasyncthunk--giỏ-hàng)
  - [Bài 5: Notes CRUD full-stack với Route Handlers + RTK Query](#bài-5-notes-crud-full-stack-với-route-handlers--rtk-query)
- [Phần E — Checklist tổng](#phần-e--checklist-tổng)
- [Phần F — Lỗi thường gặp & cách sửa](#phần-f--lỗi-thường-gặp--cách-sửa)
- [Phần G — Câu hỏi ôn tập](#phần-g--câu-hỏi-ôn-tập)

---

# Phần A — Kiến thức cơ bản Next.js

## A1. Next.js là gì? So sánh với React + Vite

**Next.js** là *framework* React do Vercel phát triển. React chỉ lo phần UI; Next.js bổ sung routing, render trên server, API backend, tối ưu ảnh/font…

| Tính năng | React + Vite | Next.js |
|---|---|---|
| Routing | Cài `react-router-dom` | **Có sẵn**, dựa trên thư mục |
| Render | Chỉ CSR | CSR, **SSR, SSG, ISR**, Streaming |
| SEO | Kém (HTML ban đầu rỗng) | Tốt (HTML render sẵn) |
| API backend | Cần server riêng (Express, json-server) | **Route Handlers** trong cùng project |
| Tối ưu ảnh, font | Tự xử lý | `next/image`, `next/font` |
| TypeScript | Cấu hình thủ công | Có sẵn |

**Các chiến lược render** — trong App Router, Next.js quyết định dựa trên cách bạn `fetch`:

| Viết tắt | HTML tạo khi nào | Cách viết |
|---|---|---|
| **SSG** | Lúc build | `fetch(url, { cache: 'force-cache' })` |
| **SSR** | Mỗi request | `fetch(url, { cache: 'no-store' })` |
| **ISR** | Lúc build, tái tạo định kỳ | `fetch(url, { next: { revalidate: 60 } })` |
| **CSR** | Trên trình duyệt | Client Component + `useEffect` / **Redux thunk** / **RTK Query** |

## A2. Cấu trúc project & App Router

Next.js có 2 router: **Pages Router** (`pages/`, kiểu cũ) và **App Router** (`app/`, khuyến nghị). Tài liệu này dùng **App Router**.

Cấu trúc project của slot này (hoàn chỉnh sau 5 bài):

```
slot20-next-rtk/
├── app/
│   ├── layout.tsx            # Root layout – bọc StoreProvider
│   ├── page.tsx              # Trang chủ "/"
│   ├── globals.css           # @import "tailwindcss"
│   ├── StoreProvider.tsx     # 'use client' – tạo store, bọc <Provider>
│   ├── _components/          # Navbar, Footer, ThemeSync, CartBadge (private folder)
│   ├── counter/              # Bài 1
│   ├── todos/                # Bài 3
│   ├── products/             # Bài 4 (+ [id])
│   ├── cart/                 # Bài 4
│   ├── notes/                # Bài 5
│   └── api/notes/            # Bài 5 – Route Handlers
├── lib/
│   ├── store.ts              # makeStore, RootState, AppDispatch
│   ├── hooks.ts              # useAppDispatch, useAppSelector
│   ├── actions.ts            # action dùng chung (hydrate)
│   ├── persist.ts            # đọc/ghi localStorage
│   ├── features/             # các slice: counter, ui, todos, products, cart, notes
│   └── server/               # code CHỈ chạy trên server (đọc file, gọi API)
├── types/index.ts            # kiểu dùng chung
├── data/notes.json           # "database" của Bài 5
├── public/
├── next.config.ts
└── tsconfig.json             # alias "@/..."
```

| Đuôi file | Khi nào dùng |
|---|---|
| **`.tsx`** | File có JSX: `page.tsx`, `layout.tsx`, component |
| **`.ts`** | Không có JSX: slice, store, `route.ts`, `types`, `next.config.ts` |

## A3. File-based Routing & các file đặc biệt

**Quy tắc vàng:** *mỗi thư mục trong `app/` là một đoạn URL; nó chỉ thành trang khi có `page.tsx`.*

| File | URL |
|---|---|
| `app/page.tsx` | `/` |
| `app/products/page.tsx` | `/products` |
| `app/products/[id]/page.tsx` | `/products/1`, `/products/2`… (dynamic route) |
| `app/(auth)/login/page.tsx` | `/login` (route group, `()` không lên URL) |
| `app/_components/Navbar.tsx` | Không phải route (private folder) |

| File đặc biệt | Vai trò |
|---|---|
| `layout.tsx` | Bọc các trang con, **không bị mount lại khi chuyển trang** → state trong Provider được giữ nguyên |
| `loading.tsx` | UI khi đang tải (tự bọc `<Suspense>`) |
| `error.tsx` | UI khi lỗi (phải là Client Component) |
| `not-found.tsx` | UI 404 |
| `route.ts` | API endpoint |

**`params` là Promise (Next.js 15+):**

```tsx
type Props = { params: Promise<{ id: string }> };

export default async function Page({ params }: Props) {
  const { id } = await params;   // giá trị trên URL luôn là string
  return <h1>Sản phẩm {id}</h1>;
}
```

## A4. Server Component vs Client Component

- **Mặc định mọi component trong `app/` là Server Component.**
- Muốn dùng hook (`useState`, `useEffect`, **`useSelector`, `useDispatch`**), sự kiện (`onClick`), API trình duyệt (`localStorage`) → thêm `'use client'` ở **dòng đầu file**.

| | Server Component | Client Component |
|---|---|---|
| `async/await` trực tiếp | ✅ | ❌ |
| Đọc file, DB, biến môi trường bí mật | ✅ | ❌ |
| `useState`, `onClick` | ❌ | ✅ |
| **Redux hooks (`useAppSelector`, `useAppDispatch`)** | ❌ | ✅ |
| Export `metadata` | ✅ | ❌ |

> 🔑 **Hệ quả quan trọng với Redux:** Redux store sống trong React Context → **chỉ Client Component mới đọc/ghi được store**. Server Component không thấy store.

**Nguyên tắc thiết kế:** `page.tsx` để là Server Component (export `metadata`, fetch dữ liệu), phần tương tác tách thành Client Component nhỏ.

```tsx
// app/counter/page.tsx  (Server)
import type { Metadata } from 'next';
import Counter from './Counter';            // Counter.tsx có 'use client'

export const metadata: Metadata = { title: 'Counter' };
export default function Page() {
  return <Counter />;
}
```

**Truyền props Server → Client:** chỉ dữ liệu *serialize được* (string, number, object, array). Không truyền function, `Date` nên đổi sang chuỗi ISO.

## A5. Điều hướng & Data Fetching

```tsx
import Link from 'next/link';
<Link href={`/products/${id}`}>Xem</Link>          // không dùng <a> cho link nội bộ
```

```tsx
'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'; // KHÔNG phải next/router
const router = useRouter();      // router.push('/cart'), router.back()
const pathname = usePathname();  // "/products"
```

```tsx
import { redirect, notFound } from 'next/navigation';
if (!product) notFound();        // hiển thị not-found.tsx
```

**Fetch trong Server Component** (khuyến nghị cho dữ liệu cần SEO):

```tsx
export default async function Page() {
  const res = await fetch('https://dummyjson.com/products/1', { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Lỗi tải dữ liệu');
  const product: Product = await res.json();
  return <h1>{product.title}</h1>;
}
```

## A6. Route Handlers (API), Metadata, Image

```ts
// app/api/hello/route.ts  → GET /api/hello
export async function GET() {
  return Response.json({ message: 'Xin chào' });
}
export async function POST(request: Request) {
  const body = (await request.json()) as { name: string };
  return Response.json(body, { status: 201 });
}
```

```tsx
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Giới thiệu' };   // tĩnh
export async function generateMetadata({ params }: Props): Promise<Metadata> { /* động */ }
```

```tsx
import Image from 'next/image';
<Image src={thumbnail} alt={title} width={300} height={300} />
// ảnh domain ngoài → khai báo images.remotePatterns trong next.config.ts
```

---

# Phần B — Kiến thức cơ bản Tailwind CSS

## B1. Utility-first & cài đặt v4

Tailwind CSS ghép nhiều class nhỏ, mỗi class làm **một việc**:

```tsx
<button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Lưu</button>
```

Khi tạo project bằng `create-next-app` và chọn Tailwind, mọi thứ đã sẵn sàng. Tailwind **v4** chỉ cần:

```css
/* app/globals.css */
@import "tailwindcss";
```

> 📝 v4 **không cần** `tailwind.config.ts` và 3 dòng `@tailwind ...`. Tùy biến theme bằng `@theme` ngay trong CSS.

Extension VS Code nên cài: **Tailwind CSS IntelliSense**, **Redux DevTools** (trình duyệt).

## B2. Các nhóm utility thường dùng

Thang khoảng cách: `1` = 4px → `p-4` = 16px, `gap-6` = 24px.

| Nhóm | Ví dụ |
|---|---|
| Padding / Margin | `p-4`, `px-6`, `py-2`, `mt-8`, `mx-auto` |
| Kích thước | `w-full`, `max-w-6xl`, `min-h-screen`, `size-10`, `aspect-square` |
| Màu | `text-gray-700`, `bg-blue-600`, `border-red-300`, `bg-black/50` |
| Chữ | `text-sm`, `text-3xl`, `font-bold`, `text-center`, `line-clamp-2`, `truncate` |
| Viền, bo góc, bóng | `border`, `rounded-xl`, `rounded-full`, `shadow-lg` |
| Flex | `flex`, `flex-col`, `items-center`, `justify-between`, `gap-4`, `flex-1` |
| Grid | `grid`, `grid-cols-3`, `col-span-2`, `grid-cols-[320px_1fr]` |
| Position | `relative`, `absolute`, `sticky top-0`, `z-50` |
| Transition | `transition`, `duration-300`, `hover:scale-105`, `animate-pulse` |

```tsx
<main className="mx-auto max-w-6xl px-4">           {/* container */}
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">   {/* lưới card */}
<nav className="flex items-center justify-between">  {/* navbar */}
```

## B3. Responsive, State variants, Dark mode

**Mobile-first:** class không tiền tố áp dụng mọi màn hình; `sm:` (≥640), `md:` (≥768), `lg:` (≥1024), `xl:` (≥1280) áp dụng **từ đó trở lên**.

```tsx
<ul className="hidden md:flex">         {/* ẩn trên mobile, hiện từ tablet */}
```

**State variants:**

```tsx
<button className="hover:bg-blue-700 active:scale-95 focus:ring-2 disabled:opacity-50">
<li className="group"> <button className="opacity-0 group-hover:opacity-100">Xóa</button> </li>
<input type="checkbox" className="peer" /> <span className="peer-checked:line-through">...</span>
```

**Dark mode bật/tắt bằng class `.dark`** (dùng ở Bài 2, giá trị lấy từ Redux):

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

```tsx
<div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
```

**Tùy biến theme:**

```css
@theme {
  --color-brand-500: #f97316;   /* → bg-brand-500, text-brand-500 */
}
```

## B4. Best practices với TypeScript

1. **Không ghép tên class động** — Tailwind không quét được:
   ```tsx
   // ❌ className={`bg-${color}-500`}
   // ✅
   type Color = 'red' | 'green' | 'blue';
   const bg: Record<Color, string> = { red: 'bg-red-500', green: 'bg-green-500', blue: 'bg-blue-500' };
   <div className={bg[color]} />
   ```
2. **Component có biến thể:**
   ```tsx
   type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
     variant?: 'primary' | 'outline' | 'danger';
   };
   const styles: Record<NonNullable<ButtonProps['variant']>, string> = {
     primary: 'bg-blue-600 text-white hover:bg-blue-700',
     outline: 'border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800',
     danger: 'bg-red-600 text-white hover:bg-red-700',
   };
   export function Button({ variant = 'primary', className = '', ...rest }: ButtonProps) {
     return (
       <button
         className={`rounded-lg px-4 py-2 font-semibold transition active:scale-95 disabled:opacity-50 ${styles[variant]} ${className}`}
         {...rest}
       />
     );
   }
   ```
3. Class có điều kiện → `clsx`; gộp class xung đột → `tailwind-merge`.

---

# Phần C — Redux Toolkit trong Next.js

## C1. Ôn nhanh Redux Toolkit

| API | Dùng để | Thay cho (Redux thuần) |
|---|---|---|
| `configureStore` | Tạo store, tự gắn thunk + DevTools + kiểm tra lỗi | `createStore` + `applyMiddleware` |
| `createSlice` | Tạo reducer + action creators trong 1 chỗ, viết "mutate" nhờ **Immer** | action types + action creators + switch/case |
| `PayloadAction<T>` | Kiểu của action có payload | — |
| `createAction` | Tạo action dùng chung cho nhiều slice | — |
| `createAsyncThunk` | Gọi API, tự sinh `pending / fulfilled / rejected` | redux-thunk viết tay |
| `createSelector` | Selector có ghi nhớ (memoized) | — |
| `createApi` (**RTK Query**) | Fetch + cache + tự refetch dữ liệu server | thunk + slice cho từng API |

**Luồng dữ liệu một chiều:**

```
 UI (Client Component)
   │  dispatch(action)
   ▼
 Store ──► reducer (slice) ──► state mới
   ▲                              │
   └──── useAppSelector ◄─────────┘   → component re-render
```

**Immer** — trong reducer của `createSlice` được viết như thể "sửa trực tiếp":

```ts
todoToggled(state, action: PayloadAction<string>) {
  const todo = state.items.find((t) => t.id === action.payload);
  if (todo) todo.done = !todo.done;   // Immer tạo bản sao bất biến phía sau
}
```

> ⚠️ Hoặc **sửa `state`**, hoặc **`return` state mới** — không làm cả hai trong cùng reducer.

## C2. Vì sao dùng Redux trong Next.js khác với React + Vite?

Ở React + Vite, ta thường viết:

```ts
// ❌ Không nên làm trong Next.js
export const store = configureStore({ reducer: { ... } });   // 1 store dùng chung toàn module
```

Trong Next.js, code chạy **cả trên server**. Server Node.js phục vụ nhiều người dùng cùng lúc; nếu store là biến toàn cục của module, **dữ liệu của người A có thể lộ sang người B**. Vì vậy:

| Quy tắc | Lý do |
|---|---|
| **1. Không tạo store toàn cục** — viết hàm `makeStore()` | Mỗi request (server) / mỗi tab (client) có store riêng |
| **2. Tạo store trong Client Component `StoreProvider`**, giữ bằng `useRef` | Chỉ tạo đúng 1 lần cho mỗi lần mount |
| **3. Server Component không đọc/ghi store** | Store nằm trong Context, chỉ client mới truy cập |
| **4. Store chỉ chứa state "client" có thể thay đổi** (giỏ hàng, theme, todo, bộ lọc) | Dữ liệu tĩnh/SEO nên fetch bằng Server Component |
| **5. Đặt `StoreProvider` trong `app/layout.tsx`** | Layout không mount lại khi chuyển trang → state được giữ |

## C3. State nào đặt ở đâu?

| Loại state | Ví dụ | Đặt ở |
|---|---|---|
| Cục bộ 1 component | Nội dung ô input, đang mở modal | `useState` |
| Nằm trên URL, chia sẻ được qua link | `?q=phone`, `?page=2` | `searchParams` |
| Dữ liệu cần SEO, ít thay đổi | Chi tiết sản phẩm, bài blog | **Server Component** + `fetch` |
| State client dùng chung nhiều trang | Giỏ hàng, theme, todo, user đăng nhập | **Redux slice** |
| Dữ liệu từ API cần cache, refetch | Danh sách notes, CRUD | **RTK Query** (hoặc `createAsyncThunk`) |

## C4. Mẫu chuẩn: makeStore + StoreProvider + typed hooks

**Bước 1 — `lib/store.ts`:**

```ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      counter: counterReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
```

**Bước 2 — `lib/hooks.ts` (typed hooks):**

```ts
import { useDispatch, useSelector, useStore } from 'react-redux';
import type { AppDispatch, AppStore, RootState } from './store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
```

> 💡 Dùng `useAppSelector` thay `useSelector` → `state` có đủ gợi ý kiểu, không phải ghi `(state: RootState)` mỗi lần.

**Bước 3 — `app/StoreProvider.tsx`:**

```tsx
'use client';

import { useRef, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { makeStore, type AppStore } from '@/lib/store';

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (storeRef.current === null) {
    storeRef.current = makeStore();          // chỉ tạo ở lần render đầu tiên
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
```

**Bước 4 — bọc trong `app/layout.tsx`:**

```tsx
<body>
  <StoreProvider>{children}</StoreProvider>
</body>
```

> 💡 `layout.tsx` vẫn là Server Component. Nó render được `StoreProvider` (client) và truyền các Server Component con qua `children`.

## C5. createSlice, createAction & extraReducers

```ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type CounterState = { value: number };
const initialState: CounterState = { value: 0 };

const counterSlice = createSlice({
  name: 'counter',              // tiền tố type: "counter/increment"
  initialState,
  reducers: {
    increment(state) { state.value += 1; },
    incrementByAmount(state, action: PayloadAction<number>) { state.value += action.payload; },
  },
});

export const { increment, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

**`prepare` — chuẩn bị payload trước khi vào reducer** (tạo id, ngày… — reducer phải *thuần*, không được gọi `Date.now()`, `Math.random()`):

```ts
todoAdded: {
  reducer(state, action: PayloadAction<Todo>) { state.items.unshift(action.payload); },
  prepare(text: string) {
    return { payload: { id: nanoid(), text, done: false, createdAt: new Date().toISOString() } };
  },
},
// dùng: dispatch(todoAdded('Học RTK'))
```

**`createAction` + `extraReducers` — một action, nhiều slice cùng xử lý:**

```ts
// lib/actions.ts
export const hydrate = createAction<PersistedState>('app/hydrate');

// trong slice bất kỳ
extraReducers: (builder) => {
  builder.addCase(hydrate, (state, action) => { /* lấy phần của mình */ });
},
```

## C6. createAsyncThunk

```ts
export const fetchProducts = createAsyncThunk<
  Product[],                 // kiểu trả về khi thành công
  string,                    // kiểu tham số truyền vào (từ khóa tìm kiếm)
  { rejectValue: string }    // kiểu của rejectWithValue
>('products/fetch', async (q, { rejectWithValue }) => {
  const res = await fetch(`https://dummyjson.com/products/search?q=${q}`);
  if (!res.ok) return rejectWithValue(`Lỗi ${res.status}`);
  const data = (await res.json()) as ProductsResponse;
  return data.products;
});
```

Thunk tự sinh 3 action, xử lý trong `extraReducers`:

```
dispatch(fetchProducts('phone'))
   ├─► products/fetch/pending    → status = 'loading'
   ├─► products/fetch/fulfilled  → status = 'succeeded', items = payload
   └─► products/fetch/rejected   → status = 'failed',    error = payload
```

## C7. Selector & createSelector

```ts
// selector thường
export const selectCartItems = (state: RootState) => state.cart.items;

// selector ghi nhớ: chỉ tính lại khi items thay đổi
export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0)
);
```

> ⚠️ **Không** viết `useAppSelector((s) => ({ a: s.x, b: s.y }))` hay `useAppSelector((s) => s.items.filter(...))`: mỗi lần chạy trả về object/mảng **mới** → component re-render mãi, react-redux cảnh báo *"Selector returned a different result..."*. Hãy tách thành nhiều `useAppSelector`, hoặc dùng `createSelector`.

## C8. Lưu localStorage mà không lỗi Hydration

Client Component vẫn được render HTML **trên server** trước, nơi không có `localStorage`. Nếu đọc `localStorage` ngay trong `initialState`:

- Server render: giỏ hàng 0 món.
- Client render lần đầu: giỏ hàng 3 món → **Hydration failed**.

**Giải pháp dùng trong slot này:**

```
1. Store khởi tạo với initialState rỗng (giống nhau ở server và client)
2. Sau khi mount (useEffect trong StoreProvider):
      saved = loadState()          ← đọc localStorage
      dispatch(hydrate(saved))     ← mỗi slice lấy phần của mình qua extraReducers
3. store.subscribe(() => saveState(...))  ← mỗi lần state đổi thì ghi lại
```

## C9. RTK Query + Route Handlers

Với dữ liệu CRUD từ server, viết `createAsyncThunk` cho từng thao tác rất dài. **RTK Query** tự lo: gọi API, cache, trạng thái loading/error, tự refetch sau khi thêm/sửa/xóa.

```ts
export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),     // gọi Route Handlers trong cùng project
  tagTypes: ['Note'],
  endpoints: (build) => ({
    getNotes: build.query<Note[], void>({ query: () => '/notes', providesTags: ['Note'] }),
    addNote: build.mutation<Note, NoteInput>({
      query: (body) => ({ url: '/notes', method: 'POST', body }),
      invalidatesTags: ['Note'],                       // → getNotes tự chạy lại
    }),
  }),
});
export const { useGetNotesQuery, useAddNoteMutation } = notesApi;
```

| | `createAsyncThunk` + slice | RTK Query |
|---|---|---|
| Lượng code | Nhiều (thunk + 3 case + state status) | Ít |
| Cache, chống gọi trùng | Tự viết | Có sẵn |
| Refetch sau mutation | Tự dispatch lại | `invalidatesTags` |
| Phù hợp | Logic tùy biến, nhiều xử lý client | CRUD chuẩn REST |

---

# Phần D — 5 bài tập step-by-step

> **Chuẩn bị:** Node.js ≥ 20, VS Code + *Tailwind CSS IntelliSense*, trình duyệt có extension **Redux DevTools**.
> Cả 5 bài làm trong **cùng một project**, mỗi bài thêm route + slice mới vào store.

| Bài | Route | Kiến thức Redux Toolkit |
|---|---|---|
| 1 | `/counter` | `makeStore`, `StoreProvider`, typed hooks, `createSlice`, `PayloadAction` |
| 2 | Layout, Navbar | `uiSlice`, `createAction`, `extraReducers`, lưu localStorage, state giữ khi chuyển trang |
| 3 | `/todos` | `prepare`, `nanoid`, `createSelector` |
| 4 | `/products`, `/products/[id]`, `/cart` | `createAsyncThunk`, status, race condition, slice giỏ hàng |
| 5 | `/notes`, `/api/notes` | Route Handlers + **RTK Query** (`createApi`, tags, optimistic update) |

---

## Bài 1: Khởi tạo project + Store + Counter

**🎯 Mục tiêu:** Tạo project Next.js + TypeScript + Tailwind, cài Redux Toolkit, dựng store đúng chuẩn Next.js, làm Counter có bước nhảy tùy chọn.

**📚 Kiến thức áp dụng:** A2, A4, B2, C4, C5.

### Bước 1 — Tạo project

```bash
npx create-next-app@latest slot20-next-rtk
```

```
✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like your code inside a `src/` directory? … No
✔ Would you like to use App Router? (recommended) … Yes
✔ Would you like to use Turbopack? … Yes
✔ Would you like to customize the import alias (`@/*` by default)? … No
```

> 💡 Bản mới có thể chỉ hỏi *"Use the recommended Next.js defaults?"* → chọn **Yes** (đã gồm TypeScript, ESLint, Tailwind, App Router).

### Bước 2 — Cài Redux Toolkit

```bash
cd slot20-next-rtk
npm install @reduxjs/toolkit react-redux
npm run dev
```

> 💡 Hai gói này đã kèm sẵn kiểu TypeScript, **không** cần `@types/react-redux`.

### Bước 3 — Dọn code mặc định

`app/globals.css`:

```css
@import "tailwindcss";
```

### Bước 4 — Tạo counter slice

`lib/features/counter/counterSlice.ts`:

```ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/store';

type CounterState = {
  value: number;
  step: number;
};

const initialState: CounterState = { value: 0, step: 1 };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value += state.step;
    },
    decrement(state) {
      state.value -= state.step;
    },
    reset(state) {
      state.value = 0;
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
    stepChanged(state, action: PayloadAction<number>) {
      state.step = action.payload;
    },
  },
});

export const { increment, decrement, reset, incrementByAmount, stepChanged } = counterSlice.actions;

// Selectors
export const selectCount = (state: RootState) => state.counter.value;
export const selectStep = (state: RootState) => state.counter.step;

export default counterSlice.reducer;
```

> 💡 `import type { RootState }` — chỉ import kiểu nên không gây vòng lặp import lúc chạy (store import slice, slice import kiểu của store).

### Bước 5 — Tạo store & typed hooks

`lib/store.ts`:

```ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      counter: counterReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
```

`lib/hooks.ts`:

```ts
import { useDispatch, useSelector, useStore } from 'react-redux';
import type { AppDispatch, AppStore, RootState } from './store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
```

### Bước 6 — StoreProvider & Root Layout

`app/StoreProvider.tsx`:

```tsx
'use client';

import { useRef, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { makeStore, type AppStore } from '@/lib/store';

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (storeRef.current === null) {
    storeRef.current = makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
```

`app/layout.tsx`:

```tsx
import type { Metadata } from 'next';
import './globals.css';
import StoreProvider from './StoreProvider';

export const metadata: Metadata = {
  title: { default: 'Slot 20 – Next.js + RTK', template: '%s | Slot 20' },
  description: 'Next.js + Tailwind CSS + Redux Toolkit',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
```

### Bước 7 — Component Counter (Client)

`app/counter/Counter.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  decrement,
  increment,
  incrementByAmount,
  reset,
  selectCount,
  selectStep,
  stepChanged,
} from '@/lib/features/counter/counterSlice';

const STEPS = [1, 5, 10] as const;

export default function Counter() {
  const count = useAppSelector(selectCount);
  const step = useAppSelector(selectStep);
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState<string>('2');

  const amountNumber = Number(amount) || 0;
  const color = count > 0 ? 'text-green-600' : count < 0 ? 'text-red-600' : 'text-gray-400';

  return (
    <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow-lg dark:bg-gray-900">
      <p className="text-sm font-medium uppercase tracking-widest text-gray-500">Giá trị hiện tại</p>
      <p className={`my-4 text-7xl font-black tabular-nums transition ${color}`}>{count}</p>

      {/* Nút tăng / giảm */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => dispatch(decrement())}
          className="size-14 rounded-full bg-red-500 text-2xl font-bold text-white transition hover:bg-red-600 active:scale-90"
          aria-label="Giảm"
        >
          −
        </button>
        <button
          onClick={() => dispatch(reset())}
          className="rounded-full border border-gray-300 px-6 font-semibold transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          Reset
        </button>
        <button
          onClick={() => dispatch(increment())}
          className="size-14 rounded-full bg-green-500 text-2xl font-bold text-white transition hover:bg-green-600 active:scale-90"
          aria-label="Tăng"
        >
          +
        </button>
      </div>

      {/* Chọn bước nhảy */}
      <div className="mt-6">
        <p className="mb-2 text-sm text-gray-500">Bước nhảy</p>
        <div className="inline-flex overflow-hidden rounded-lg border border-gray-300 dark:border-gray-700">
          {STEPS.map((s) => (
            <button
              key={s}
              onClick={() => dispatch(stepChanged(s))}
              className={`px-4 py-1.5 text-sm font-semibold transition ${
                step === s ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Cộng một lượng tùy ý */}
      <div className="mt-6 flex gap-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
        />
        <button
          onClick={() => dispatch(incrementByAmount(amountNumber))}
          disabled={amountNumber === 0}
          className="whitespace-nowrap rounded-lg bg-blue-600 px-4 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-40"
        >
          Cộng {amountNumber}
        </button>
      </div>
    </div>
  );
}
```

> 💡 Ô input dùng `useState` (state cục bộ) — **không phải mọi state đều đưa vào Redux**. Chỉ `value` và `step` cần chia sẻ.

### Bước 8 — Trang Counter (Server) & trang chủ tạm

`app/counter/page.tsx`:

```tsx
import type { Metadata } from 'next';
import Counter from './Counter';

export const metadata: Metadata = { title: 'Counter' };

export default function CounterPage() {
  return (
    <main className="px-4 py-12">
      <h1 className="mb-8 text-center text-3xl font-bold">🔢 Redux Counter</h1>
      <Counter />
    </main>
  );
}
```

`app/page.tsx` (tạm, Bài 2 sẽ làm đẹp):

```tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main className="py-20 text-center">
      <h1 className="text-4xl font-extrabold">Slot 20</h1>
      <Link href="/counter" className="mt-6 inline-block text-blue-600 underline">Đến Counter →</Link>
    </main>
  );
}
```

### Bước 9 — Kiểm tra

- Mở `http://localhost:3000/counter`, bấm `+`, `−`, đổi bước nhảy, cộng số tùy ý.
- F12 → tab **Redux** → thấy action `counter/increment`, `counter/stepChanged`… và state thay đổi.
- Tab **Diff** trong Redux DevTools → chỉ `counter.value` thay đổi.

### ✅ Checklist Bài 1

- [ ] Project chạy được với `npm run dev`, có `@reduxjs/toolkit` và `react-redux` trong `package.json`.
- [ ] `lib/store.ts` export **hàm** `makeStore` (không export `store` toàn cục) cùng 3 kiểu `AppStore`, `RootState`, `AppDispatch`.
- [ ] `lib/hooks.ts` có `useAppDispatch`, `useAppSelector` dùng `.withTypes<>()`.
- [ ] `StoreProvider.tsx` có `'use client'` và dùng `useRef` để chỉ tạo store 1 lần.
- [ ] `StoreProvider` bọc `children` trong `app/layout.tsx`.
- [ ] `counter/page.tsx` **không** có `'use client'` và export `metadata`; `Counter.tsx` **có** `'use client'`.
- [ ] Reducer dùng `PayloadAction<number>` cho action có payload.
- [ ] Màu số đổi theo giá trị (xanh / đỏ / xám), nút có hiệu ứng `active:scale-90`.
- [ ] Redux DevTools hiển thị đúng action và state.
- [ ] `npx tsc --noEmit` không báo lỗi.

**⭐ Mở rộng:** Thêm `history: number[]` vào state, lưu 5 giá trị gần nhất; thêm nút **Undo** (`undo` reducer lấy phần tử cuối của `history`).

---

## Bài 2: Layout, Navbar & Dark mode bằng uiSlice

**🎯 Mục tiêu:** Layout dùng chung với Navbar/Footer, highlight menu active, menu mobile và **Dark mode** điều khiển bằng Redux, lưu theme vào localStorage, chứng minh state giữ nguyên khi chuyển trang.

**📚 Kiến thức áp dụng:** A3, A5, B3, C2, C5 (`createAction`, `extraReducers`), C8.

### Bước 1 — Bật dark mode theo class

`app/globals.css`:

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

### Bước 2 — Action `hydrate` & hàm lưu trữ

`lib/actions.ts`:

```ts
import { createAction } from '@reduxjs/toolkit';
import type { PersistedState } from './persist';

// Dispatch 1 lần sau khi mount, mỗi slice tự lấy phần dữ liệu của mình
export const hydrate = createAction<PersistedState>('app/hydrate');
```

`lib/persist.ts` (phiên bản Bài 2 — Bài 3, 4 sẽ bổ sung):

```ts
import type { RootState } from './store';
import type { Theme } from './features/ui/uiSlice';

export type PersistedState = {
  theme?: Theme;
};

const KEY = 'slot20-state';

// Chọn phần state cần lưu (KHÔNG lưu menuOpen, trạng thái loading…)
export function selectPersisted(state: RootState): PersistedState {
  return { theme: state.ui.theme };
}

export function loadState(): PersistedState | undefined {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PersistedState) : undefined;
  } catch {
    return undefined; // JSON hỏng hoặc trình duyệt chặn localStorage
  }
}

export function saveState(state: PersistedState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* bỏ qua lỗi hết dung lượng */
  }
}
```

### Bước 3 — uiSlice

`lib/features/ui/uiSlice.ts`:

```ts
import { createSlice } from '@reduxjs/toolkit';
import { hydrate } from '@/lib/actions';
import type { RootState } from '@/lib/store';

export type Theme = 'light' | 'dark';

type UiState = {
  theme: Theme;
  menuOpen: boolean;
};

const initialState: UiState = { theme: 'light', menuOpen: false };

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    themeToggled(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    menuToggled(state) {
      state.menuOpen = !state.menuOpen;
    },
    menuClosed(state) {
      state.menuOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      if (action.payload.theme) state.theme = action.payload.theme;
    });
  },
});

export const { themeToggled, menuToggled, menuClosed } = uiSlice.actions;
export const selectTheme = (state: RootState) => state.ui.theme;
export const selectMenuOpen = (state: RootState) => state.ui.menuOpen;
export default uiSlice.reducer;
```

Thêm vào `lib/store.ts`:

```ts
import uiReducer from './features/ui/uiSlice';
// ...
reducer: {
  counter: counterReducer,
  ui: uiReducer,
},
```

### Bước 4 — StoreProvider đọc & ghi localStorage

`app/StoreProvider.tsx` (cập nhật):

```tsx
'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { makeStore, type AppStore } from '@/lib/store';
import { hydrate } from '@/lib/actions';
import { loadState, saveState, selectPersisted } from '@/lib/persist';

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (storeRef.current === null) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const store = storeRef.current;
    if (!store) return;

    // 1) Sau khi mount: đọc localStorage → đổ vào store
    const saved = loadState();
    if (saved) store.dispatch(hydrate(saved));

    // 2) Mỗi khi state đổi → ghi lại
    const unsubscribe = store.subscribe(() => {
      saveState(selectPersisted(store.getState()));
    });
    return unsubscribe;
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
```

> 💡 Đọc localStorage **trong `useEffect`** (chỉ chạy trên trình duyệt, sau hydration) → HTML server và client lần đầu giống nhau → không lỗi Hydration.

### Bước 5 — ThemeSync: đồng bộ Redux → class `.dark` trên `<html>`

`app/_components/ThemeSync.tsx`:

```tsx
'use client';

import { useEffect } from 'react';
import { useAppSelector } from '@/lib/hooks';
import { selectTheme } from '@/lib/features/ui/uiSlice';

export default function ThemeSync() {
  const theme = useAppSelector(selectTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return null; // không hiển thị gì, chỉ làm "side effect"
}
```

### Bước 6 — Navbar (Client)

`app/_components/Navbar.tsx`:

```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { menuClosed, menuToggled, selectMenuOpen, selectTheme, themeToggled } from '@/lib/features/ui/uiSlice';

type NavLink = { href: string; label: string };

const links: NavLink[] = [
  { href: '/', label: 'Trang chủ' },
  { href: '/counter', label: 'Counter' },
  { href: '/todos', label: 'Todo' },
  { href: '/products', label: 'Sản phẩm' },
  { href: '/notes', label: 'Ghi chú' },
];

export default function Navbar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const menuOpen = useAppSelector(selectMenuOpen);

  const isActive = (href: string): boolean =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const linkClass = (href: string): string =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive(href)
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-extrabold text-blue-600">
          Next<span className="text-gray-900 dark:text-white">RTK</span>
        </Link>

        {/* Menu desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={linkClass(l.href)}>{l.label}</Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Bài 4 sẽ chèn <CartBadge /> ở đây */}
          <button
            onClick={() => dispatch(themeToggled())}
            className="rounded-lg p-2 text-lg transition hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Đổi giao diện sáng/tối"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button
            onClick={() => dispatch(menuToggled())}
            className="rounded-lg p-2 hover:bg-gray-100 md:hidden dark:hover:bg-gray-800"
            aria-label="Mở menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      {menuOpen && (
        <ul className="flex flex-col gap-1 border-t border-gray-200 px-4 py-2 md:hidden dark:border-gray-800">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => dispatch(menuClosed())} className={`block ${linkClass(l.href)}`}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
```

### Bước 7 — Footer & Root Layout hoàn chỉnh

`app/_components/Footer.tsx` (Server Component):

```tsx
export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 py-6 text-center text-sm text-gray-500 dark:border-gray-800">
      © {new Date().getFullYear()} FER202 — Next.js · Tailwind CSS · Redux Toolkit
    </footer>
  );
}
```

`app/layout.tsx`:

```tsx
import type { Metadata } from 'next';
import './globals.css';
import StoreProvider from './StoreProvider';
import Navbar from './_components/Navbar';
import Footer from './_components/Footer';
import ThemeSync from './_components/ThemeSync';

export const metadata: Metadata = {
  title: { default: 'Slot 20 – Next.js + RTK', template: '%s | Slot 20' },
  description: 'Next.js + Tailwind CSS + Redux Toolkit',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className="flex min-h-screen flex-col bg-gray-50 text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100">
        <StoreProvider>
          <ThemeSync />
          <Navbar />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
```

> 💡 `Footer` là Server Component nằm **bên trong** `StoreProvider` (client) — hợp lệ vì nó được truyền qua `children` từ layout (server).
> 💡 Sửa `app/counter/page.tsx`: đổi `<main className="px-4 py-12">` thành `<div>` vì layout đã có `<main>`.

### Bước 8 — Trang chủ Hero

`app/page.tsx`:

```tsx
import Link from 'next/link';

type Feature = { icon: string; title: string; desc: string; href: string };

const features: Feature[] = [
  { icon: '🔢', title: 'Counter', desc: 'createSlice, PayloadAction, typed hooks', href: '/counter' },
  { icon: '📝', title: 'Todo', desc: 'prepare, nanoid, createSelector', href: '/todos' },
  { icon: '🛒', title: 'Shop', desc: 'createAsyncThunk, giỏ hàng', href: '/products' },
  { icon: '🗒️', title: 'Notes', desc: 'Route Handlers + RTK Query', href: '/notes' },
];

export default function Home() {
  return (
    <>
      <section className="py-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
          Next.js +{' '}
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Redux Toolkit
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Quản lý state toàn cục đúng chuẩn App Router, giao diện bằng Tailwind CSS.
        </p>
      </section>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <Link
            key={f.href}
            href={f.href}
            className="group rounded-xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="text-4xl">{f.icon}</div>
            <h2 className="mt-4 text-lg font-semibold group-hover:text-blue-600">{f.title}</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{f.desc}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
```

### Bước 9 — Trang 404

`app/not-found.tsx`:

```tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center py-20 text-center">
      <p className="text-8xl font-black text-blue-600">404</p>
      <h1 className="mt-4 text-2xl font-bold">Không tìm thấy trang</h1>
      <Link href="/" className="mt-6 text-blue-600 underline">← Về trang chủ</Link>
    </div>
  );
}
```

### Bước 10 — Kiểm tra

1. Vào `/counter`, tăng lên **7** → bấm menu "Trang chủ" → quay lại `/counter`: vẫn là **7** (layout không mount lại → store giữ nguyên).
2. Bấm 🌙 → toàn trang chuyển tối. F5 → vẫn tối (localStorage key `slot20-state`).
3. F5 trên `/counter` → counter về 0 (vì `selectPersisted` **không** lưu counter — đúng thiết kế).
4. Thu nhỏ màn hình → menu hamburger mở/đóng, bấm link thì menu tự đóng.
5. Gõ `/abcxyz` → trang 404.

### ✅ Checklist Bài 2

- [ ] `globals.css` có `@custom-variant dark (...)`.
- [ ] `uiSlice` có `themeToggled`, `menuToggled`, `menuClosed` và xử lý `hydrate` trong `extraReducers`.
- [ ] `hydrate` được tạo bằng `createAction` trong `lib/actions.ts`.
- [ ] Không đọc `localStorage` trong `initialState`; chỉ đọc trong `useEffect` của `StoreProvider`.
- [ ] `selectPersisted` chỉ lưu `theme` (không lưu `menuOpen`).
- [ ] `ThemeSync` thêm/bỏ class `dark` trên `<html>` theo state.
- [ ] Link active được tô xanh, kể cả trang con (`/products/5` → "Sản phẩm").
- [ ] Counter giữ nguyên giá trị khi chuyển trang.
- [ ] Không có cảnh báo *Hydration failed* trong Console.
- [ ] Title tab có dạng "Counter | Slot 20".

**⭐ Mở rộng:**
1. Thêm `theme: 'system'` — theo hệ điều hành bằng `window.matchMedia('(prefers-color-scheme: dark)')`.
2. Chống nháy trắng khi F5 ở chế độ tối: thêm script nhỏ trong `<head>` đặt class `dark` trước khi React chạy (dùng `suppressHydrationWarning` trên `<html>`).

---

## Bài 3: Todo App với createSlice + createSelector

**🎯 Mục tiêu:** Slice có nhiều reducer, `prepare` callback, id bằng `nanoid`, sửa inline, bộ lọc, thống kê bằng `createSelector`, lưu localStorage qua cơ chế `hydrate` của Bài 2.

**📚 Kiến thức áp dụng:** B3 (`peer`, `group`), C5 (`prepare`), C7.

### Bước 1 — Khai báo kiểu

`types/index.ts`:

```ts
export type Todo = {
  id: string;
  text: string;
  done: boolean;
  createdAt: string;   // ISO string – Redux khuyến nghị state chỉ chứa dữ liệu serialize được
};

export type TodoFilter = 'all' | 'active' | 'done';
```

### Bước 2 — todosSlice

`lib/features/todos/todosSlice.ts`:

```ts
import { createSelector, createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';
import { hydrate } from '@/lib/actions';
import type { RootState } from '@/lib/store';
import type { Todo, TodoFilter } from '@/types';

export type TodosState = {
  items: Todo[];
  filter: TodoFilter;
};

const initialState: TodosState = { items: [], filter: 'all' };

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded: {
      reducer(state, action: PayloadAction<Todo>) {
        state.items.unshift(action.payload);
      },
      // prepare: tạo id + thời gian NGOÀI reducer để reducer vẫn là hàm thuần
      prepare(text: string) {
        return {
          payload: { id: nanoid(), text: text.trim(), done: false, createdAt: new Date().toISOString() },
        };
      },
    },
    todoToggled(state, action: PayloadAction<string>) {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) todo.done = !todo.done;
    },
    todoEdited(state, action: PayloadAction<{ id: string; text: string }>) {
      const todo = state.items.find((t) => t.id === action.payload.id);
      if (todo) todo.text = action.payload.text.trim();
    },
    todoRemoved(state, action: PayloadAction<string>) {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    allToggled(state) {
      const allDone = state.items.every((t) => t.done);
      state.items.forEach((t) => {
        t.done = !allDone;
      });
    },
    completedCleared(state) {
      state.items = state.items.filter((t) => !t.done);
    },
    filterChanged(state, action: PayloadAction<TodoFilter>) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      if (action.payload.todos) return action.payload.todos; // thay toàn bộ state
    });
  },
});

export const {
  todoAdded,
  todoToggled,
  todoEdited,
  todoRemoved,
  allToggled,
  completedCleared,
  filterChanged,
} = todosSlice.actions;

export default todosSlice.reducer;

// ===== Selectors =====
const FILTER_FN: Record<TodoFilter, (t: Todo) => boolean> = {
  all: () => true,
  active: (t) => !t.done,
  done: (t) => t.done,
};

export const selectTodos = (state: RootState) => state.todos.items;
export const selectTodoFilter = (state: RootState) => state.todos.filter;

export const selectVisibleTodos = createSelector([selectTodos, selectTodoFilter], (items, filter) =>
  items.filter(FILTER_FN[filter])
);

export const selectTodoStats = createSelector([selectTodos], (items) => {
  const done = items.filter((t) => t.done).length;
  return {
    total: items.length,
    done,
    active: items.length - done,
    percent: items.length ? Math.round((done / items.length) * 100) : 0,
  };
});
```

> 💡 `return action.payload.todos` trong `addCase`: **trả về state mới** (không sửa draft) → hợp lệ với Immer.
> 💡 `selectVisibleTodos` trả về mảng mới qua `filter`, nhưng nhờ `createSelector` nó **chỉ tính lại khi `items` hoặc `filter` đổi** → không re-render thừa.

### Bước 3 — Gắn vào store và localStorage

`lib/store.ts`:

```ts
import todosReducer from './features/todos/todosSlice';
// ...
reducer: {
  counter: counterReducer,
  ui: uiReducer,
  todos: todosReducer,
},
```

`lib/persist.ts` — bổ sung:

```ts
import type { TodosState } from './features/todos/todosSlice';

export type PersistedState = {
  theme?: Theme;
  todos?: TodosState;
};

export function selectPersisted(state: RootState): PersistedState {
  return { theme: state.ui.theme, todos: state.todos };
}
```

### Bước 4 — Các component

Cấu trúc:

```
app/todos/
├── page.tsx          (Server – metadata)
├── TodoApp.tsx       ('use client' – ghép các phần)
├── TodoForm.tsx
├── TodoFilters.tsx
├── TodoItem.tsx
└── TodoStats.tsx
```

`app/todos/TodoForm.tsx`:

```tsx
'use client';

import { useState, type FormEvent } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { todoAdded } from '@/lib/features/todos/todosSlice';

export default function TodoForm() {
  const dispatch = useAppDispatch();
  const [text, setText] = useState<string>('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(todoAdded(text));   // nhờ prepare: chỉ cần truyền chuỗi
    setText('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Hôm nay bạn cần làm gì?"
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800"
      />
      <button
        disabled={!text.trim()}
        className="rounded-lg bg-blue-600 px-5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Thêm
      </button>
    </form>
  );
}
```

`app/todos/TodoFilters.tsx`:

```tsx
'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { filterChanged, selectTodoFilter } from '@/lib/features/todos/todosSlice';
import type { TodoFilter } from '@/types';

const LABELS: Record<TodoFilter, string> = { all: 'Tất cả', active: 'Chưa xong', done: 'Đã xong' };

export default function TodoFilters() {
  const dispatch = useAppDispatch();
  const current = useAppSelector(selectTodoFilter);

  return (
    <div className="flex gap-2">
      {(Object.keys(LABELS) as TodoFilter[]).map((key) => (
        <button
          key={key}
          onClick={() => dispatch(filterChanged(key))}
          className={`rounded-full px-4 py-1 text-sm transition ${
            current === key
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
          }`}
        >
          {LABELS[key]}
        </button>
      ))}
    </div>
  );
}
```

`app/todos/TodoItem.tsx`:

```tsx
'use client';

import { useState, type KeyboardEvent } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { todoEdited, todoRemoved, todoToggled } from '@/lib/features/todos/todosSlice';
import type { Todo } from '@/types';

export default function TodoItem({ todo }: { todo: Todo }) {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState<boolean>(false);
  const [draft, setDraft] = useState<string>(todo.text);

  function save() {
    if (draft.trim()) dispatch(todoEdited({ id: todo.id, text: draft }));
    else setDraft(todo.text);
    setEditing(false);
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') save();
    if (e.key === 'Escape') {
      setDraft(todo.text);
      setEditing(false);
    }
  }

  return (
    <li className="group flex items-center gap-3 py-3">
      <input
        id={`todo-${todo.id}`}
        type="checkbox"
        checked={todo.done}
        onChange={() => dispatch(todoToggled(todo.id))}
        className="peer size-5 cursor-pointer accent-blue-600"
      />

      {editing ? (
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={save}
          onKeyDown={handleKey}
          className="flex-1 rounded border border-blue-400 px-2 py-1 focus:outline-none dark:bg-gray-800"
        />
      ) : (
        <label
          htmlFor={`todo-${todo.id}`}
          onDoubleClick={() => setEditing(true)}
          className="flex-1 cursor-pointer select-none transition peer-checked:text-gray-400 peer-checked:line-through"
          title="Double-click để sửa"
        >
          {todo.text}
        </label>
      )}

      <button
        onClick={() => dispatch(todoRemoved(todo.id))}
        className="rounded px-2 text-red-500 opacity-0 transition hover:bg-red-50 group-hover:opacity-100 dark:hover:bg-red-950"
        aria-label="Xóa"
      >
        ✕
      </button>
    </li>
  );
}
```

> 💡 `editing` và `draft` là state **cục bộ** của từng dòng → dùng `useState`, không đưa vào Redux.

`app/todos/TodoStats.tsx`:

```tsx
'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { allToggled, completedCleared, selectTodoStats } from '@/lib/features/todos/todosSlice';

export default function TodoStats() {
  const dispatch = useAppDispatch();
  const { total, done, active, percent } = useAppSelector(selectTodoStats);

  if (total === 0) return null;

  return (
    <div className="mt-4 space-y-3 border-t border-gray-100 pt-4 text-sm dark:border-gray-800">
      {/* Thanh tiến độ */}
      <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        <div className="h-full rounded-full bg-green-500 transition-all duration-500" style={{ width: `${percent}%` }} />
      </div>
      <div className="flex items-center justify-between text-gray-500">
        <span>
          Còn <b className="text-gray-900 dark:text-white">{active}</b> việc · Xong {done}/{total} ({percent}%)
        </span>
        <div className="flex gap-3">
          <button onClick={() => dispatch(allToggled())} className="hover:text-blue-600 hover:underline">
            Đảo tất cả
          </button>
          <button
            onClick={() => dispatch(completedCleared())}
            disabled={done === 0}
            className="hover:text-red-600 hover:underline disabled:opacity-40 disabled:no-underline"
          >
            Xóa việc đã xong
          </button>
        </div>
      </div>
    </div>
  );
}
```

> 💡 Chiều rộng thanh tiến độ là **giá trị động** → dùng `style={{ width }}`, không ghép class `w-[${percent}%]` (Tailwind không quét được).
> 💡 `selectTodoStats` trả object mới, nhưng là `createSelector` nên chỉ tạo mới khi `items` đổi — dùng an toàn trong `useAppSelector`.

`app/todos/TodoApp.tsx`:

```tsx
'use client';

import { useAppSelector } from '@/lib/hooks';
import { selectVisibleTodos } from '@/lib/features/todos/todosSlice';
import TodoForm from './TodoForm';
import TodoFilters from './TodoFilters';
import TodoItem from './TodoItem';
import TodoStats from './TodoStats';

export default function TodoApp() {
  const todos = useAppSelector(selectVisibleTodos);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-900">
      <TodoForm />
      <div className="mt-5">
        <TodoFilters />
      </div>
      <ul className="mt-5 divide-y divide-gray-100 dark:divide-gray-800">
        {todos.length === 0 ? (
          <li className="py-10 text-center text-gray-400">Không có công việc nào 🎉</li>
        ) : (
          todos.map((t) => <TodoItem key={t.id} todo={t} />)
        )}
      </ul>
      <TodoStats />
    </div>
  );
}
```

`app/todos/page.tsx`:

```tsx
import type { Metadata } from 'next';
import TodoApp from './TodoApp';

export const metadata: Metadata = { title: 'Todo' };

export default function TodosPage() {
  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-6 text-center text-3xl font-bold">📝 Việc cần làm</h1>
      <TodoApp />
    </div>
  );
}
```

### Bước 5 — Kiểm tra

- Thêm 4 việc, tick 2 → gạch ngang, thanh tiến độ 50%.
- Đổi bộ lọc → danh sách đổi; Redux DevTools thấy `todos/filterChanged`.
- Double-click một việc → sửa → Enter lưu, Esc hủy.
- F5 → todo còn nguyên (đọc lại qua `app/hydrate`). Xem action `app/hydrate` trong DevTools.
- Chuyển sang `/counter` rồi quay lại → todo vẫn còn.

### ✅ Checklist Bài 3

- [ ] Kiểu `Todo`, `TodoFilter` khai báo ở `types/index.ts`; `id` là `string` (từ `nanoid`).
- [ ] `todoAdded` dùng `prepare` → component chỉ gọi `dispatch(todoAdded(text))`.
- [ ] Reducer không gọi `Date.now()`, `Math.random()`, `nanoid()` trực tiếp.
- [ ] Có ít nhất 6 reducer: thêm, đổi trạng thái, sửa, xóa, xóa đã xong, đổi bộ lọc.
- [ ] `selectVisibleTodos` và `selectTodoStats` dùng `createSelector`.
- [ ] Không có `useAppSelector` nào trả về object/mảng mới ngoài `createSelector`.
- [ ] State cục bộ (`text`, `editing`, `draft`) dùng `useState`.
- [ ] Dùng `peer-checked:line-through` và `group-hover:opacity-100`.
- [ ] `persist.ts` đã thêm `todos`; F5 dữ liệu không mất, không lỗi hydration.
- [ ] Dark mode hiển thị đúng ở mọi phần của Todo.

**⭐ Mở rộng:**
1. Thêm `priority: 'low' | 'medium' | 'high'`, hiển thị chấm màu bằng `Record<Priority, string>`.
2. Đồng bộ bộ lọc lên URL (`/todos?filter=done`) bằng `useSearchParams` + `router.replace`.

---

## Bài 4: Shop — Sản phẩm (createAsyncThunk) + Giỏ hàng

**🎯 Mục tiêu:** Lấy danh sách sản phẩm bằng `createAsyncThunk` (có status, error, chống race condition), sắp xếp bằng selector, trang chi tiết là **Server Component** kết hợp nút "Thêm vào giỏ" dùng Redux, giỏ hàng có badge trên Navbar và lưu localStorage.

**📚 Kiến thức áp dụng:** A3 (dynamic route), A4, A6 (`next/image`, `generateMetadata`), C3, C6, C7.

**API:** `https://dummyjson.com/products`

### Bước 1 — Cấu hình ảnh ngoài

`next.config.ts`:

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.dummyjson.com' }],
  },
};

export default nextConfig;
```

> ⚠️ Sửa xong phải **tắt và chạy lại** `npm run dev`.

### Bước 2 — Kiểu dữ liệu & tiện ích

Thêm vào `types/index.ts`:

```ts
export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  thumbnail: string;
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

// Chỉ những trường cần cho giỏ hàng
export type CartProduct = Pick<Product, 'id' | 'title' | 'price' | 'thumbnail'>;
export type CartItem = CartProduct & { quantity: number };
```

`lib/format.ts`:

```ts
export const formatUSD = (n: number): string =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
```

### Bước 3 — productsSlice với createAsyncThunk

`lib/features/products/productsSlice.ts`:

```ts
import { createAsyncThunk, createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/store';
import type { Product, ProductsResponse } from '@/types';

type Status = 'idle' | 'loading' | 'succeeded' | 'failed';
export type SortKey = 'default' | 'price-asc' | 'price-desc' | 'rating';

type ProductsState = {
  items: Product[];
  status: Status;
  error: string | null;
  query: string;
  sort: SortKey;
  currentRequestId: string | null;
};

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
  query: '',
  sort: 'default',
  currentRequestId: null,
};

const BASE = 'https://dummyjson.com/products';

export const fetchProducts = createAsyncThunk<Product[], string, { rejectValue: string }>(
  'products/fetch',
  async (q, { rejectWithValue }) => {
    const url = q ? `${BASE}/search?q=${encodeURIComponent(q)}&limit=24` : `${BASE}?limit=24`;
    try {
      const res = await fetch(url);
      if (!res.ok) return rejectWithValue(`Máy chủ trả về lỗi ${res.status}`);
      const data = (await res.json()) as ProductsResponse;
      return data.products;
    } catch {
      return rejectWithValue('Không kết nối được máy chủ');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    sortChanged(state, action: PayloadAction<SortKey>) {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
        state.query = action.meta.arg;                 // tham số đã truyền vào thunk
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        // Bỏ qua kết quả của request cũ (người dùng tìm liên tiếp nhiều lần)
        if (state.currentRequestId !== action.meta.requestId) return;
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) return;
        state.status = 'failed';
        state.error = action.payload ?? action.error.message ?? 'Lỗi không xác định';
      });
  },
});

export const { sortChanged } = productsSlice.actions;
export default productsSlice.reducer;

// ===== Selectors =====
export const selectProductsStatus = (s: RootState) => s.products.status;
export const selectProductsError = (s: RootState) => s.products.error;
export const selectProductsQuery = (s: RootState) => s.products.query;
export const selectSort = (s: RootState) => s.products.sort;
const selectProductItems = (s: RootState) => s.products.items;

export const selectSortedProducts = createSelector([selectProductItems, selectSort], (items, sort) => {
  if (sort === 'default') return items;
  const copy = [...items];                         // KHÔNG sort trực tiếp mảng trong state
  if (sort === 'price-asc') copy.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') copy.sort((a, b) => b.price - a.price);
  if (sort === 'rating') copy.sort((a, b) => b.rating - a.rating);
  return copy;
});
```

> 💡 **Race condition:** gõ "phone" rồi nhanh chóng gõ "laptop". Nếu request "phone" về sau, nó sẽ ghi đè kết quả "laptop". So sánh `requestId` giúp chỉ nhận kết quả của request **mới nhất**.
> ⚠️ `items.sort()` sửa mảng gốc — trong selector (ngoài Immer) sẽ làm hỏng state. Luôn sao chép `[...items]` trước.

### Bước 4 — cartSlice

`lib/features/cart/cartSlice.ts`:

```ts
import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { hydrate } from '@/lib/actions';
import type { RootState } from '@/lib/store';
import type { CartItem, CartProduct } from '@/types';

export type CartState = { items: CartItem[] };

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addedToCart(state, action: PayloadAction<CartProduct>) {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...action.payload, quantity: 1 });
    },
    quantityChanged(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((i) => i.id !== id);
        return;
      }
      const item = state.items.find((i) => i.id === id);
      if (item) item.quantity = Math.min(quantity, 99);
    },
    removedFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    cartCleared(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      if (action.payload.cart) state.items = action.payload.cart.items;
    });
  },
});

export const { addedToCart, quantityChanged, removedFromCart, cartCleared } = cartSlice.actions;
export default cartSlice.reducer;

// ===== Selectors =====
export const selectCartItems = (s: RootState) => s.cart.items;

export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((sum, i) => sum + i.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0)
);

// Selector nhận thêm tham số: số lượng của 1 sản phẩm trong giỏ (trả về number → an toàn)
export const selectQuantityInCart = (s: RootState, id: number): number =>
  s.cart.items.find((i) => i.id === id)?.quantity ?? 0;
```

### Bước 5 — Cập nhật store & persist

`lib/store.ts`:

```ts
import productsReducer from './features/products/productsSlice';
import cartReducer from './features/cart/cartSlice';
// ...
reducer: {
  counter: counterReducer,
  ui: uiReducer,
  todos: todosReducer,
  products: productsReducer,
  cart: cartReducer,
},
```

`lib/persist.ts`:

```ts
import type { CartState } from './features/cart/cartSlice';

export type PersistedState = {
  theme?: Theme;
  todos?: TodosState;
  cart?: CartState;
};

export function selectPersisted(state: RootState): PersistedState {
  return { theme: state.ui.theme, todos: state.todos, cart: state.cart };
}
```

> 💡 **Không** lưu `products` — đó là dữ liệu server, mỗi lần mở lại nên lấy mới.

### Bước 6 — Lấy chi tiết sản phẩm phía server

`lib/server/products.ts`:

```ts
import type { Product } from '@/types';

export async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`https://dummyjson.com/products/${id}`, { next: { revalidate: 60 } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Không tải được sản phẩm');
  return (await res.json()) as Product;
}
```

### Bước 7 — Nút "Thêm vào giỏ" (dùng chung)

`app/products/AddToCartButton.tsx`:

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addedToCart, selectQuantityInCart } from '@/lib/features/cart/cartSlice';
import type { CartProduct } from '@/types';

type Props = { product: CartProduct; className?: string };

export default function AddToCartButton({ product, className = '' }: Props) {
  const dispatch = useAppDispatch();
  const quantity = useAppSelector((s) => selectQuantityInCart(s, product.id));
  const [justAdded, setJustAdded] = useState<boolean>(false);

  useEffect(() => {
    if (!justAdded) return;
    const timer = setTimeout(() => setJustAdded(false), 1200);
    return () => clearTimeout(timer);
  }, [justAdded]);

  return (
    <button
      onClick={() => {
        dispatch(addedToCart(product));
        setJustAdded(true);
      }}
      className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition active:scale-95 ${
        justAdded ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
      } ${className}`}
    >
      {justAdded ? '✓ Đã thêm' : quantity > 0 ? `Thêm nữa (${quantity})` : 'Thêm vào giỏ'}
    </button>
  );
}
```

### Bước 8 — Danh sách sản phẩm (Client)

`app/products/ProductCard.tsx`:

```tsx
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';
import { formatUSD } from '@/lib/format';
import AddToCartButton from './AddToCartButton';

export default function ProductCard({ product }: { product: Product }) {
  const { id, title, price, thumbnail, rating, category } = product;

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
      <Link href={`/products/${id}`} className="relative block aspect-square bg-gray-100 dark:bg-gray-800">
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain p-4 transition duration-300 group-hover:scale-110"
        />
        <span className="absolute left-2 top-2 rounded bg-black/70 px-2 py-0.5 text-xs capitalize text-white">
          {category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link href={`/products/${id}`} className="line-clamp-2 font-semibold hover:text-blue-600">
          {title}
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-red-600">{formatUSD(price)}</span>
          <span className="text-sm text-amber-500">★ {rating.toFixed(1)}</span>
        </div>
        <AddToCartButton product={{ id, title, price, thumbnail }} className="mt-auto w-full" />
      </div>
    </div>
  );
}
```

> 💡 Không bọc cả card trong `<Link>` vì bên trong có nút — bấm nút sẽ bị chuyển trang. Chỉ ảnh và tiêu đề là link.
> 💡 `ProductCard` không có `'use client'` nhưng được import từ `ProductList` (client) nên cũng chạy ở client.

`app/products/ProductList.tsx`:

```tsx
'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  fetchProducts,
  selectProductsError,
  selectProductsQuery,
  selectProductsStatus,
  selectSort,
  selectSortedProducts,
  sortChanged,
  type SortKey,
} from '@/lib/features/products/productsSlice';
import ProductCard from './ProductCard';

const SORT_LABELS: Record<SortKey, string> = {
  default: 'Mặc định',
  'price-asc': 'Giá tăng dần',
  'price-desc': 'Giá giảm dần',
  rating: 'Đánh giá cao',
};

export default function ProductList() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectSortedProducts);
  const status = useAppSelector(selectProductsStatus);
  const error = useAppSelector(selectProductsError);
  const query = useAppSelector(selectProductsQuery);
  const sort = useAppSelector(selectSort);
  const [text, setText] = useState<string>(query);

  // Chỉ gọi API lần đầu; quay lại trang này sẽ dùng dữ liệu đã có trong store
  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts(''));
  }, [status, dispatch]);

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(fetchProducts(text.trim()));
  }

  return (
    <>
      {/* Thanh công cụ */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Tìm sản phẩm..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-64 dark:border-gray-700 dark:bg-gray-900"
          />
          <button className="rounded-lg bg-blue-600 px-4 font-semibold text-white hover:bg-blue-700">Tìm</button>
        </form>

        <select
          value={sort}
          onChange={(e) => dispatch(sortChanged(e.target.value as SortKey))}
          className="rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
        >
          {(Object.keys(SORT_LABELS) as SortKey[]).map((k) => (
            <option key={k} value={k}>{SORT_LABELS[k]}</option>
          ))}
        </select>
      </div>

      {/* Nội dung theo trạng thái */}
      {status === 'loading' && <ProductSkeleton />}

      {status === 'failed' && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950">
          <p className="font-semibold text-red-700 dark:text-red-400">{error}</p>
          <button
            onClick={() => dispatch(fetchProducts(query))}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Thử lại
          </button>
        </div>
      )}

      {status === 'succeeded' &&
        (products.length === 0 ? (
          <p className="py-20 text-center text-gray-500">Không tìm thấy sản phẩm nào cho “{query}”.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ))}
    </>
  );
}

function ProductSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
          <div className="aspect-square bg-gray-200 dark:bg-gray-800" />
          <div className="space-y-2 p-4">
            <div className="h-4 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-9 rounded bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
```

`app/products/page.tsx`:

```tsx
import type { Metadata } from 'next';
import ProductList from './ProductList';

export const metadata: Metadata = { title: 'Sản phẩm' };

export default function ProductsPage() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">🛍️ Sản phẩm</h1>
      <ProductList />
    </>
  );
}
```

### Bước 9 — Trang chi tiết: Server Component + nút Redux

`app/products/[id]/page.tsx`:

```tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/server/products';
import { formatUSD } from '@/lib/format';
import AddToCartButton from '../AddToCartButton';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  return { title: product?.title ?? 'Không tìm thấy' };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  const oldPrice = product.price / (1 - product.discountPercentage / 100);

  return (
    <div>
      <Link href="/products" className="text-sm text-blue-600 hover:underline">← Quay lại danh sách</Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square rounded-2xl bg-white dark:bg-gray-900">
          <Image src={product.thumbnail} alt={product.title} fill priority className="object-contain p-8" />
        </div>

        <div>
          <p className="text-sm uppercase tracking-wide text-gray-500">
            {product.brand ?? 'No brand'} · {product.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold">{product.title}</h1>
          <p className="mt-2 text-amber-500">★ {product.rating} / 5</p>

          <div className="mt-6 flex items-end gap-3">
            <span className="text-4xl font-extrabold text-red-600">{formatUSD(product.price)}</span>
            <span className="text-lg text-gray-400 line-through">{formatUSD(oldPrice)}</span>
            <span className="rounded bg-red-100 px-2 py-0.5 text-sm font-semibold text-red-600">
              -{Math.round(product.discountPercentage)}%
            </span>
          </div>

          <p className="mt-6 leading-relaxed text-gray-700 dark:text-gray-300">{product.description}</p>

          {/* Server Component render Client Component, chỉ truyền dữ liệu serialize được */}
          <AddToCartButton
            product={{ id: product.id, title: product.title, price: product.price, thumbnail: product.thumbnail }}
            className="mt-8 px-10 py-3 text-base"
          />
        </div>
      </div>
    </div>
  );
}
```

`app/products/[id]/not-found.tsx`:

```tsx
import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="py-20 text-center">
      <h2 className="text-2xl font-bold">Sản phẩm không tồn tại</h2>
      <Link href="/products" className="mt-4 inline-block text-blue-600 underline">Xem sản phẩm khác</Link>
    </div>
  );
}
```

> 💡 Đây là mô hình chuẩn: **dữ liệu sản phẩm** fetch trên server (tốt cho SEO — View Page Source thấy tên sản phẩm), **giỏ hàng** là state client trong Redux.

### Bước 10 — Badge giỏ hàng trên Navbar

`app/_components/CartBadge.tsx`:

```tsx
'use client';

import Link from 'next/link';
import { useAppSelector } from '@/lib/hooks';
import { selectCartCount } from '@/lib/features/cart/cartSlice';

export default function CartBadge() {
  const count = useAppSelector(selectCartCount);

  return (
    <Link href="/cart" className="relative rounded-lg p-2 text-lg transition hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Giỏ hàng">
      🛒
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  );
}
```

Trong `Navbar.tsx`, import và đặt `<CartBadge />` ngay trước nút đổi theme.

### Bước 11 — Trang giỏ hàng

`app/cart/CartView.tsx`:

```tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  cartCleared,
  quantityChanged,
  removedFromCart,
  selectCartCount,
  selectCartItems,
  selectCartTotal,
} from '@/lib/features/cart/cartSlice';
import { formatUSD } from '@/lib/format';

export default function CartView() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const count = useAppSelector(selectCartCount);
  const total = useAppSelector(selectCartTotal);

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-6xl">🛒</p>
        <p className="mt-4 text-gray-500">Giỏ hàng đang trống.</p>
        <Link href="/products" className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700">
          Mua sắm ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <ul className="divide-y divide-gray-200 rounded-2xl bg-white dark:divide-gray-800 dark:bg-gray-900">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-4 p-4">
            <div className="relative size-20 shrink-0 rounded-lg bg-gray-100 dark:bg-gray-800">
              <Image src={item.thumbnail} alt={item.title} fill sizes="80px" className="object-contain p-1" />
            </div>
            <div className="min-w-0 flex-1">
              <Link href={`/products/${item.id}`} className="line-clamp-1 font-semibold hover:text-blue-600">
                {item.title}
              </Link>
              <p className="text-sm text-gray-500">{formatUSD(item.price)}</p>
            </div>

            {/* Tăng giảm số lượng */}
            <div className="flex items-center rounded-lg border border-gray-300 dark:border-gray-700">
              <button
                onClick={() => dispatch(quantityChanged({ id: item.id, quantity: item.quantity - 1 }))}
                className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                −
              </button>
              <span className="w-8 text-center tabular-nums">{item.quantity}</span>
              <button
                onClick={() => dispatch(quantityChanged({ id: item.id, quantity: item.quantity + 1 }))}
                className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                +
              </button>
            </div>

            <p className="hidden w-24 text-right font-semibold sm:block">{formatUSD(item.price * item.quantity)}</p>
            <button onClick={() => dispatch(removedFromCart(item.id))} className="text-red-500 hover:text-red-700" aria-label="Xóa">
              ✕
            </button>
          </li>
        ))}
      </ul>

      <aside className="h-fit space-y-4 rounded-2xl bg-white p-6 lg:sticky lg:top-20 dark:bg-gray-900">
        <h2 className="text-lg font-bold">Tóm tắt đơn hàng</h2>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Số lượng</span>
          <span>{count} sản phẩm</span>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-4 text-xl font-bold dark:border-gray-800">
          <span>Tổng</span>
          <span className="text-red-600">{formatUSD(total)}</span>
        </div>
        <button className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700">Thanh toán</button>
        <button onClick={() => dispatch(cartCleared())} className="w-full text-sm text-gray-500 hover:text-red-600 hover:underline">
          Xóa toàn bộ giỏ hàng
        </button>
      </aside>
    </div>
  );
}
```

`app/cart/page.tsx`:

```tsx
import type { Metadata } from 'next';
import CartView from './CartView';

export const metadata: Metadata = { title: 'Giỏ hàng' };

export default function CartPage() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">🛒 Giỏ hàng</h1>
      <CartView />
    </>
  );
}
```

### Bước 12 — Kiểm tra

1. `/products` → skeleton → lưới sản phẩm. DevTools: `products/fetch/pending` → `products/fetch/fulfilled`.
2. Tìm "phone", đổi sắp xếp "Giá tăng dần" → thứ tự đổi, **không gọi lại API**.
3. Vào chi tiết rồi bấm "Quay lại" → danh sách hiện ngay, không skeleton (dữ liệu đã có trong store).
4. Tắt mạng (F12 → Network → Offline) → bấm Tìm → hiện lỗi + nút "Thử lại".
5. Thêm sản phẩm vào giỏ từ danh sách **và** từ trang chi tiết → badge tăng.
6. `/cart`: tăng/giảm số lượng, giảm về 0 → tự xóa, tổng tiền đúng.
7. F5 → giỏ hàng vẫn còn; danh sách sản phẩm được tải lại.
8. View Page Source của `/products/1` → thấy tên sản phẩm trong HTML.

### ✅ Checklist Bài 4

- [ ] `next.config.ts` có `remotePatterns` cho `cdn.dummyjson.com`.
- [ ] `fetchProducts` khai báo đủ 3 kiểu generic `<Product[], string, { rejectValue: string }>`.
- [ ] Xử lý đủ `pending / fulfilled / rejected`, có `status` 4 giá trị.
- [ ] Có kiểm tra `requestId` để chống race condition.
- [ ] Giao diện có đủ 4 trạng thái: loading (skeleton), lỗi (nút thử lại), rỗng, có dữ liệu.
- [ ] Sắp xếp dùng `createSelector` và sao chép mảng trước khi `sort`.
- [ ] Trang chi tiết là Server Component: `await params`, `notFound()`, `generateMetadata`.
- [ ] `AddToCartButton` (client) nhận props chỉ gồm dữ liệu serialize được.
- [ ] `cartSlice`: thêm (cộng dồn), đổi số lượng (≤0 thì xóa), xóa, xóa hết; selector đếm & tổng tiền.
- [ ] Badge giỏ hàng cập nhật ngay trên mọi trang; giỏ hàng lưu localStorage, products **không** lưu.
- [ ] Bố cục responsive: 2 → 3 → 4 cột; trang giỏ hàng 1 cột trên mobile, 2 cột từ `lg`.

**⭐ Mở rộng:**
1. Thêm lọc theo danh mục: thunk `fetchCategories` (`/products/category-list`) + `<select>`.
2. Phân trang "Tải thêm": thêm `skip`, thunk `fetchMoreProducts` nối vào `items`.
3. Dùng option `condition` của `createAsyncThunk` để không gọi lại khi đang `loading` cùng từ khóa.

---

## Bài 5: Notes CRUD full-stack với Route Handlers + RTK Query

**🎯 Mục tiêu:** Viết REST API ngay trong Next.js bằng Route Handlers (lưu file JSON), phía client dùng **RTK Query** để đọc/thêm/sửa/xóa, tự cache & refetch bằng tags, thêm **optimistic update** khi xóa.

**📚 Kiến thức áp dụng:** A6, C9.

> Dữ liệu lưu ở `data/notes.json` (thay json-server). Thực tế dùng database (MongoDB, PostgreSQL + Prisma…).

### Bước 1 — Cấu trúc & kiểu dữ liệu

```
data/notes.json
types/index.ts                → Note, NoteInput, NoteUpdate
lib/server/notes.ts           → đọc/ghi file (chỉ chạy server)
lib/features/notes/notesApi.ts → RTK Query
lib/errors.ts                 → lấy thông báo lỗi
app/api/notes/route.ts        → GET, POST
app/api/notes/[id]/route.ts   → GET, PUT, DELETE
app/notes/
├── page.tsx                  (Server – metadata)
├── NotesBoard.tsx            (client)
├── NoteForm.tsx              (client)
└── NoteCard.tsx              (client)
```

Thêm vào `types/index.ts`:

```ts
export type Note = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export type NoteInput = Pick<Note, 'title' | 'content'>;
export type NoteUpdate = Partial<NoteInput>;
```

`data/notes.json`:

```json
[
  { "id": 1, "title": "Học Next.js", "content": "App Router, Server Component", "createdAt": "2026-11-01T08:00:00.000Z" },
  { "id": 2, "title": "Học Redux Toolkit", "content": "createSlice, createAsyncThunk, RTK Query", "createdAt": "2026-11-02T08:00:00.000Z" }
]
```

### Bước 2 — Lớp truy cập dữ liệu (server)

`lib/server/notes.ts`:

```ts
import { promises as fs } from 'fs';
import path from 'path';
import type { Note, NoteInput, NoteUpdate } from '@/types';

const FILE = path.join(process.cwd(), 'data', 'notes.json');

async function readAll(): Promise<Note[]> {
  const raw = await fs.readFile(FILE, 'utf-8');
  return JSON.parse(raw) as Note[];
}

async function writeAll(notes: Note[]): Promise<void> {
  await fs.writeFile(FILE, JSON.stringify(notes, null, 2));
}

export async function getNotes(): Promise<Note[]> {
  const notes = await readAll();
  return notes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getNote(id: number): Promise<Note | null> {
  const notes = await readAll();
  return notes.find((n) => n.id === id) ?? null;
}

export async function createNote(input: NoteInput): Promise<Note> {
  const notes = await readAll();
  const note: Note = { id: Date.now(), ...input, createdAt: new Date().toISOString() };
  notes.push(note);
  await writeAll(notes);
  return note;
}

export async function updateNote(id: number, data: NoteUpdate): Promise<Note | null> {
  const notes = await readAll();
  const idx = notes.findIndex((n) => n.id === id);
  if (idx === -1) return null;
  notes[idx] = { ...notes[idx], ...data };
  await writeAll(notes);
  return notes[idx];
}

export async function deleteNote(id: number): Promise<boolean> {
  const notes = await readAll();
  const filtered = notes.filter((n) => n.id !== id);
  if (filtered.length === notes.length) return false;
  await writeAll(filtered);
  return true;
}
```

> ⚠️ `fs` chỉ dùng được trên server. **Không** import file này vào Client Component hay slice.

### Bước 3 — Route Handlers

`app/api/notes/route.ts`:

```ts
import { createNote, getNotes } from '@/lib/server/notes';
import type { NoteInput } from '@/types';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms)); // giả lập mạng chậm

// GET /api/notes
export async function GET() {
  const notes = await getNotes();
  return Response.json(notes);
}

// POST /api/notes   body: { title, content }
export async function POST(request: Request) {
  const body = (await request.json()) as Partial<NoteInput>;
  const title = body.title?.trim() ?? '';

  if (!title) return Response.json({ error: 'Tiêu đề không được để trống' }, { status: 400 });
  if (title.length > 100) return Response.json({ error: 'Tiêu đề tối đa 100 ký tự' }, { status: 400 });

  await delay(600);
  const note = await createNote({ title, content: body.content?.trim() ?? '' });
  return Response.json(note, { status: 201 });
}
```

`app/api/notes/[id]/route.ts`:

```ts
import { deleteNote, getNote, updateNote } from '@/lib/server/notes';
import type { NoteUpdate } from '@/types';

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Context) {
  const { id } = await params;
  const note = await getNote(Number(id));
  if (!note) return Response.json({ error: 'Không tìm thấy ghi chú' }, { status: 404 });
  return Response.json(note);
}

export async function PUT(request: Request, { params }: Context) {
  const { id } = await params;
  const body = (await request.json()) as NoteUpdate;
  if (body.title !== undefined && !body.title.trim()) {
    return Response.json({ error: 'Tiêu đề không được để trống' }, { status: 400 });
  }
  const note = await updateNote(Number(id), body);
  if (!note) return Response.json({ error: 'Không tìm thấy ghi chú' }, { status: 404 });
  return Response.json(note);
}

export async function DELETE(_request: Request, { params }: Context) {
  const { id } = await params;
  const ok = await deleteNote(Number(id));
  if (!ok) return Response.json({ error: 'Không tìm thấy ghi chú' }, { status: 404 });
  return new Response(null, { status: 204 });
}
```

**Test API** bằng Postman / Thunder Client trước khi làm giao diện:

| Method | URL | Body | Mong đợi |
|---|---|---|---|
| GET | `http://localhost:3000/api/notes` | – | 200, mảng notes |
| POST | `/api/notes` | `{"title":"Test","content":"abc"}` | 201 |
| POST | `/api/notes` | `{"title":""}` | 400 |
| PUT | `/api/notes/1` | `{"title":"Đã sửa"}` | 200 |
| DELETE | `/api/notes/1` | – | 204 |
| GET | `/api/notes/999` | – | 404 |

### Bước 4 — Tạo API slice bằng RTK Query

`lib/features/notes/notesApi.ts`:

```ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Note, NoteInput, NoteUpdate } from '@/types';

export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Note'],
  endpoints: (build) => ({
    // GET /api/notes
    getNotes: build.query<Note[], void>({
      query: () => '/notes',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Note' as const, id })), { type: 'Note' as const, id: 'LIST' }]
          : [{ type: 'Note' as const, id: 'LIST' }],
    }),

    // POST /api/notes
    addNote: build.mutation<Note, NoteInput>({
      query: (body) => ({ url: '/notes', method: 'POST', body }),
      invalidatesTags: [{ type: 'Note', id: 'LIST' }],
    }),

    // PUT /api/notes/:id
    updateNote: build.mutation<Note, { id: number } & NoteUpdate>({
      query: ({ id, ...patch }) => ({ url: `/notes/${id}`, method: 'PUT', body: patch }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Note', id }],
    }),

    // DELETE /api/notes/:id – có optimistic update
    deleteNote: build.mutation<void, number>({
      query: (id) => ({ url: `/notes/${id}`, method: 'DELETE' }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // 1) Xóa ngay trên giao diện (trong cache)
        const patch = dispatch(
          notesApi.util.updateQueryData('getNotes', undefined, (draft) =>
            draft.filter((n) => n.id !== id)
          )
        );
        try {
          await queryFulfilled;      // 2) Đợi server xác nhận
        } catch {
          patch.undo();              // 3) Lỗi → khôi phục lại
        }
      },
      invalidatesTags: (_result, _error, id) => [{ type: 'Note', id }],
    }),
  }),
});

export const { useGetNotesQuery, useAddNoteMutation, useUpdateNoteMutation, useDeleteNoteMutation } = notesApi;
```

| Khái niệm | Ý nghĩa |
|---|---|
| `build.query<Kết quả, Tham số>` | Đọc dữ liệu → sinh hook `useGetNotesQuery` |
| `build.mutation<Kết quả, Tham số>` | Thay đổi dữ liệu → sinh hook `useAddNoteMutation` |
| `providesTags` | Đánh dấu "cache này chứa Note id=1, id=2, LIST" |
| `invalidatesTags` | "Note LIST đã cũ" → mọi query cung cấp tag đó tự refetch |
| `onQueryStarted` + `updateQueryData` | Sửa cache ngay lập tức (optimistic), `undo()` nếu lỗi |

### Bước 5 — Gắn RTK Query vào store

`lib/store.ts` (hoàn chỉnh):

```ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import uiReducer from './features/ui/uiSlice';
import todosReducer from './features/todos/todosSlice';
import productsReducer from './features/products/productsSlice';
import cartReducer from './features/cart/cartSlice';
import { notesApi } from './features/notes/notesApi';

export const makeStore = () =>
  configureStore({
    reducer: {
      counter: counterReducer,
      ui: uiReducer,
      todos: todosReducer,
      products: productsReducer,
      cart: cartReducer,
      [notesApi.reducerPath]: notesApi.reducer,      // cache của RTK Query
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(notesApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
```

> ⚠️ Quên `.concat(notesApi.middleware)` → cache, refetch, tags **không hoạt động** và console cảnh báo.

### Bước 6 — Hàm lấy thông báo lỗi

`lib/errors.ts`:

```ts
// Lỗi từ .unwrap() của RTK Query có dạng { status, data } hoặc { message }
export function getErrorMessage(err: unknown): string {
  if (typeof err === 'object' && err !== null) {
    if ('data' in err) {
      const data = (err as { data?: { error?: string } }).data;
      if (data?.error) return data.error;
    }
    if ('message' in err && typeof (err as { message: unknown }).message === 'string') {
      return (err as { message: string }).message;
    }
  }
  return 'Đã xảy ra lỗi, vui lòng thử lại';
}
```

### Bước 7 — Form thêm ghi chú

`app/notes/NoteForm.tsx`:

```tsx
'use client';

import { useState, type FormEvent } from 'react';
import { useAddNoteMutation } from '@/lib/features/notes/notesApi';
import { getErrorMessage } from '@/lib/errors';

export default function NoteForm() {
  const [addNote, { isLoading }] = useAddNoteMutation();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) {
      setError('Vui lòng nhập tiêu đề');
      return;
    }
    try {
      await addNote({ title: title.trim(), content: content.trim() }).unwrap(); // unwrap: lỗi → throw
      setTitle('');
      setContent('');
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  const inputClass =
    'w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800';

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl bg-white p-5 shadow dark:bg-gray-900">
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tiêu đề" className={inputClass} />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        placeholder="Nội dung..."
        className={`${inputClass} resize-none`}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? 'Đang lưu...' : '+ Thêm ghi chú'}
      </button>
    </form>
  );
}
```

### Bước 8 — Thẻ ghi chú: sửa & xóa

`app/notes/NoteCard.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { useDeleteNoteMutation, useUpdateNoteMutation } from '@/lib/features/notes/notesApi';
import { getErrorMessage } from '@/lib/errors';
import type { Note } from '@/types';

type Props = { note: Note; color: string };

export default function NoteCard({ note, color }: Props) {
  const [updateNote, { isLoading: saving }] = useUpdateNoteMutation();
  const [deleteNote, { isLoading: deleting }] = useDeleteNoteMutation();
  const [editing, setEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(note.title);
  const [content, setContent] = useState<string>(note.content);

  async function handleSave() {
    try {
      await updateNote({ id: note.id, title, content }).unwrap();
      setEditing(false);
    } catch (err) {
      alert(getErrorMessage(err));
    }
  }

  function handleDelete() {
    if (confirm(`Xóa ghi chú "${note.title}"?`)) deleteNote(note.id);
  }

  if (editing) {
    return (
      <article className={`flex flex-col gap-2 rounded-xl p-4 shadow-md ring-2 ring-blue-500 ${color}`}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="rounded bg-white/70 px-2 py-1 font-bold text-gray-800 focus:outline-none" />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={4} className="resize-none rounded bg-white/70 px-2 py-1 text-sm text-gray-800 focus:outline-none" />
        <div className="flex justify-end gap-2 text-sm">
          <button onClick={() => { setEditing(false); setTitle(note.title); setContent(note.content); }} className="rounded px-3 py-1 text-gray-600 hover:bg-white/60">
            Hủy
          </button>
          <button onClick={handleSave} disabled={saving} className="rounded bg-blue-600 px-3 py-1 font-semibold text-white hover:bg-blue-700 disabled:opacity-50">
            {saving ? 'Đang lưu...' : 'Lưu'}
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className={`group flex flex-col rounded-xl p-4 text-gray-800 shadow-sm transition hover:-rotate-1 hover:shadow-md ${color} ${deleting ? 'opacity-50' : ''}`}>
      <h2 className="font-bold">{note.title}</h2>
      <p className="mt-2 flex-1 whitespace-pre-line text-sm">{note.content}</p>
      <div className="mt-4 flex items-center justify-between">
        <time className="text-xs text-gray-500">{new Date(note.createdAt).toLocaleDateString('vi-VN')}</time>
        <div className="flex gap-3 text-sm opacity-0 transition group-hover:opacity-100">
          <button onClick={() => setEditing(true)} className="text-blue-600 hover:underline">Sửa</button>
          <button onClick={handleDelete} className="text-red-500 hover:underline">Xóa</button>
        </div>
      </div>
    </article>
  );
}
```

### Bước 9 — Bảng ghi chú & trang Notes

`app/notes/NotesBoard.tsx`:

```tsx
'use client';

import { useGetNotesQuery } from '@/lib/features/notes/notesApi';
import NoteForm from './NoteForm';
import NoteCard from './NoteCard';

// Liệt kê ĐẦY ĐỦ tên class để Tailwind quét được
const COLORS: string[] = ['bg-yellow-100', 'bg-green-100', 'bg-blue-100', 'bg-pink-100', 'bg-purple-100'];

export default function NotesBoard() {
  const { data: notes = [], isLoading, isFetching, isError, refetch } = useGetNotesQuery();

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <h1 className="mb-4 flex items-center gap-2 text-2xl font-bold">
          🗒️ Ghi chú ({notes.length})
          {isFetching && !isLoading && <span className="text-xs font-normal text-gray-400">đang đồng bộ…</span>}
        </h1>
        <NoteForm />
      </aside>

      <section>
        {isLoading && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-36 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
            ))}
          </div>
        )}

        {isError && (
          <div className="rounded-xl bg-red-50 p-6 text-center text-red-700 dark:bg-red-950 dark:text-red-400">
            Không tải được ghi chú.
            <button onClick={() => refetch()} className="ml-2 underline">Thử lại</button>
          </div>
        )}

        {!isLoading && !isError && (
          notes.length === 0 ? (
            <p className="text-gray-500">Chưa có ghi chú nào.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {notes.map((note, i) => (
                <NoteCard key={note.id} note={note} color={COLORS[i % COLORS.length]} />
              ))}
            </div>
          )
        )}
      </section>
    </div>
  );
}
```

> 💡 `isLoading`: lần tải **đầu tiên** (chưa có dữ liệu). `isFetching`: **bất kỳ** lần gọi nào, kể cả refetch sau mutation.

`app/notes/page.tsx`:

```tsx
import type { Metadata } from 'next';
import NotesBoard from './NotesBoard';

export const metadata: Metadata = { title: 'Ghi chú' };

export default function NotesPage() {
  return <NotesBoard />;
}
```

### Bước 10 — Kiểm tra

1. `/notes` → skeleton → 2 note mẫu. Redux DevTools: `notesApi/executeQuery/pending` → `fulfilled`.
2. Bấm Thêm khi để trống → lỗi đỏ (client). Gửi tiêu đề 101 ký tự → lỗi từ server (400).
3. Thêm note hợp lệ → nút "Đang lưu..." → note mới xuất hiện (DevTools thấy `getNotes` tự chạy lại nhờ tag LIST).
4. Hover → Sửa → Lưu → nội dung cập nhật.
5. Xóa → note biến mất **ngay lập tức** (optimistic). Thử tắt dev server rồi xóa → note hiện lại (undo).
6. Rời `/notes` sang trang khác rồi quay lại trong vòng 60 giây → dữ liệu hiện ngay từ cache.
7. Mở `data/notes.json` → dữ liệu khớp giao diện.
8. Chạy `npm run build` → build thành công, không lỗi TypeScript.

### ✅ Checklist Bài 5

- [ ] Route Handlers đủ 5 thao tác: GET all, POST, GET one, PUT, DELETE; trả đúng mã 200/201/204/400/404.
- [ ] `params` trong Route Handler được khai báo `Promise<{ id: string }>` và `await`.
- [ ] Code dùng `fs` chỉ nằm trong `lib/server/` và được gọi từ Route Handler.
- [ ] `notesApi` có `reducerPath`, `baseQuery`, `tagTypes`, 1 query + 3 mutation, kiểu generic đầy đủ.
- [ ] Store đã thêm `[notesApi.reducerPath]` **và** `notesApi.middleware`.
- [ ] Thêm note → danh sách tự cập nhật mà không gọi `refetch()` thủ công.
- [ ] Dùng `.unwrap()` + `try/catch` để hiển thị lỗi từ server.
- [ ] Xóa dùng optimistic update và hoàn tác khi lỗi.
- [ ] Phân biệt hiển thị `isLoading` (skeleton) và `isFetching` (chữ "đang đồng bộ").
- [ ] Màu note lấy từ mảng chứa tên class đầy đủ.

**⭐ Mở rộng:**
1. Thêm ô tìm kiếm: endpoint `getNotes` nhận tham số `string` → `/notes?q=...`, Route Handler đọc `request.nextUrl.searchParams` (dùng `NextRequest`).
2. Validate dữ liệu ở Route Handler bằng **zod**.
3. So sánh: viết lại bài này bằng `createAsyncThunk` + slice, đếm số dòng code chênh lệch.
4. Thay file JSON bằng MongoDB (`mongoose`) hoặc SQLite (`prisma`).

> ⚠️ Ghi file JSON chỉ chạy được ở local. Khi deploy lên Vercel, hệ thống file chỉ đọc → phải dùng database.

---

# Phần E — Checklist tổng

Đánh dấu trước khi nộp bài.

### Cấu trúc & TypeScript
- [ ] Kiểu dùng chung nằm trong `types/index.ts`, dùng `import type`.
- [ ] Không có `any` tự viết (trừ chỗ ép kiểu `as` có chủ đích sau `JSON.parse` / `res.json()`).
- [ ] File có JSX dùng `.tsx`, không có JSX dùng `.ts`.
- [ ] `npx tsc --noEmit` và `npm run lint` không lỗi.
- [ ] `npm run build` thành công.

### Next.js
- [ ] `page.tsx` là Server Component, export `metadata`; tương tác tách sang file `'use client'`.
- [ ] Dùng `<Link>` cho link nội bộ, import điều hướng từ `next/navigation`.
- [ ] Dynamic route và Route Handler `await params`.
- [ ] Có `not-found.tsx`; ảnh ngoài khai báo `remotePatterns`.
- [ ] Code dùng `fs` không bị import vào Client Component.

### Redux Toolkit
- [ ] Store tạo bằng `makeStore()` trong `StoreProvider` + `useRef`, không có store toàn cục.
- [ ] Chỉ dùng `useAppDispatch` / `useAppSelector` (typed hooks).
- [ ] Mỗi tính năng là 1 slice riêng trong `lib/features/`; reducer là hàm thuần.
- [ ] Action có payload dùng `PayloadAction<T>`; giá trị ngẫu nhiên/thời gian tạo trong `prepare`.
- [ ] Selector trả về object/mảng mới đều dùng `createSelector`.
- [ ] State chỉ chứa dữ liệu serialize được (không `Date`, function, class).
- [ ] Async: `createAsyncThunk` có xử lý đủ 3 trạng thái; CRUD dùng RTK Query với tags.
- [ ] Không đọc `localStorage` khi khởi tạo store; khôi phục bằng action `hydrate` sau mount.
- [ ] State cục bộ (input, editing) vẫn dùng `useState`.

### Tailwind CSS
- [ ] Mobile-first: class gốc cho mobile, `md:`/`lg:` cho màn hình lớn.
- [ ] Có trạng thái `hover:`, `focus:`, `disabled:`, `active:` cho nút/ô nhập.
- [ ] Dark mode hoạt động ở mọi trang.
- [ ] Không ghép tên class động bằng template string.

### Redux DevTools
- [ ] Thấy đủ các action: `counter/*`, `ui/*`, `todos/*`, `products/fetch/*`, `cart/*`, `notesApi/*`, `app/hydrate`.
- [ ] State tree có 6 nhánh: `counter`, `ui`, `todos`, `products`, `cart`, `notesApi`.

---

# Phần F — Lỗi thường gặp & cách sửa

| Lỗi | Nguyên nhân | Cách sửa |
|---|---|---|
| `could not find react-redux context value; please ensure the component is wrapped in a <Provider>` | Component dùng hook Redux nằm ngoài `StoreProvider` | Bọc `StoreProvider` trong `app/layout.tsx`, đặt component bên trong |
| `createContext only works in Client Components` / `useSelector is not a function` | Gọi `useAppSelector` trong Server Component | Thêm `'use client'`, hoặc tách phần đó thành component riêng |
| `Hydration failed because the server rendered HTML didn't match the client` | Đọc `localStorage` trong `initialState`, hoặc `Date.now()` khi render | Khôi phục bằng `dispatch(hydrate())` trong `useEffect` |
| Dữ liệu người dùng này lẫn sang người dùng khác (khi deploy) | Export `store` toàn cục | Dùng `makeStore()` + `useRef` trong `StoreProvider` |
| `Selector unknown returned a different result when called with the same parameters` | Selector trả object/mảng mới mỗi lần | Dùng `createSelector` hoặc tách nhiều `useAppSelector` |
| `A non-serializable value was detected in the state` | Lưu `Date`, `Map`, function vào state | Lưu chuỗi ISO / object thường |
| `[Immer] An immer producer returned a new value *and* modified its draft` | Vừa sửa `state` vừa `return` | Chọn một trong hai |
| `Cannot assign to read only property '0' of object` | `.sort()` trực tiếp mảng lấy từ state (ngoài reducer) | Sao chép `[...items].sort()` |
| `Property 'todos' does not exist on type ...` khi gọi `state.todos` | Chưa thêm reducer vào `makeStore` | Thêm `todos: todosReducer` vào `reducer` |
| Kết quả tìm kiếm cũ ghi đè kết quả mới | Race condition giữa nhiều request | So sánh `action.meta.requestId` |
| `Warning: Middleware for RTK-Query API at reducerPath "notesApi" has not been added to the store` | Quên middleware RTK Query | `.concat(notesApi.middleware)` |
| Thêm note xong danh sách không cập nhật | Thiếu `providesTags` / `invalidatesTags` | Khai báo tag khớp nhau (`Note`, `LIST`) |
| `Module not found: Can't resolve 'fs'` | Import `lib/server/notes.ts` vào client | Chỉ gọi từ Route Handler / Server Component |
| `Invalid src prop ... hostname is not configured` | Ảnh ngoài chưa khai báo | Thêm `remotePatterns`, restart dev server |
| Class Tailwind không có hiệu lực | Ghép chuỗi động (`bg-${c}-100`) | Dùng tên class đầy đủ trong mảng/`Record` |
| Dark mode không đổi | Thiếu `@custom-variant dark` hoặc `ThemeSync` | Kiểm tra `globals.css` và `<html class="dark">` trong Elements |
| `useRouter` báo "NextRouter was not mounted" | Import từ `next/router` | Import từ `next/navigation` |

---

# Phần G — Câu hỏi ôn tập

1. Vì sao trong Next.js không nên `export const store = configureStore(...)` như trong React + Vite?
2. `StoreProvider` dùng `useRef` để làm gì? Nếu bỏ `useRef` và gọi `makeStore()` trực tiếp trong thân component thì chuyện gì xảy ra?
3. Server Component có đọc được Redux store không? Vì sao? Làm sao để trang chi tiết sản phẩm (Server) vẫn có nút "Thêm vào giỏ" dùng Redux?
4. Vì sao counter giữ nguyên giá trị khi chuyển từ `/counter` sang `/` rồi quay lại, nhưng mất khi F5?
5. Kể 5 loại state và nơi nên đặt mỗi loại (useState, URL, Server Component, Redux slice, RTK Query).
6. `prepare` callback trong `createSlice` dùng để làm gì? Vì sao không gọi `nanoid()` trong reducer?
7. `createAction` + `extraReducers` giải quyết bài toán gì trong Bài 2–4?
8. Giải thích nguyên nhân lỗi Hydration khi đọc localStorage trong `initialState` và cách khắc phục.
9. `createAsyncThunk` sinh ra những action nào? Vai trò của `rejectWithValue` và `action.meta.requestId`?
10. Khi nào cần `createSelector`? Cho ví dụ selector viết sai gây re-render thừa.
11. Vì sao trong selector phải viết `[...items].sort()` thay vì `items.sort()`?
12. So sánh `createAsyncThunk` và RTK Query. `providesTags` / `invalidatesTags` hoạt động thế nào?
13. Phân biệt `isLoading` và `isFetching` của RTK Query.
14. Optimistic update là gì? Viết lại đoạn `onQueryStarted` của `deleteNote` và giải thích `patch.undo()`.
15. Nguyên tắc *mobile-first* của Tailwind; vì sao `` className={`bg-${color}-100`} `` không hoạt động?

---

## Tài liệu tham khảo

- Next.js Docs: https://nextjs.org/docs
- Redux Toolkit + Next.js: https://redux.js.org/usage/nextjs
- Redux Toolkit TypeScript: https://redux-toolkit.js.org/usage/usage-with-typescript
- RTK Query: https://redux-toolkit.js.org/rtk-query/overview
- Tailwind CSS Docs: https://tailwindcss.com/docs
- DummyJSON API: https://dummyjson.com/docs/products
