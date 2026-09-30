import { useReducer } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import {
  COURSES,
  SCHEDULES,
  STEPS,
  wizardReducer,
  initWizard,
} from './wizardReducer';

const formatVND = (n) =>
  n.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

export default function CourseWizard({ initialCourseId = 'react' }) {
  // useReducer(reducer, đối số ban đầu, hàm init)
  const [state, dispatch] = useReducer(wizardReducer, initialCourseId, initWizard);
  const { step, maxVisited, values, errors, submitted } = state;
  const course = COURSES.find((c) => c.id === values.courseId);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch({
      type: 'CHANGE',
      payload: { name, value: type === 'checkbox' ? checked : value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: step === STEPS.length - 1 ? 'SUBMIT' : 'NEXT' });
  };

  if (submitted) {
    return (
      <Card className="shadow-sm border-0 mb-4 mx-auto" style={{ maxWidth: 600 }}>
        <Card.Body className="p-4 text-center">
          <Alert variant="success" className="py-4">
            <h4 className="alert-heading fw-bold mb-3">🎉 Đăng ký thành công!</h4>
            <p className="mb-2 fs-5">
              Học viên: <strong>{values.fullName}</strong>
            </p>
            <p className="mb-2 text-muted">
              Khóa học: <strong>{course?.name}</strong> • Lịch học:{' '}
              <strong>{values.schedule}</strong>
            </p>
            <p className="mb-4">
              Học phí:{' '}
              <strong className="text-success fs-5">
                {course ? formatVND(course.fee) : ''}
              </strong>
            </p>
            <Button
              variant="success"
              size="lg"
              className="px-4 fw-semibold"
              onClick={() => dispatch({ type: 'RESET', payload: initialCourseId })}
            >
              ↻ Đăng ký khóa học khác
            </Button>
          </Alert>
        </Card.Body>
      </Card>
    );
  }

  const field = (name, label, type = 'text', placeholder = '') => (
    <Form.Group className="mb-3" controlId={`wz-${name}`}>
      <Form.Label className="fw-semibold">{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        placeholder={placeholder}
        value={values[name]}
        onChange={handleChange}
        isInvalid={Boolean(errors[name])}
      />
      <Form.Control.Feedback type="invalid">{errors[name]}</Form.Control.Feedback>
    </Form.Group>
  );

  return (
    <Card className="shadow-sm border-0 mb-4 mx-auto" style={{ maxWidth: 620 }}>
      <Card.Header className="bg-primary text-white py-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="mb-0 fw-semibold">Bài 4: Đăng ký khóa học nhiều bước</h5>
          <Badge bg="light" text="primary" className="fw-bold">
            Bước {step + 1} / {STEPS.length}
          </Badge>
        </div>
        <Nav variant="pills" className="bg-dark bg-opacity-25 p-1 rounded">
          {STEPS.map((label, i) => (
            <Nav.Item key={label} className="flex-fill text-center">
              <Nav.Link
                active={i === step}
                disabled={i > maxVisited}
                className={`py-1 text-white ${i === step ? 'bg-white text-primary fw-bold' : ''}`}
                style={{ cursor: i <= maxVisited ? 'pointer' : 'not-allowed' }}
                onClick={() => dispatch({ type: 'GO_TO', payload: i })}
              >
                {`${i + 1}. ${label}`}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Card.Header>
      <Card.Body className="p-4">
        <p className="text-muted small mb-4">
          Quản lý form wizard với hàm khởi tạo lười <code>init(initialCourseId)</code>. Bấm bước trên thanh điều hướng để nhảy tới bước đã từng đi qua.
        </p>

        <Form noValidate onSubmit={handleSubmit}>
          {step === 0 && (
            <div className="fade show">
              {field('fullName', 'Họ và tên', 'text', 'Ví dụ: Nguyễn Văn An')}
              {field('email', 'Địa chỉ Email', 'email', 'Ví dụ: an.nv@gmail.com')}
              {field('phone', 'Số điện thoại', 'tel', 'Ví dụ: 0987654321 (10 số, bắt đầu 0)')}
            </div>
          )}

          {step === 1 && (
            <div className="fade show">
              <Form.Group className="mb-3" controlId="wz-courseId">
                <Form.Label className="fw-semibold">Lựa chọn khóa học:</Form.Label>
                <Form.Select
                  name="courseId"
                  value={values.courseId}
                  onChange={handleChange}
                  isInvalid={Boolean(errors.courseId)}
                >
                  <option value="">-- Vui lòng chọn khóa học --</option>
                  {COURSES.map(({ id, name, fee }) => (
                    <option key={id} value={id}>
                      {`${name} — ${formatVND(fee)}`}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.courseId}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="d-block fw-semibold">Lịch học mong muốn:</Form.Label>
                {SCHEDULES.map((s, i) => (
                  <Form.Check
                    inline
                    key={s}
                    type="radio"
                    id={`wz-schedule-${i}`}
                    name="schedule"
                    label={s}
                    value={s}
                    checked={values.schedule === s}
                    onChange={handleChange}
                    isInvalid={Boolean(errors.schedule)}
                  />
                ))}
                {errors.schedule && (
                  <div className="text-danger small mt-1">{errors.schedule}</div>
                )}
              </Form.Group>
            </div>
          )}

          {step === 2 && (
            <div className="fade show">
              <h6 className="fw-bold mb-3">Tóm tắt thông tin đăng ký:</h6>
              <ListGroup className="mb-4">
                <ListGroup.Item className="d-flex justify-content-between">
                  <span className="text-muted">Họ và tên:</span>
                  <strong>{values.fullName}</strong>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span className="text-muted">Liên hệ:</span>
                  <span>{`${values.email} • ${values.phone}`}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span className="text-muted">Khóa học & Lịch:</span>
                  <strong>{`${course?.name ?? ''} (${values.schedule})`}</strong>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between bg-light">
                  <span className="fw-bold">Học phí:</span>
                  <span className="fw-bold text-success fs-5">
                    {course ? formatVND(course.fee) : ''}
                  </span>
                </ListGroup.Item>
              </ListGroup>

              <Form.Check
                id="wz-agree"
                name="agree"
                className="mb-4"
                label={<strong>Tôi xác nhận thông tin trên là chính xác</strong>}
                checked={values.agree}
                onChange={handleChange}
                isInvalid={Boolean(errors.agree)}
                feedback={errors.agree}
                feedbackType="invalid"
              />
            </div>
          )}

          <div className="d-flex justify-content-between pt-3 border-top">
            <Button
              variant="outline-secondary"
              disabled={step === 0}
              onClick={() => dispatch({ type: 'BACK' })}
            >
              ← Quay lại
            </Button>
            <Button
              type="submit"
              variant={step === STEPS.length - 1 ? 'success' : 'primary'}
              className="fw-semibold px-4"
            >
              {step === STEPS.length - 1 ? 'Xác nhận đăng ký ✓' : 'Tiếp tục →'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
