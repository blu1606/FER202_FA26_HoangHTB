import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductList from './ProductList';
import Cart from './Cart';
import CartBadge from './CartBadge';
import { useTheme } from '../contexts/ThemeContext';

export default function CartManager() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Card className="shadow-sm border-0 mb-4 overflow-hidden">
      <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center py-3">
        <div>
          <span className="fw-bold fs-5">Ví dụ 2: CartContext + useReducer — Tách State & Dispatch</span>
          <div className="small text-white-50">
            Tách CartStateContext và CartDispatchContext để tối ưu re-render khi cập nhật giỏ hàng
          </div>
        </div>
        <CartBadge />
      </Card.Header>

      <Card.Body className={`p-4 ${isDark ? 'bg-dark text-white' : 'bg-light'}`}>
        <Row className="g-4">
          <Col lg={6}>
            <div className={`p-3 rounded border h-100 ${isDark ? 'bg-black border-secondary' : 'bg-white'}`}>
              <ProductList />
            </div>
          </Col>

          <Col lg={6}>
            <div className={`p-3 rounded border h-100 ${isDark ? 'bg-black border-secondary' : 'bg-white'}`}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold mb-0">Chi tiết giỏ hàng</h6>
                <Badge bg="success">useCart()</Badge>
              </div>
              <Cart />
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
