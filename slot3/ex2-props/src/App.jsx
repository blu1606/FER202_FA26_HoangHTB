import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import Card from './Card';

function App() {
  const pizza1 = {
    name: 'Pizza Calzone Gà Nấm',
    price: '139.000',
    avatar: '/image/pizza-1.jpg',
    description: 'Bánh pizza nướng gập giòn tan với nhân gà xé, nấm tươi cùng phô mai Mozzarella.',
  };

  const pizza2 = {
    name: 'Pizza Calzone Pepperoni',
    price: '159.000',
    avatar: '/image/pizza-2.jpg',
    description: 'Xúc xích Ý Pepperoni cay nhẹ kết hợp sốt cà chua Marinara và phô mai.',
  };

  return (
    <Container className="my-5">
      <h1 className="text-center text-primary mb-4">Thực Đơn Pizza</h1>
      <Row className="justify-content-center g-4">
        <Col xs={12} sm={6} md={4} className="d-flex justify-content-center">
          <Card product={pizza1} />
        </Col>
        <Col xs={12} sm={6} md={4} className="d-flex justify-content-center">
          <Card product={pizza2} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
