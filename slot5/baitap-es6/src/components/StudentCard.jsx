import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const StudentCard = ({ student }) => {
  const {
    id,
    name,
    major,
    gpa,
    avatar,
    contact: { email: studentEmail, phone },
  } = student;

  return (
    <Card style={{ width: '18rem' }} className="shadow-sm">
      <Card.Img
        variant="top"
        src={avatar}
        alt={name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0f172a&color=fff&size=200`;
        }}
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {id} - {major}
        </Card.Subtitle>
        <ListGroup variant="flush" className="my-2">
          <ListGroup.Item>GPA: {gpa}</ListGroup.Item>
          <ListGroup.Item>Email: {studentEmail}</ListGroup.Item>
          <ListGroup.Item>Điện thoại: {phone}</ListGroup.Item>
        </ListGroup>
        <Button variant="primary">Xem hồ sơ</Button>
      </Card.Body>
    </Card>
  );
};

export default StudentCard;
