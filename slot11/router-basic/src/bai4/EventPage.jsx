import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';

export default function EventPage() {
  const navigate = useNavigate();

  return (
    <Container className="py-4">
      <Card className="border-0 shadow-sm p-4 p-md-5 mx-auto" style={{ maxWidth: '800px' }}>
        <Card.Body className="text-center">
          <Badge bg="danger" className="px-3 py-2 fs-6 mb-3">
            SỰ KIỆN CÔNG NGHỆ 2026
          </Badge>
          <h1 className="display-6 fw-bold text-dark mb-3">FPTU Tech Day 2026</h1>
          <p className="lead text-secondary mb-4">
            Khám phá xu hướng AI thế hệ mới, Điện toán đám mây và Kiến trúc phần mềm hiện đại
            cùng các chuyên gia công nghệ hàng đầu tại Việt Nam.
          </p>

          <Row className="g-3 text-start mb-4 justify-content-center">
            <Col sm={6}>
              <div className="p-3 bg-light rounded h-100">
                <span className="fw-bold text-dark d-block">📅 Thời gian:</span>
                <span className="text-secondary">Thứ Bảy, ngày 28 tháng 11 năm 2026</span>
              </div>
            </Col>
            <Col sm={6}>
              <div className="p-3 bg-light rounded h-100">
                <span className="fw-bold text-dark d-block">📍 Địa điểm:</span>
                <span className="text-secondary">Hội trường Gamma, FPT University Campus Hà Nội</span>
              </div>
            </Col>
          </Row>

          <Button
            variant="primary"
            size="lg"
            className="px-5 py-2 fw-semibold"
            onClick={() => navigate('/register')}
          >
            Đăng ký tham gia ngay
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
