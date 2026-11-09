import { useState } from 'react';
import {
  Container,
  Navbar,
  Nav,
  Row,
  Col,
  Badge,
} from 'react-bootstrap';

// Bài 1 Components
import Counter from './components/Counter';
import CounterDisplay from './components/CounterDisplay';

// Bài 2 Components
import TodoForm from './components/TodoForm';
import FilterBar from './components/FilterBar';
import TodoList from './components/TodoList';

// Bài 3 Components
import UserList from './components/UserList';
import UserPosts from './components/UserPosts';

// Bài 4 Components
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CartBadge from './components/CartBadge';

// Bài 5 Components
import Toolbar from './components/Toolbar';
import StudentTable from './components/StudentTable';
import StudentFormModal from './components/StudentFormModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('bai4'); // Mặc định mở bài mới

  // State quản lý Modal sinh viên (Bài 5)
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const openAddStudent = () => {
    setEditingStudent(null);
    setShowModal(true);
  };

  const openEditStudent = (student) => {
    setEditingStudent(student);
    setShowModal(true);
  };

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      {/* Navigation Header */}
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm px-3 py-2 sticky-top">
        <Container fluid>
          <Navbar.Brand className="d-flex align-items-center gap-2 fw-bold">
            <Badge bg="primary" className="fs-6">Slot 19</Badge>
            <span>Redux & Redux Toolkit Labs</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar-nav" />
          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="me-auto my-2 my-lg-0" variant="pills" activeKey={activeTab}>
              <Nav.Link
                eventKey="bai1"
                onClick={() => setActiveTab('bai1')}
                className="px-3"
              >
                Bài 1: Counter
              </Nav.Link>
              <Nav.Link
                eventKey="bai2"
                onClick={() => setActiveTab('bai2')}
                className="px-3"
              >
                Bài 2: Todo List
              </Nav.Link>
              <Nav.Link
                eventKey="bai3"
                onClick={() => setActiveTab('bai3')}
                className="px-3"
              >
                Bài 3: Users (Thunk)
              </Nav.Link>
              <Nav.Link
                eventKey="bai4"
                onClick={() => setActiveTab('bai4')}
                className="px-3 d-flex align-items-center gap-2"
              >
                <span>Bài 4: Giỏ hàng (RTK)</span>
              </Nav.Link>
              <Nav.Link
                eventKey="bai5"
                onClick={() => setActiveTab('bai5')}
                className="px-3"
              >
                Bài 5: CRUD Sinh viên (AsyncThunk)
              </Nav.Link>
            </Nav>

            <div className="d-flex align-items-center gap-3 text-white">
              <CartBadge />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content Area */}
      <Container className="flex-grow-1 py-4">
        {/* ==================== BÀI 1: COUNTER ==================== */}
        {activeTab === 'bai1' && (
          <div>
            <div className="text-center mb-4">
              <h3 className="fw-bold text-dark">Bài 1: Counter với Redux thuần</h3>
              <p className="text-muted small">
                Kiến trúc Redux cơ bản: Action Types, Action Creators, Pure Reducer, Store, <code>useSelector</code>, <code>useDispatch</code>
              </p>
            </div>
            <Counter />
            <CounterDisplay />
          </div>
        )}

        {/* ==================== BÀI 2: TODO LIST ==================== */}
        {activeTab === 'bai2' && (
          <div className="mx-auto" style={{ maxWidth: 640 }}>
            <div className="text-center mb-4">
              <h3 className="fw-bold text-dark">Bài 2: Todo List với Redux thuần & combineReducers</h3>
              <p className="text-muted small">
                Quản lý mảng trong state bất biến (thêm, sửa, xóa, hoàn thành), tách 2 reducer riêng biệt (<code>todos</code> và <code>filter</code>) ghép lại bằng <code>combineReducers</code>.
              </p>
            </div>
            <div className="bg-white p-4 rounded shadow-sm border">
              <TodoForm />
              <FilterBar />
              <TodoList />
            </div>
          </div>
        )}

        {/* ==================== BÀI 3: DANH SÁCH USERS & THUNK ==================== */}
        {activeTab === 'bai3' && (
          <div>
            <div className="mb-4">
              <h3 className="fw-bold text-dark">Bài 3: Danh sách Users & Posts với Redux Thunk</h3>
              <p className="text-muted small">
                Xử lý bất đồng bộ trong Redux thuần bằng middleware <code>redux-thunk</code>: mẫu 3 actions (<code>request / success / failure</code>), dispatch thunk với tham số, đọc <code>getState()</code> để tránh gọi lại API khi đã có dữ liệu.
              </p>
            </div>
            <Row className="g-4">
              <Col md={4}>
                <h5 className="fw-bold mb-3">👥 Danh sách người dùng</h5>
                <UserList />
              </Col>
              <Col md={8}>
                <h5 className="fw-bold mb-3">📄 Danh sách bài viết</h5>
                <UserPosts />
              </Col>
            </Row>
          </div>
        )}

        {/* ==================== BÀI 4: GIỎ HÀNG RTK ==================== */}
        {activeTab === 'bai4' && (
          <div>
            <div className="mb-4">
              <h3 className="fw-bold text-dark">Bài 4: Giỏ Hàng với Redux Toolkit (createSlice)</h3>
              <p className="text-muted small">
                Quản lý State hiện đại bằng Redux Toolkit (RTK): <code>createSlice</code> với Immer (cập nhật kiểu mutate), <code>createSelector</code>, và tự động lưu giỏ hàng vào <code>localStorage</code> qua <code>store.subscribe</code>.
              </p>
            </div>
            <Row className="g-4">
              <Col lg={7}>
                <h5 className="fw-bold mb-3">📱 Danh sách sản phẩm</h5>
                <ProductList />
              </Col>
              <Col lg={5}>
                <h5 className="fw-bold mb-3 d-flex justify-content-between align-items-center">
                  <span>🛒 Giỏ hàng của bạn</span>
                </h5>
                <Cart />
              </Col>
            </Row>
          </div>
        )}

        {/* ==================== BÀI 5: CRUD SINH VIÊN ASYNCTHUNK ==================== */}
        {activeTab === 'bai5' && (
          <div>
            <div className="mb-4">
              <h3 className="fw-bold text-dark">Bài 5: Quản lý Sinh viên CRUD với createAsyncThunk</h3>
              <p className="text-muted small">
                Xử lý bất đồng bộ trong Redux Toolkit: <code>createAsyncThunk</code> (GET, POST, PUT, DELETE), <code>extraReducers</code> dạng builder, <code>addMatcher</code> gom xử lý pending/rejected, <code>unwrap()</code> và kết nối Mock REST API (JSON Server).
              </p>
            </div>

            <Toolbar onAdd={openAddStudent} />
            <StudentTable onEdit={openEditStudent} />
            {showModal && (
              <StudentFormModal
                key={editingStudent?.id || 'new-student'}
                show={showModal}
                onHide={() => setShowModal(false)}
                editing={editingStudent}
              />
            )}
          </div>
        )}
      </Container>
    </div>
  );
}
