import { useState, useEffect } from 'react';
import {
  MemoryRouter,
  Routes,
  Route,
  NavLink,
  useNavigate,
  useParams,
  useSearchParams,
  Outlet,
} from 'react-router-dom';
import postApi from '../api/postApi';

// 1. Layout có Navbar & Outlet
const CrudLayout = () => (
  <div>
    <nav className="navbar navbar-expand navbar-dark bg-dark rounded px-3 mb-3">
      <span className="navbar-brand mb-0 h1 fs-6">Router CRUD Mini</span>
      <div className="navbar-nav gap-2">
        <NavLink to="/posts" className={({ isActive }) => `nav-link py-1 px-2 ${isActive ? 'active fw-bold text-warning' : ''}`}>
          Danh sách bài
        </NavLink>
        <NavLink to="/posts/new" className={({ isActive }) => `nav-link py-1 px-2 ${isActive ? 'active fw-bold text-warning' : ''}`}>
          + Viết bài mới
        </NavLink>
      </div>
    </nav>
    <Outlet />
  </div>
);

// 2. Trang danh sách có phân trang & lọc theo tác giả
const PostListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const userId = searchParams.get('userId') || '';

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const params = { _page: page, _limit: 4 };
        if (userId) params.userId = userId;
        const res = await postApi.getAll(params);
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [page, userId]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex align-items-center gap-2">
          <label className="small fw-semibold">Lọc tác giả:</label>
          <select
            className="form-select form-select-sm"
            style={{ width: '130px' }}
            value={userId}
            onChange={(e) => setSearchParams({ page: '1', ...(e.target.value ? { userId: e.target.value } : {}) })}
          >
            <option value="">Tất cả</option>
            <option value="1">User 1</option>
            <option value="2">User 2</option>
            <option value="3">User 3</option>
          </select>
        </div>

        <div className="btn-group btn-group-sm">
          <button
            className="btn btn-outline-secondary"
            disabled={page <= 1}
            onClick={() => setSearchParams({ page: (page - 1).toString(), ...(userId ? { userId } : {}) })}
          >
            Trang trước
          </button>
          <button className="btn btn-secondary disabled">Trang {page}</button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setSearchParams({ page: (page + 1).toString(), ...(userId ? { userId } : {}) })}
          >
            Trang sau
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-muted small py-3">Đang tải trang {page}...</div>
      ) : (
        <ul className="list-group list-group-flush border rounded mb-2">
          {posts.map((p) => (
            <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <span className="badge bg-secondary me-2">#{p.id}</span>
                <span className="fw-semibold">{p.title}</span>
              </div>
              <div className="btn-group btn-group-sm">
                <button className="btn btn-outline-primary py-0" onClick={() => navigate(`/posts/${p.id}`)}>
                  Xem
                </button>
                <button className="btn btn-outline-warning py-0" onClick={() => navigate(`/posts/${p.id}/edit`)}>
                  Sửa
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// 3. Trang tạo bài viết mới
const PostCreatePage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await postApi.create({ title, body, userId: 1 });
      alert('Tạo bài viết thành công!');
      navigate('/posts');
    } catch (err) {
      alert(err.viMessage || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleCreate} className="border rounded p-3 bg-light">
      <h6>Tạo bài viết mới (POST)</h6>
      <input
        className="form-control form-control-sm mb-2"
        placeholder="Tiêu đề..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="form-control form-control-sm mb-2"
        placeholder="Nội dung..."
        rows={3}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
      <button className="btn btn-success btn-sm" type="submit" disabled={submitting}>
        {submitting ? 'Đang tạo...' : 'Lưu bài viết'}
      </button>
    </form>
  );
};

// 4. Trang chi tiết bài viết
const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await postApi.getById(id);
        setPost(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDetail();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm(`Xóa bài #${id}?`)) return;
    try {
      await postApi.remove(id);
      alert(`Đã xóa bài #${id}!`);
      navigate('/posts');
    } catch (err) {
      alert(err.message);
    }
  };

  if (!post) return <div className="small text-muted">Đang tải chi tiết...</div>;

  return (
    <div className="border rounded p-3 bg-white">
      <h5>#{post.id} - {post.title}</h5>
      <p className="text-secondary small">{post.body}</p>
      <div className="d-flex gap-2">
        <button className="btn btn-sm btn-outline-secondary" onClick={() => navigate('/posts')}>
          Quay lại danh sách
        </button>
        <button className="btn btn-sm btn-danger" onClick={handleDelete}>
          Xóa bài viết
        </button>
      </div>
    </div>
  );
};

// 5. Trang sửa toàn bộ (PUT)
const PostEditPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await postApi.getById(id);
        setPost(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await postApi.update(id, post);
      alert(`Đã cập nhật bài #${id} (PUT)!`);
      navigate('/posts');
    } catch (err) {
      alert(err.message);
    }
  };

  if (!post) return <div className="small text-muted">Đang tải bài viết...</div>;

  return (
    <form onSubmit={handleSave} className="border rounded p-3 bg-light">
      <h6>Chỉnh sửa bài viết #{id} (PUT)</h6>
      <input
        className="form-control form-control-sm mb-2"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        required
      />
      <textarea
        className="form-control form-control-sm mb-2"
        rows={3}
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
        required
      />
      <div className="d-flex gap-2">
        <button className="btn btn-primary btn-sm" type="submit">
          Lưu thay đổi (PUT)
        </button>
        <button className="btn btn-secondary btn-sm" type="button" onClick={() => navigate('/posts')}>
          Hủy
        </button>
      </div>
    </form>
  );
};

const NotFoundPage = () => (
  <div className="alert alert-warning py-2 small">404: Không tìm thấy trang yêu cầu!</div>
);

// Component chính NC6
const NC6RouterCrud = () => {
  return (
    <div className="card shadow-sm p-3 mb-4">
      <h4 className="text-primary mb-2">NC6: Ứng Dụng CRUD với React Router</h4>
      <p className="text-muted small">
        Hệ thống điều hướng hoàn chỉnh: Lọc tác giả, phân trang qua URL (`useSearchParams`), Xem chi tiết, Tạo bài, Sửa toàn bộ (`PUT`), và Xóa.
      </p>

      <MemoryRouter initialEntries={['/posts']}>
        <Routes>
          <Route path="/" element={<CrudLayout />}>
            <Route index element={<PostListPage />} />
            <Route path="posts" element={<PostListPage />} />
            <Route path="posts/new" element={<PostCreatePage />} />
            <Route path="posts/:id" element={<PostDetailPage />} />
            <Route path="posts/:id/edit" element={<PostEditPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </div>
  );
};

export default NC6RouterCrud;
