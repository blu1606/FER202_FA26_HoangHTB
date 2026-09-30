import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import FaqAccordion from './components/FaqAccordion';
import ReviewForm from './components/ReviewForm';
import BmiCalculator from './components/BmiCalculator';
import StudentManager from './components/StudentManager';
import QuizApp from './components/QuizApp';
import { TABS_CONFIG } from './data/homework-data';

export default function App() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      {/* Top Navigation */}
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm py-3 mb-4">
        <Container>
          <Navbar.Brand className="d-flex align-items-center gap-2 fw-bold">
            <span className="badge bg-primary fs-6">Slot 7</span>
            <span>BTVN: React Hook useState</span>
          </Navbar.Brand>
          <Navbar.Text className="text-white-50 small d-none d-md-block">
            Bài tập về nhà • FPT University • FER202
          </Navbar.Text>
        </Container>
      </Navbar>

      <Container className="flex-grow-1 pb-5">
        {/* Header Hero */}
        <div className="bg-white p-3 p-md-4 rounded shadow-sm mb-4 border">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3 pb-3 border-bottom">
            <div>
              <h4 className="fw-bold mb-1 text-dark">5 Bài Tập Về Nhà (BTVN) — useState</h4>
              <p className="text-muted mb-0 small">
                Thực hành chuyên sâu các kỹ thuật: Lifting state up, Controlled Component, Derived State, Immutable Nested Object, và Lazy Initializer with Key reset.
              </p>
            </div>
            <Badge bg="success" className="px-3 py-2 fs-6">
              5 / 5 Bài tập hoàn thành
            </Badge>
          </div>

          {/* Tab Navigation */}
          <Nav
            variant="pills"
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k || 'all')}
            className="flex-wrap gap-2 pt-1"
          >
            {TABS_CONFIG.map((t) => (
              <Nav.Item key={t.key}>
                <Nav.Link eventKey={t.key} className="px-3 py-2 fw-medium">
                  {t.label}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </div>

        {/* Content Section */}
        <Row className="justify-content-center">
          <Col lg={10}>
            {activeTab === 'all' && (
              <div className="d-flex flex-column gap-4">
                <div id="btvn-1">
                  <FaqAccordion />
                </div>
                <div id="btvn-2">
                  <ReviewForm />
                </div>
                <div id="btvn-3">
                  <BmiCalculator />
                </div>
                <div id="btvn-4">
                  <StudentManager />
                </div>
                <div id="btvn-5">
                  <QuizApp />
                </div>
              </div>
            )}

            {activeTab === 'b1' && <FaqAccordion />}
            {activeTab === 'b2' && <ReviewForm />}
            {activeTab === 'b3' && <BmiCalculator />}
            {activeTab === 'b4' && <StudentManager />}
            {activeTab === 'b5' && <QuizApp />}
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="bg-white border-top py-3 text-center text-muted small mt-auto">
        <Container>
          <span>FER202 — Front-End Web Development • React 19 & React-Bootstrap 2</span>
        </Container>
      </footer>
    </div>
  );
}
