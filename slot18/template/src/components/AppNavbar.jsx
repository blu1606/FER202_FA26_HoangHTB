import { Badge, Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

/**
 * ===================== AppNavbar – TODO-01 (0.5) · TODO-02 (1.0) · TODO-03 (0.5) =====================
 * ĐÃ CÓ SẴN: khung Navbar, Brand (về "/"), link "Thực đơn", "Đặt bàn", menu "Quản trị" cho admin,
 *            các hook useAuth / useCart / useToast / useNavigate, biến initial và khung hàm handleLogout.
 *
 * TODO-01  Link "Giỏ món" (/cart) dùng Nav.Link as={NavLink}; CHỈ KHI totalQuantity > 0 mới hiện
 *          <Badge bg="warning" text="dark" pill data-testid="cart-badge">{totalQuantity}</Badge>.
 * TODO-02  Tính initial = chữ cái đầu (viết hoa) của TỪ CUỐI trong họ tên: "Nguyễn Văn An" → "A".
 *          Đã đăng nhập: <span className="badge rounded-circle bg-light text-success" data-testid="avatar">{initial}</span>
 *          + <span>{user.fullName}</span> + nút "Đăng xuất" (outline-light, sm) gọi handleLogout.
 *          Thân handleLogout: logout() → showToast('Đã đăng xuất', 'secondary') → navigate('/').
 * TODO-03  Chưa đăng nhập: nút "Đăng nhập" (as={Link} to="/login") và "Tạo tài khoản" (as={Link} to="/register").
 * =======================================================================================================
 */
export default function AppNavbar() {
  const { user, isAdmin, logout } = useAuth();
  const { totalQuantity } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // TODO-02: chữ cái đầu của TỪ CUỐI trong user.fullName (viết hoa), chưa đăng nhập → ''
  const initial = user ? user.fullName.trim().split(' ').pop().charAt(0).toUpperCase() : '';

  const handleLogout = () => {
    logout();
    showToast('Đã đăng xuất', 'secondary');
    navigate('/');
  };

  return (
    <Navbar bg="success" variant="dark" expand="md" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          🍜 FPT Food Mini
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/dishes">
              Thực đơn
            </Nav.Link>
            <Nav.Link as={NavLink} to="/reservation">
              Đặt bàn
            </Nav.Link>

            {/* TODO-01: Nav.Link "Giỏ món" (/cart) + Badge cart-badge (chỉ khi totalQuantity > 0) */}
            <Nav.Link as={NavLink} to="/cart">
              Giỏ món{' '}
              {totalQuantity > 0 && (
                <Badge bg="warning" text="dark" pill data-testid="cart-badge">
                  {totalQuantity}
                </Badge>
              )}
            </Nav.Link>

            {isAdmin && (
              <NavDropdown title="Quản trị" id="admin-menu">
                <NavDropdown.Item as={Link} to="/admin/orders">
                  Đơn hàng
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>

          {user ? (
            <div className="d-flex align-items-center gap-2 text-white">
              {/* TODO-02: avatar (data-testid="avatar") + họ tên + nút "Đăng xuất" */}
              <span className="badge rounded-circle bg-light text-success" data-testid="avatar">{initial}</span>
              <span>{user.fullName}</span>
              <Button variant="outline-light" size="sm" onClick={handleLogout}>Đăng xuất</Button>
            </div>
          ) : (
            <div className="d-flex gap-2">
              <Button as={Link} to="/login" variant="outline-light" size="sm">Đăng nhập</Button>
              <Button as={Link} to="/register" variant="warning" size="sm">Tạo tài khoản</Button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
