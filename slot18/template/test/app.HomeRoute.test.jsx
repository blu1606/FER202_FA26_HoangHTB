import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import dishApi, { categoryApi } from '../src/api/dishApi';
import App from '../src/App';
import { ToastProvider } from '../src/context/ToastContext';
import { AuthProvider } from '../src/context/AuthContext';
import { CartProvider } from '../src/context/CartContext';

vi.mock('../src/api/dishApi', () => ({
  default: { getAll: vi.fn(async () => []), getById: vi.fn() },
  categoryApi: { getAll: vi.fn(async () => []) },
}));

/** CÓ SẴN – kiểm tra yêu cầu chung của đề (không tính điểm TODO) */
describe('[APP] Trang chủ "/" chỉ hiển thị Navbar', () => {
  it('[APP] mở "/" → có Navbar, KHÔNG tải và KHÔNG hiện thực đơn', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </MemoryRouter>
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Thực đơn' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Thực đơn' })).not.toBeInTheDocument();
    expect(dishApi.getAll).not.toHaveBeenCalled();
    expect(categoryApi.getAll).not.toHaveBeenCalled();
  });
});
