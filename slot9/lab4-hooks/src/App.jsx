import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

import QuantityPicker from './components/QuantityPicker';
import MiniCart from './components/MiniCart';
import ProfilePreview from './components/ProfilePreview';
import ProductFilter from './components/ProductFilter';
import RegisterForm from './components/RegisterForm';
import ValidatedRegisterForm from './components/ValidatedRegisterForm';
import TodoList from './components/TodoList';
import CartDemoPage from './pages/CartDemoPage';
import LoginForm from './components/LoginForm';
import ThemeAuthDemoPage from './pages/ThemeAuthDemoPage';
import MiniStoreApp from './pages/MiniStoreApp';

import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { products } from './data/products';

const EXERCISES = [
  { id: 1, title: 'Bài 1: useState Cơ bản', desc: 'QuantityPicker & MiniCart' },
  { id: 2, title: 'Bài 2: Controlled Input', desc: 'ProfilePreview & Live Preview' },
  { id: 3, title: 'Bài 3: Tìm kiếm & Lọc', desc: 'ProductFilter & Derived State' },
  { id: 4, title: 'Bài 4: Form Đăng ký', desc: 'State Object & handleChange' },
  { id: 5, title: 'Bài 5: Validation Form', desc: 'Touched, Errors & Regex' },
  { id: 6, title: 'Bài 6: Todo List', desc: 'Array State & Key Events' },
  { id: 7, title: 'Bài 7: useReducer Giỏ hàng', desc: 'cartReducer & CartSummary' },
  { id: 8, title: 'Bài 8: useReducer Đăng nhập', desc: 'loginReducer & Fake API' },
  { id: 9, title: 'Bài 9: useContext Theme/Auth', desc: 'ThemeProvider & AuthProvider' },
  { id: 10, title: 'Bài 10: Cửa hàng Mini Tổng hợp', desc: 'Full Shop, Cart & Checkout' },
];

function AppContent() {
  const [currentTab, setCurrentTab] = useState(1);
  const { theme, toggleTheme } = useTheme();

  return (
    <div data-bs-theme={theme} className="bg-body text-body min-vh-100">
      <Navbar bg={theme === 'dark' ? 'dark' : 'primary'} variant="dark" expand="lg" className="shadow-sm mb-4">
        <Container fluid="lg">
          <Navbar.Brand className="fw-bold d-flex align-items-center gap-2">
            <span className="badge bg-warning text-dark">FER202</span>
            <span>BTVN Lab 4: React Hooks</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="lab4-nav" />
          <Navbar.Collapse id="lab4-nav">
            <Nav className="ms-auto flex-wrap gap-1 align-items-center">
              {EXERCISES.map((ex) => (
                <Nav.Link
                  key={ex.id}
                  id={`tab-btn-${ex.id}`}
                  active={currentTab === ex.id}
                  onClick={() => setCurrentTab(ex.id)}
                  className="rounded px-2 py-1 small"
                >
                  {`Bài ${ex.id}`}
                </Nav.Link>
              ))}
              <Button
                size="sm"
                variant="outline-light"
                className="ms-lg-2"
                onClick={toggleTheme}
                title="Đổi giao diện Sáng / Tối"
              >
                {theme === 'light' ? '🌙 Tối' : '☀️ Sáng'}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid="lg" className="pb-5">
        <div className="mb-4 d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <h3 className="fw-bold mb-1">
              {EXERCISES.find((e) => e.id === currentTab)?.title}
            </h3>
            <p className="text-secondary mb-0">
              {EXERCISES.find((e) => e.id === currentTab)?.desc}
            </p>
          </div>
          <Badge bg="info" className="p-2 fs-6">
            React 19 + React-Bootstrap 2.10
          </Badge>
        </div>

        {/* Tab 1: Bài 1 */}
        {currentTab === 1 && (
          <div id="exercise-1" className="d-flex flex-column gap-4">
            <Card className="shadow-sm border-0">
              <Card.Header className="py-3">
                <h5 className="mb-0 fw-bold text-primary">Phần 1. Bộ chọn số lượng (QuantityPicker)</h5>
              </Card.Header>
              <Card.Body>
                <p className="text-secondary mb-3">
                  Min = 1, Max = 10 (mặc định) và ví dụ Min = 2, Max = 5 hoạt động với state độc lập.
                  Thử nút <code>+3 (sai)</code> và <code>+3 (đúng)</code> để kiểm tra cơ chế functional update:
                </p>
                <div className="d-flex flex-column gap-3">
                  <div>
                    <span className="fw-semibold d-block mb-2">Bộ chọn 1 (min: 1, max: 10):</span>
                    <QuantityPicker />
                  </div>
                  <hr className="my-2" />
                  <div>
                    <span className="fw-semibold d-block mb-2">Bộ chọn 2 (min: 2, max: 5):</span>
                    <QuantityPicker min={2} max={5} />
                  </div>
                </div>
              </Card.Body>
            </Card>

            <Card className="shadow-sm border-0">
              <Card.Header className="py-3">
                <h5 className="mb-0 fw-bold text-primary">Phần 2. Giỏ hàng mini (MiniCart)</h5>
              </Card.Header>
              <Card.Body>
                <p className="text-secondary mb-3">
                  State là một mảng object. Cập nhật bất biến bằng <code>map</code> + spread, tính tổng bằng <code>reduce</code>:
                </p>
                <MiniCart />
              </Card.Body>
            </Card>
          </div>
        )}

        {/* Tab 2: Bài 2 */}
        {currentTab === 2 && (
          <div id="exercise-2">
            <ProfilePreview />
          </div>
        )}

        {/* Tab 3: Bài 3 */}
        {currentTab === 3 && (
          <div id="exercise-3">
            <ProductFilter products={products} />
          </div>
        )}

        {/* Tab 4: Bài 4 */}
        {currentTab === 4 && (
          <div id="exercise-4">
            <RegisterForm />
          </div>
        )}

        {/* Tab 5: Bài 5 */}
        {currentTab === 5 && (
          <div id="exercise-5">
            <ValidatedRegisterForm />
          </div>
        )}

        {/* Tab 6: Bài 6 */}
        {currentTab === 6 && (
          <div id="exercise-6">
            <TodoList />
          </div>
        )}

        {/* Tab 7: Bài 7 */}
        {currentTab === 7 && (
          <div id="exercise-7">
            <CartDemoPage />
          </div>
        )}

        {/* Tab 8: Bài 8 */}
        {currentTab === 8 && (
          <div id="exercise-8">
            <LoginForm />
          </div>
        )}

        {/* Tab 9: Bài 9 */}
        {currentTab === 9 && (
          <div id="exercise-9">
            <ThemeAuthDemoPage />
          </div>
        )}

        {/* Tab 10: Bài 10 */}
        {currentTab === 10 && (
          <div id="exercise-10">
            <MiniStoreApp />
          </div>
        )}
      </Container>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
