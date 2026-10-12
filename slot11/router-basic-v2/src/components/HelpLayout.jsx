import Nav from 'react-bootstrap/Nav';
import { NavLink, Outlet } from 'react-router-dom';

export default function HelpLayout() {
  return (
    <div className="py-3">
      <h4>Hướng dẫn độc giả</h4>
      <Nav variant="tabs" className="mb-3">
        <Nav.Item>
          <Nav.Link as={NavLink} to="faq">
            FAQ
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="rules">
            Nội quy
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Outlet />
    </div>
  );
}
