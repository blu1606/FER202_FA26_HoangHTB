import { Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/** Trang 403 – CÓ SẴN, KHÔNG sửa file này. ProtectedRoute chuyển tới đây khi sai vai trò. */
export default function ForbiddenPage() {
  return (
    <Alert variant="warning" className="py-4">
      <h4>403 – Không có quyền truy cập</h4>
      <p>Trang này chỉ dành cho quản trị viên.</p>
      <Button as={Link} to="/dishes" variant="warning">
        Về thực đơn
      </Button>
    </Alert>
  );
}
