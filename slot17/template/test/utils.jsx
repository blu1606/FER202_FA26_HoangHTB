import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ToastProvider } from '../src/context/ToastContext';
import { AuthProvider } from '../src/context/AuthContext';
import { CartProvider } from '../src/context/CartContext';

/** Hiển thị đường dẫn hiện tại để test kiểm tra điều hướng */
export function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

/** Đăng nhập giả: ghi user vào localStorage TRƯỚC khi render */
export function loginAs(user) {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', 'test-token');
}

/**
 * Render component bên trong đủ Provider + Router.
 *   renderWithProviders(<CarCard ... />)
 *   renderWithProviders(<CarDetailPage />, { route: '/cars/9', path: '/cars/:id' })
 *   entries: ['/cars', '/cars/9'] → lịch sử có 2 trang (để thử navigate(-1))
 */
export function renderWithProviders(ui, { route = '/', entries, path, extraRoutes = null, user } = {}) {
  if (user) loginAs(user);
  return render(
    <MemoryRouter initialEntries={entries ?? [route]} initialIndex={(entries ?? [route]).length - 1}>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            {path ? (
              <Routes>
                <Route path={path} element={ui} />
                {extraRoutes}
                <Route path="*" element={null} />
              </Routes>
            ) : (
              ui
            )}
            <LocationDisplay />
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </MemoryRouter>
  );
}
