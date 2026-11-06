import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Route } from 'react-router-dom';
import carApi from '../src/api/carApi';
import CarDetailPage from '../src/pages/CarDetailPage';
import { cars } from './fixtures';
import { renderWithProviders } from './utils';
import { useCart } from '../src/context/CartContext';

vi.mock('../src/api/carApi', () => ({
  default: { getAll: vi.fn(), getById: vi.fn() },
  brandApi: { getAll: vi.fn() },
}));

const byId = (id) => cars.find((c) => String(c.id) === String(id));

beforeEach(() => {
  carApi.getById.mockImplementation(async (id) => {
    const found = byId(id);
    if (!found) throw { status: 404, message: 'Không tìm thấy dữ liệu' };
    return { ...found };
  });
});

function CartTotal() {
  const { totalQuantity } = useCart();
  return <div data-testid="cart-total">{totalQuantity}</div>;
}

const renderDetail = (id, options = {}) =>
  renderWithProviders(
    <>
      <CarDetailPage />
      <CartTotal />
    </>,
    { route: `/cars/${id}`, path: '/cars/:id', ...options }
  );

describe('TODO-08 – Loading, lỗi, thông tin xe', () => {
  it('[TODO-08] hiện Loading (spinner) khi đang tải', async () => {
    carApi.getById.mockImplementation(() => new Promise(() => {})); // không bao giờ xong
    renderDetail(9);
    expect(await screen.findByRole('status')).toBeInTheDocument();
  });

  it('[TODO-08] id không tồn tại → "Không tìm thấy dữ liệu" + link "← Về danh sách xe"', async () => {
    renderDetail(9999);
    expect(await screen.findByText('Không tìm thấy dữ liệu')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '← Về danh sách xe' })).toHaveAttribute('href', '/cars');
  });

  it('[TODO-08] /cars/9: Badge hãng xe, "Đời 2024 · Hybrid", mô tả', async () => {
    renderDetail(9);
    await screen.findByRole('heading', { name: 'Toyota Corolla Cross HEV' });
    expect(screen.getByText('Toyota')).toHaveClass('badge');
    expect(screen.getByText(/Đời\s*2024\s*·\s*Hybrid/)).toBeInTheDocument();
    expect(screen.getByText('SUV đô thị động cơ hybrid, tiết kiệm nhiên liệu.')).toBeInTheDocument();
  });

  it('[TODO-08] /cars/9: giá 840.400.000 ₫ đỏ đậm, chữ lớn', async () => {
    renderDetail(9);
    await screen.findByRole('heading', { name: 'Toyota Corolla Cross HEV' });
    expect(screen.getByText(/840\.400\.000/)).toHaveClass('text-danger', 'fw-bold', 'fs-3');
  });
});

describe('TODO-09 – Tình trạng, Thêm vào giỏ, Quay lại', () => {
  it('[TODO-09] /cars/9 → "Còn 4 xe"', async () => {
    renderDetail(9);
    expect(await screen.findByText('Còn 4 xe')).toHaveClass('badge');
  });

  it('[TODO-09] /cars/3 → Badge "Hết xe" + nút "Thêm vào giỏ" disabled', async () => {
    renderDetail(3);
    await screen.findByRole('heading', { name: 'Toyota Camry 2.5Q' });
    expect(screen.getByText('Hết xe')).toHaveClass('badge');
    expect(screen.getByRole('button', { name: 'Thêm vào giỏ' })).toBeDisabled();
  });

  it('[TODO-09] chọn 2 → "Thêm vào giỏ" → toast + giỏ tăng 2', async () => {
    renderDetail(9);
    await screen.findByRole('heading', { name: 'Toyota Corolla Cross HEV' });
    await userEvent.click(screen.getByRole('button', { name: 'Tăng' }));
    await userEvent.click(screen.getByRole('button', { name: 'Thêm vào giỏ' }));
    expect(await screen.findByText('Đã thêm 2 "Toyota Corolla Cross HEV" vào giỏ')).toBeInTheDocument();
    expect(screen.getByTestId('cart-total')).toHaveTextContent('2');
  });

  it('[TODO-09] "← Quay lại" về trang trước', async () => {
    renderDetail(9, {
      entries: ['/cars', '/cars/9'],
      extraRoutes: <Route path="/cars" element={<p>Trang danh sách</p>} />,
    });
    await screen.findByRole('heading', { name: 'Toyota Corolla Cross HEV' });
    await userEvent.click(screen.getByRole('button', { name: '← Quay lại' }));
    expect(screen.getByTestId('location')).toHaveTextContent(/^\/cars$/);
  });
});
