import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useToast } from '../contexts/ToastContext';
import { useTheme } from '../contexts/ThemeContext';

export default function NotificationToast() {
  const { showToast, toasts } = useToast();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [customMsg, setCustomMsg] = useState('Đã hoàn thành toàn bộ bài tập Slot 9!');
  const [customVariant, setCustomVariant] = useState('success');

  const handleCustomToast = (e) => {
    e.preventDefault();
    if (customMsg.trim()) {
      showToast(customMsg.trim(), customVariant, 'Thông báo tùy chỉnh');
    }
  };

  return (
    <Card className="shadow-sm border-0 mb-4 overflow-hidden">
      <Card.Header className="bg-danger text-white d-flex justify-content-between align-items-center py-3">
        <div>
          <span className="fw-bold fs-5">Bài tập 2: ToastContext — Thông báo Toast Toàn cục Tự ẩn 3s</span>
          <div className="small text-white-50">
            Kích hoạt showToast(message, variant) từ bất kỳ component con nào, hiển thị bằng ToastContainer
          </div>
        </div>
        <Badge bg="light" text="dark" className="fs-6 px-3 py-2">
          Đang hiển thị: {toasts.length}
        </Badge>
      </Card.Header>

      <Card.Body className={`p-4 ${isDark ? 'bg-dark text-white' : 'bg-light'}`}>
        <Row className="g-4">
          <Col lg={6}>
            <div className={`p-4 rounded border h-100 ${isDark ? 'bg-black border-secondary' : 'bg-white'}`}>
              <h6 className="fw-bold mb-3">🔔 Kích hoạt nhanh thông báo mẫu</h6>
              <p className={`small mb-3 ${isDark ? 'text-secondary' : 'text-muted'}`}>
                Bấm vào các nút bên dưới để phát sinh thông báo nổi tự tắt sau 3 giây:
              </p>

              <div className="d-flex flex-column gap-2">
                <Button
                  variant="success"
                  onClick={() => showToast('Thao tác ghi nhận dữ liệu hoàn tất!', 'success', 'Thành công')}
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>✅ Thông báo Thành công (Success)</span>
                  <Badge bg="light" text="dark">autohide 3s</Badge>
                </Button>

                <Button
                  variant="danger"
                  onClick={() => showToast('Không thể kết nối đến máy chủ CSDL!', 'danger', 'Lỗi nghiêm trọng')}
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>❌ Thông báo Lỗi (Danger)</span>
                  <Badge bg="light" text="dark">autohide 3s</Badge>
                </Button>

                <Button
                  variant="warning"
                  onClick={() => showToast('Phiên làm việc sắp hết hạn trong 5 phút nữa.', 'warning', 'Cảnh báo')}
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>⚠️ Thông báo Cảnh báo (Warning)</span>
                  <Badge bg="light" text="dark">autohide 3s</Badge>
                </Button>

                <Button
                  variant="info"
                  onClick={() => showToast('Dự án useContext đã được cấu hình hoàn chỉnh.', 'info', 'Tin tức')}
                  className="d-flex justify-content-between align-items-center text-dark"
                >
                  <span>ℹ️ Thông báo Thông tin (Info)</span>
                  <Badge bg="dark">autohide 3s</Badge>
                </Button>
              </div>
            </div>
          </Col>

          <Col lg={6}>
            <div className={`p-4 rounded border h-100 ${isDark ? 'bg-black border-secondary' : 'bg-white'}`}>
              <h6 className="fw-bold mb-3">✏️ Tự soạn nội dung Toast</h6>
              <Form onSubmit={handleCustomToast}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold">Nội dung thông báo</Form.Label>
                  <Form.Control
                    type="text"
                    value={customMsg}
                    onChange={(e) => setCustomMsg(e.target.value)}
                    placeholder="Nhập nội dung cần hiển thị..."
                    className={isDark ? 'bg-dark text-white border-secondary' : ''}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold">Kiểu thông báo (Variant)</Form.Label>
                  <Form.Select
                    value={customVariant}
                    onChange={(e) => setCustomVariant(e.target.value)}
                    className={isDark ? 'bg-dark text-white border-secondary' : ''}
                  >
                    <option value="primary">Primary (Xanh dương)</option>
                    <option value="success">Success (Xanh lá)</option>
                    <option value="danger">Danger (Đỏ)</option>
                    <option value="warning">Warning (Vàng cam)</option>
                    <option value="info">Info (Xanh ngọc)</option>
                    <option value="dark">Dark (Đen)</option>
                  </Form.Select>
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100 fw-bold">
                  🚀 Bắn Toast Ngay
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
