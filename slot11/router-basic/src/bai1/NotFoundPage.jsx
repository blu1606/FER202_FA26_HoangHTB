import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Container className="text-center py-5">
      <Card className="border-0 shadow-sm p-4 p-md-5 mx-auto" style={{ maxWidth: '600px' }}>
        <Card.Body>
          <div className="display-1 fw-bold text-danger mb-3">404</div>
          <h2 className="fw-bold mb-3 text-dark">Trang không tồn tại</h2>
          <p className="text-secondary mb-4">
            Đường dẫn bạn vừa truy cập không tồn tại hoặc đã được di chuyển. Vui lòng kiểm tra
            lại URL hoặc quay về trang chủ.
          </p>
          <Button as={Link} to="/" variant="primary" size="lg" className="px-4">
            Về trang chủ
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
