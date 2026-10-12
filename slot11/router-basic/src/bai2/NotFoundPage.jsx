import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Card className="border-0 shadow-sm p-5 text-center my-4 mx-auto" style={{ maxWidth: '600px' }}>
      <Card.Body>
        <div className="display-3 fw-bold text-danger mb-3">404</div>
        <h3 className="fw-bold text-dark mb-2">Không tìm thấy trang</h3>
        <p className="text-secondary mb-4">
          Tài nguyên hoặc mục bạn yêu cầu trong Thư viện FPT không tồn tại.
        </p>
        <Button as={Link} to="/" variant="primary">
          Về trang chủ thư viện
        </Button>
      </Card.Body>
    </Card>
  );
}
