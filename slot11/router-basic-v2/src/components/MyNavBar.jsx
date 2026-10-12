import { Link, NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const MENU = [
  { to: '/', label: 'Trang chủ' },
  { to: '/skills', label: 'Kỹ năng' },
  { to: '/projects', label: 'Dự án' },
  { to: '/courses', label: 'Môn học' },
  { to: '/books', label: 'Sách' },
  { to: '/help', label: 'Hướng dẫn' },
  { to: '/event', label: 'Sự kiện' },
  { to: '/students', label: 'Sinh viên' },
  { to: '/contact', label: 'Liên hệ' },
];

export default function MyNavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <h1 className="h4 mb-0 text-white">NavBar!!</h1>
        </Navbar.Brand>
        <Nav className="ms-auto flex-wrap">
          {MENU.map((item) => (
            <Nav.Link
              key={item.to}
              as={NavLink}
              to={item.to}
              end={item.to === '/'}
            >
              {item.label}
            </Nav.Link>
          ))}
        </Nav>
      </Container>
    </Navbar>
  );
}