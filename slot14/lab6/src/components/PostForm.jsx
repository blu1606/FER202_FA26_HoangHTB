import { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";

const validate = ({ title, body, userId }) => {
  const errors = {};
  if (title.trim().length < 5) errors.title = "Tiêu đề tối thiểu 5 ký tự";
  if (body.trim().length < 10) errors.body = "Nội dung tối thiểu 10 ký tự";
  if (!userId) errors.userId = "Chọn tác giả";
  return errors;
};

/**
 * Form dùng chung cho Tạo (POST) và Sửa (PUT)
 * - initialValues: { title, body, userId }
 * - onSubmit(values): async – trang cha gọi API
 */
export default function PostForm({ initialValues, users, submitting, submitLabel, onSubmit, onCancel }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    onSubmit({ ...values, title: values.title.trim(), body: values.body.trim(), userId: Number(values.userId) });
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Tiêu đề</Form.Label>
        <Form.Control name="title" value={values.title} onChange={handleChange} isInvalid={!!errors.title} />
        <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="body">
        <Form.Label>Nội dung</Form.Label>
        <Form.Control as="textarea" rows={5} name="body" value={values.body} onChange={handleChange} isInvalid={!!errors.body} />
        <Form.Control.Feedback type="invalid">{errors.body}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-4" controlId="userId">
        <Form.Label>Tác giả</Form.Label>
        <Form.Select name="userId" value={values.userId} onChange={handleChange} isInvalid={!!errors.userId}>
          <option value="">-- Chọn tác giả --</option>
          {users.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errors.userId}</Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" disabled={submitting} className="me-2">
        {submitting ? <><Spinner size="sm" /> Đang gửi...</> : submitLabel}
      </Button>
      <Button variant="outline-secondary" onClick={onCancel} disabled={submitting}>Hủy</Button>
    </Form>
  );
}
