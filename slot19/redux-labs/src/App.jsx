import { Container, Navbar, Badge } from 'react-bootstrap';
import Counter from './components/Counter';
import CounterDisplay from './components/CounterDisplay';

export default function App() {
  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      <Navbar bg="dark" variant="dark" className="shadow-sm py-3 mb-4">
        <Container>
          <Navbar.Brand className="d-flex align-items-center gap-2 fw-bold">
            <Badge bg="primary" className="fs-6">Slot 19</Badge>
            <span>FER202 — Redux Core & React-Redux</span>
          </Navbar.Brand>
          <Navbar.Text className="text-white-50 small d-none d-md-block">
            Bài 1: Counter với Redux thuần (Action, Reducer, Store, Provider, useSelector, useDispatch)
          </Navbar.Text>
        </Container>
      </Navbar>

      <Container className="flex-grow-1 pb-5">
        <div className="text-center mb-3">
          <h2 className="fw-bold text-dark mb-1">Thực Hành Redux Cơ Bản</h2>
          <p className="text-muted small">
            Quản lý State toàn cục bằng Redux thuần kết nối với React qua <code>react-redux</code>
          </p>
        </div>

        <Counter />
        <CounterDisplay />
      </Container>
    </div>
  );
}
