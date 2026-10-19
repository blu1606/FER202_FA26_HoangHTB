import { useState, useEffect } from 'react';
import axios from 'axios';

const NC7JsonServerDemo = () => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [serverOnline, setServerOnline] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkAndFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/posts?_limit=4`, { timeout: 3000 });
      setPosts(res.data);
      setServerOnline(true);
    } catch {
      // Fallback
      setServerOnline(false);
      try {
        const fbRes = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=4');
        setPosts(fbRes.data);
      } catch (e) {
        console.error(e);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAndFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const newPost = { title, body: 'Nội dung lưu thật vào db.json', userId: 1 };
      const targetUrl = serverOnline ? apiUrl : 'https://jsonplaceholder.typicode.com';
      const res = await axios.post(`${targetUrl}/posts`, newPost);

      setPosts((prev) => [res.data, ...prev]);
      setTitle('');
      alert(
        serverOnline
          ? 'Đã ghi bài viết vào db.json thật! F5 dữ liệu vẫn còn!'
          : 'Đã gửi POST mô phỏng lên JSONPlaceholder.'
      );
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="card shadow-sm p-3 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h4 className="text-primary mb-0">NC7: Lưu Dữ Liệu Thật với json-server</h4>
        <span className={`badge ${serverOnline ? 'bg-success' : 'bg-warning text-dark'}`}>
          {serverOnline ? 'json-server Online (:3001)' : 'Đang dùng Online Fallback'}
        </span>
      </div>

      <p className="text-muted small">
        Cấu hình biến môi trường <code>.env</code> (<code>VITE_API_URL={apiUrl}</code>).
        Chạy script: <code>pnpm run server</code> để kích hoạt server lưu vào file <code>db.json</code>.
      </p>

      <form onSubmit={handleAddPost} className="d-flex gap-2 mb-3">
        <input
          className="form-control form-control-sm"
          placeholder="Nhập tiêu đề để ghi vào db.json..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="btn btn-sm btn-primary text-nowrap" type="submit">
          + Thêm bài thật
        </button>
      </form>

      {loading ? (
        <div className="text-muted small">Đang kiểm tra kết nối server...</div>
      ) : (
        <ul className="list-group list-group-flush small">
          {posts.map((p) => (
            <li key={p.id} className="list-group-item px-0">
              <span className="fw-bold">#{p.id}:</span> {p.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NC7JsonServerDemo;
