import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink, Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold">
            📚 Thư viện FPT University
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="lib-navbar" />
          <Navbar.Collapse id="lib-navbar">
            <Nav className="ms-auto gap-2">
              <Nav.Link as={NavLink} to="/" end className="px-3 rounded">
                Trang chủ
              </Nav.Link>
              <Nav.Link as={NavLink} to="/books" className="px-3 rounded">
                Sách
              </Nav.Link>
              {/* Lưu ý: Không có prop 'end' để menu Hướng dẫn sáng cả khi ở /help/faq hoặc /help/rules */}
              <Nav.Link as={NavLink} to="/help" className="px-3 rounded">
                Hướng dẫn
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container as="main" className="flex-grow-1 mb-5">
        <Outlet />
      </Container>

      <footer className="bg-light py-3 border-top mt-auto text-center text-secondary small">
        <Container>
          © 2026 Thư viện FPT University - Hệ thống Quản trị & Tra cứu Học liệu Trực tuyến
        </Container>
      </footer>
    </div>
  );
}
