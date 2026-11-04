import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import ProtectedRoute from './components/ProtectedRoute';
import DishListPage from './pages/DishListPage';
import DishDetailPage from './pages/DishDetailPage';
import CartPage from './pages/CartPage';
import ReservationPage from './pages/ReservationPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminOrderPage from './pages/admin/AdminOrderPage';
import ForbiddenPage from './pages/ForbiddenPage';
import NotFoundPage from './pages/NotFoundPage';

/** Bảng route – CÓ SẴN, KHÔNG sửa file này */
export default function App() {
  return (
    <>
      <AppNavbar />
      <Container className="py-4">
        <Routes>
          {/* Trang chủ: CHỈ hiển thị Navbar, KHÔNG tải thực đơn */}
          <Route path="/" element={null} />
          <Route path="/dishes" element={<DishListPage />} />
          <Route path="/dishes/:id" element={<DishDetailPage />} />
          <Route path="/reservation" element={<ReservationPage />} />
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
            path="/admin/orders"
            element={
              <ProtectedRoute roles={['admin']}>
                <AdminOrderPage />
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
