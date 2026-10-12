import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <Container>
      <Card className="border-0 shadow-sm p-4 p-md-5 bg-light mb-4">
        <Card.Body className="text-center py-4">
          <Badge bg="primary" className="px-3 py-2 fs-6 mb-3">
            Frontend Web Developer
          </Badge>
          <h1 className="display-5 fw-bold mb-3 text-dark">
            Xin chào, tôi là Hoàng Bảo (HoangHTB)!
          </h1>
          <p className="lead text-secondary mb-4 mx-auto" style={{ maxWidth: '650px' }}>
            Sinh viên chuyên ngành Kỹ thuật phần mềm tại FPT University. Đam mê xây dựng
            ứng dụng web hiện đại, tối ưu hiệu năng và nâng cao trải nghiệm người dùng với
            React, React Router và hệ sinh thái Front-End.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Button as={Link} to="/projects" variant="primary" size="lg" className="px-4">
              Xem dự án của mình
            </Button>
            <Button as={Link} to="/contact" variant="outline-dark" size="lg" className="px-4">
              Liên hệ ngay
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
