import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Route } from 'react-router-dom';
import dishApi from '../src/api/dishApi';
import DishDetailPage from '../src/pages/DishDetailPage';
import { useCart } from '../src/context/CartContext';
import { dishes } from './fixtures';
import { renderWithProviders } from './utils';

vi.mock('../src/api/dishApi', () => ({
  default: { getAll: vi.fn(), getById: vi.fn() },
  categoryApi: { getAll: vi.fn() },
}));

const byId = (id) => dishes.find((d) => String(d.id) === String(id));

beforeEach(() => {
  dishApi.getById.mockImplementation(async (id) => {
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
      <DishDetailPage />
      <CartTotal />
    </>,
    { route: `/dishes/${id}`, path: '/dishes/:id', ...options }
  );

describe('TODO-08 – Loading, lỗi, thông tin món', () => {
  it('[TODO-08] hiện Loading "Đang tải món ăn..." khi đang tải', async () => {
    dishApi.getById.mockImplementation(() => new Promise(() => {}));
    renderDetail(4);
    expect(await screen.findByRole('status')).toHaveTextContent('Đang tải món ăn...');
  });

  it('[TODO-08] id không tồn tại → "Không tìm thấy dữ liệu" + link "← Về thực đơn"', async () => {
    renderDetail(9999);
    expect(await screen.findByText('Không tìm thấy dữ liệu')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '← Về thực đơn' })).toHaveAttribute('href', '/dishes');
  });

  it('[TODO-08] /dishes/4: Badge danh mục, thời gian chuẩn bị, mô tả', async () => {
    renderDetail(4);
    await screen.findByRole('heading', { name: 'Bún bò Huế' });
    expect(screen.getByText('Bún – Phở')).toHaveClass('badge');
    expect(screen.getByText('Thời gian chuẩn bị: 10 phút')).toBeInTheDocument();
    expect(screen.getByText('Bún bò cay nồng chuẩn vị cố đô.')).toBeInTheDocument();
  });

  it('[TODO-08] /dishes/4: giá 52.000 ₫ đỏ đậm, cỡ fs-2', async () => {
    renderDetail(4);
    await screen.findByRole('heading', { name: 'Bún bò Huế' });
    expect(screen.getByText(/^52\.000/)).toHaveClass('text-danger', 'fw-bold', 'fs-2');
  });
});

describe('TODO-09 – Trạng thái, tạm tính, Thêm vào giỏ, Quay lại', () => {
  it('[TODO-09] /dishes/4 → Badge "Đang phục vụ"; /dishes/5 → "Tạm hết" + nút disabled', async () => {
    const { unmount } = renderDetail(4);
    expect(await screen.findByText('Đang phục vụ')).toHaveClass('badge');
    unmount();
    renderDetail(5);
    await screen.findByRole('heading', { name: 'Mì Quảng gà' });
    expect(screen.getByText('Tạm hết')).toHaveClass('badge');
    expect(screen.getByRole('button', { name: 'Thêm vào giỏ' })).toBeDisabled();
  });

  it('[TODO-09] "Tạm tính" cập nhật theo số phần (52.000 → 104.000)', async () => {
    renderDetail(4);
    await screen.findByRole('heading', { name: 'Bún bò Huế' });
    expect(screen.getByTestId('subtotal')).toHaveTextContent(/Tạm tính: 52\.000/);
    await userEvent.click(screen.getByRole('button', { name: 'Tăng' }));
    expect(screen.getByTestId('subtotal')).toHaveTextContent(/Tạm tính: 104\.000/);
  });

  it('[TODO-09] chọn 2 → "Thêm vào giỏ" → toast + giỏ tăng 2', async () => {
    renderDetail(4);
    await screen.findByRole('heading', { name: 'Bún bò Huế' });
    await userEvent.click(screen.getByRole('button', { name: 'Tăng' }));
    await userEvent.click(screen.getByRole('button', { name: 'Thêm vào giỏ' }));
    expect(await screen.findByText('Đã thêm 2 phần Bún bò Huế')).toBeInTheDocument();
    expect(screen.getByTestId('cart-total')).toHaveTextContent('2');
  });

  it('[TODO-09] "← Quay lại" về trang trước', async () => {
    renderDetail(4, {
      entries: ['/dishes', '/dishes/4'],
      extraRoutes: <Route path="/dishes" element={<p>Thực đơn</p>} />,
    });
    await screen.findByRole('heading', { name: 'Bún bò Huế' });
    await userEvent.click(screen.getByRole('button', { name: '← Quay lại' }));
    expect(screen.getByTestId('location')).toHaveTextContent(/^\/dishes$/);
  });
});
