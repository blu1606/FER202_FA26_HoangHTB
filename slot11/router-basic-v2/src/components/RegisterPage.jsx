import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', session: 'Sáng' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('Vui lòng nhập họ và tên.');
      return;
    }
    if (!form.email.includes('@')) {
      setError('Email không hợp lệ.');
      return;
    }

    navigate('/success', {
      state: { name: form.name.trim(), email: form.email.trim(), session: form.session },
      replace: true,
    });
  };

  return (
    <div className="py-4" style={{ maxWidth: '500px' }}>
      <h4>Đăng ký tham gia sự kiện</h4>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Họ và tên</Form.Label>
          <Form.Control name="name" value={form.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" value={form.email} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Buổi tham dự</Form.Label>
          <Form.Select name="session" value={form.session} onChange={handleChange}>
            <option value="Sáng">Buổi Sáng</option>
            <option value="Chiều">Buổi Chiều</option>
          </Form.Select>
        </Form.Group>
        <div className="d-flex gap-2">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Quay lại
          </Button>
          <Button variant="primary" type="submit">
            Gửi đăng ký
          </Button>
        </div>
      </Form>
    </div>
  );
}
