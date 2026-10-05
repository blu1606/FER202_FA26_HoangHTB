import { useState } from 'react';
import Layout from '../components/layout/Layout';
import ShopPage from './ShopPage';
import CartPage from './CartPage';
import CheckoutPage from './CheckoutPage';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../context/AuthContext';

const TITLES = {
  shop: 'Cửa hàng thiết bị công nghệ',
  cart: 'Giỏ hàng của bạn',
  checkout: 'Thanh toán đơn hàng',
  login: 'Đăng nhập tài khoản',
};

const MiniStoreApp = () => {
  const [page, setPage] = useState('shop');
  const { login } = useAuth();

  const handleLoginSuccess = (email) => {
    login(email);
    setPage('shop');
  };

  return (
    <div className="border rounded shadow-sm overflow-hidden">
      <Layout
        title={TITLES[page]}
        currentPage={page}
        onNavigate={setPage}
      >
        {page === 'shop' && <ShopPage />}
        {page === 'cart' && <CartPage onNavigate={setPage} />}
        {page === 'checkout' && <CheckoutPage onNavigate={setPage} />}
        {page === 'login' && <LoginForm onLoginSuccess={handleLoginSuccess} />}
      </Layout>
    </div>
  );
};

export default MiniStoreApp;
