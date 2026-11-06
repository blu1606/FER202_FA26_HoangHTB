import { Badge, Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

/**
 * ===================== AppNavbar – TODO-01 (0.5) · TODO-02 (1.0) · TODO-03 (0.5) =====================
 * ĐÃ CÓ SẴN: khung Navbar, Brand (về "/"), link "Danh sách xe", menu "Quản trị" cho admin,
 *            các hook useAuth / useCart / useToast / useNavigate và khung hàm handleLogout.
 *
 * TODO-01  Link "Giỏ hàng" (/cart) dùng Nav.Link as={NavLink} kèm
 *          <Badge bg="warning" text="dark" pill data-testid="cart-badge">{totalQuantity}</Badge>.
 * TODO-02  Đã đăng nhập: <span>Xin chào, {user.fullName}</span> + nút "Đăng xuất" (outline-light, sm) gọi handleLogout.
 *          Thân handleLogout: logout() → showToast('Đã đăng xuất', 'info') → navigate('/').
 * TODO-03  Chưa đăng nhập: nút "Đăng nhập" (as={Link} to="/login") và "Đăng ký" (as={Link} to="/register").
 * =======================================================================================================
 */
export default function AppNavbar() {
  const { user, isAdmin, logout } = useAuth();
  const { totalQuantity } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showToast('Đã đăng xuất', 'info');
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          🚗 AutoShop Mini
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/cars">
              Danh sách xe
            </Nav.Link>

            {/* TODO-01: Nav.Link "Giỏ hàng" (/cart) + Badge data-testid="cart-badge" hiển thị totalQuantity */}
            <Nav.Link as={NavLink} to="/cart">
              Giỏ hàng{' '}
              <Badge bg="warning" text="dark" pill data-testid="cart-badge">
                {totalQuantity}
              </Badge>
            </Nav.Link>

            {isAdmin && (
              <NavDropdown title="Quản trị" id="admin-menu">
                <NavDropdown.Item as={Link} to="/admin/users">
                  Quản lý người dùng
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>

          {user ? (
            <div className="d-flex align-items-center gap-2 text-white">
              {/* TODO-02: "Xin chào, {user.fullName}" + nút "Đăng xuất" */}
              <span>Xin chào, {user.fullName}</span> <Button variant="outline-light" size="sm" onClick={handleLogout}> Đăng xuất </Button>
            </div>
          ) : (
            <div className="d-flex gap-2">
              <Button as={Link} to="/login" variant="outline-light" size="sm">Đăng nhập</Button>
              <Button as={Link} to="/register" variant="warning" size="sm">Đăng ký</Button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
}
