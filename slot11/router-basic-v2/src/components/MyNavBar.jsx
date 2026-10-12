import { Link, NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const MENU = [
    { to: '/', label: 'Trang chủ' },
    { to: '/skills', label: 'Kỹ năng' },
    { to: '/projects', label: 'Dự án' },
    { to: '/contact', label: 'Liên hệ' },
    { to: '/courses', label: 'Khoá học' }
];

export default function MyNavBar() {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <h1>NavBar!!</h1>
                </Navbar.Brand>
            </Container>
            <Nav>
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
        </Navbar>

    )
}