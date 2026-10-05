import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import ThemeHeader from './ThemeHeader';
import ThemeContent from './ThemeContent';
import ThemeFooter from './ThemeFooter';

export default function ThemeSwitcher() {
  return (
    <Card className="shadow-sm border-0 mb-4 overflow-hidden">
      <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center py-3">
        <div>
          <span className="fw-bold fs-5">Ví dụ 1: ThemeContext — Đổi giao diện Sáng / Tối</span>
          <div className="small text-white-50">
            Minh họa 3 bước: Create (createContext) – Provide (ThemeProvider) – Consume (useTheme)
          </div>
        </div>
        <Badge bg="light" text="dark" className="fs-6 px-3 py-2">
          Step-by-step
        </Badge>
      </Card.Header>

      <Card.Body className="p-3 bg-light">
        <div className="rounded border shadow-sm overflow-hidden">
          <ThemeHeader />
          <ThemeContent />
          <ThemeFooter />
        </div>
      </Card.Body>
    </Card>
  );
}
