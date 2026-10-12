import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import { NavLink, Outlet } from 'react-router-dom';

export default function HelpLayout() {
  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-white py-3 border-0">
        <h3 className="fw-bold text-primary mb-1">Trung tâm Trợ giúp & Hướng dẫn Độc giả</h3>
        <p className="text-secondary small mb-3">
          Thông tin chi tiết về quy định mượn trả và các câu hỏi thường gặp khi sử dụng thư viện
        </p>

        {/* Link tương đối: to="faq" tương đương /help/faq, to="rules" tương đương /help/rules */}
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link as={NavLink} to="faq" className="fw-semibold px-4">
              Câu hỏi thường gặp
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="rules" className="fw-semibold px-4">
              Nội quy thư viện
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body className="p-4 bg-white border-top-0 rounded-bottom">
        <Outlet />
      </Card.Body>
    </Card>
  );
}
