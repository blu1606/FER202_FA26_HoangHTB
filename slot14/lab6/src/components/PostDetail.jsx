import { useState, useEffect } from 'react';
import postApi, { userApi } from '../api/postApi';

// NC3.2 – Đo thời gian: tuần tự (3 await nối tiếp) và song song (1 await + Promise.all)
const measure = async (id) => {
  let t0 = performance.now();
  const { data: p1 } = await postApi.getById(id);
  await userApi.getById(p1.userId);
  await postApi.getComments(id);
  const sequential = Math.round(performance.now() - t0);

  t0 = performance.now();
  const { data: p2 } = await postApi.getById(id);
  await Promise.all([userApi.getById(p2.userId), postApi.getComments(id)]);
  const parallel = Math.round(performance.now() - t0);

  return { sequential, parallel };
};

// Phiên bản 2 – Promise.allSettled: bình luận lỗi vẫn hiện bài viết + tác giả
const PostDetail = ({ postId = 1 }) => {
  const [detail, setDetail] = useState(null); // { post, author, comments, warning }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timing, setTiming] = useState(null);

  useEffect(() => {
    const loadDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        // Bước 1 – bắt buộc: lỗi ở đây là lỗi cả trang
        const { data: post } = await postApi.getById(postId);

        // Bước 2 – phần phụ: allSettled KHÔNG ném lỗi, trả kết quả từng request
        const [userResult, commentsResult] = await Promise.allSettled([
          userApi.getById(post.userId),
          postApi.getComments(postId),
        ]);

        setDetail({
          post,
          author: userResult.status === 'fulfilled' ? userResult.value.data : null,
          comments: commentsResult.status === 'fulfilled' ? commentsResult.value.data : [],
          warning: [userResult, commentsResult].some((r) => r.status === 'rejected')
            ? 'Một số thông tin phụ (tác giả / bình luận) không tải được.'
            : null,
        });
      } catch (err) {
        setError(err.userMessage);
      } finally {
        setLoading(false);
      }
    };
    loadDetail();
  }, [postId]);

  const handleMeasure = async () => {
    try {
      setTiming(await measure(postId));
    } catch (err) {
      setError(err.userMessage);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const { post, author, comments, warning } = detail;
  return (
    <div>
      {warning && <p style={{ color: 'orange' }}>⚠ {warning}</p>}
      <h2>NC3: {post.title}</h2>
      <p>
        Tác giả: <strong>{author?.name ?? `User ${post.userId}`}</strong>
        {author && ` (${author.email})`}
      </p>
      <p>{post.body}</p>

      <button onClick={handleMeasure}>Đo thời gian</button>
      {timing && (
        <p>
          Tuần tự: {timing.sequential} ms | Song song: {timing.parallel} ms
        </p>
      )}

      <h3>Bình luận ({comments.length})</h3>
      <ul>
        {comments.map((c) => (
          <li key={c.id}>
            <strong>{c.name}</strong>: {c.body}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostDetail;
