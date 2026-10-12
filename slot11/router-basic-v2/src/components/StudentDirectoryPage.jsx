import { useSearchParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { STUDENTS, CLASSES } from './students';

export default function StudentDirectoryPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get('q') ?? '';
  const selectedClass = searchParams.get('class') ?? '';

  const updateParam = (key, value, replace = false) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value.trim()) {
          next.set(key, value.trim());
        } else {
          next.delete(key);
        }
        return next;
      },
      { replace }
    );
  };

  // Derived state từ URL search params
  const filteredStudents = STUDENTS.filter((s) => {
    const query = q.toLowerCase();
    const matchNameOrId = !query || s.name.toLowerCase().includes(query) || s.id.toLowerCase().includes(query);
    const matchClass = !selectedClass || s.className === selectedClass;
    return matchNameOrId && matchClass;
  });

  return (
    <div className="py-3">
      <h4>Danh bạ sinh viên</h4>
      <Row className="g-2 mb-3 align-items-center">
        <Col md={5}>
          <Form.Control
            placeholder="Tìm theo tên hoặc MSSV..."
            value={q}
            onChange={(e) => updateParam('q', e.target.value, true)}
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={selectedClass}
            onChange={(e) => updateParam('class', e.target.value, false)}
          >
            <option value="">Tất cả lớp</option>
            {CLASSES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Button variant="outline-secondary" onClick={() => setSearchParams({})}>
            Xóa lọc
          </Button>
        </Col>
      </Row>

      <p className="text-muted">Tìm thấy {filteredStudents.length}/{STUDENTS.length} sinh viên</p>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>MSSV</th>
            <th>Họ và tên</th>
            <th>Lớp</th>
            <th>GPA</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.className}</td>
                <td>{s.gpa}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center text-muted">Không có sinh viên phù hợp.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
