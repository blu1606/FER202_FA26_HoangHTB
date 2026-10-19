import { useState, useEffect } from 'react';
import postApi from '../api/postApi';

const NC3PostDetail = () => {
  const [postId, setPostId] = useState(1);
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [times, setTimes] = useState({ parallel: null, sequential: null });
  const [mode, setMode] = useState('parallel'); // 'parallel' | 'settled'

  const loadData = async (selectedId, runMode = mode) => {
    setLoading(true);
    try {
      // 1. Lấy thông tin bài viết trước để biết userId
      const postRes = await postApi.getById(selectedId);
      const postData = postRes.data;
      setPost(postData);

      // 2. So sánh đo thời gian:
      // a. Chạy Tuần tự (Sequential)
      const tSeqStart = performance.now();
      const uResSeq = await postApi.getUserById(postData.userId);
      const cResSeq = await postApi.getCommentsByPostId(selectedId);
      const tSeqEnd = performance.now();

      // b. Chạy Song song (Parallel)
      const tParStart = performance.now();
      if (runMode === 'settled') {
        const [uResult, cResult] = await Promise.allSettled([
          postApi.getUserById(postData.userId),
          postApi.getCommentsByPostId(selectedId),
        ]);
        setAuthor(uResult.status === 'fulfilled' ? uResult.value.data : null);
        setComments(cResult.status === 'fulfilled' ? cResult.value.data : []);
      } else {
        const [uRes, cRes] = await Promise.all([
          postApi.getUserById(postData.userId),
          postApi.getCommentsByPostId(selectedId),
        ]);
        setAuthor(uRes.data);
        setComments(cRes.data);
      }
      const tParEnd = performance.now();

      setTimes({
        sequential: Math.round(tSeqEnd - tSeqStart),
        parallel: Math.round(tParEnd - tParStart),
      });

      // Nếu chạy tuần tự để lấy data hiển thị
      if (runMode !== 'settled') {
        setAuthor(uResSeq.data);
        setComments(cResSeq.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(postId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  return (
    <div className="card shadow-sm p-3 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="text-primary mb-0">NC3: Nhiều Request Cùng Lúc (Parallel Requests)</h4>
        <div className="btn-group btn-group-sm">
          <button
            className={`btn ${mode === 'parallel' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => { setMode('parallel'); loadData(postId, 'parallel'); }}
          >
            Promise.all
          </button>
          <button
            className={`btn ${mode === 'settled' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => { setMode('settled'); loadData(postId, 'settled'); }}
          >
            Promise.allSettled
          </button>
        </div>
      </div>

      <div className="d-flex align-items-center gap-2 mb-3">
        <label className="fw-semibold small">Chọn bài viết ID:</label>
        {[1, 2, 3].map((id) => (
          <button
            key={id}
            className={`btn btn-sm ${postId === id ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => setPostId(id)}
          >
            Bài #{id}
          </button>
        ))}
      </div>

      {times.parallel !== null && (
        <div className="row g-2 mb-3">
          <div className="col-md-6">
            <div className="p-2 border rounded bg-light">
              <span className="fw-semibold text-danger">Gọi Tuần Tự:</span> {times.sequential} ms
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-2 border rounded bg-light">
              <span className="fw-semibold text-success">Gọi Song Song ({mode}):</span> {times.parallel} ms
              <span className="badge bg-success ms-2">Nhanh hơn rõ rệt</span>
            </div>
          </div>
        </div>
      )}

      {loading && <div className="text-muted">Đang tải song song tác giả và bình luận...</div>}

      {!loading && post && (
        <div className="border rounded p-3 bg-white">
          <h5>{post.title}</h5>
          <p className="text-secondary">{post.body}</p>

          <div className="p-2 mb-3 rounded bg-light small">
            <strong>Tác giả:</strong> {author ? `${author.name} (${author.email})` : 'Đang tải...'}
          </div>

          <h6 className="fw-semibold">Bình luận ({comments.length}):</h6>
          <ul className="list-group list-group-flush small">
            {comments.slice(0, 3).map((c) => (
              <li key={c.id} className="list-group-item px-0">
                <strong>{c.email}:</strong> {c.body}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NC3PostDetail;
