import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import carApi, { brandApi } from '../src/api/carApi';
import App from '../src/App';
import { ToastProvider } from '../src/context/ToastContext';
import { AuthProvider } from '../src/context/AuthContext';
import { CartProvider } from '../src/context/CartContext';

vi.mock('../src/api/carApi', () => ({
  default: { getAll: vi.fn(async () => []), getById: vi.fn() },
  brandApi: { getAll: vi.fn(async () => []) },
}));

/** CÓ SẴN – kiểm tra yêu cầu chung của đề (không tính điểm TODO) */
describe('[APP] Trang chủ "/" chỉ hiển thị Navbar', () => {
  it('[APP] mở "/" → có Navbar, KHÔNG tải và KHÔNG hiện danh sách xe', () => {
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
    expect(screen.getByRole('link', { name: 'Danh sách xe' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Danh sách xe' })).not.toBeInTheDocument();
    expect(carApi.getAll).not.toHaveBeenCalled();
    expect(brandApi.getAll).not.toHaveBeenCalled();
  });
});
