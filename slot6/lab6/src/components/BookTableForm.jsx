import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const BookTableForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-5">
      <Container>
        <h2 className="book-table-title">Book Your Table</h2>
        {submitted && (
          <Alert
            variant="success"
            className="mb-4 text-center"
            onClose={() => setSubmitted(false)}
            dismissible
          >
            🎉 Thank you! Your table booking request has been submitted successfully.
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Row className="g-3 mb-3">
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Your Name *"
                required
                className="py-2 bg-white"
              />
            </Col>
            <Col md={4}>
              <Form.Control
                type="email"
                placeholder="Your Email *"
                required
                className="py-2 bg-white"
              />
            </Col>
            <Col md={4}>
              <Form.Select className="py-2 bg-white" defaultValue="">
                <option value="" disabled>
                  Select a Service
                </option>
                <option value="dine-in">Dine In (Table for 2-4)</option>
                <option value="party">Family & Friends Party</option>
                <option value="birthday">Birthday Celebration</option>
                <option value="takeaway">Take Away Delivery</option>
              </Form.Select>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col xs={12}>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Please write your comment"
                className="bg-white"
              />
            </Col>
          </Row>

          <div className="d-flex justify-content-start">
            <Button type="submit" className="btn-send-message">
              Send Message
            </Button>
          </div>
        </Form>
      </Container>
    </section>
  );
};

export default BookTableForm;
