import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Container>
      <div className="mb-4">
        <h3 className="fw-bold text-primary mb-1">Liên hệ với tôi</h3>
        <p className="text-secondary mb-0">Hãy để lại lời nhắn hoặc liên hệ trực tiếp qua các kênh thông tin</p>
      </div>
      <Row className="g-4">
        <Col md={5}>
          <Card className="border-0 shadow-sm h-100 bg-light">
            <Card.Body className="p-4">
              <h5 className="fw-bold text-dark mb-3">Thông tin liên lạc</h5>
              <p className="text-secondary mb-2">
                📍 <strong>Địa chỉ:</strong> FPT University Campus, Hòa Lạc, Hà Nội
              </p>
              <p className="text-secondary mb-2">
                📧 <strong>Email:</strong> hoanghtb@fpt.edu.vn
              </p>
              <p className="text-secondary mb-2">
                📱 <strong>Điện thoại:</strong> +84 987 654 321
              </p>
              <p className="text-secondary mb-0">
                🌐 <strong>GitHub:</strong> github.com/blu1606
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={7}>
          <Card className="border-0 shadow-sm p-4">
            <Card.Body>
              {submitted ? (
                <Alert variant="success" className="mb-0">
                  🎉 Cảm ơn bạn đã gửi liên hệ! Tôi sẽ phản hồi sớm nhất có thể.
                </Alert>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Họ và tên</Form.Label>
                    <Form.Control type="text" placeholder="Nhập tên của bạn" required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Email</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Nội dung tin nhắn</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Tin nhắn của bạn..." required />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="px-4">
                    Gửi tin nhắn
                  </Button>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
