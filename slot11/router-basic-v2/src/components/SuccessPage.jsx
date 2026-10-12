import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) {
    return <Navigate to="/register" replace />;
  }

  return (
    <div className="py-4" style={{ maxWidth: '500px' }}>
      <Card className="text-center">
        <Card.Body>
          <h4 className="text-success">Đăng ký thành công!</h4>
          <p>Cảm ơn <strong>{data.name}</strong>, vé đã gửi tới email <strong>{data.email}</strong>.</p>
          <p>Buổi tham dự: <strong>{data.session}</strong></p>
          <div className="d-flex justify-content-center gap-2">
            <Button variant="outline-primary" onClick={() => navigate('/register', { replace: true })}>
              Đăng ký thêm
            </Button>
            <Button variant="primary" onClick={() => navigate('/event')}>
              Về trang sự kiện
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
