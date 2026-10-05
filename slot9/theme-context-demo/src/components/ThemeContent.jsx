import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeContent() {
  const { theme, setThemeMode } = useTheme();
  const isDark = theme === 'dark';

  return (
    <main
      className={`p-4 transition-all ${
        isDark ? 'bg-black text-light' : 'bg-white text-dark'
      }`}
    >
      <div className="mb-4">
        <h5 className="fw-bold mb-2">
          Giao diện hiện tại:{' '}
          <span className={`badge ${isDark ? 'bg-warning text-dark' : 'bg-primary'}`}>
            {theme}
          </span>
        </h5>
        <p className={isDark ? 'text-secondary' : 'text-muted'}>
          Component <code>Content</code> này không nhận bất kỳ prop nào từ cha. Nó đọc trực tiếp từ{' '}
          <code>ThemeContext</code> thông qua custom hook <code>useTheme()</code>.
        </p>
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <Card className={`h-100 ${isDark ? 'bg-dark text-white border-secondary' : 'bg-light'}`}>
            <Card.Body>
              <Card.Title className="fs-6 fw-bold">🎯 Nguyên lý giải quyết Prop Drilling</Card.Title>
              <Card.Text className="small">
                Thay vì phải truyền props qua từng tầng trung gian (App → Layout → Content),
                Context cung cấp một kênh phát sóng dữ liệu trực tiếp đến bất kỳ component con nào.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-6">
          <Card className={`h-100 ${isDark ? 'bg-dark text-white border-secondary' : 'bg-light'}`}>
            <Card.Body>
              <Card.Title className="fs-6 fw-bold">⚙️ Điều khiển nhanh chế độ</Card.Title>
              <Card.Text className="small">
                Bạn có thể chọn trực tiếp chủ đề mong muốn bằng các nút điều khiển bên dưới:
              </Card.Text>
              <div className="d-flex gap-2">
                <Button
                  size="sm"
                  variant={theme === 'light' ? 'primary' : 'outline-light'}
                  onClick={() => setThemeMode('light')}
                >
                  ☀️ Luôn sáng (Light)
                </Button>
                <Button
                  size="sm"
                  variant={theme === 'dark' ? 'warning' : 'outline-secondary'}
                  onClick={() => setThemeMode('dark')}
                >
                  🌙 Luôn tối (Dark)
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </main>
  );
}
