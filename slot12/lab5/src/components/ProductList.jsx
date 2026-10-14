import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import products from '../data/products';
import MyProduct from './MyProduct';

export default function ProductList() {
  return (
    <div className="product-list-page py-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-primary mb-1">Danh Sách Sản Phẩm</h2>
          <p className="text-secondary small mb-0">
            Hiển thị các khóa học, tài liệu và dịch vụ ôn tập có sẵn
          </p>
        </div>
        <span className="badge bg-primary fs-6">
          Tổng số: {products.length} sản phẩm
        </span>
      </div>

      {/* Dùng method map() để duyệt qua danh sách products */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products.map((item) => (
          <Col key={item.id}>
            <MyProduct product={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
