import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import WelcomeCard from './components/WelcomeCard';
import StudentCard from './components/StudentCard';
import ProductCard from './components/ProductCard';
import ProductList from './components/ProductList';
import { products } from './data/products';

const students = [
  {
    id: 'SE1701',
    name: 'Nguyễn Văn An',
    major: 'Software Engineering',
    gpa: 8.5,
    avatar: 'https://i.pravatar.cc/200?img=12',
    contact: { email: 'an.nv@fpt.edu.vn', phone: '0901 234 567' },
  },
  {
    id: 'SE1702',
    name: 'Trần Thị Bình',
    major: 'Information Assurance',
    gpa: 8.8,
    avatar: 'https://i.pravatar.cc/200?img=5',
    contact: { email: 'binh.tt@fpt.edu.vn', phone: '0902 345 678' },
  },
  {
    id: 'SE1703',
    name: 'Lê Hoàng Cường',
    major: 'Artificial Intelligence',
    gpa: 9.0,
    avatar: 'https://i.pravatar.cc/200?img=33',
    contact: { email: 'cuong.lh@fpt.edu.vn', phone: '0903 456 789' },
  },
];

const productA = {
  id: 1,
  name: 'Tai nghe Bluetooth',
  price: 590000,
  image: 'https://picsum.photos/seed/headphone/300/200',
  rating: { rate: 4.5, count: 120 },
  category: { name: 'Âm thanh' },
};
const productB = { id: 2, name: 'Chuột không dây', price: 0 };
const productC = { id: 3 };

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
