import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import ProgressBar from 'react-bootstrap/ProgressBar';

const SKILLS = [
  { name: 'React 19 & React Router 7', level: 90, tag: 'Chuyên sâu', variant: 'primary' },
  { name: 'JavaScript (ES6+) & TypeScript', level: 85, tag: 'Thành thạo', variant: 'success' },
  { name: 'React-Bootstrap & CSS3', level: 90, tag: 'Thành thạo', variant: 'info' },
  { name: 'Vite & Frontend Tooling', level: 80, tag: 'Tốt', variant: 'warning' },
  { name: 'Git, GitHub Actions & CI/CD', level: 85, tag: 'Thành thạo', variant: 'dark' },
];

export default function SkillsPage() {
  return (
    <Container>
      <Card className="border-0 shadow-sm mb-4">
        <Card.Header className="bg-white py-3 border-0">
          <h3 className="fw-bold text-primary mb-1">Kỹ năng chuyên môn</h3>
          <p className="text-secondary mb-0">Các công nghệ và công cụ tôi sử dụng trong phát triển Front-End</p>
        </Card.Header>
        <Card.Body className="p-0">
          <ListGroup variant="flush">
            {SKILLS.map((skill, index) => (
              <ListGroup.Item key={index} className="p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-semibold text-dark">{skill.name}</span>
                  <Badge bg={skill.variant}>{skill.tag}</Badge>
                </div>
                <ProgressBar
                  now={skill.level}
                  label={`${skill.level}%`}
                  variant={skill.variant}
                  style={{ height: '18px' }}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}
