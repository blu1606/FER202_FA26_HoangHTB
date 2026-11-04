import { useEffect, useState } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ToastProvider } from '../src/context/ToastContext';
import { AuthProvider } from '../src/context/AuthContext';
import { CartProvider, useCart } from '../src/context/CartContext';

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

/** Bỏ sẵn món vào giỏ rồi mới render children. cart = [[dish, quantity], ...] */
function CartSeeder({ cart, children }) {
  const { addToCart } = useCart();
  const [ready, setReady] = useState(!cart || cart.length === 0);
  useEffect(() => {
    if (!cart || cart.length === 0) return;
    cart.forEach(([dish, quantity]) => addToCart(dish, quantity));
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ready ? children : null;
}

/**
 * Render component bên trong đủ Provider + Router.
 *   renderWithProviders(<DishCard ... />)
 *   renderWithProviders(<DishDetailPage />, { route: '/dishes/4', path: '/dishes/:id' })
 *   entries: ['/dishes', '/dishes/4'] → lịch sử có 2 trang (để thử navigate(-1))
 *   cart: [[dish, 2]] → giỏ có sẵn món
 */
export function renderWithProviders(ui, { route = '/', entries, path, extraRoutes = null, user, cart } = {}) {
  if (user) loginAs(user);
  return render(
    <MemoryRouter initialEntries={entries ?? [route]} initialIndex={(entries ?? [route]).length - 1}>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <CartSeeder cart={cart}>
              {path ? (
                <Routes>
                  <Route path={path} element={ui} />
                  {extraRoutes}
                  <Route path="*" element={null} />
                </Routes>
              ) : (
                ui
              )}
            </CartSeeder>
            <LocationDisplay />
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </MemoryRouter>
  );
}
