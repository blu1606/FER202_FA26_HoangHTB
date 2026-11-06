import { useState } from 'react';
import { Alert, Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import userApi from '../api/userApi';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { EMPTY_REGISTER, validateRegister } from '../utils/validation';

/**
 * ===================== RegisterPage (/register) – TODO-12 (1.0) =====================
 * ĐÃ CÓ SẴN: state, errors = validateRegister(values), errorCount, handleChange, handleBlur, showError,
 *            ô "Họ tên" (MẪU), ô Số điện thoại, ô Nhập lại mật khẩu, checkbox điều khoản,
 *            Alert serverError, dòng "Còn x mục chưa hợp lệ", nút "Đăng ký" (có Spinner), link "Đăng nhập".
 *
 * TODO-12  1. Làm TƯƠNG TỰ ô Họ tên cho 2 ô:
 *             Email    (controlId "register-email",    name "email",    type "email")
 *             Mật khẩu (controlId "register-password", name "password", type "password")
 *          2. Viết thân handleSubmit:
 *             setSubmitted(true); errorCount > 0 → return (KHÔNG gọi API); setSubmitting(true);
 *             try   → await userApi.register({ fullName, email, phone, password }) (đã trim)
 *                     → showToast('Đăng ký thành công, vui lòng đăng nhập')
 *                     → navigate('/login', { state: { email } });
 *             catch → setServerError(err.message);  finally → setSubmitting(false).
 * =====================================================================================
 */
export default function RegisterPage() {
  const { isLoggedIn } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [values, setValues] = useState(EMPTY_REGISTER);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  if (isLoggedIn) return <Navigate to="/cars" replace />;

  const errors = validateRegister(values);
  const errorCount = Object.keys(errors).length;
  const showError = (name) => (touched[name] || submitted ? errors[name] : undefined);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setServerError('');
  };

  const handleBlur = (e) => setTouched((prev) => ({ ...prev, [e.target.name]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (errorCount > 0) return;            // còn lỗi → KHÔNG gọi API
    setSubmitting(true);
    try {
      await userApi.register({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        password: values.password,
      });
      showToast('Đăng ký thành công, vui lòng đăng nhập');
      navigate('/login', { state: { email: values.email.trim() } });
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Row className="justify-content-center">
      <Col md={8} lg={6}>
        <Card>
          <Card.Body>
            <h3 className="text-center mb-3">Đăng ký tài khoản</h3>

            {serverError && <Alert variant="danger">{serverError}</Alert>}

            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="register-fullName">
                <Form.Label>Họ tên *</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={Boolean(showError('fullName'))}
                />
                <Form.Control.Feedback type="invalid">{showError('fullName')}</Form.Control.Feedback>
              </Form.Group>

              {/* TODO-12: ô Email (register-email) – làm tương tự ô Họ tên */}
              <Form.Group className="mb-3" controlId="register-email">
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

              <Form.Group className="mb-3" controlId="register-phone">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="0901234567"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={Boolean(showError('phone'))}
                />
                <Form.Control.Feedback type="invalid">{showError('phone')}</Form.Control.Feedback>
              </Form.Group>

              {/* TODO-12: ô Mật khẩu (register-password) – làm tương tự ô Họ tên */}
              <Form.Group className="mb-3" controlId="register-password">
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
              <Form.Group className="mb-3" controlId="register-confirmPassword">
                <Form.Label>Nhập lại mật khẩu *</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={Boolean(showError('confirmPassword'))}
                />
                <Form.Control.Feedback type="invalid">{showError('confirmPassword')}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="register-agree">
                <Form.Check
                  name="agree"
                  label="Tôi đồng ý với điều khoản"
                  checked={values.agree}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={Boolean(showError('agree'))}
                  feedback={showError('agree')}
                  feedbackType="invalid"
                />
              </Form.Group>

              {submitted && errorCount > 0 && (
                <Form.Text className="text-danger d-block mb-2">Còn {errorCount} mục chưa hợp lệ</Form.Text>
              )}

              <Button type="submit" className="w-100" disabled={submitting}>
                {submitting && <Spinner size="sm" className="me-2" />}
                Đăng ký
              </Button>
            </Form>

            <p className="text-center small mt-3 mb-0">
              Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
            </p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
