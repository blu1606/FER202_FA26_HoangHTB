import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import StarRating from './StarRating';

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([
    { id: 1, rating: 5, comment: 'Bài giảng React Hook rất dễ hiểu và chi tiết!' },
    { id: 2, rating: 4, comment: 'Ví dụ trực quan, giao diện Bootstrap đẹp.' },
  ]);

  const canSubmit = rating > 0 && comment.trim().length >= 5;

  const average =
    reviews.length === 0
      ? '0.0'
      : (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    const newReview = {
      id: Date.now(),
      rating,
      comment: comment.trim(),
    };

    setReviews((prev) => [newReview, ...prev]);
    setRating(0);
    setComment('');
  };

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Header className="bg-warning text-dark py-3 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-semibold">HW 2: Đánh giá sao & Nhận xét</h5>
        <Badge bg="dark" className="fs-6 px-3 py-1">
          Trung bình {average}/5 ({reviews.length} lượt)
        </Badge>
      </Card.Header>
      <Card.Body className="p-4">
        <Form onSubmit={handleSubmit} className="mb-4 p-3 bg-light rounded border">
          <div className="mb-3 text-center">
            <Form.Label className="d-block fw-semibold mb-2">Chọn mức độ hài lòng:</Form.Label>
            <StarRating value={rating} onChange={setRating} />
          </div>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Nội dung nhận xét (ít nhất 5 ký tự):</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Chia sẻ cảm nhận của bạn về bài học..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              isInvalid={comment.length > 0 && comment.trim().length < 5}
            />
            <Form.Control.Feedback type="invalid">
              Nội dung nhận xét phải có ít nhất 5 ký tự (hiện có {comment.trim().length} ký tự).
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="warning" type="submit" disabled={!canSubmit} className="fw-bold w-100">
            Gửi đánh giá
          </Button>
        </Form>

        <h6 className="fw-bold mb-3">Danh sách đánh giá gần đây:</h6>
        {reviews.length === 0 ? (
          <div className="text-center py-4 bg-light rounded text-muted">
            Chưa có đánh giá nào. Hãy là người đầu tiên để lại nhận xét!
          </div>
        ) : (
          <ListGroup className="rounded">
            {reviews.map((r) => (
              <ListGroup.Item key={r.id} className="py-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <div>
                    <span className="text-warning fs-5">{'★'.repeat(r.rating)}</span>
                    <span className="text-secondary fs-5">{'★'.repeat(5 - r.rating)}</span>
                  </div>
                  <Badge bg="secondary" pill>
                    {r.rating} / 5 sao
                  </Badge>
                </div>
                <p className="mb-0 text-dark">{r.comment}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
}
