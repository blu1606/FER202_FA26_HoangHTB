import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import { CITIES, INITIAL_STUDENTS } from '../data/homework-data';

export default function StudentManager() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [newName, setNewName] = useState('');
  const [sortBy, setSortBy] = useState('none');

  const handleAddStudent = (e) => {
    e.preventDefault();
    const trimmed = newName.trim();
    if (trimmed.length < 3) return;

    const newStudent = {
      id: Date.now(),
      name: trimmed,
      score: 0,
      contact: { city: CITIES[0] },
    };

    setStudents((prev) => [...prev, newStudent]);
    setNewName('');
  };

  const handleUpdateScore = (id, value) => {
    const num = Number(value);
    const clamped = Math.min(10, Math.max(0, Number.isNaN(num) ? 0 : num));
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, score: clamped } : s))
    );
  };

  const handleUpdateCity = (id, city) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, contact: { ...s.contact, city } } : s
      )
    );
  };

  const handleRemoveStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const handleBonusAll = () => {
    setStudents((prev) =>
      prev.map((s) => ({
        ...s,
        score: Math.min(10, Math.round((s.score + 0.5) * 10) / 10),
      }))
    );
  };

  const sortedStudents = [...students].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name, 'vi');
    }
    if (sortBy === 'scoreDesc') {
      return b.score - a.score;
    }
    return 0;
  });

  const total = students.length;
  const average =
    total === 0
      ? '0.00'
      : (students.reduce((sum, s) => sum + s.score, 0) / total).toFixed(2);
  const passed = students.filter((s) => s.score >= 5).length;

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Header className="bg-info text-white py-3 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-semibold">HW 4: Quản lý điểm sinh viên (Mảng & Object lồng nhau)</h5>
        <Button variant="light" size="sm" className="fw-semibold" onClick={handleBonusAll}>
          +0.5 cả lớp
        </Button>
      </Card.Header>
      <Card.Body className="p-4">
        <p className="text-muted mb-4">
          Thực hành cập nhật bất biến đối với object lồng nhau <code>contact.city</code> và sắp xếp dữ liệu dẫn xuất.
        </p>

        <Row className="g-3 mb-4">
          <Col md={7}>
            <Form onSubmit={handleAddStudent}>
              <InputGroup hasValidation>
                <Form.Control
                  placeholder="Nhập họ và tên sinh viên (tối thiểu 3 ký tự)..."
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  isInvalid={newName.length > 0 && newName.trim().length < 3}
                />
                <Button
                  variant="primary"
                  type="submit"
                  disabled={newName.trim().length < 3}
                >
                  Thêm sinh viên
                </Button>
                <Form.Control.Feedback type="invalid">
                  Tên sinh viên phải có tối thiểu 3 ký tự (hiện có {newName.trim().length} ký tự).
                </Form.Control.Feedback>
              </InputGroup>
            </Form>
          </Col>
          <Col md={5}>
            <Form.Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="none">Thứ tự nhập (Mặc định)</option>
              <option value="name">Sắp xếp theo tên (A → Z)</option>
              <option value="scoreDesc">Sắp xếp theo điểm (Cao → Thấp)</option>
            </Form.Select>
          </Col>
        </Row>

        <Table responsive hover className="align-middle border mb-3">
          <thead className="table-light">
            <tr>
              <th style={{ width: '60px' }}>STT</th>
              <th>Họ và tên</th>
              <th style={{ width: '130px' }}>Điểm (0-10)</th>
              <th style={{ width: '160px' }}>Thành phố</th>
              <th style={{ width: '100px' }}>Kết quả</th>
              <th style={{ width: '80px' }} className="text-center">Xóa</th>
            </tr>
          </thead>
          <tbody>
            {sortedStudents.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">
                  Danh sách sinh viên trống.
                </td>
              </tr>
            ) : (
              sortedStudents.map((s, idx) => (
                <tr key={s.id}>
                  <td>{idx + 1}</td>
                  <td className="fw-medium text-dark">{s.name}</td>
                  <td>
                    <Form.Control
                      type="number"
                      step="0.5"
                      min="0"
                      max="10"
                      size="sm"
                      value={s.score}
                      onChange={(e) => handleUpdateScore(s.id, e.target.value)}
                      isInvalid={s.score < 0 || s.score > 10 || Number.isNaN(Number(s.score))}
                    />
                    <Form.Control.Feedback type="invalid">
                      Điểm 0–10
                    </Form.Control.Feedback>
                  </td>
                  <td>
                    <Form.Select
                      size="sm"
                      value={s.contact?.city || CITIES[0]}
                      onChange={(e) => handleUpdateCity(s.id, e.target.value)}
                    >
                      {CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                  <td>
                    {s.score >= 5 ? (
                      <Badge bg="success">Đạt</Badge>
                    ) : (
                      <Badge bg="danger">Chưa đạt</Badge>
                    )}
                  </td>
                  <td className="text-center">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleRemoveStudent(s.id)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        <Stack direction="horizontal" gap={3} className="bg-light p-3 rounded border text-muted small flex-wrap">
          <div>Sĩ số: <strong className="text-dark">{total}</strong></div>
          <div>•</div>
          <div>Điểm trung bình: <strong className="text-dark">{average}</strong></div>
          <div>•</div>
          <div>Đạt: <strong className="text-success">{passed}/{total}</strong></div>
        </Stack>
      </Card.Body>
    </Card>
  );
}
