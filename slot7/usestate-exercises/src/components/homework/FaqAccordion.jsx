import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { FAQS } from '../../data/homework-data';

function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="mb-2 shadow-sm border">
      <Card.Header
        role="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="d-flex justify-content-between align-items-center bg-white py-3"
        style={{ cursor: 'pointer' }}
      >
        <span className="fw-semibold text-dark">{question}</span>
        <span className="fs-5 text-primary fw-bold">{isOpen ? '−' : '+'}</span>
      </Card.Header>
      {isOpen && (
        <Card.Body className="bg-light text-secondary">
          {answer}
        </Card.Body>
      )}
    </Card>
  );
}

export default function FaqAccordion() {
  const [singleMode, setSingleMode] = useState(false);
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  const handleSwitchChange = (e) => {
    setSingleMode(e.target.checked);
    setOpenId(null);
  };

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Header className="bg-primary text-white py-3">
        <h5 className="mb-0 fw-semibold">HW 1: FAQ Accordion (Lifting State Up)</h5>
      </Card.Header>
      <Card.Body className="p-4">
        <p className="text-muted mb-3">
          Thực hành quản lý State độc lập theo component instance và kỹ thuật nâng state lên cha (Lifting state up).
        </p>

        <Stack direction="horizontal" gap={3} className="align-items-center mb-4 flex-wrap bg-light p-3 rounded border">
          <Form.Check
            type="switch"
            id="single-mode-switch"
            label={<strong>Chỉ mở một câu tại một thời điểm</strong>}
            checked={singleMode}
            onChange={handleSwitchChange}
          />
          <Button
            variant="outline-secondary"
            size="sm"
            disabled={!singleMode || openId === null}
            onClick={() => setOpenId(null)}
          >
            Đóng tất cả
          </Button>
        </Stack>

        {singleMode ? (
          <div>
            {FAQS.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <Card key={faq.id} className="mb-2 shadow-sm border">
                  <Card.Header
                    role="button"
                    onClick={() => handleToggle(faq.id)}
                    className="d-flex justify-content-between align-items-center bg-white py-3"
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="fw-semibold text-dark">{faq.question}</span>
                    <span className="fs-5 text-primary fw-bold">{isOpen ? '−' : '+'}</span>
                  </Card.Header>
                  {isOpen && (
                    <Card.Body className="bg-light text-secondary">
                      {faq.answer}
                    </Card.Body>
                  )}
                </Card>
              );
            })}
          </div>
        ) : (
          <div>
            {FAQS.map((faq) => (
              <FaqItem key={faq.id} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
