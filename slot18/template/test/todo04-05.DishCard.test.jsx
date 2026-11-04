import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import DishCard from '../src/components/DishCard';
import { dishes } from './fixtures';
import { renderWithProviders } from './utils';

const comTam = dishes[0]; //  giảm 10% → 49.500, bán 320 (bán chạy)
const comGa = dishes[1]; //   không giảm, cay 1, bán 95
const bunBo = dishes[3]; //   giảm 20% → 52.000, cay 3
const miQuang = dishes[4]; // tạm hết

describe('TODO-04 – DishCard: tên, danh mục, độ cay, thời gian', () => {
  it('[TODO-04] tên món là link tới /dishes/{id}', () => {
    renderWithProviders(<DishCard dish={comTam} />);
    expect(screen.getByRole('link', { name: 'Cơm tấm sườn bì chả' })).toHaveAttribute('href', '/dishes/1');
  });

  it('[TODO-04] Badge danh mục + "⏱ 10 phút"', () => {
    renderWithProviders(<DishCard dish={comTam} />);
    expect(screen.getByText('Cơm')).toHaveClass('badge');
    expect(screen.getByText('⏱ 10 phút')).toBeInTheDocument();
  });

  it('[TODO-04] món cay → Badge "Cay cấp 3"; món không cay → không có', () => {
    const { unmount } = renderWithProviders(<DishCard dish={bunBo} />);
    expect(screen.getByText('Cay cấp 3')).toHaveClass('badge', 'bg-danger');
    unmount();
    renderWithProviders(<DishCard dish={comTam} />);
    expect(screen.queryByText(/Cay cấp/)).not.toBeInTheDocument();
  });

  it('[TODO-04] không lỗi khi món không có category', () => {
    renderWithProviders(<DishCard dish={{ ...comGa, category: undefined }} />);
    expect(screen.getByRole('link', { name: 'Cơm gà xối mỡ' })).toBeInTheDocument();
  });
});

describe('TODO-05 – DishCard: giá, bán chạy, tạm hết', () => {
  it('[TODO-05] giá sau giảm màu đỏ đậm', () => {
    renderWithProviders(<DishCard dish={comTam} />);
    expect(screen.getByText(/49\.500/)).toHaveClass('text-danger', 'fw-bold');
  });

  it('[TODO-05] discount > 0: giá gốc trong thẻ <del> và Badge "Giảm 10%"', () => {
    renderWithProviders(<DishCard dish={comTam} />);
    expect(screen.getByText(/55\.000/).tagName).toBe('DEL');
    expect(screen.getByText('Giảm 10%')).toHaveClass('badge');
  });

  it('[TODO-05] discount = 0: KHÔNG có giá gạch ngang', () => {
    const { container } = renderWithProviders(<DishCard dish={comGa} />);
    expect(screen.getByText(/50\.000/)).toHaveClass('text-danger');
    expect(container.querySelector('del')).toBeNull();
  });

  it('[TODO-05] bán ≥ 100 phần → Badge "Bán chạy"; 95 phần → không', () => {
    const { unmount } = renderWithProviders(<DishCard dish={comTam} />);
    expect(screen.getByText('Bán chạy')).toHaveClass('badge');
    unmount();
    renderWithProviders(<DishCard dish={comGa} />);
    expect(screen.queryByText('Bán chạy')).not.toBeInTheDocument();
  });

  it('[TODO-05] tạm hết: Badge "Tạm hết" + nút disabled', () => {
    renderWithProviders(<DishCard dish={miQuang} onAddToCart={vi.fn()} />);
    expect(screen.getAllByText('Tạm hết').some((el) => el.classList.contains('badge'))).toBe(true);
    expect(screen.getByRole('button', { name: 'Tạm hết' })).toBeDisabled();
  });

  it('[TODO-05-] còn phục vụ: nút "Thêm vào giỏ" bấm được', async () => {
    const onAdd = vi.fn();
    renderWithProviders(<DishCard dish={comGa} onAddToCart={onAdd} />);
    await userEvent.click(screen.getByRole('button', { name: 'Thêm vào giỏ' }));
    expect(onAdd).toHaveBeenCalledWith(comGa);
  });
});
