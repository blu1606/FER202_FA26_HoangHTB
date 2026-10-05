import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import ThemeSwitcher from './components/ThemeSwitcher';
import CartManager from './components/CartManager';
import AuthManager from './components/AuthManager';
import LanguageSwitcher from './components/LanguageSwitcher';
import NotificationToast from './components/NotificationToast';
import { useTheme } from './contexts/ThemeContext';
import { TABS_CONFIG } from './data/exercise-data';

export default function App() {
  const [activeTab, setActiveTab] = useState('all');
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-vh-100 d-flex flex-column transition-all ${isDark ? 'bg-black text-light' : 'bg-light text-dark'}`}>
      {/* Top Navbar */}
      <Navbar bg={isDark ? 'dark' : 'white'} variant={isDark ? 'dark' : 'light'} expand="lg" className="shadow-sm py-3 mb-4 border-bottom">
        <Container>
          <Navbar.Brand className="d-flex align-items-center gap-2 fw-bold">
            <span className="badge bg-primary fs-6">Slot 9</span>
            <span>React Hook: useContext Demo</span>
          </Navbar.Brand>
          <div className="d-flex align-items-center gap-3">
            <Button
              variant={isDark ? 'outline-warning' : 'outline-dark'}
              size="sm"
              onClick={toggleTheme}
              className="d-flex align-items-center gap-1 shadow-sm"
            >
              <span>{isDark ? '☀️' : '🌙'}</span>
              <span className="d-none d-sm-inline">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </Button>
            <Navbar.Text className={`${isDark ? 'text-white-50' : 'text-muted'} small d-none d-md-block`}>
              FER202 • FPT University
            </Navbar.Text>
          </div>
        </Container>
      </Navbar>

      <Container className="flex-grow-1 pb-5">
        {/* Header Hero */}
        <div className={`p-4 rounded shadow-sm mb-4 border ${isDark ? 'bg-dark border-secondary' : 'bg-white'}`}>
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3 pb-3 border-bottom border-secondary-subtle">
            <div>
              <h4 className="fw-bold mb-1">Thực hành React Hook: useContext</h4>
              <p className={`${isDark ? 'text-secondary' : 'text-muted'} mb-0 small`}>
                Khắc phục Prop Drilling: Quản lý Theme, Giỏ hàng tối ưu (useReducer), Xác thực (AuthContext), Đa ngôn ngữ (i18n), và Thông báo (Toast).
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
                    activeTab === t.key
                      ? 'bg-primary text-white shadow-sm'
                      : isDark
                      ? 'bg-secondary text-white'
                      : 'bg-light text-dark'
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
            {(activeTab === 'all' || activeTab === 'ex1') && (
              <div id="exercise-1">
                <ThemeSwitcher />
              </div>
            )}

            {(activeTab === 'all' || activeTab === 'ex2') && (
              <div id="exercise-2">
                <CartManager />
              </div>
            )}

            {(activeTab === 'all' || activeTab === 'ex3') && (
              <div id="exercise-3">
                <AuthManager />
              </div>
            )}

            {(activeTab === 'all' || activeTab === 'ex4') && (
              <div id="exercise-4">
                <LanguageSwitcher />
              </div>
            )}

            {(activeTab === 'all' || activeTab === 'ex5') && (
              <div id="exercise-5">
                <NotificationToast />
              </div>
            )}
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className={`border-top py-3 text-center small mt-auto ${isDark ? 'bg-dark text-secondary border-secondary' : 'bg-white text-muted'}`}>
        <Container>
          <span>FER202 — Front-End Web Development • Slot 9 useContext • FPT University</span>
        </Container>
      </footer>
    </div>
  );
}
