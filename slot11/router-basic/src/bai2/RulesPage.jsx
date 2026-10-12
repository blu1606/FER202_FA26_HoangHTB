import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

export default function RulesPage() {
  return (
    <div>
      <h5 className="fw-bold text-dark mb-3">📜 Nội quy sử dụng Thư viện FPT University</h5>
      
      <Alert variant="warning" className="small mb-3">
        ⚠️ Vui lòng xuất trình thẻ sinh viên / thẻ cán bộ khi ra vào thư viện và khi làm thủ tục mượn tài liệu.
      </Alert>

      <ListGroup variant="flush">
        <ListGroup.Item className="px-0 py-2 text-secondary">
          <strong>1. Giữ trật tự chung:</strong> Không nói chuyện lớn tiếng, chuyển điện thoại sang chế độ rung, không làm phiền không gian tự học của các độc giả khác.
        </ListGroup.Item>
        <ListGroup.Item className="px-0 py-2 text-secondary">
          <strong>2. Bảo quản tài liệu:</strong> Tuyệt đối không viết, vẽ, gạch chân hoặc làm rách các trang sách, tạp chí, luận văn.
        </ListGroup.Item>
        <ListGroup.Item className="px-0 py-2 text-secondary">
          <strong>3. Vệ sinh & Thực phẩm:</strong> Không mang đồ ăn, thức uống có gas hoặc đồ có mùi vào phòng đọc. Chỉ được mang nước lọc đựng trong bình kín.
        </ListGroup.Item>
        <ListGroup.Item className="px-0 py-2 text-secondary">
          <strong>4. Sử dụng máy tính:</strong> Máy tính công cộng chỉ phục vụ mục đích tra cứu học tập và tài liệu học thuật.
        </ListGroup.Item>
        <ListGroup.Item className="px-0 py-2 text-secondary">
          <strong>5. Trả sách đúng hạn:</strong> Trả sách đúng hạn để đảm bảo quyền lợi mượn đọc của bạn học khác. Trả quá hạn sẽ tạm khóa quyền mượn sách.
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
