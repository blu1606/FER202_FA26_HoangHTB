import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Counter from './components/Counter';
import ControlledInput from './components/ControlledInput';
import ToggleVisibility from './components/ToggleVisibility';
import TodoList from './components/TodoList';
import ColorSwitcher from './components/ColorSwitcher';
import SearchFilter from './components/SearchFilter';
import DragDropList from './components/DragDropList';

export default function App() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { key: 'all', label: 'Tất cả (All)' },
    { key: 'ex1', label: 'Bài 1: Counter' },
    { key: 'ex2', label: 'Bài 2: Controlled Input' },
    { key: 'ex3', label: 'Bài 3: Toggle Visibility' },
    { key: 'ex4', label: 'Bài 4: Todo List' },
    { key: 'ex5', label: 'Bài 5: Color Switcher' },
    { key: 'ex6', label: 'Bài 6: Search Filter' },
    { key: 'ex7', label: 'Bài 7: Drag & Drop' },
  ];

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm py-3 mb-4">
        <Container>
          <Navbar.Brand className="d-flex align-items-center gap-2 fw-bold">
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
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <div>
              <h4 className="fw-bold mb-1 text-dark">Thực hành React Hook: useState</h4>
              <p className="text-muted mb-0 small">
                Chọn từng bài để xem chi tiết hoặc chọn <strong>Tất cả (All)</strong> để cuộn toàn bộ 7 bài tập.
              </p>
            </div>
            <Badge bg="success" className="px-3 py-2 fs-6">
              7 / 7 Bài hoàn thành
            </Badge>
          </div>

          <Nav
            variant="pills"
            activeKey={activeTab}
            onSelect={(selected) => setActiveTab(selected || 'all')}
            className="gap-2 flex-wrap"
          >
            {tabs.map((tab) => (
              <Nav.Item key={tab.key}>
                <Nav.Link
                  eventKey={tab.key}
                  className={`px-3 py-2 fw-medium ${
                    activeTab === tab.key ? 'bg-primary text-white shadow-sm' : 'bg-light text-dark'
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
            {(activeTab === 'all' || activeTab === 'ex1') && (
              <div id="exercise-1">
                <Counter />
              </div>
            )}
            {(activeTab === 'all' || activeTab === 'ex2') && (
              <div id="exercise-2">
                <ControlledInput />
              </div>
            )}
            {(activeTab === 'all' || activeTab === 'ex3') && (
              <div id="exercise-3">
                <ToggleVisibility />
              </div>
            )}
            {(activeTab === 'all' || activeTab === 'ex4') && (
              <div id="exercise-4">
                <TodoList />
              </div>
            )}
            {(activeTab === 'all' || activeTab === 'ex5') && (
              <div id="exercise-5">
                <ColorSwitcher />
              </div>
            )}
            {(activeTab === 'all' || activeTab === 'ex6') && (
              <div id="exercise-6">
                <SearchFilter />
              </div>
            )}
            {(activeTab === 'all' || activeTab === 'ex7') && (
              <div id="exercise-7">
                <DragDropList />
              </div>
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
