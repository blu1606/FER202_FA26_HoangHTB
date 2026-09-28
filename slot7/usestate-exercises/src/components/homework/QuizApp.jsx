import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import { QUIZ_QUESTIONS } from '../../data/homework-data';

function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function Quiz({ onRestart }) {
  const [questions] = useState(() => shuffle(QUIZ_QUESTIONS));
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  const total = questions.length;
  const current = questions[index];
  const selected = answers[current.id];
  const answeredCount = Object.keys(answers).length;

  const score = questions.filter((q) => answers[q.id] === q.answer).length;

  const handleSelectOption = (optIndex) => {
    setAnswers((prev) => ({ ...prev, [current.id]: optIndex }));
  };

  if (finished) {
    return (
      <div className="text-center py-4">
        <h4 className="fw-bold mb-2">🎉 Kết quả làm bài</h4>
        <div className="display-4 fw-bold text-primary mb-3">
          {score} / {total} câu đúng
        </div>
        <p className="text-muted mb-4">
          Tỷ lệ hoàn thành: {Math.round((score / total) * 100)}%
        </p>

        <ListGroup className="text-start mb-4">
          {questions.map((q, idx) => {
            const userAns = answers[q.id];
            const isCorrect = userAns === q.answer;
            return (
              <ListGroup.Item
                key={q.id}
                className={`py-3 ${isCorrect ? 'border-success' : 'border-danger'}`}
              >
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="fw-semibold">
                    Câu {idx + 1}: {q.text}
                  </span>
                  <Badge bg={isCorrect ? 'success' : 'danger'}>
                    {isCorrect ? 'Đúng' : 'Sai'}
                  </Badge>
                </div>
                <div className="small text-muted">
                  Bạn chọn:{' '}
                  <strong className={isCorrect ? 'text-success' : 'text-danger'}>
                    {userAns !== undefined ? q.options[userAns] : 'Chưa trả lời'}
                  </strong>{' '}
                  {!isCorrect && (
                    <span>
                      • Đáp án đúng:{' '}
                      <strong className="text-success">{q.options[q.answer]}</strong>
                    </span>
                  )}
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>

        <Button variant="primary" size="lg" onClick={onRestart} className="px-4">
          ↻ Làm lại bài thi
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span className="fw-semibold text-muted">
          Câu {index + 1} / {total}
        </span>
        <Badge bg="info" className="text-dark">
          Đã chọn: {answeredCount} / {total}
        </Badge>
      </div>

      <ProgressBar
        now={((index + 1) / total) * 100}
        variant="primary"
        className="mb-4"
        style={{ height: '8px' }}
      />

      <Card className="border mb-4">
        <Card.Body className="p-4">
          <h5 className="fw-bold mb-4">{current.text}</h5>
          <ListGroup>
            {current.options.map((opt, optIdx) => {
              const isChosen = selected === optIdx;
              return (
                <ListGroup.Item
                  key={opt}
                  action
                  onClick={() => handleSelectOption(optIdx)}
                  className={`py-3 d-flex align-items-center gap-3 ${
                    isChosen ? 'bg-primary text-white' : ''
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  <span
                    className={`badge rounded-circle px-2 py-1 ${
                      isChosen ? 'bg-white text-primary' : 'bg-light text-dark border'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="fw-medium">{opt}</span>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card.Body>
      </Card>

      <Stack direction="horizontal" gap={2} className="justify-content-between">
        <Button
          variant="outline-secondary"
          onClick={() => setIndex((i) => i - 1)}
          disabled={index === 0}
        >
          ← Câu trước
        </Button>

        {index < total - 1 ? (
          <Button
            variant="primary"
            onClick={() => setIndex((i) => i + 1)}
            disabled={selected === undefined}
          >
            Câu tiếp theo →
          </Button>
        ) : (
          <Button
            variant="success"
            onClick={() => setFinished(true)}
            disabled={answeredCount < total}
          >
            Nộp bài thi ✓
          </Button>
        )}
      </Stack>
    </div>
  );
}

export default function QuizApp() {
  const [attempt, setAttempt] = useState(1);

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Header className="bg-dark text-white py-3 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-semibold">HW 5: Quiz trắc nghiệm (Reset state với key)</h5>
        <Badge bg="secondary" className="px-3 py-1">
          Lượt làm bài thứ #{attempt}
        </Badge>
      </Card.Header>
      <Card.Body className="p-4">
        <p className="text-muted mb-4">
          Sử dụng <code>key={attempt}</code> để React tự động huỷ bỏ và khởi tạo lại toàn bộ state khi làm lại bài mà không cần viết hàm reset thủ công.
        </p>
        <Quiz key={attempt} onRestart={() => setAttempt((a) => a + 1)} />
      </Card.Body>
    </Card>
  );
}
