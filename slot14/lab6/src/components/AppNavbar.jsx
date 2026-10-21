import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

export default function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand as={Link} to="/">Exercise 27 · Nâng cao</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Axios Demo</Nav.Link>
            <Nav.Link as={NavLink} to="/http">HTTP Requests</Nav.Link>
            <Nav.Link as={NavLink} to="/posts" end>Bài viết</Nav.Link>
            <Nav.Link as={NavLink} to="/posts/new">+ Tạo bài viết</Nav.Link>
          </Nav>
          <Navbar.Text className="small">
            API: {import.meta.env.VITE_API_URL || "http://localhost:3001"}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
