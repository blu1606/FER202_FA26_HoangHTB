import { useParams, Link } from 'react-router-dom'
import { findCourse } from './courses'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

export default function CourseDetailPage() {
    const { code } = useParams();
    const course = findCourse(code);

    if (!course) {
        return (
            <div>
                <Alert variant="danger">
                    Not found course with code: {code}!
                </Alert>
                <Button as={Link} to="/courses" variant="outline-danger">
                    Back
                </Button>
            </div>
        )
    }

    return (
        <div className="py-4">
            <Card className="shadow-sm">
                <Card.Header as="h4" className="text-primary">
                    {course.code} - {course.name}
                </Card.Header>
                <Card.Body>
                    <p><strong>Học kỳ:</strong> {course.semester} | <strong>Tín chỉ:</strong> {course.credits}</p>
                    <p><strong>Mô tả:</strong> {course.desc}</p>
                    <Button as={Link} to="/courses" variant="primary">
                        ← Quay lại danh sách
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );

}
