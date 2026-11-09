import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { addStudent, updateStudent } from '../features/students/studentsSlice';

const EMPTY = { code: '', name: '', email: '', gpa: '', major: 'SE' };

export default function StudentFormModal({ show, onHide, editing }) {
  const dispatch = useDispatch();
  const saving = useSelector((state) => state.students.saving);
  const [form, setForm] = useState(() =>
    editing ? { ...editing, gpa: String(editing.gpa) } : EMPTY
  );
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const e = {};
    if (!/^[A-Z]{2}\d{6}$/i.test(form.code)) {
      e.code = 'Mã SV dạng HE170001 (2 chữ cái + 6 chữ số)';
    }
    if (form.name.trim().length < 2) {
      e.name = 'Họ tên tối thiểu 2 ký tự';
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      e.email = 'Email không hợp lệ (ví dụ: an@fpt.edu.vn)';
    }
    const gpa = Number(form.gpa);
    if (form.gpa === '' || isNaN(gpa) || gpa < 0 || gpa > 10) {
      e.gpa = 'GPA từ 0 đến 10';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const data = {
      ...form,
      code: form.code.toUpperCase().trim(),
      name: form.name.trim(),
      email: form.email.trim(),
      gpa: Number(form.gpa),
    };

    try {
      if (editing) {
        await dispatch(updateStudent(data)).unwrap();
      } else {
        await dispatch(addStudent(data)).unwrap();
      }
      onHide(); // chỉ đóng khi thành công
    } catch (err) {
      setServerError(err); // err = giá trị rejectWithValue
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={handleSubmit} noValidate>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? 'Sửa sinh viên' : 'Thêm sinh viên'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {serverError && (
            <Alert variant="danger" className="py-2 small">
              {serverError}
            </Alert>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Mã Sinh Viên *</Form.Label>
            <Form.Control
              name="code"
              placeholder="VD: HE170001"
              value={form.code}
              onChange={handleChange}
              isInvalid={!!errors.code}
              disabled={!!editing}
            />
            <Form.Control.Feedback type="invalid">
              {errors.code}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Họ và Tên *</Form.Label>
            <Form.Control
              name="name"
              placeholder="VD: Nguyễn Văn An"
              value={form.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email FPT *</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="an@fpt.edu.vn"
              value={form.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex gap-2">
            <Form.Group className="flex-fill">
              <Form.Label>Điểm GPA (0-10) *</Form.Label>
              <Form.Control
                name="gpa"
                type="number"
                step="0.1"
                min="0"
                max="10"
                placeholder="VD: 8.5"
                value={form.gpa}
                onChange={handleChange}
                isInvalid={!!errors.gpa}
              />
              <Form.Control.Feedback type="invalid">
                {errors.gpa}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="flex-fill">
              <Form.Label>Chuyên ngành</Form.Label>
              <Form.Select
                name="major"
                value={form.major}
                onChange={handleChange}
              >
                <option value="SE">SE – Kỹ thuật phần mềm</option>
                <option value="AI">AI – Trí tuệ nhân tạo</option>
                <option value="IA">IA – An toàn thông tin</option>
              </Form.Select>
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Hủy
          </Button>
          <Button variant="primary" type="submit" disabled={saving}>
            {saving && <Spinner size="sm" className="me-2" />}
            {editing ? 'Lưu thay đổi' : 'Thêm mới'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
