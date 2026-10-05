import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';

const ThemeAuthDemoPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isLoggedIn, login, logout } = useAuth();

  return (
    <div className="d-flex flex-column gap-4">
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold text-primary">Demo 1: ThemeContext (Chế độ màu Sáng / Tối)</h5>
          <Button variant={theme === 'dark' ? 'warning' : 'dark'} size="sm" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Chuyển sang Dark Mode' : '☀️ Chuyển sang Light Mode'}
          </Button>
        </Card.Header>
        <Card.Body>
          <p>
            Trạng thái hiện tại: <strong>{theme.toUpperCase()}</strong>. Thuộc tính{' '}
            <code>data-bs-theme="{theme}"</code> được áp dụng tự động cho toàn bộ component con nhờ{' '}
            <code>ThemeContext</code>.
          </p>
          <div className="p-3 border rounded bg-body-tertiary">
            <h6>Thử nghiệm giao diện lồng nhau:</h6>
            <p className="text-secondary small mb-2">
              Các thẻ Bootstrap như Card, Table, Form Control đều tự động chuyển đổi bảng màu mà không
              cần CSS thủ công.
            </p>
            <Button variant="outline-primary" size="sm">
              Button mẫu Bootstrap
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Card className="shadow-sm border-0">
        <Card.Header className="bg-white py-3">
          <h5 className="mb-0 fw-bold text-primary">Demo 2: AuthContext (Phiên đăng nhập toàn cục)</h5>
        </Card.Header>
        <Card.Body>
          {isLoggedIn ? (
            <Alert variant="success" className="d-flex justify-content-between align-items-center">
              <div>
                <Alert.Heading as="h5" className="mb-1">
                  Đã đăng nhập thành công!
                </Alert.Heading>
                <p className="mb-0">
                  Tài khoản: <strong>{user.email}</strong> (Tên hiển thị: {user.name})
                </p>
              </div>
              <Button variant="outline-success" size="sm" onClick={logout}>
                Đăng xuất
              </Button>
            </Alert>
          ) : (
            <div>
              <p className="text-muted mb-3">
                Chưa có phiên đăng nhập. Hãy điền form bên dưới để kích hoạt AuthContext:
              </p>
              <LoginForm onLoginSuccess={login} />
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ThemeAuthDemoPage;
