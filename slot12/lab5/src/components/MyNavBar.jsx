import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

export default function MyNavBar() {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand as={NavLink} to="/">
                    Online Quiz App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {/* to="/" với end để chỉ active khi đúng trang chủ */}
                        <Nav.Link as={NavLink} to="/" end>
                            Home
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/news">
                            News
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/quiz">
                            Quiz
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/products">
                            Products
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/about">
                            About
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/contact">
                            Contact
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}