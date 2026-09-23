import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputField from './InputField';
import AppButton from './AppButton';
import { fields, genders, majors } from '../data/registerConfig';

const RegisterForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="d-flex justify-content-center">
      <Card className="shadow-sm border-0 w-100" style={{ maxWidth: '600px' }}>
        <Card.Header className="bg-primary text-white text-center py-3">
          <h4 className="mb-0 fw-bold">Đăng ký tài khoản sinh viên</h4>
          <small className="opacity-75">
            Điền đầy đủ thông tin để kích hoạt hồ sơ học tập
          </small>
        </Card.Header>
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            {fields.map((field) => (
              <InputField key={field.id} {...field} />
            ))}

            <Form.Group className="mb-3">
              <Form.Label>
                Giới tính <span className="text-danger ms-1">*</span>
              </Form.Label>
              <div>
                {genders.map((gender, idx) => (
                  <Form.Check
                    key={gender}
                    inline
                    label={gender}
                    name="gender"
                    type="radio"
                    id={`gender-${gender}`}
                    defaultChecked={idx === 0}
                  />
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="major">
              <Form.Label>
                Chuyên ngành <span className="text-danger ms-1">*</span>
              </Form.Label>
              <Form.Select required defaultValue="">
                <option value="" disabled>
                  -- Chọn chuyên ngành --
                </option>
                {majors.map((major) => (
                  <option key={major} value={major}>
                    {major}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4" controlId="terms">
              <Form.Check
                type="checkbox"
                required
                label="Tôi đồng ý với các điều khoản dịch vụ và chính sách bảo mật"
              />
            </Form.Group>

            <AppButton type="submit" variant="primary" className="w-100 py-2 fw-semibold">
              Hoàn tất đăng ký
            </AppButton>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default RegisterForm;
