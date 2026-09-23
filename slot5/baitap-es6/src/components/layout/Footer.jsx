import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { APP_NAME } from '../../data/menu';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row className="gy-3 align-items-center">
          <Col md={6} className="text-center text-md-start">
            <h5 className="text-warning mb-1">⚡ {APP_NAME}</h5>
            <p className="text-muted small mb-0">
              Hệ thống bán lẻ phụ kiện công nghệ chính hãng hàng đầu cho sinh viên FPT.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <p className="text-secondary small mb-0">
              {`© ${currentYear} ${APP_NAME}. Bảo lưu mọi quyền.`}
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
