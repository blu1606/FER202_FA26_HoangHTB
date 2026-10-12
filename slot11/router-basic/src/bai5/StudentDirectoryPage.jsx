import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { useSearchParams } from 'react-router-dom';
import { STUDENTS, CLASSES } from './students';

export default function StudentDirectoryPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Đọc giá trị từ query string (URL as State)
  const q = searchParams.get('q') ?? '';
  const selectedClass = searchParams.get('class') ?? '';

  // Hàm cập nhật từng param trong query string
  const updateParam = (key, value, replace = false) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        const trimmed = value ? value.trim() : '';
        if (trimmed) {
          next.set(key, trimmed);
        } else {
          next.delete(key);
        }
        return next;
      },
      { replace }
    );
  };

  // Dữ liệu dẫn xuất (Derived State) - không dùng useState cho bộ lọc
  const filteredStudents = STUDENTS.filter((student) => {
    const query = q.toLowerCase();
    const matchKeyword =
      !query ||
      student.name.toLowerCase().includes(query) ||
      student.id.toLowerCase().includes(query);

    const matchClass = !selectedClass || student.className === selectedClass;

    return matchKeyword && matchClass;
  });

  const hasFilter = Boolean(q || selectedClass);

  return (
    <Container className="py-4">
      <Card className="border-0 shadow-sm mb-4">
        <Card.Header className="bg-white py-3 border-0">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div>
              <h4 className="fw-bold text-primary mb-1">Danh bạ sinh viên</h4>
              <p className="text-secondary small mb-0">
                Tìm kiếm và lọc sinh viên đồng bộ trực tiếp qua URL Query String (useSearchParams)
              </p>
            </div>
            <Badge bg="secondary" className="px-3 py-2 fs-6">
              Tìm thấy {filteredStudents.length}/{STUDENTS.length} sinh viên
            </Badge>
          </div>
        </Card.Header>

        <Card.Body className="bg-light p-4 border-top border-bottom">
          <Row className="g-3 align-items-end">
            <Col md={6}>
              <Form.Label className="fw-semibold small">
                🔍 Tìm kiếm theo tên hoặc MSSV:
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên hoặc MSSV (VD: anh, SE180001)..."
                value={q}
                onChange={(e) => updateParam('q', e.target.value, true)}
              />
            </Col>

            <Col md={4}>
              <Form.Label className="fw-semibold small">
                🏫 Lọc theo lớp học:
              </Form.Label>
              <Form.Select
                value={selectedClass}
                onChange={(e) => updateParam('class', e.target.value, false)}
              >
                <option value="">Tất cả lớp</option>
                {CLASSES.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col md={2}>
              <Button
                variant={hasFilter ? 'outline-danger' : 'outline-secondary'}
                className="w-100"
                disabled={!hasFilter}
                onClick={() => setSearchParams({})}
              >
                Xóa lọc
              </Button>
            </Col>
          </Row>

          <div className="mt-3 text-muted small d-flex align-items-center gap-2">
            <span>URL hiện tại:</span>
            <code className="bg-white px-2 py-1 border rounded">
              {window.location.search || '(không có query parameter)'}
            </code>
          </div>
        </Card.Body>

        <Card.Body className="p-0">
          <Table responsive hover className="mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>MSSV</th>
                <th>Họ và tên</th>
                <th className="text-center">Lớp</th>
                <th className="text-center">GPA</th>
                <th className="text-center">Xếp loại</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((s) => (
                  <tr key={s.id}>
                    <td className="fw-bold text-primary">{s.id}</td>
                    <td className="fw-semibold text-dark">{s.name}</td>
                    <td className="text-center">
                      <Badge bg="info" className="text-dark">
                        {s.className}
                      </Badge>
                    </td>
                    <td className="text-center fw-bold">{s.gpa.toFixed(1)}</td>
                    <td className="text-center">
                      <Badge bg={s.gpa >= 3.6 ? 'success' : s.gpa >= 3.2 ? 'primary' : 'secondary'}>
                        {s.gpa >= 3.6 ? 'Xuất sắc' : s.gpa >= 3.2 ? 'Giỏi' : 'Khá'}
                      </Badge>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-muted fst-italic">
                    Không có sinh viên phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}
