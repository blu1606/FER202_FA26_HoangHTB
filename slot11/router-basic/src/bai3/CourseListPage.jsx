import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
import { COURSES } from './courses';

export default function CourseListPage() {
  return (
    <Container className="py-4">
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white py-3 border-0 d-flex justify-content-between align-items-center">
          <div>
            <h4 className="fw-bold text-primary mb-1">Chương trình đào tạo Kỹ thuật phần mềm</h4>
            <p className="text-secondary small mb-0">
              Danh sách 5 môn học tiêu biểu tại Đại học FPT (bấm vào mã môn để xem chi tiết)
            </p>
          </div>
          <Badge bg="primary" className="p-2">
            5 môn học
          </Badge>
        </Card.Header>
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>Mã môn</th>
                <th>Tên môn học</th>
                <th className="text-center">Số tín chỉ</th>
                <th className="text-center">Học kỳ</th>
                <th>Mô tả tóm tắt</th>
                <th className="text-center">Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {COURSES.map((course) => (
                <tr key={course.code}>
                  <td>
                    <Link
                      to={`/courses/${course.code}`}
                      className="fw-bold text-decoration-none text-primary"
                    >
                      {course.code}
                    </Link>
                  </td>
                  <td className="fw-semibold text-dark">{course.name}</td>
                  <td className="text-center">
                    <Badge bg="secondary">{course.credits} TC</Badge>
                  </td>
                  <td className="text-center">
                    <Badge bg="info" className="text-dark">
                      Kỳ {course.semester}
                    </Badge>
                  </td>
                  <td className="text-secondary small" style={{ maxWidth: '350px' }}>
                    {course.desc}
                  </td>
                  <td className="text-center">
                    <Link
                      to={`/courses/${course.code}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      Xem chi tiết
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}
