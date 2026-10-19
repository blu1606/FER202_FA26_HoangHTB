import useAxios from '../hooks/useAxios';
import postApi from '../api/postApi';

const NC8UseAxiosDemo = () => {
  // Sử dụng custom hook useAxios
  const { data: posts, loading, error, refetch } = useAxios(
    (signal) => postApi.getAll({ _limit: 3 }, signal),
    []
  );

  return (
    <div className="card shadow-sm p-3 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h4 className="text-primary mb-0">NC8: Custom Hook `useAxios`</h4>
        <button className="btn btn-outline-primary btn-sm" onClick={refetch} disabled={loading}>
          {loading ? 'Đang tải...' : '🔄 Thử lại (Refetch)'}
        </button>
      </div>

      <p className="text-muted small">
        Gom toàn bộ logic: <code>data</code>, <code>loading</code>, <code>error</code>, <code>AbortController</code> và hàm <code>refetch()</code> vào trong hook tái sử dụng.
      </p>

      {loading && <div className="text-primary small">Đang fetch dữ liệu qua useAxios hook...</div>}
      {error && (
        <div className="alert alert-danger py-2 small d-flex justify-content-between align-items-center">
          <span>{error}</span>
          <button className="btn btn-sm btn-outline-danger" onClick={refetch}>
            Thử lại
          </button>
        </div>
      )}

      {!loading && !error && posts && (
        <ul className="list-group list-group-flush small">
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

export default NC8UseAxiosDemo;
