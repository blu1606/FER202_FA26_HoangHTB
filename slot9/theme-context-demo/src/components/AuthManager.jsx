import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export default function AuthManager() {
  const { user, isAuthenticated, login, logout } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [form, setForm] = useState({ username: 'admin', password: '123' });
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    const res = login(form.username, form.password);
    if (!res.success) {
      setError(res.message);
    }
  };

  return (
    <Card className="shadow-sm border-0 mb-4 overflow-hidden">
      <Card.Header className="bg-info text-dark d-flex justify-content-between align-items-center py-3">
        <div>
          <span className="fw-bold fs-5">Ví dụ 3: AuthContext — Quản lý Xác thực & Bảo vệ Nội dung</span>
          <div className="small text-dark-50">
            Lưu trạng thái phiên đăng nhập vào localStorage với lazy initializer, bảo vệ dashboard nội bộ
          </div>
        </div>
        <Badge bg={isAuthenticated ? 'success' : 'secondary'} className="fs-6 px-3 py-2">
          {isAuthenticated ? 'Đã đăng nhập' : 'Chưa đăng nhập'}
        </Badge>
      </Card.Header>

      <Card.Body className={`p-4 ${isDark ? 'bg-dark text-white' : 'bg-light'}`}>
        {!isAuthenticated ? (
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <div className={`p-4 rounded border shadow-sm ${isDark ? 'bg-black border-secondary' : 'bg-white'}`}>
                <div className="text-center mb-4">
                  <span className="fs-1">🔒</span>
                  <h5 className="fw-bold mt-2">Đăng nhập tài khoản</h5>
                  <p className={`small mb-0 ${isDark ? 'text-secondary' : 'text-muted'}`}>
                    Nhập tài khoản demo để kiểm tra luồng bảo vệ của AuthContext
                  </p>
                </div>

                {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-semibold">Tên đăng nhập</Form.Label>
                    <Form.Control
                      type="text"
                      value={form.username}
                      onChange={(e) => setForm({ ...form, username: e.target.value })}
                      placeholder="admin hoặc student"
                      className={isDark ? 'bg-dark text-white border-secondary' : ''}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-semibold">Mật khẩu</Form.Label>
                    <Form.Control
                      type="password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder="123"
                      className={isDark ? 'bg-dark text-white border-secondary' : ''}
                      required
                    />
                  </Form.Group>

                  <div className="d-grid mb-3">
                    <Button type="submit" variant="primary" className="fw-bold">
                      Đăng nhập ngay
                    </Button>
                  </div>

                  <div className="p-2 rounded bg-light border text-center small text-muted">
                    <span>Gợi ý: <strong>admin</strong> / <strong>123</strong> hoặc <strong>student</strong> / <strong>123</strong></span>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        ) : (
          <div className={`p-4 rounded border ${isDark ? 'bg-black border-secondary' : 'bg-white'}`}>
            <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 pb-3 border-bottom border-secondary-subtle mb-3">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '56px', height: '56px', fontSize: '24px' }}>
                  {user.role === 'Administrator' ? '👑' : '🎓'}
                </div>
                <div>
                  <div className="d-flex align-items-center gap-2">
                    <h5 className="fw-bold mb-0">{user.fullName}</h5>
                    <Badge bg={user.role === 'Administrator' ? 'danger' : 'primary'}>
                      {user.role}
                    </Badge>
                  </div>
                  <span className={`small ${isDark ? 'text-secondary' : 'text-muted'}`}>
                    {user.email} • Phiên bắt đầu: {user.loginAt}
                  </span>
                </div>
              </div>

              <Button variant="outline-danger" size="sm" onClick={logout} className="fw-semibold">
                🚪 Đăng xuất
              </Button>
            </div>

            <Row className="g-3">
              <Col md={4}>
                <div className={`p-3 rounded border text-center ${isDark ? 'bg-dark border-secondary' : 'bg-light'}`}>
                  <div className="fs-4 mb-1">🛡️</div>
                  <div className="fw-bold">Bảo vệ ProtectedView</div>
                  <small className={isDark ? 'text-secondary' : 'text-muted'}>
                    Nội dung chỉ hiển thị khi `isAuthenticated === true`
                  </small>
                </div>
              </Col>
              <Col md={4}>
                <div className={`p-3 rounded border text-center ${isDark ? 'bg-dark border-secondary' : 'bg-light'}`}>
                  <div className="fs-4 mb-1">💾</div>
                  <div className="fw-bold">Đồng bộ LocalStorage</div>
                  <small className={isDark ? 'text-secondary' : 'text-muted'}>
                    F5 tải lại trang vẫn giữ nguyên phiên đăng nhập
                  </small>
                </div>
              </Col>
              <Col md={4}>
                <div className={`p-3 rounded border text-center ${isDark ? 'bg-dark border-secondary' : 'bg-light'}`}>
                  <div className="fs-4 mb-1">⚡</div>
                  <div className="fw-bold">Quyền hạn truy cập</div>
                  <small className={isDark ? 'text-secondary' : 'text-muted'}>
                    {user.role === 'Administrator' ? 'Toàn quyền chỉnh sửa hệ thống' : 'Quyền xem và làm bài tập'}
                  </small>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
