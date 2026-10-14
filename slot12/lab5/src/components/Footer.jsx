import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="mt-4">
            <Container>
                <Row>
                    <Col md={4} className="mb-2">
                        <h5 className="mb-2">Online Quiz App</h5>
                        <p className="mb-2">
                            Hệ thống trắc nghiệm và tin tức học tập trực tuyến. Giúp sinh viên ôn tập và nâng cao kiến thức mọi lúc, mọi nơi.
                        </p>
                    </Col>

                    <Col md={4} className="mb-2">
                        <h6 className="mb-2">Liên kết nhanh</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/">Trang Chủ</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/news">Tin Tức</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/quiz">Quiz</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/about">Giới Thiệu</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/contact">Liên Hệ</Link>
                            </li>
                        </ul>
                    </Col>

                    <Col md={4} className="mb-2">
                        <h6 className="mb-2">Thông tin liên hệ</h6>
                        <p className="mb-2">Địa chỉ: FPT University, Hà Nội</p>
                        <p className="mb-2">Email: contact@quizapp.fpt.edu.vn</p>
                        <p className="mb-2">Điện thoại: +84 (024) 7300 1866</p>
                    </Col>
                </Row>

                <hr />

                <div className="text-center">
                    <p>© 2026 Online Quiz App - FER202. All rights reserved.</p>
                </div>
            </Container>
        </footer>
    );
}