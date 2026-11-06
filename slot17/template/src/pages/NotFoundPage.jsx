import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/** CÓ SẴN, KHÔNG sửa file này */
export default function NotFoundPage() {
  return (
    <div className="text-center py-5">
      <div className="display-4 fw-bold text-primary">404</div>
      <p>Không tìm thấy trang</p>
      <Button as={Link} to="/cars">
        Về danh sách xe
      </Button>
    </div>
  );
}
