import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import products from '../data/products';
import MyProduct from './MyProduct';

export default function ProductList() {
  return (
    <div className="py-3">
      <h2 className="mb-4">Product List</h2>

      <Row>
        {products.map((item) => (
          <Col md={4} key={item.id} className="mb-4">
            <MyProduct product={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
