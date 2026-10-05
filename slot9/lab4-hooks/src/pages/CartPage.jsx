import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CartSummary from '../components/CartSummary';
import { useCart } from '../context/CartContext';

const CartPage = ({ onNavigate }) => {
  const { cart, dispatch, totalQuantity } = useCart();

  return (
    <Card className="shadow-sm border-0">
      <Card.Header className="bg-white py-3">
        <h5 className="mb-0 fw-bold text-primary">Chi tiết giỏ hàng</h5>
      </Card.Header>
      <Card.Body>
        <CartSummary cart={cart} dispatch={dispatch} />
        {totalQuantity > 0 && (
          <div className="text-end mt-4">
            <Button variant="success" size="lg" onClick={() => onNavigate('checkout')}>
              Tiến hành thanh toán ➔
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default CartPage;
