import { useTheme } from '../contexts/ThemeContext';

export default function ThemeFooter() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer
      className={`p-3 rounded-bottom text-center small transition-all border-top ${
        isDark
          ? 'bg-dark text-secondary border-secondary'
          : 'bg-light text-muted border-light-subtle'
      }`}
    >
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
        <span>© 2026 FER202 — FPT University</span>
        <span>
          Theme status: <strong className={isDark ? 'text-warning' : 'text-primary'}>{theme}</strong>
        </span>
      </div>
    </footer>
  );
}
