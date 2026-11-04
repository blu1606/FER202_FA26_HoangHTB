import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import dishApi, { categoryApi } from '../src/api/dishApi';
import DishListPage from '../src/pages/DishListPage';
import { categories, dishes } from './fixtures';
import { renderWithProviders } from './utils';

vi.mock('../src/api/dishApi', () => ({
  default: { getAll: vi.fn(), getById: vi.fn() },
  categoryApi: { getAll: vi.fn() },
}));

beforeEach(() => {
  dishApi.getAll.mockResolvedValue(dishes.map((d) => ({ ...d })));
  categoryApi.getAll.mockResolvedValue(categories);
});

const renderPage = async () => {
  renderWithProviders(<DishListPage />, { route: '/dishes' });
  await screen.findAllByRole('img');
};
const cardNames = () => screen.queryAllByRole('heading', { level: 6 }).map((h) => h.textContent.trim());
const group = () => screen.getByRole('group', { name: 'Danh mục' });

describe('TODO-06 – Ô tìm món + nhóm nút danh mục', () => {
  it('[TODO-06] gõ "bún" → còn 2 món', async () => {
    await renderPage();
    const search = screen.getByRole('searchbox', { name: 'Tìm món' });
    await userEvent.type(search, 'bún');
    expect(search).toHaveValue('bún');
    expect(cardNames()).toEqual(['Bún bò Huế', 'Bún chả Hà Nội']);
  });

  it('[TODO-06] nhóm nút có "Tất cả" + 4 danh mục từ API', async () => {
    await renderPage();
    const names = within(group()).getAllByRole('button').map((b) => b.textContent.trim());
    expect(names).toEqual(['Tất cả', ...categories.map((c) => c.name)]);
  });

  it('[TODO-06] bấm "Đồ uống" → còn 3 món, nút được tô (btn-success, aria-pressed)', async () => {
    await renderPage();
    const btn = within(group()).getByRole('button', { name: 'Đồ uống' });
    await userEvent.click(btn);
    expect(cardNames()).toEqual(['Trà đào cam sả', 'Cà phê sữa đá', 'Sinh tố bơ']);
    expect(btn).toHaveClass('btn-success');
    expect(btn).toHaveAttribute('aria-pressed', 'true');
    expect(within(group()).getByRole('button', { name: 'Tất cả' })).toHaveClass('btn-outline-success');
  });

  it('[TODO-06] bấm "Xóa lọc" → ô tìm trống, nút "Tất cả" được tô, đủ 12 món', async () => {
    await renderPage();
    const search = screen.getByRole('searchbox', { name: 'Tìm món' });
    await userEvent.type(search, 'cơm');
    await userEvent.click(within(group()).getByRole('button', { name: 'Cơm' }));
    await userEvent.click(screen.getByRole('button', { name: 'Xóa lọc' }));
    expect(search).toHaveValue('');
    expect(within(group()).getByRole('button', { name: 'Tất cả' })).toHaveClass('btn-success');
    expect(cardNames()).toHaveLength(12);
  });
});

describe('TODO-07 – Dòng đếm kết quả + thông báo rỗng', () => {
  it('[TODO-07] hiện "Tìm được 12/12 món"', async () => {
    await renderPage();
    expect(screen.getByTestId('result-count')).toHaveTextContent('Tìm được 12/12 món');
  });

  it('[TODO-07] bật "Chỉ món đang phục vụ" → "Tìm được 10/12 món"', async () => {
    await renderPage();
    await userEvent.click(screen.getByLabelText('Chỉ món đang phục vụ')); // switch có sẵn
    expect(screen.getByTestId('result-count')).toHaveTextContent('Tìm được 10/12 món');
  });

  it('[TODO-07] không còn món phù hợp → Alert xám (secondary) thay cho lưới', async () => {
    dishApi.getAll.mockResolvedValue([{ ...dishes[4] }, { ...dishes[7] }]); // 2 món tạm hết
    renderWithProviders(<DishListPage />, { route: '/dishes' });
    await screen.findAllByRole('img');
    await userEvent.click(screen.getByLabelText('Chỉ món đang phục vụ'));
    const alert = screen.getByText('Chưa có món phù hợp');
    expect(alert.closest('.alert')).toHaveClass('alert-secondary');
    expect(screen.getByTestId('result-count')).toHaveTextContent('Tìm được 0/2 món');
  });
});
