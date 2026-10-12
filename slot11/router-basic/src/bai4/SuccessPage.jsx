import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';

export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  // Nếu người dùng gõ thẳng URL /success mà không có state, tự redirect an toàn về /register
  if (!data) {
    return <Navigate to="/register" replace />;
  }

  return (
    <Container className="py-4">
      <Card className="border-0 shadow-sm p-4 p-md-5 mx-auto text-center" style={{ maxWidth: '650px' }}>
        <Card.Body>
          <div className="fs-1 mb-3">🎉</div>
          <Badge bg="success" className="px-3 py-2 fs-6 mb-3">
            ĐĂNG KÝ THÀNH CÔNG
          </Badge>
          <h2 className="fw-bold text-dark mb-3">
            Cảm ơn {data.name}!
          </h2>
          <p className="lead text-secondary mb-4">
            Vé tham dự sự kiện <strong>FPTU Tech Day 2026</strong> đã được gửi tới hòm thư:{' '}
            <span className="text-primary fw-semibold">{data.email}</span>.
          </p>

          <div className="p-3 bg-light rounded text-start mb-4 mx-auto" style={{ maxWidth: '480px' }}>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">Người tham dự:</span>
              <span className="fw-bold text-dark">{data.name}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">Địa chỉ email:</span>
              <span className="fw-bold text-dark">{data.email}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="text-secondary">Buổi tham gia:</span>
              <Badge bg="info" className="text-dark">{data.session}</Badge>
            </div>
          </div>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Button
              variant="outline-primary"
              onClick={() => navigate('/register', { replace: true })}
            >
              Đăng ký thêm người khác
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate('/')}
            >
              Về trang sự kiện
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
