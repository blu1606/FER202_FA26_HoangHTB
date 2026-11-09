import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import {
  selectFilteredProducts,
  selectKeyword,
  setKeyword,
} from '../features/products/productsSlice';
import { addToCart, selectCartItems } from '../features/cart/cartSlice';

const vnd = (n) => n.toLocaleString('vi-VN') + ' ₫';

export default function ProductList() {
  const products = useSelector(selectFilteredProducts);
  const keyword = useSelector(selectKeyword);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const qtyOf = (id) => cartItems.find((i) => i.id === id)?.quantity ?? 0;

  return (
    <>
      <Form.Control
        className="mb-3"
        placeholder="🔍 Tìm sản phẩm theo tên..."
        value={keyword}
        onChange={(e) => dispatch(setKeyword(e.target.value))}
      />
      <Row xs={1} sm={2} className="g-3">
        {products.map((p) => {
          const qty = qtyOf(p.id);
          const soldOut = qty >= p.stock;
          return (
            <Col key={p.id}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Img
                  variant="top"
                  src={p.image}
                  alt={p.name}
                  style={{ height: 160, objectFit: 'cover' }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fs-5">{p.name}</Card.Title>
                  <Card.Text className="text-danger fw-bold fs-5 mb-1">
                    {vnd(p.price)}
                  </Card.Text>
                  <small className="text-muted mb-3">Kho còn: {p.stock}</small>
                  <Button
                    variant={soldOut ? 'secondary' : 'primary'}
                    className="mt-auto"
                    disabled={soldOut}
                    onClick={() => dispatch(addToCart(p))}
                  >
                    {soldOut ? 'Đã đạt tối đa kho' : 'Thêm vào giỏ'}
                    {qty > 0 && (
                      <Badge bg="light" text="dark" className="ms-2">
                        {qty}
                      </Badge>
                    )}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
