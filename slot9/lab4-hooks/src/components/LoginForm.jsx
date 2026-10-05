import { useReducer } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { loginReducer, initialLoginState, validateLogin } from '../reducers/loginReducer';

const DEMO_ACCOUNT = { email: 'admin@fpt.edu.vn', password: '12345678' };

// Giả lập gọi API mất 1 giây
const fakeLoginApi = ({ email, password }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === DEMO_ACCOUNT.email && password === DEMO_ACCOUNT.password) resolve(email);
      else reject(new Error('Email hoặc mật khẩu không đúng'));
    }, 1000);
  });

const LoginForm = ({ onLoginSuccess }) => {
  const [state, dispatch] = useReducer(loginReducer, initialLoginState);
  const { values, errors, touched, status, message } = state;
  const isSubmitting = status === 'submitting';

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    dispatch({ type: 'CHANGE_FIELD', payload: { name, value: type === 'checkbox' ? checked : value } });
  };

  const handleBlur = (event) => dispatch({ type: 'BLUR_FIELD', payload: event.target.name });

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: 'SUBMIT' });
    // state chưa đổi ngay sau dispatch → tự kiểm tra lại bằng values hiện tại
    if (Object.keys(validateLogin(values)).length > 0) return;

    try {
      const email = await fakeLoginApi(values);
      dispatch({ type: 'LOGIN_SUCCESS', payload: email });
      onLoginSuccess?.(email);
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
    }
  };

  if (status === 'success') {
    return (
      <Alert variant="success" className="mx-auto shadow-sm border-0" style={{ maxWidth: 440 }}>
        <Alert.Heading as="h5">Đăng nhập thành công!</Alert.Heading>
        <p className="mb-3">{message}</p>
        <Button size="sm" variant="outline-success" onClick={() => dispatch({ type: 'RESET' })}>
          Đăng nhập lại
        </Button>
      </Alert>
    );
  }

  return (
    <Card className="shadow-sm border-0 mx-auto" style={{ maxWidth: 440 }}>
      <Card.Header className="bg-white py-3">
        <h5 className="mb-0 fw-bold text-primary">Đăng nhập tài khoản</h5>
      </Card.Header>
      <Card.Body>
        {status === 'error' && <Alert variant="danger">{message}</Alert>}

        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="login-email">
            <Form.Label className="fw-semibold">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="name@fpt.edu.vn"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.email && Boolean(errors.email)}
              isValid={touched.email && !errors.email}
              disabled={isSubmitting}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="login-password">
            <Form.Label className="fw-semibold">Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Nhập ít nhất 8 ký tự"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.password && Boolean(errors.password)}
              disabled={isSubmitting}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>

          <Form.Check
            className="mb-3"
            id="login-remember"
            name="remember"
            label="Ghi nhớ đăng nhập"
            checked={values.remember}
            onChange={handleChange}
            disabled={isSubmitting}
          />

          <Button type="submit" variant="primary" className="w-100" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner size="sm" animation="border" className="me-2" /> Đang đăng nhập...
              </>
            ) : (
              'Đăng nhập'
            )}
          </Button>
          <div className="bg-light p-2 rounded mt-3 text-center border">
            <small className="text-muted d-block">
              Tài khoản thử nghiệm:
            </small>
            <code className="d-block small">{DEMO_ACCOUNT.email} / {DEMO_ACCOUNT.password}</code>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default LoginForm;
