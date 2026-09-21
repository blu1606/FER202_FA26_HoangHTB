import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import WelcomeCard from './components/WelcomeCard';
import StudentCard from './components/StudentCard';
import ProductCard from './components/ProductCard';
import ProductList from './components/ProductList';
import { students } from './data/students';
import { productA, productB, productC } from './data/sampleProducts';
import { products } from './data/products';

function App() {
  return (
    <div className="container my-4">
      <h2 className="mb-4">Bài 1: Card chào mừng</h2>
      <WelcomeCard />

      <hr className="my-5" />

      <h2 className="mb-4">Bài 2: StudentCard (arrow function, destructuring props)</h2>
      <div className="d-flex gap-3 flex-wrap">
        {students.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>

      <hr className="my-5" />

      <h2 className="mb-4">Bài 3: ProductCard an toàn dữ liệu (default params, ?., ??)</h2>
      <Row className="g-4">
        <Col md={4}>
          <ProductCard product={productA} />
        </Col>
        <Col md={4}>
          <ProductCard product={productB} />
        </Col>
        <Col md={4}>
          <ProductCard product={productC} />
        </Col>
      </Row>

      <hr className="my-5" />

      <h2 className="mb-4">Bài 4: Lưới Card sản phẩm (map() và key)</h2>
      <ProductList products={products} />
    </div>
  );
}

export default App;
