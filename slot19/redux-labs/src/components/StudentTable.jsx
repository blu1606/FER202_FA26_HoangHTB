import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import {
  fetchStudents,
  deleteStudent,
  clearError,
  selectVisibleStudents,
  selectStudentsState,
} from '../features/students/studentsSlice';

export default function StudentTable({ onEdit }) {
  const students = useSelector(selectVisibleStudents);
  const { status, error, saving } = useSelector(selectStudentsState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') dispatch(fetchStudents());
  }, [status, dispatch]);

  const handleDelete = async (s) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa sinh viên ${s.name} (${s.code})?`))
      return;
    try {
      await dispatch(deleteStudent(s.id)).unwrap();
    } catch {
      /* Lỗi đã được lưu vào state.error bởi addMatcher */
    }
  };

  if (status === 'loading') {
    return (
      <div className="text-center p-5 bg-white rounded shadow-sm border">
        <Spinner animation="border" variant="primary" />
        <div className="mt-2 text-muted">Đang tải danh sách sinh viên từ server...</div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <Alert variant="danger">
        <Alert.Heading>Không tải được dữ liệu sinh viên</Alert.Heading>
        <p className="mb-2">
          Chi tiết lỗi: <strong>{error}</strong>.
        </p>
        <p className="small mb-2">
          Bạn đã khởi động JSON Server chưa? Chạy lệnh <code>npm start</code> (hoặc mở terminal chạy <code>npm run server</code> trên port 9999).
        </p>
        <Button size="sm" variant="danger" onClick={() => dispatch(fetchStudents())}>
          🔄 Thử lại
        </Button>
      </Alert>
    );
  }

  return (
    <div className="bg-white p-3 rounded shadow-sm border">
      {error && (
        <Alert
          variant="warning"
          dismissible
          onClose={() => dispatch(clearError())}
        >
          {error}
        </Alert>
      )}
      <Table striped bordered hover responsive className="align-middle mb-0">
        <thead className="table-dark">
          <tr>
            <th style={{ width: 40 }}>#</th>
            <th>Mã SV</th>
            <th>Họ và tên</th>
            <th>Email</th>
            <th className="text-center">GPA</th>
            <th>Ngành</th>
            <th className="text-center" style={{ width: 140 }}>
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center text-muted py-4">
                Không tìm thấy sinh viên nào phù hợp.
              </td>
            </tr>
          )}
          {students.map((s, i) => (
            <tr key={s.id}>
              <td>{i + 1}</td>
              <td className="fw-semibold">{s.code}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td className="text-center">
                <Badge
                  bg={
                    s.gpa >= 8 ? 'success' : s.gpa >= 5 ? 'primary' : 'danger'
                  }
                  className="px-2 py-1 fs-6"
                >
                  {s.gpa}
                </Badge>
              </td>
              <td>
                <span className="badge bg-secondary">{s.major}</span>
              </td>
              <td className="text-center text-nowrap">
                <Button
                  size="sm"
                  variant="outline-warning"
                  className="me-2"
                  onClick={() => onEdit(s)}
                >
                  Sửa
                </Button>
                <Button
                  size="sm"
                  variant="outline-danger"
                  disabled={saving}
                  onClick={() => handleDelete(s)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

