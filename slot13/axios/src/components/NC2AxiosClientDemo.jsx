import { useState, useEffect } from 'react';
import postApi from '../api/postApi';

const NC2AxiosClientDemo = () => {
  const [posts, setPosts] = useState([]);
  const [duration, setDuration] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await postApi.getAll({ _limit: 3 });
      setPosts(res.data);
      setDuration(res.duration);
    } catch (err) {
      setError(err.viMessage || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleToggleToken = () => {
    if (token) {
      localStorage.removeItem('token');
      setToken('');
    } else {
      const demoToken = 'jwt-token-demo-xyz';
      localStorage.setItem('token', demoToken);
      setToken(demoToken);
    }
    fetchPosts();
  };

  return (
    <div className="card shadow-sm p-3 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h4 className="text-primary mb-0">NC2: axiosClient & Interceptors</h4>
        <button className="btn btn-outline-secondary btn-sm" onClick={handleToggleToken}>
          {token ? 'Xóa Token khỏi Header' : 'Gắn Dummy Token vào Header'}
        </button>
      </div>

      <p className="text-muted small">
        Sử dụng custom axios instance có Interceptors tự động log, gắn Header Token và đo thời gian xử lý:
        {duration !== null && (
          <span className="badge bg-success ms-2">Thời gian phản hồi: {duration} ms</span>
        )}
      </p>

      {token && (
        <div className="alert alert-info py-1 px-2 small">
          <strong>Đang gửi Header:</strong> Authorization: Bearer {token}
        </div>
      )}

      {loading && <div className="text-muted">Đang tải dữ liệu qua axiosClient...</div>}
      {error && <div className="alert alert-danger py-2">{error}</div>}

      {!loading && !error && (
        <ul className="list-group list-group-flush">
          {posts.map((post) => (
            <li key={post.id} className="list-group-item px-0">
              <span className="fw-semibold">#{post.id}</span> - {post.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NC2AxiosClientDemo;
