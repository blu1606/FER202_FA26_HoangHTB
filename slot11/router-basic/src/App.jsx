import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import { useNavigate } from 'react-router-dom';

import Bai1App from './bai1/Bai1App';
import Bai2App from './bai2/Bai2App';
import Bai3App from './bai3/Bai3App';
import Bai4App from './bai4/Bai4App';
import Bai5App from './bai5/Bai5App';

const EXERCISES = [
  { id: 1, title: 'Bài 1: Portfolio cá nhân', desc: 'Routing cơ bản, Link, NavLink & Trang 404' },
  { id: 2, title: 'Bài 2: Thư viện FPT', desc: 'Layout Route, Outlet, Index & Nested Routing' },
  { id: 3, title: 'Bài 3: Danh sách môn học', desc: 'Dynamic Route, useParams & Xử lý 404 tham số' },
  { id: 4, title: 'Bài 4: Đăng ký sự kiện', desc: 'useNavigate, replace, state & useLocation' },
  { id: 5, title: 'Bài 5: Danh bạ sinh viên', desc: 'useSearchParams, URL làm State cho Search & Filter' },
];

export default function App() {
  const [currentTab, setCurrentTab] = useState(1);
  const navigate = useNavigate();

  const handleSelectTab = (tabId) => {
    setCurrentTab(tabId);
    navigate('/');
  };

  const activeEx = EXERCISES.find((e) => e.id === currentTab) ?? EXERCISES[0];

  return (
    <div className="bg-light min-vh-100">
      {/* Top Global Navigation Bar - Bộ chọn bài tập */}
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm py-2">
        <Container fluid="lg">
          <Navbar.Brand className="fw-bold d-flex align-items-center gap-2">
            <Badge bg="warning" text="dark" className="px-2 py-1">FER202</Badge>
            <span className="fs-6">Slot 11: React Router Cơ Bản</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="slot11-nav" />
          <Navbar.Collapse id="slot11-nav">
            <Nav className="ms-auto flex-wrap gap-1 align-items-center">
              {EXERCISES.map((ex) => (
                <Nav.Link
                  key={ex.id}
                  id={`tab-btn-${ex.id}`}
                  active={currentTab === ex.id}
                  onClick={() => handleSelectTab(ex.id)}
                  className={`rounded px-3 py-1 small fw-semibold cursor-pointer ${
                    currentTab === ex.id ? 'bg-primary text-white' : 'text-light'
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  {`Bài ${ex.id}`}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Header Info Panel cho bài tập đang chọn */}
      <div className="bg-white border-bottom py-2 shadow-sm mb-3">
        <Container fluid="lg" className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <span className="fw-bold text-primary me-2">{activeEx.title}</span>
            <span className="text-secondary small">({activeEx.desc})</span>
          </div>
          <Badge bg="info" className="text-dark">
            React 19 + React Router 7 + React-Bootstrap
          </Badge>
        </Container>
      </div>

      {/* Render nội dung bài tập tương ứng */}
      <Container fluid="lg">
        {currentTab === 1 && (
          <div id="exercise-1">
            <Bai1App />
          </div>
        )}

        {currentTab === 2 && (
          <div id="exercise-2">
            <Bai2App />
          </div>
        )}

        {currentTab === 3 && (
          <div id="exercise-3">
            <Bai3App />
          </div>
        )}

        {currentTab === 4 && (
          <div id="exercise-4">
            <Bai4App />
          </div>
        )}

        {currentTab === 5 && (
          <div id="exercise-5">
            <Bai5App />
          </div>
        )}
      </Container>
    </div>
  );
}
