import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import StepCounter from './components/StepCounter';
import OrderTracker from './components/OrderTracker';
import KanbanBoard from './components/KanbanBoard';
import CourseWizard from './components/CourseWizard';
import NotesBoard from './components/NotesBoard';

import { TABS_CONFIG } from './data/exercise-data';

export default function App() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      {/* Top Navigation */}
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm py-3 mb-4">
        <Container>
          <Navbar.Brand className="d-flex align-items-center gap-2 fw-bold">
            <span className="badge bg-primary fs-6">Slot 8</span>
            <span>React Hook: useReducer Exercises</span>
          </Navbar.Brand>
          <Navbar.Text className="text-white-50 small d-none d-md-block">
            Exercise 13 • FPT University • FER202
          </Navbar.Text>
        </Container>
      </Navbar>

      <Container className="flex-grow-1 pb-5">
        {/* Header Hero */}
        <div className="bg-white p-3 p-md-4 rounded shadow-sm mb-4 border">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3 pb-3 border-bottom">
            <div>
              <h4 className="fw-bold mb-1 text-dark">Thực hành React Hook: useReducer</h4>
              <p className="text-muted mb-0 small">
                5 bài tập áp dụng chuyên sâu: Chuyển đổi từ useState, State Machine, Reducer tách file, Form Wizard với hàm init, và Higher-order reducer (Undoable).
              </p>
            </div>
            <Badge bg="success" className="px-3 py-2 fs-6">
              5 / 5 bài hoàn thành
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
                <Nav.Link
                  eventKey={t.key}
                  className={`px-3 py-2 fw-medium ${
                    activeTab === t.key ? 'bg-primary text-white shadow-sm' : 'bg-light text-dark'
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  {t.label}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </div>

        {/* Content Section */}
        <Row className="justify-content-center">
          <Col lg={11} xl={10}>
            {activeTab === 'all' && (
              <div className="d-flex flex-column gap-4">
                <div id="exercise-1"><StepCounter /></div>
                <div id="exercise-2"><OrderTracker /></div>
                <div id="exercise-3"><KanbanBoard /></div>
                <div id="exercise-4"><CourseWizard /></div>
                <div id="exercise-5"><NotesBoard /></div>
              </div>
            )}

            {activeTab === 'ex1' && <StepCounter />}
            {activeTab === 'ex2' && <OrderTracker />}
            {activeTab === 'ex3' && <KanbanBoard />}
            {activeTab === 'ex4' && <CourseWizard />}
            {activeTab === 'ex5' && <NotesBoard />}
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="bg-white border-top py-3 text-center text-muted small mt-auto">
        <Container>
          <span>FER202 — Front-End Web Development • Slot 8 useReducer • FPT University</span>
        </Container>
      </footer>
    </div>
  );
}
