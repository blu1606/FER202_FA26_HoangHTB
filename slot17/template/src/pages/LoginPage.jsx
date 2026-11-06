import { useState } from 'react';
import { Alert, Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { validateLogin } from '../utils/validation';

/**
 * Trang đăng nhập – CÓ SẴN, KHÔNG sửa file này.
 * Có thể tham khảo cách làm form + validation ở đây khi làm TODO-12.
 */
export default function LoginPage() {
  const { isLoggedIn, login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [values, setValues] = useState({ email: location.state?.email ?? '', password: '' });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  if (isLoggedIn) return <Navigate to="/cars" replace />;

  const errors = validateLogin(values);
  const showError = (name) => (touched[name] || submitted ? errors[name] : undefined);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setServerError('');
  };
  const handleBlur = (e) => setTouched((prev) => ({ ...prev, [e.target.name]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length > 0) return;
    setSubmitting(true);
    try {
      const { user, token } = await authApi.login(values.email.trim(), values.password);
      login(user, token);
      showToast(`Xin chào ${user.fullName}`);
      navigate(location.state?.from?.pathname ?? '/cars', { replace: true });
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Row className="justify-content-center">
      <Col md={7} lg={5}>
        <Card>
          <Card.Body>
            <h3 className="text-center mb-3">Đăng nhập</h3>
            {serverError && <Alert variant="danger">{serverError}</Alert>}
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="login-email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={Boolean(showError('email'))}
                />
                <Form.Control.Feedback type="invalid">{showError('email')}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="login-password">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={Boolean(showError('password'))}
                />
                <Form.Control.Feedback type="invalid">{showError('password')}</Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" className="w-100" disabled={submitting}>
                {submitting && <Spinner size="sm" className="me-2" />}
                Đăng nhập
              </Button>
            </Form>
            <p className="text-center small mt-3 mb-0">
              Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
            </p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
