import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div>
      <Card className="border-0 shadow-sm p-4 bg-light mb-4 text-center">
        <Card.Body>
          <h2 className="fw-bold text-primary mb-3">Chào mừng bạn đến với Thư viện FPT</h2>
          <p className="lead text-secondary mb-4 mx-auto" style={{ maxWidth: '680px' }}>
            Không gian học tập, nghiên cứu và kết nối tri thức dành riêng cho cán bộ, giảng viên
            và sinh viên FPT University với hàng ngàn đầu sách công nghệ và tài liệu chất lượng cao.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Button as={Link} to="/books" variant="primary">
              Khám phá kho sách
            </Button>
            <Button as={Link} to="/help" variant="outline-primary">
              Xem hướng dẫn độc giả
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Row className="g-3">
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100 p-3">
            <Card.Body>
              <h5 className="fw-bold text-dark mb-2">⏰ Giờ phục vụ</h5>
              <p className="text-secondary small mb-0">
                Thứ 2 - Thứ 6: 07:30 - 21:00<br />
                Thứ 7 - Chủ Nhật: 08:00 - 17:30
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100 p-3">
            <Card.Body>
              <h5 className="fw-bold text-dark mb-2">💻 Không gian số</h5>
              <p className="text-secondary small mb-0">
                Truy cập cơ sở dữ liệu quốc tế IEEE, Springer, ACM không giới hạn trong khuôn viên trường.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100 p-3">
            <Card.Body>
              <h5 className="fw-bold text-dark mb-2">📖 Dịch vụ mượn trả</h5>
              <p className="text-secondary small mb-0">
                Mượn tối đa 5 cuốn sách / lần với thẻ sinh viên FPT. Gia hạn tự động qua cổng portal.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
