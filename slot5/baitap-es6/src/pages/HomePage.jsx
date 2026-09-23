import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {
  Layout,
  ProductCard,
  InputField,
  AppButton,
} from '../components';
import { products } from '../data/products';
import { formatVND } from '../utils/format';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // 1. Dữ liệu tính toán bằng ES6 methods
  const onSale = products.filter((p) => p.discount > 0);
  const deals = [...onSale].sort((a, b) => b.discount - a.discount);
  const categories = [
    'Tất cả',
    ...new Set(products.map((p) => p.category?.name).filter(Boolean)),
  ];

  const total = products.length;
  const inStockCount = products.filter((p) => p.inStock).length;
  const avgPrice = Math.round(
    products.reduce((sum, p) => sum + p.price, 0) / (total || 1)
  );

  // Lọc sản phẩm theo danh mục và tìm kiếm
  const filteredProducts = products.filter((p) => {
    const matchCategory =
      selectedCategory === 'Tất cả' || p.category?.name === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <Layout title="">
      {/* Khối 1: Hero Card */}
      <Card className="bg-gradient bg-primary text-white border-0 shadow mb-4 p-4 rounded-4">
        <Row className="align-items-center">
          <Col md={8}>
            <h1 className="display-6 fw-bold mb-2">Chào mừng đến với TechZone! 🚀</h1>
            <p className="lead mb-3 opacity-90">
              Khám phá hệ sinh thái phụ kiện công nghệ đỉnh cao dành riêng cho sinh viên.
            </p>
            <Badge bg="warning" text="dark" className="fs-6 px-3 py-2 rounded-pill">
              🔥 Đang có {onSale.length} sản phẩm giảm giá cực sốc hôm nay!
            </Badge>
          </Col>
          <Col md={4} className="text-center d-none d-md-block">
            <span style={{ fontSize: '5rem' }}>🎧</span>
          </Col>
        </Row>
      </Card>

      {/* Khối 2: Thống kê */}
      <Row className="g-3 mb-4">
        <Col md={4}>
          <Card className="border-0 shadow-sm text-center p-3 h-100 bg-white">
            <h6 className="text-muted mb-1">TỔNG SẢN PHẨM</h6>
            <h3 className="fw-bold text-primary mb-0">{total}</h3>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm text-center p-3 h-100 bg-white">
            <h6 className="text-muted mb-1">CÒN HÀNG SẴN SÀNG</h6>
            <h3 className="fw-bold text-success mb-0">{inStockCount}</h3>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm text-center p-3 h-100 bg-white">
            <h6 className="text-muted mb-1">GIÁ TRUNG BÌNH</h6>
            <h3 className="fw-bold text-warning mb-0">{formatVND(avgPrice)}</h3>
          </Card>
        </Col>
      </Row>

      {/* Khối 3: Bộ lọc và tìm kiếm */}
      <Card className="border-0 shadow-sm p-3 mb-4 bg-white">
        <Row className="g-3 align-items-center">
          <Col md={7}>
            <div className="d-flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  size="sm"
                  variant={selectedCategory === cat ? 'primary' : 'outline-secondary'}
                  onClick={() => setSelectedCategory(cat)}
                  className="rounded-pill px-3"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </Col>
          <Col md={5}>
            <Form.Control
              type="text"
              placeholder="🔍 Tìm kiếm sản phẩm theo tên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-pill"
            />
          </Col>
        </Row>
      </Card>

      {/* Khối 4: Danh sách giảm giá sốc */}
      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold text-danger mb-0">⚡ Giảm giá sốc ({deals.length})</h4>
          <span className="text-muted small">Khuyến mãi có hạn</span>
        </div>
        <Row className="g-3">
          {deals.slice(0, 4).map((product) => (
            <Col key={product.id} xs={12} sm={6} md={3}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </section>

      {/* Khối 5: Lưới toàn bộ sản phẩm */}
      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">📦 Danh mục sản phẩm</h4>
          <span className="text-muted small">Tìm thấy {filteredProducts.length} sản phẩm</span>
        </div>
        {filteredProducts.length > 0 ? (
          <Row className="g-3">
            {filteredProducts.map((product) => (
              <Col key={product.id} xs={12} sm={6} md={3}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center py-5 text-muted">
            <p className="fs-5 mb-0">Không tìm thấy sản phẩm nào phù hợp.</p>
          </div>
        )}
      </section>

      {/* Khối 6: Đăng ký nhận tin */}
      <Card className="border-0 shadow-sm p-4 bg-white rounded-3">
        <Row className="align-items-center">
          <Col lg={6} className="mb-3 mb-lg-0">
            <h4 className="fw-bold mb-1">📬 Đăng ký nhận bản tin khuyến mãi</h4>
            <p className="text-muted mb-0">
              Nhận voucher giảm 20% cho đơn hàng đầu tiên và thông tin ưu đãi sớm nhất.
            </p>
          </Col>
          <Col lg={6}>
            {subscribed ? (
              <div className="alert alert-success mb-0 py-2">
                🎉 Cảm ơn bạn đã đăng ký nhận tin từ TechZone!
              </div>
            ) : (
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubscribed(true);
                }}
                className="d-flex gap-2 align-items-start"
              >
                <div className="flex-grow-1">
                  <InputField
                    id="newsletterEmail"
                    type="email"
                    placeholder="Nhập email của bạn..."
                    required
                  />
                </div>
                <AppButton type="submit" variant="primary" className="px-4 text-nowrap">
                  Đăng ký
                </AppButton>
              </Form>
            )}
          </Col>
        </Row>
      </Card>
    </Layout>
  );
};

export default HomePage;
