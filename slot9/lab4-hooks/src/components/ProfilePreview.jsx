import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const MAX_BIO = 150;
const majors = ['Software Engineering', 'Artificial Intelligence', 'Digital Marketing'];

const ProfilePreview = () => {
  const [fullName, setFullName] = useState('');
  const [major, setMajor] = useState(majors[0]);
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState('');

  const handleNameKeyDown = (event) => {
    if (event.key === 'Escape') setFullName('');
  };

  const handleBioChange = (event) => {
    // Cắt bớt thay vì bỏ qua, để dán đoạn dài vẫn nhận 150 ký tự đầu
    setBio(event.target.value.slice(0, MAX_BIO));
  };

  const remaining = MAX_BIO - bio.length;

  return (
    <Row className="g-4">
      <Col md={6}>
        <Card className="shadow-sm border-0 h-100">
          <Card.Header className="bg-white py-3">
            <h5 className="mb-0 fw-bold text-primary">Thông tin hồ sơ</h5>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={(e) => e.preventDefault()}>
              <Form.Group className="mb-3" controlId="pp-name">
                <Form.Label>Họ và tên</Form.Label>
                <Form.Control
                  value={fullName}
                  placeholder="Nhập tên... (Nhấn Esc để xóa)"
                  onChange={(e) => setFullName(e.target.value)}
                  onKeyDown={handleNameKeyDown}
                  onFocus={() => setFocused('fullName')}
                  onBlur={() => setFocused('')}
                  className={focused === 'fullName' ? 'border-primary border-2 shadow-none' : ''}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="pp-major">
                <Form.Label>Chuyên ngành</Form.Label>
                <Form.Select value={major} onChange={(e) => setMajor(e.target.value)}>
                  {majors.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="pp-bio">
                <Form.Label>Giới thiệu bản thân</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={bio}
                  onChange={handleBioChange}
                  placeholder="Viết đôi dòng giới thiệu..."
                />
                <Form.Text className={remaining < 20 ? 'text-danger fw-semibold' : 'text-muted'}>
                  {`Còn ${remaining}/${MAX_BIO} ký tự`}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="pp-password">
                <Form.Label>Mật khẩu</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    placeholder="Nhập mật khẩu"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button variant="outline-secondary" onClick={() => setShowPassword((s) => !s)}>
                    {showPassword ? 'Ẩn' : 'Hiện'}
                  </Button>
                </InputGroup>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Col>

      <Col md={6}>
        <Card className="shadow-sm border-0 h-100 bg-white">
          <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-bold text-success">Xem trước trực tiếp (Live Preview)</h5>
            <span className="badge bg-success-subtle text-success border border-success-subtle">
              Real-time
            </span>
          </Card.Header>
          <Card.Body className="d-flex flex-column">
            <div className="mb-3">
              <span className="text-muted small d-block">Họ và tên</span>
              <h4 className="fw-bold text-dark">{fullName.trim() || 'Chưa nhập tên'}</h4>
            </div>

            <div className="mb-3">
              <span className="text-muted small d-block">Chuyên ngành</span>
              <span className="badge bg-primary fs-6">{major}</span>
            </div>

            <div className="mb-3 flex-grow-1">
              <span className="text-muted small d-block">Giới thiệu</span>
              <p className="p-3 bg-light rounded text-secondary mb-0">
                {bio || <em className="text-muted">Chưa có giới thiệu</em>}
              </p>
            </div>

            <div className="pt-2 border-top">
              <small className="text-muted">
                🔒 Độ dài mật khẩu: <strong>{password.length}</strong> ký tự
              </small>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ProfilePreview;
