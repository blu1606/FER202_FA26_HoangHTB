import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import InputField from './InputField';
import AppButton from './AppButton';
import { fields, genders, majors, initialValues } from '../data/registerConfig';

// Thông báo cho các ô nhập bắt buộc
const REQUIRED_MESSAGES = {
  fullName: 'Vui lòng nhập họ và tên',
  email: 'Vui lòng nhập email',
  password: 'Vui lòng nhập mật khẩu',
  confirmPassword: 'Vui lòng nhập lại mật khẩu',
};

// Kiểm tra dữ liệu khi submit, trả về object lỗi { tênTrường: 'thông báo' }
const validate = (values) => {
  const errors = {};
  Object.entries(REQUIRED_MESSAGES).forEach(([name, message]) => {
    if (!values[name].trim()) errors[name] = message;
  });
  if (values.confirmPassword && values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Mật khẩu nhập lại không khớp';
  }
  if (!values.major) errors.major = 'Vui lòng chọn chuyên ngành';
  if (!values.agree) errors.agree = 'Bạn cần đồng ý điều khoản';
  return errors;
};

const RegisterForm = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);

  // Một hàm cho mọi ô: dựa vào name + type của phần tử phát sinh sự kiện
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    // Người dùng đã sửa ô này → ẩn lỗi của riêng ô đó
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validate(values);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setSubmitted(null);
      return;
    }
    setSubmitted(values);
  };

  const handleReset = () => {
    setValues(initialValues);
    setErrors({});
    setSubmitted(null);
  };

  return (
    <Row className="justify-content-center">
      <Col md={8} lg={6}>
        <Card className="shadow-sm border-0">
          <Card.Header className="bg-white py-3">
            <h5 className="mb-0 fw-bold text-primary">Đăng ký tài khoản (Controlled Form)</h5>
          </Card.Header>
          <Card.Body>
            {/* noValidate: tắt bong bóng thông báo mặc định của trình duyệt */}
            <Form noValidate onSubmit={handleSubmit}>
              {fields.map((field) => (
                <InputField
                  key={field.id}
                  {...field}
                  name={field.id}
                  value={values[field.id]}
                  onChange={handleChange}
                  error={errors[field.id]}
                />
              ))}

              <Form.Group className="mb-3">
                <Form.Label className="d-block fw-semibold">Giới tính</Form.Label>
                {genders.map((gender) => (
                  <Form.Check
                    inline
                    key={gender}
                    type="radio"
                    name="gender"
                    id={`gender-${gender}`}
                    label={gender}
                    value={gender}
                    checked={values.gender === gender}
                    onChange={handleChange}
                  />
                ))}
              </Form.Group>

              <Form.Group className="mb-3" controlId="major">
                <Form.Label className="fw-semibold">
                  Chuyên ngành <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  name="major"
                  value={values.major}
                  onChange={handleChange}
                  isInvalid={Boolean(errors.major)}
                >
                  <option value="">-- Chọn chuyên ngành --</option>
                  {majors.map((major) => (
                    <option key={major}>{major}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.major}</Form.Control.Feedback>
              </Form.Group>

              <Form.Check
                className="mb-4"
                type="checkbox"
                id="agree"
                name="agree"
                label="Tôi đồng ý với các điều khoản dịch vụ"
                checked={values.agree}
                onChange={handleChange}
                isInvalid={Boolean(errors.agree)}
                feedback={errors.agree}
                feedbackType="invalid"
              />

              <div className="d-flex gap-2">
                <AppButton type="submit" className="flex-grow-1">
                  Đăng ký
                </AppButton>
                <AppButton variant="outline-secondary" onClick={handleReset}>
                  Làm lại
                </AppButton>
              </div>
            </Form>

            {submitted && (
              <Alert variant="success" className="mt-4 mb-0">
                <Alert.Heading as="h6">{`Đã nhận đăng ký của ${submitted.fullName}`}</Alert.Heading>
                <pre className="mb-0 small bg-white p-2 rounded border mt-2">
                  {JSON.stringify(submitted, null, 2)}
                </pre>
              </Alert>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default RegisterForm;
