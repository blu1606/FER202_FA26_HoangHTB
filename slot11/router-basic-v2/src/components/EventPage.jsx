import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

export default function EventPage() {
  const navigate = useNavigate();

  return (
    <div className="py-4">
      <Card>
        <Card.Body>
          <h3>FPTU Tech Day 2026</h3>
          <p>Sự kiện công nghệ thường niên dành cho sinh viên và chuyên gia.</p>
          <Button variant="primary" onClick={() => navigate('/register')}>
            Đăng ký ngay
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
