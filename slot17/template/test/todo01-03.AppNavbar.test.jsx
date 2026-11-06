import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import AppNavbar from '../src/components/AppNavbar';
import { useCart } from '../src/context/CartContext';
import { CUSTOMER, cars } from './fixtures';
import { renderWithProviders } from './utils';

function AddButton() {
  const { addToCart } = useCart();
  return <button onClick={() => addToCart(cars[0], 2)}>add-test</button>;
}

describe('TODO-01 – Navbar: Giỏ hàng + Badge', () => {
  it('[TODO-01] có link "Giỏ hàng" tới /cart', () => {
    renderWithProviders(<AppNavbar />);
    const link = screen.getByRole('link', { name: /Giỏ hàng/ });
    expect(link).toHaveAttribute('href', '/cart');
  });

  it('[TODO-01] Badge cart-badge ban đầu là 0 và tăng khi thêm vào giỏ', async () => {
    renderWithProviders(
      <>
        <AppNavbar />
        <AddButton />
      </>
    );
    const badge = screen.getByTestId('cart-badge');
    expect(badge).toHaveTextContent('0');
    await userEvent.click(screen.getByText('add-test'));
    expect(screen.getByTestId('cart-badge')).toHaveTextContent('2');
  });
});

describe('TODO-02 – Navbar: đã đăng nhập', () => {
  it('[TODO-02] hiện "Xin chào, {fullName}" và nút "Đăng xuất"', () => {
    renderWithProviders(<AppNavbar />, { user: CUSTOMER });
    expect(screen.getByText(/Xin chào, Nguyễn Văn An/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Đăng xuất' })).toBeInTheDocument();
  });

  it('[TODO-02] bấm "Đăng xuất" → đăng xuất, toast "Đã đăng xuất", về "/"', async () => {
    renderWithProviders(<AppNavbar />, { user: CUSTOMER, route: '/cars' });
    await userEvent.click(screen.getByRole('button', { name: 'Đăng xuất' }));
    expect(localStorage.getItem('user')).toBeNull();
    expect(await screen.findByText('Đã đăng xuất')).toBeInTheDocument();
    expect(screen.getByTestId('location')).toHaveTextContent(/^\/$/);
    expect(screen.queryByText(/Xin chào/)).not.toBeInTheDocument();
  });
});

describe('TODO-03 – Navbar: chưa đăng nhập', () => {
  it('[TODO-03] có nút "Đăng nhập" (/login) và "Đăng ký" (/register)', () => {
    renderWithProviders(<AppNavbar />);
    expect(screen.getByRole('button', { name: 'Đăng nhập' })).toHaveAttribute('href', '/login');
    expect(screen.getByRole('button', { name: 'Đăng ký' })).toHaveAttribute('href', '/register');
  });

  it('[TODO-03-] đã đăng nhập thì KHÔNG hiện nút Đăng nhập / Đăng ký', () => {
    renderWithProviders(<AppNavbar />, { user: CUSTOMER });
    const nav = screen.getByRole('navigation');
    expect(within(nav).queryByText('Đăng nhập')).not.toBeInTheDocument();
    expect(within(nav).queryByText('Đăng ký')).not.toBeInTheDocument();
  });
});
