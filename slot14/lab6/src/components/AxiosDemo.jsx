import { useState, useEffect } from 'react';
import axios from 'axios';
import postApi from '../api/postApi';

const AxiosDemo = () => {
  const [postId, setPostId] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Mỗi lần effect chạy (postId đổi) tạo một controller MỚI
    const controller = new AbortController();

    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        // 2. Truyền signal cho axios
        const res = await postApi.getById(postId, controller.signal);
        setData(res.data);
      } catch (err) {
        // 3. Request bị hủy → không phải lỗi, bỏ qua
        if (axios.isCancel(err)) return;
        setData(null);
        setError(err.userMessage ?? err.message);
      } finally {
        // Request đã bị hủy thì request mới đang chạy → không tắt loading
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchPost();

    // 4. Cleanup: chạy TRƯỚC lần effect kế tiếp và khi unmount → hủy request cũ
    return () => controller.abort();
  }, [postId]);

  return (
    <div>
      <h1>Axios Demo (NC4: AbortController)</h1>
      <label>
        Post ID (1–100):{' '}
        <input
          type="number"
          min={1}
          max={100}
          value={postId}
          onChange={(e) => setPostId(Number(e.target.value) || 1)}
        />
      </label>{' '}
      <button onClick={() => setPostId((id) => Math.max(1, id - 1))}>‹ Trước</button>{' '}
      <button onClick={() => setPostId((id) => id + 1)}>Sau ›</button>

      {loading && <div>Loading...</div>}
      {!loading && error && <div>Error: {error}</div>}
      {!loading && data && (
        <div>
          <h2>
            #{data.id} – {data.title}
          </h2>
          <p>{data.body}</p>
        </div>
      )}
    </div>
  );
};

export default AxiosDemo;
