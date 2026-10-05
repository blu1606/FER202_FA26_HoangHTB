import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeHeader() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header
      className={`p-3 rounded-top d-flex justify-content-between align-items-center transition-all ${
        isDark ? 'bg-dark text-white border-bottom border-secondary' : 'bg-light text-dark border-bottom'
      }`}
    >
      <div className="d-flex align-items-center gap-2">
        <span className="fs-4">{isDark ? '🌙' : '☀️'}</span>
        <div>
          <h5 className="mb-0 fw-bold">My Themed Application</h5>
          <small className={isDark ? 'text-secondary' : 'text-muted'}>
            Component Header đọc Context trực tiếp không qua props
          </small>
        </div>
      </div>

      <div className="d-flex align-items-center gap-2">
        <Badge bg={isDark ? 'light' : 'dark'} text={isDark ? 'dark' : 'light'} className="px-2 py-1">
          {theme.toUpperCase()}
        </Badge>
        <Button
          variant={isDark ? 'warning' : 'dark'}
          size="sm"
          onClick={toggleTheme}
          className="fw-medium shadow-sm"
        >
          {isDark ? '☀️ Chuyển Sáng' : '🌙 Chuyển Tối'}
        </Button>
      </div>
    </header>
  );
}
