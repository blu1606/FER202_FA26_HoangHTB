import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

export default function ToggleVisibility() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Header className="bg-success text-white py-3">
        <h5 className="mb-0 fw-semibold">Bài 3: Toggle Visibility</h5>
      </Card.Header>
      <Card.Body className="p-4 text-center">
        <p className="text-muted mb-4">
          Bấm nút để chuyển đổi trạng thái ẩn / hiện của đoạn văn bản bên dưới.
        </p>

        <Button
          variant={isVisible ? 'warning' : 'success'}
          size="lg"
          onClick={toggleVisibility}
          className="px-4 fw-semibold mb-4"
        >
          {isVisible ? 'Hide Content' : 'Show Content'}
        </Button>

        {isVisible ? (
          <Alert variant="success" className="text-start shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
            <Alert.Heading className="fs-5 fw-bold">🎉 Nội dung đã được hiển thị!</Alert.Heading>
            <p className="mb-1">
              Đoạn văn bản này được điều khiển bằng state boolean <code>isVisible</code> thông qua React Hook{' '}
              <code>useState(false)</code>.
            </p>
            <hr />
            <p className="mb-0 text-muted small">
              Khi bạn bấm nút <strong>Hide Content</strong>, state sẽ đảo về <code>false</code> và đoạn văn bản này sẽ được ẩn đi.
            </p>
          </Alert>
        ) : (
          <div className="p-4 bg-light rounded border text-muted fst-italic mx-auto" style={{ maxWidth: '600px' }}>
            Nội dung hiện đang bị ẩn. Nhấn nút <strong>Show Content</strong> phía trên để mở.
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
