import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import {
  WelcomeCard,
  StudentCard,
  ProductCard,
  ProductList,
  AppButton,
  InputField,
  CartTable,
  RegisterForm,
  Layout,
} from './components';
import { students } from './data/students';
import { productA, productB, productC } from './data/sampleProducts';
import { products } from './data/products';
import { cartItems } from './data/cart';
import HomePage from './pages/HomePage';

function App() {
  const baseProduct = products[0];
  const superSaleProduct = {
    ...baseProduct,
    name: `${baseProduct.name} (Mega Sale)`,
    discount: 30,
  };
  const saleProducts = products.filter((p) => p.discount > 0);
  const regularProducts = products.filter((p) => p.discount === 0);
  const featured = [
    ...saleProducts.slice(0, 2),
    ...regularProducts.slice(0, 2),
  ];

  return (
    <div className="bg-light">
      <div className="container py-4">
        {/* Bài 1 */}
        <section id="bai1" className="p-4 bg-white rounded shadow-sm mb-4">
          <h2 className="mb-4">Bài 1: Card chào mừng</h2>
          <WelcomeCard />
        </section>

        {/* Bài 2 */}
        <section id="bai2" className="p-4 bg-white rounded shadow-sm mb-4">
          <h2 className="mb-4">Bài 2: StudentCard (arrow function, destructuring props)</h2>
          <div className="d-flex gap-3 flex-wrap">
            {students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        </section>

        {/* Bài 3 */}
        <section id="bai3" className="p-4 bg-white rounded shadow-sm mb-4">
          <h2 className="mb-4">Bài 3: ProductCard an toàn dữ liệu (default params, ?., ??)</h2>
          <Row className="g-4">
            <Col md={4}><ProductCard product={productA} /></Col>
            <Col md={4}><ProductCard product={productB} /></Col>
            <Col md={4}><ProductCard product={productC} /></Col>
          </Row>
        </section>

        {/* Bài 4 */}
        <section id="bai4" className="p-4 bg-white rounded shadow-sm mb-4">
          <h2 className="mb-4">Bài 4: Lưới Card sản phẩm (map() và key)</h2>
          <ProductList products={products} />
        </section>

        {/* Bài 5 */}
        <section id="bai5" className="p-4 bg-white rounded shadow-sm mb-4">
          <h2 className="mb-4">Bài 5: Badge trạng thái và giảm giá (toán tử 3 ngôi, &&)</h2>
          <Row className="g-4">
            <Col md={3}><ProductCard product={products[0]} /></Col>
            <Col md={3}><ProductCard product={products[2]} /></Col>
            <Col md={3}><ProductCard product={products[5]} /></Col>
            <Col md={3}><ProductCard product={products[6]} /></Col>
          </Row>
        </section>

        {/* Bài 6 */}
        <section id="bai6" className="p-4 bg-white rounded shadow-sm mb-4">
          <h2 className="mb-4">Bài 6: Spread ... và Rest ... (AppButton, InputField)</h2>
          <div className="mb-4">
            <h5 className="text-secondary mb-3">1. Demo AppButton với Rest Props:</h5>
            <div className="d-flex gap-2 flex-wrap">
              <AppButton variant="primary">Primary Button</AppButton>
              <AppButton variant="success">Success Button</AppButton>
              <AppButton variant="danger" size="sm">Danger Small</AppButton>
              <AppButton variant="secondary" disabled>Disabled Button</AppButton>
            </div>
          </div>

          <div className="mb-4">
            <h5 className="text-secondary mb-3">2. Demo InputField với Spread Props:</h5>
            <Row>
              <Col md={6}>
                <InputField id="demoName" label="Họ tên sinh viên" placeholder="Nhập họ và tên..." required />
              </Col>
              <Col md={6}>
                <InputField id="demoNote" label="Ghi chú" placeholder="Ghi chú thêm..." helpText="Trường này không bắt buộc." />
              </Col>
            </Row>
          </div>

          <div className="mb-4">
            <h5 className="text-secondary mb-3">3. Spread ghi đè thuộc tính sản phẩm:</h5>
            <Row className="g-4">
              <Col md={4}><ProductCard product={superSaleProduct} /></Col>
            </Row>
          </div>

          <div>
            <h5 className="text-secondary mb-3">4. Spread gộp mảng sản phẩm:</h5>
            <Row className="g-4">
              {featured.map((item) => (
                <Col md={3} key={item.id}><ProductCard product={item} /></Col>
              ))}
            </Row>
          </div>
        </section>

        {/* Bài 7 */}
        <section id="bai7" className="p-4 bg-white rounded shadow-sm mb-4">
          <h2 className="mb-4">Bài 7: Bảng giỏ hàng có tổng tiền (filter, sort, reduce)</h2>
          <CartTable items={cartItems} />
        </section>

        {/* Bài 8 */}
        <section id="bai8" className="p-4 bg-white rounded shadow-sm mb-4">
          <h2 className="mb-4">Bài 8: Form đăng ký sinh ra từ mảng cấu hình (spread props, template literals, map)</h2>
          <RegisterForm />
        </section>

        {/* Bài 9 */}
        <section id="bai9" className="p-4 bg-white rounded shadow-sm mb-4">
          <h2 className="mb-4">Bài 9: Layout Header/Footer (module import/export, children)</h2>
          <div className="border rounded overflow-hidden">
            <Layout title="Trang thử nghiệm Layout Header & Footer">
              <Card className="p-3 border-0 bg-white">
                <p className="mb-0">
                  Đây là nội dung được truyền qua prop <code>children</code> vào bên trong <code>Layout</code>. Header và Footer được tái sử dụng xuyên suốt toàn ứng dụng.
                </p>
              </Card>
            </Layout>
          </div>
        </section>

        {/* Bài 10 */}
        <section id="bai10" className="p-4 bg-white rounded shadow-sm mb-4">
          <h2 className="mb-4">Bài 10: Trang Cửa hàng mini (tổng hợp)</h2>
          <HomePage />
        </section>
      </div>
    </div>
  );
}

export default App;
