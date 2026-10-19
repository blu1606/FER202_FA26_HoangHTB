import { useState, useEffect } from 'react';
import axios from 'axios';
import postApi from '../api/postApi';

const NC4AbortControllerDemo = () => {
  const [postId, setPostId] = useState(1);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [canceledLogs, setCanceledLogs] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await postApi.getById(postId, controller.signal);
        setPost(res.data);
      } catch (err) {
        if (axios.isCancel(err) || err.name === 'CanceledError') {
          console.log(`[Canceled] Request bài #${postId} đã bị hủy.`);
          setCanceledLogs((prev) => [
            `Request bài #${postId} bị hủy do chuyển bài nhanh`,
            ...prev.slice(0, 4),
          ]);
        } else {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();

    return () => {
      // Cleanup: Hủy request cũ nếu postId đổi trước khi request hoàn tất
      controller.abort();
    };
  }, [postId]);

  return (
    <div className="card shadow-sm p-3 mb-4">
      <h4 className="text-primary mb-2">NC4: AbortController & Hủy Request Cũ</h4>
      <p className="text-muted small">
        Bấm đổi ID thật nhanh: request cũ đang chờ sẽ tự động bị hủy (canceled), chỉ hiển thị kết quả của bài cuối cùng.
      </p>

      <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
        <label className="fw-semibold small">Bấm nhanh các ID:</label>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
          <button
            key={id}
            className={`btn btn-sm ${postId === id ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setPostId(id)}
          >
            #{id}
          </button>
        ))}
      </div>

      <div className="row g-3">
        <div className="col-md-7">
          <div className="border rounded p-3 bg-white h-100">
            <h6 className="fw-bold">Nội dung bài viết #{postId}:</h6>
            {loading && <div className="text-primary">Đang tải bài #{postId}...</div>}
            {!loading && post && (
              <div>
                <h5>{post.title}</h5>
                <p className="text-muted small mb-0">{post.body}</p>
              </div>
            )}
          </div>
        </div>

        <div className="col-md-5">
          <div className="border rounded p-3 bg-light h-100">
            <h6 className="fw-bold text-danger">Nhật ký Request bị hủy (Canceled):</h6>
            {canceledLogs.length === 0 ? (
              <span className="text-muted small">Chưa có request nào bị hủy. Thử bấm đổi nút liên tục!</span>
            ) : (
              <ul className="list-unstyled small mb-0">
                {canceledLogs.map((log, idx) => (
                  <li key={idx} className="text-danger border-bottom py-1">
                    ⚠️ {log}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NC4AbortControllerDemo;
