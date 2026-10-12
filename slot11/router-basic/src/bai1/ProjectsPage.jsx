import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

const PROJECTS = [
  {
    id: 1,
    title: 'E-Commerce Mini Store',
    description: 'Ứng dụng mua sắm trực tuyến với bộ lọc sản phẩm đa tiêu chí, giỏ hàng tương tác sử dụng useReducer và thanh toán đơn giản.',
    techs: ['React', 'useReducer', 'React-Bootstrap'],
    badge: 'Lab 4',
  },
  {
    id: 2,
    title: 'Personal Portfolio SPA',
    description: 'Trang cá nhân đa trang ứng dụng React Router declarative routing, quản lý lịch sử duyệt web và trang 404 thân thiện.',
    techs: ['React Router 7', 'Vite', 'Bootstrap 5'],
    badge: 'Slot 11',
  },
  {
    id: 3,
    title: 'Student Directory & Search',
    description: 'Hệ thống tra cứu danh bạ sinh viên với URL search params đồng bộ hai chiều, hỗ trợ bookmark và chia sẻ trực tiếp liên kết tìm kiếm.',
    techs: ['useSearchParams', 'Derived State', 'React 19'],
    badge: 'Slot 11',
  },
];

export default function ProjectsPage() {
  return (
    <Container>
      <div className="mb-4">
        <h3 className="fw-bold text-primary mb-1">Dự án tiêu biểu</h3>
        <p className="text-secondary mb-0">3 dự án mẫu minh họa kỹ năng phát triển React</p>
      </div>
      <Row className="g-4">
        {PROJECTS.map((project) => (
          <Col md={4} key={project.id}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Header className="bg-primary bg-opacity-10 py-3 border-0 d-flex justify-content-between align-items-center">
                <span className="fw-bold text-primary">Project #{project.id}</span>
                <Badge bg="primary">{project.badge}</Badge>
              </Card.Header>
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold text-dark mb-2">{project.title}</Card.Title>
                <Card.Text className="text-secondary flex-grow-1">
                  {project.description}
                </Card.Text>
                <div className="mb-3 d-flex flex-wrap gap-1">
                  {project.techs.map((t, idx) => (
                    <Badge key={idx} bg="secondary" className="fw-normal">
                      {t}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline-primary" size="sm" className="w-100">
                  Xem chi tiết
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
