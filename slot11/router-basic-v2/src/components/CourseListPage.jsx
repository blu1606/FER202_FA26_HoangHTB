import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { COURSES } from './courses';

export default function CourseListPage() {
    return (
        <div className="py-3">
            <h3>Danh sách môn học</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Mã môn</th>
                        <th>Tên môn</th>
                        <th>Tín chỉ</th>
                        <th>Kỳ</th>
                    </tr>
                </thead>
                <tbody>
                    {COURSES.map((c) => (
                        <tr key={c.code}>
                            <td>
                                {/* Link động theo mã môn */}
                                <Link to={`/courses/${c.code}`} className="fw-bold">
                                    {c.code}
                                </Link>
                            </td>
                            <td>{c.name}</td>
                            <td>{c.credits}</td>
                            <td>{c.semester}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
