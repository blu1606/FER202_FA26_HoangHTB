import { Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

/**
 * ===================== NotFoundPage (mọi đường dẫn không có) – TODO-10 (0.5) =====================
 * ĐÃ CÓ SẴN: số 404, tiêu đề "Không tìm thấy trang", các biến location, navigate.
 * Kiểm tra: gõ URL http://localhost:5173/abc/xyz
 *
 * TODO-10  <p className="text-muted">Đường dẫn <code>{location.pathname}</code> không tồn tại.</p>;
 *          nút "← Quay lại" (variant="outline-secondary", navigate(-1)) và nút "Xem thực đơn" (as={Link} to="/dishes").
 * ==================================================================================================
 */
export default function NotFoundPage() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="text-center py-5">
      <div className="display-4 fw-bold text-success">404</div>
      <h4>Không tìm thấy trang</h4>

      {/* TODO-10: "Đường dẫn <code>{location.pathname}</code> không tồn tại." */}
      <p className="text-muted">
        Đường dẫn <code>{location.pathname}</code> không tồn tại.
      </p>
      <div className="d-flex gap-2 justify-content-center">
        {/* TODO-10: nút "← Quay lại" và nút "Xem thực đơn" */}


        <Button variant="outline-secondary" onClick={() => navigate(-1)}>← Quay lại</Button>
        <Button as={Link} to="/dishes" variant="success">Xem thực đơn</Button>
      </div>
    </div>
  );
}
