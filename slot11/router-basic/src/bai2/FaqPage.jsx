import Accordion from 'react-bootstrap/Accordion';

export default function FaqPage() {
  return (
    <div>
      <h5 className="fw-bold text-dark mb-3">❓ Các câu hỏi thường gặp (FAQ)</h5>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>1. Sinh viên được mượn tối đa bao nhiêu sách và trong bao lâu?</Accordion.Header>
          <Accordion.Body className="text-secondary">
            Mỗi sinh viên được mượn tối đa <strong>5 cuốn sách</strong> cùng một thời điểm.
            Thời hạn mượn tiêu chuẩn là <strong>14 ngày</strong> (2 tuần). Độc giả có thể gia hạn
            thêm 1 lần trực tuyến nếu sách chưa có người đặt trước.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>2. Làm thế nào để mượn tài liệu số / ebook?</Accordion.Header>
          <Accordion.Body className="text-secondary">
            Sinh viên đăng nhập vào hệ thống FPT Library Portal bằng tài khoản mail trường (@fpt.edu.vn)
            để truy cập và tải tài liệu nghiên cứu từ các nguồn IEEE Xplore, ProQuest, ScienceDirect.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>3. Trường hợp làm mất hoặc hư hỏng sách thì xử lý như thế nào?</Accordion.Header>
          <Accordion.Body className="text-secondary">
            Độc giả vui lòng liên hệ quầy thủ thư để đền bù cuốn sách tương đương cùng phiên bản
            hoặc bồi thường giá trị cuốn sách cộng với phí xử lý nghiệp vụ theo quy định hiện hành.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
