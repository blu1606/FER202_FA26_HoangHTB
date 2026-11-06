import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import ProtectedRoute from './components/ProtectedRoute';
import CarListPage from './pages/CarListPage';
import CarDetailPage from './pages/CarDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminUserPage from './pages/admin/AdminUserPage';
import ForbiddenPage from './pages/ForbiddenPage';
import NotFoundPage from './pages/NotFoundPage';

/** Bảng route – CÓ SẴN, KHÔNG sửa file này */
export default function App() {
  return (
    <>
      <AppNavbar />
      <Container className="py-4">
        <Routes>
          {/* Trang chủ: CHỈ hiển thị Navbar, KHÔNG tải danh sách xe */}
          <Route path="/" element={null} />
          <Route path="/cars" element={<CarListPage />} />
          <Route path="/cars/:id" element={<CarDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute roles={['admin']}>
                <AdminUserPage />
              </ProtectedRoute>
            }
          />
          <Route path="/403" element={<ForbiddenPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </>
  );
}
