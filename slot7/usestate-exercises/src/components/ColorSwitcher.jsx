import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { COLOR_OPTIONS } from '../data/exercise-data';

export default function ColorSwitcher() {
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0].value);

  const currentColor = COLOR_OPTIONS.find((c) => c.value === selectedColor) || COLOR_OPTIONS[0];

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Header className="bg-danger text-white py-3">
        <h5 className="mb-0 fw-semibold">Bài 5: Color Switcher</h5>
      </Card.Header>
      <Card.Body className="p-4">
        <p className="text-muted mb-3">
          Chọn màu sắc từ dropdown select để thay đổi màu nền của khối hiển thị bên dưới.
        </p>

        <Row className="align-items-center mb-4 g-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-semibold">Chọn màu nền từ danh sách:</Form.Label>
              <Form.Select
                size="lg"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                {COLOR_OPTIONS.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.name} ({c.value})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6} className="text-md-end text-muted small">
            Đang áp dụng: <strong>{currentColor.name}</strong>
          </Col>
        </Row>

        <div
          className="rounded-4 p-5 text-center shadow transition-all"
          style={{
            backgroundColor: selectedColor,
            color: currentColor.textColor,
            minHeight: '180px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'background-color 0.35s ease, color 0.35s ease',
          }}
        >
          <h3 className="fw-bold mb-2">{currentColor.name}</h3>
          <p className="fs-5 mb-0 opacity-90 font-monospace">Mã màu HEX: {selectedColor}</p>
        </div>
      </Card.Body>
    </Card>
  );
}
