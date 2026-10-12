import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    session: 'Sáng (08:00 - 11:30)',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();

    if (!trimmedName) {
      setError('Vui lòng nhập họ và tên của bạn.');
      return;
    }

    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setError('Vui lòng nhập địa chỉ email hợp lệ (có chứa ký tự @).');
      return;
    }

    // Chuyển trang kèm state ngầm và replace: true
    navigate('/success', {
      state: {
        name: trimmedName,
        email: trimmedEmail,
        session: form.session,
      },
      replace: true,
    });
  };

  return (
    <Container className="py-4">
      <Card className="border-0 shadow-sm p-4 mx-auto" style={{ maxWidth: '600px' }}>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold text-primary mb-0">Đăng ký FPTU Tech Day 2026</h4>
            <Button variant="outline-secondary" size="sm" onClick={() => navigate(-1)}>
              ← Quay lại
            </Button>
          </div>
          <p className="text-secondary small mb-4">
            Vui lòng điền đầy đủ thông tin để nhận vé mời điện tử qua email.
          </p>

          {error && (
            <Alert variant="danger" className="py-2 small">
              ⚠️ {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Họ và tên <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ví dụ: Trần Bình An"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Email nhận vé <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="name@example.com"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Buổi tham dự</Form.Label>
              <Form.Select name="session" value={form.session} onChange={handleChange}>
                <option value="Sáng (08:00 - 11:30)">Buổi Sáng: Keynote & Xu hướng AI 2026 (08:00 - 11:30)</option>
                <option value="Chiều (13:30 - 17:00)">Buổi Chiều: Workshop & Networking (13:30 - 17:00)</option>
                <option value="Cả ngày (08:00 - 17:00)">Cả ngày: Toàn bộ chương trình (08:00 - 17:00)</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex gap-2">
              <Button variant="primary" type="submit" className="w-100 py-2 fw-semibold">
                Gửi đăng ký
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
