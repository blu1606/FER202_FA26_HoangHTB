import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

export default function LanguageSwitcher() {
  const { lang, t, switchLang } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Card className="shadow-sm border-0 mb-4 overflow-hidden">
      <Card.Header className="bg-warning text-dark d-flex justify-content-between align-items-center py-3">
        <div>
          <span className="fw-bold fs-5">Bài tập 1: LanguageContext — Đa ngôn ngữ (i18n)</span>
          <div className="small text-dark-50">
            Cung cấp custom hook useLanguage() trả về {'{ lang, t, switchLang }'} cập nhật toàn bộ Navbar, Content, Footer
          </div>
        </div>
        <div className="d-flex align-items-center gap-2">
          <Badge bg="dark" className="fs-6 px-3 py-2">
            {lang === 'vi' ? '🇻🇳 Tiếng Việt' : '🇬🇧 English'}
          </Badge>
          <Button
            variant="dark"
            size="sm"
            onClick={() => switchLang()}
            className="fw-bold shadow-sm"
          >
            {t('btnSwitch')}
          </Button>
        </div>
      </Card.Header>

      <Card.Body className={`p-4 ${isDark ? 'bg-dark text-white' : 'bg-light'}`}>
        <div className={`p-4 rounded border shadow-sm ${isDark ? 'bg-black border-secondary' : 'bg-white'}`}>
          {/* Mock Nav */}
          <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4 flex-wrap gap-2">
            <div className="fw-bold fs-5 d-flex align-items-center gap-2">
              <span>🌐</span>
              <span>{t('appTitle')}</span>
            </div>
            <Nav variant="pills" activeKey="home">
              <Nav.Item>
                <Nav.Link eventKey="home" className="py-1 px-3 active">
                  {t('navHome')}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="features" className="py-1 px-3">
                  {t('navFeatures')}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="about" className="py-1 px-3">
                  {t('navAbout')}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="contact" className="py-1 px-3">
                  {t('navContact')}
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>

          {/* Hero welcome */}
          <div className={`p-4 rounded mb-4 text-center ${isDark ? 'bg-dark border border-secondary' : 'bg-light'}`}>
            <h4 className="fw-bold text-primary mb-2">{t('welcomeHeader')}</h4>
            <p className={`mb-3 ${isDark ? 'text-light' : 'text-secondary'}`}>
              {t('welcomeBody')}
            </p>
            <div className="d-flex justify-content-center gap-2">
              <Button
                variant={lang === 'vi' ? 'primary' : 'outline-secondary'}
                size="sm"
                onClick={() => switchLang('vi')}
              >
                🇻🇳 Tiếng Việt
              </Button>
              <Button
                variant={lang === 'en' ? 'primary' : 'outline-secondary'}
                size="sm"
                onClick={() => switchLang('en')}
              >
                🇬🇧 English
              </Button>
            </div>
          </div>

          {/* Feature cards */}
          <Row className="g-3 mb-4">
            <Col md={6}>
              <div className={`p-3 rounded border h-100 ${isDark ? 'bg-dark border-secondary' : 'bg-light'}`}>
                <h6 className="fw-bold mb-1">🚀 {t('feature1Title')}</h6>
                <p className={`small mb-0 ${isDark ? 'text-secondary' : 'text-muted'}`}>
                  {t('feature1Desc')}
                </p>
              </div>
            </Col>
            <Col md={6}>
              <div className={`p-3 rounded border h-100 ${isDark ? 'bg-dark border-secondary' : 'bg-light'}`}>
                <h6 className="fw-bold mb-1">🧩 {t('feature2Title')}</h6>
                <p className={`small mb-0 ${isDark ? 'text-secondary' : 'text-muted'}`}>
                  {t('feature2Desc')}
                </p>
              </div>
            </Col>
          </Row>

          {/* Mock Footer */}
          <div className={`pt-3 border-top text-center small ${isDark ? 'text-secondary border-secondary' : 'text-muted'}`}>
            {t('footerText')}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
