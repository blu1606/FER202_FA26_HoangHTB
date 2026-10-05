import { useReducer } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import ProductList from '../components/ProductList';
import CartSummary from '../components/CartSummary';
import { products } from '../data/products';
import { cartReducer, initialCart, CART_ACTIONS, getCartTotals } from '../reducers/cartReducer';

const CartDemoPage = () => {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  const { totalQuantity } = getCartTotals(cart);

  const handleAddToCart = (product) => dispatch({ type: CART_ACTIONS.ADD, payload: product });

  return (
    <Row className="g-4">
      <Col lg={7}>
        <Card className="shadow-sm border-0 mb-4">
          <Card.Header className="bg-white py-3">
            <h5 className="mb-0 fw-bold text-primary">Danh mục sản phẩm</h5>
          </Card.Header>
          <Card.Body>
            <ProductList products={products} onAddToCart={handleAddToCart} />
          </Card.Body>
        </Card>
      </Col>
      <Col lg={5}>
        <Card className="shadow-sm border-0 sticky-top" style={{ top: '1rem' }}>
          <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-bold text-primary">
              Giỏ hàng <Badge bg="primary">{totalQuantity}</Badge>
            </h5>
            <span className="small text-muted">useReducer demo</span>
          </Card.Header>
          <Card.Body>
            <CartSummary cart={cart} dispatch={dispatch} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default CartDemoPage;
