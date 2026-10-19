import { useState, useEffect } from 'react';
import postApi from '../api/postApi';

const NC10BulkOptimisticDelete = () => {
  const [posts, setPosts] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [simulatedError, setSimulatedError] = useState(false);
  const [message, setMessage] = useState(null);

  const fetchInitialPosts = async () => {
    setLoading(true);
    try {
      const res = await postApi.getAll({ _limit: 6 });
      setPosts(res.data);
      setSelectedIds([]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialPosts();
  }, []);

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === posts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(posts.map((p) => p.id));
    }
  };

  // 1. Thao tác hàng loạt: Xóa nhiều bài đã chọn với Promise.allSettled
  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Xóa đồng thời ${selectedIds.length} bài viết đã chọn?`)) return;

    setLoading(true);
    const deletePromises = selectedIds.map((id) => postApi.remove(id));
    const results = await Promise.allSettled(deletePromises);

    const successfulCount = results.filter((r) => r.status === 'fulfilled').length;
    setPosts((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
    setSelectedIds([]);
    setLoading(false);
    setMessage(`Đã xóa thành công ${successfulCount}/${results.length} bài viết đã chọn.`);
  };

  // 2. Optimistic Update: Xóa 1 bài (xóa ngay trên UI, lỗi thì khôi phục lại)
  const handleOptimisticDelete = async (post) => {
    const previousPosts = [...posts];

    // Xóa ngay lập tức trên UI trước khi server phản hồi
    setPosts((prev) => prev.filter((p) => p.id !== post.id));
    setMessage(`[Optimistic] Đã ẩn bài #${post.id} khỏi giao diện ngay lập tức...`);

    try {
      if (simulatedError) {
        // Mô phỏng server trả lỗi
        throw new Error('Máy chủ phản hồi lỗi 500 khi xóa!');
      }

      await postApi.remove(post.id);
      setMessage(`Server xác nhận: Xóa bài #${post.id} thành công!`);
    } catch (err) {
      // Khôi phục lại danh sách cũ nếu lỗi
      setPosts(previousPosts);
      setMessage(`⚠️ Lỗi: ${err.message}. Đã tự động khôi phục lại bài #${post.id}!`);
    }
  };

  return (
    <div className="card shadow-sm p-3 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h4 className="text-primary mb-0">NC10: Xóa Hàng Loạt & Optimistic Update</h4>
        <button className="btn btn-outline-secondary btn-sm" onClick={fetchInitialPosts} disabled={loading}>
          Khôi phục danh sách gốc
        </button>
      </div>

      <p className="text-muted small">
        - <strong>Xóa hàng loạt:</strong> dùng <code>Promise.allSettled</code> gửi nhiều request DELETE song song.
        <br />
        - <strong>Optimistic Update:</strong> giao diện phản hồi tức thì, nếu lỗi sẽ tự động rollback.
      </p>

      {/* Tùy chọn mô phỏng lỗi */}
      <div className="form-check form-switch mb-3 bg-light p-2 ps-5 rounded">
        <input
          className="form-check-input"
          type="checkbox"
          id="mockErrorCheck"
          checked={simulatedError}
          onChange={(e) => setSimulatedError(e.target.checked)}
        />
        <label className="form-check-label small fw-semibold text-danger" htmlFor="mockErrorCheck">
          Bật mô phỏng lỗi Server khi xóa (để kiểm tra tính năng tự động Khôi phục / Rollback)
        </label>
      </div>

      {message && <div className="alert alert-info py-2 small">{message}</div>}

      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="form-check small">
          <input
            className="form-check-input"
            type="checkbox"
            id="selectAll"
            checked={posts.length > 0 && selectedIds.length === posts.length}
            onChange={handleSelectAll}
          />
          <label className="form-check-label fw-semibold" htmlFor="selectAll">
            Chọn tất cả ({selectedIds.length}/{posts.length})
          </label>
        </div>

        <button
          className="btn btn-danger btn-sm"
          disabled={selectedIds.length === 0 || loading}
          onClick={handleBulkDelete}
        >
          Xóa {selectedIds.length} bài đã chọn (Promise.allSettled)
        </button>
      </div>

      {loading && <div className="text-muted small py-2">Đang xử lý request...</div>}

      <ul className="list-group list-group-flush border rounded">
        {posts.map((p) => (
          <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center py-2">
            <div className="form-check mb-0">
              <input
                className="form-check-input"
                type="checkbox"
                id={`check-${p.id}`}
                checked={selectedIds.includes(p.id)}
                onChange={() => handleToggleSelect(p.id)}
              />
              <label className="form-check-label small" htmlFor={`check-${p.id}`}>
                <span className="fw-bold me-1">#{p.id}</span> {p.title}
              </label>
            </div>

            <button
              className="btn btn-outline-danger btn-sm py-0 text-nowrap"
              onClick={() => handleOptimisticDelete(p)}
            >
              Xóa Optimistic
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NC10BulkOptimisticDelete;
