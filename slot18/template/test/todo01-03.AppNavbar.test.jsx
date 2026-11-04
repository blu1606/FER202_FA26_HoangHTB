import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import AppNavbar from '../src/components/AppNavbar';
import { useCart } from '../src/context/CartContext';
import { ADMIN, CUSTOMER, dishes } from './fixtures';
import { renderWithProviders } from './utils';

function AddButton() {
  const { addToCart } = useCart();
  return <button onClick={() => addToCart(dishes[0], 2)}>add-test</button>;
}

describe('TODO-01 – Navbar: Giỏ món + Badge', () => {
  it('[TODO-01] có link "Giỏ món" tới /cart', () => {
    renderWithProviders(<AppNavbar />);
    expect(screen.getByRole('link', { name: /Giỏ món/ })).toHaveAttribute('href', '/cart');
  });

  it('[TODO-01] giỏ trống KHÔNG hiện Badge; thêm 2 phần → Badge "2"', async () => {
    renderWithProviders(
      <>
        <AppNavbar />
        <AddButton />
      </>
    );
    expect(screen.getByRole('link', { name: /Giỏ món/ })).toBeInTheDocument();
    expect(screen.queryByTestId('cart-badge')).not.toBeInTheDocument();
    await userEvent.click(screen.getByText('add-test'));
    expect(screen.getByTestId('cart-badge')).toHaveTextContent('2');
  });
});

describe('TODO-02 – Navbar: đã đăng nhập', () => {
  it('[TODO-02] hiện avatar chữ cái đầu của TÊN ("A") và họ tên đầy đủ', () => {
    renderWithProviders(<AppNavbar />, { user: CUSTOMER });
    expect(screen.getByTestId('avatar')).toHaveTextContent(/^A$/);
    expect(screen.getByText('Nguyễn Văn An')).toBeInTheDocument();
  });

  it('[TODO-02] admin "Quản trị viên" → avatar "V", có nút "Đăng xuất"', () => {
    renderWithProviders(<AppNavbar />, { user: ADMIN });
    expect(screen.getByTestId('avatar')).toHaveTextContent(/^V$/);
    expect(screen.getByRole('button', { name: 'Đăng xuất' })).toBeInTheDocument();
  });

  it('[TODO-02] bấm "Đăng xuất" → đăng xuất, toast "Đã đăng xuất", về "/"', async () => {
    renderWithProviders(<AppNavbar />, { user: CUSTOMER, route: '/cart' });
    await userEvent.click(screen.getByRole('button', { name: 'Đăng xuất' }));
    expect(localStorage.getItem('user')).toBeNull();
    expect(await screen.findByText('Đã đăng xuất')).toBeInTheDocument();
    expect(screen.getByTestId('location')).toHaveTextContent(/^\/$/);
    expect(screen.queryByTestId('avatar')).not.toBeInTheDocument();
  });
});

describe('TODO-03 – Navbar: chưa đăng nhập', () => {
  it('[TODO-03] có nút "Đăng nhập" (/login) và "Tạo tài khoản" (/register)', () => {
    renderWithProviders(<AppNavbar />);
    expect(screen.getByRole('button', { name: 'Đăng nhập' })).toHaveAttribute('href', '/login');
    expect(screen.getByRole('button', { name: 'Tạo tài khoản' })).toHaveAttribute('href', '/register');
  });

  it('[TODO-03-] đã đăng nhập thì KHÔNG hiện nút Đăng nhập / Tạo tài khoản', () => {
    renderWithProviders(<AppNavbar />, { user: CUSTOMER });
    const nav = screen.getByRole('navigation');
    expect(within(nav).queryByText('Đăng nhập')).not.toBeInTheDocument();
    expect(within(nav).queryByText('Tạo tài khoản')).not.toBeInTheDocument();
  });
});
