import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

export default function ControlledInput() {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Header className="bg-info text-white py-3">
        <h5 className="mb-0 fw-semibold">Bài 2: Controlled Input Field</h5>
      </Card.Header>
      <Card.Body className="p-4">
        <p className="text-muted mb-3">
          Nhập văn bản vào ô input và theo dõi kết quả hiển thị thời gian thực (real-time).
        </p>

        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Nhập nội dung bất kỳ:</Form.Label>
          <Form.Control
            type="text"
            size="lg"
            placeholder="Gõ văn bản tại đây..."
            value={text}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <Badge bg="secondary" className="px-2 py-1">
            Số ký tự: {text.length}
          </Badge>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={handleClear}
            disabled={!text}
          >
            Xóa nội dung
          </Button>
        </div>

        <div className="p-3 bg-light rounded border">
          <span className="text-muted small d-block mb-1">Văn bản hiển thị thời gian thực:</span>
          {text ? (
            <div className="fs-5 fw-medium text-dark text-break">{text}</div>
          ) : (
            <span className="text-muted fst-italic">Chưa có nội dung nào được nhập...</span>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
