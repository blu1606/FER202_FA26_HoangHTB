import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Badge } from 'react-bootstrap';
import {
  setKeyword,
  setSortBy,
  selectAverageGpa,
} from '../features/students/studentsSlice';

export default function Toolbar({ onAdd }) {
  const { keyword, sortBy, items } = useSelector((state) => state.students);
  const avg = useSelector(selectAverageGpa);
  const dispatch = useDispatch();

  return (
    <div className="d-flex flex-wrap gap-2 align-items-center mb-3 bg-white p-3 rounded shadow-sm border">
      <Form.Control
        style={{ maxWidth: 260 }}
        placeholder="🔍 Tìm theo tên hoặc mã SV..."
        value={keyword}
        onChange={(e) => dispatch(setKeyword(e.target.value))}
      />
      <Form.Select
        style={{ maxWidth: 200 }}
        value={sortBy}
        onChange={(e) => dispatch(setSortBy(e.target.value))}
      >
        <option value="code">Sắp xếp: Mã SV</option>
        <option value="name">Sắp xếp: Họ tên</option>
        <option value="gpa">Sắp xếp: GPA cao nhất ↓</option>
      </Form.Select>
      <Badge bg="info" className="p-2 fs-6">
        Tổng số: {items.length} SV
      </Badge>
      <Badge bg="success" className="p-2 fs-6">
        GPA trung bình: {avg}
      </Badge>
      <Button variant="primary" className="ms-auto" onClick={onAdd}>
        + Thêm sinh viên
      </Button>
    </div>
  );
}
