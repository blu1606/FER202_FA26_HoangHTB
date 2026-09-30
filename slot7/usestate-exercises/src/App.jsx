import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Exercise 12 Components
import Counter from './components/Counter';
import ControlledInput from './components/ControlledInput';
import ToggleVisibility from './components/ToggleVisibility';
import TodoList from './components/TodoList';
import ColorSwitcher from './components/ColorSwitcher';
import SearchFilter from './components/SearchFilter';
import DragDropList from './components/DragDropList';

import { TABS_CONFIG } from './data/exercise-data';
import reactLogo from './assets/react.svg';

export default function App() {
  const [classTab, setClassTab] = useState('all');

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm py-3 mb-4">
        <Container>
          <Navbar.Brand className="d-flex align-items-center gap-2 fw-bold">
            <img src={reactLogo} alt="React" width="24" height="24" className="me-1" />
            <span className="badge bg-primary fs-6">Slot 7</span>
            <span>React Hook: useState Exercises</span>
          </Navbar.Brand>
          <Navbar.Text className="text-white-50 small d-none d-md-block">
            Exercise 12 • FPT University • FER202
          </Navbar.Text>
        </Container>
      </Navbar>

      <Container className="flex-grow-1 pb-5">
        <div className="bg-white p-3 p-md-4 rounded shadow-sm mb-4 border">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3 pb-3 border-bottom">
            <div>
              <h4 className="fw-bold mb-1 text-dark">Thực hành React Hook: useState (Exercise 12)</h4>
              <p className="text-muted mb-0 small">
                Bao gồm 7 bài tập cơ bản tại lớp (Counter, Input, Toggle, TodoList, ColorSwitcher, SearchFilter, DragDropList).
              </p>
            </div>
            <Badge bg="success" className="px-3 py-2 fs-6">
              7 / 7 bài hoàn thành
            </Badge>
          </div>

          <Nav
            variant="pills"
            activeKey={classTab}
            onSelect={(k) => setClassTab(k || 'all')}
            className="gap-2 flex-wrap"
          >
            {TABS_CONFIG.map((tab) => (
              <Nav.Item key={tab.key}>
                <Nav.Link
                  eventKey={tab.key}
                  className={`px-3 py-2 fw-medium ${
                    classTab === tab.key ? 'bg-primary text-white shadow-sm' : 'bg-light text-dark'
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  {tab.label}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </div>

        <Row className="justify-content-center">
          <Col lg={10} xl={9}>
            {(classTab === 'all' || classTab === 'ex1') && (
              <div id="exercise-1"><Counter /></div>
            )}
            {(classTab === 'all' || classTab === 'ex2') && (
              <div id="exercise-2"><ControlledInput /></div>
            )}
            {(classTab === 'all' || classTab === 'ex3') && (
              <div id="exercise-3"><ToggleVisibility /></div>
            )}
            {(classTab === 'all' || classTab === 'ex4') && (
              <div id="exercise-4"><TodoList /></div>
            )}
            {(classTab === 'all' || classTab === 'ex5') && (
              <div id="exercise-5"><ColorSwitcher /></div>
            )}
            {(classTab === 'all' || classTab === 'ex6') && (
              <div id="exercise-6"><SearchFilter /></div>
            )}
            {(classTab === 'all' || classTab === 'ex7') && (
              <div id="exercise-7"><DragDropList /></div>
            )}
          </Col>
        </Row>
      </Container>

      <footer className="bg-white border-top py-3 text-center text-muted small mt-auto">
        FER202 • Slot 7 useState Exercises • FPT University
      </footer>
    </div>
  );
}
