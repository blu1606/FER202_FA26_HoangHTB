import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useParams, Link } from 'react-router-dom';
import { findCourse } from './courses';

export default function CourseDetailPage() {
  const { code } = useParams();
  const course = findCourse(code);

  if (!course) {
    return (
      <Container className="py-4">
        <Alert variant="danger" className="shadow-sm p-4">
          <Alert.Heading className="fw-bold">Lỗi tra cứu môn học</Alert.Heading>
          <p className="mb-3">
            Không tìm thấy môn học có mã <strong>{code}</strong> trong chương trình đào tạo hiện tại.
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button as={Link} to="/courses" variant="outline-danger">
              ← Quay lại danh sách
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Card className="border-0 shadow-sm p-4 mx-auto" style={{ maxWidth: '750px' }}>
        <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center pb-0">
          <Badge bg="primary" className="fs-6 px-3 py-2">
            Mã môn: {course.code}
          </Badge>
          <div className="d-flex gap-2">
            <Badge bg="info" className="text-dark fs-6 px-3 py-2">
              Học kỳ {course.semester}
            </Badge>
            <Badge bg="secondary" className="fs-6 px-3 py-2">
              {course.credits} Tín chỉ
            </Badge>
          </div>
        </Card.Header>
        <Card.Body className="py-4">
          <h2 className="fw-bold text-dark mb-3">{course.name}</h2>
          <div className="p-3 bg-light rounded mb-4">
            <h6 className="fw-bold text-secondary mb-2">Mục tiêu và nội dung học phần:</h6>
            <p className="text-dark mb-0 leading-relaxed">{course.desc}</p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <Button as={Link} to="/courses" variant="outline-primary">
              ← Quay lại danh sách
            </Button>
            <span className="text-muted small">URL param: <code>:code = {code}</code></span>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
