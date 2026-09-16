import { Container, Row, Col } from 'react-bootstrap';
import ProductInfo from './ProductInfo';

function ProductList({ products = [] }) {
  return (
    <Container className="my-5">
      <h2 className="text-center text-primary mb-4 fw-bold">Danh Sách Pizza</h2>
      <Row className="g-4 justify-content-center">
        {products.map((item) => (
          <Col key={item.id || item.name} xs={12} sm={6} md={4} lg={3}>
            <ProductInfo
              name={item.name}
              price={item.price}
              tag={item.tag}
              avatar={item.avatar}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;
