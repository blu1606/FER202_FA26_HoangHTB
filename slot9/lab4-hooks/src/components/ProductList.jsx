import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductCard from './ProductCard';

const ProductList = ({ products, onAddToCart }) => (
  <Row xs={1} md={2} lg={3} xl={4} className="g-4">
    {products.map((product) => (
      <Col key={product.id}>
        <ProductCard product={product} onAddToCart={onAddToCart} />
      </Col>
    ))}
  </Row>
);

export default ProductList;
