import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https://jsonplaceholder.typicode.com/posts';

const DeletePost = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(API, { params: { _limit: 5 } })
      .then(response => setPosts(response.data))
      .catch(error => setError(error.message));
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm(`Xóa bài viết #${id}?`)) return;

    axios
      .delete(`${API}/${id}`)
      .then(response => {
        setPosts(posts.filter(p => p.id !== id));   // cập nhật giao diện
        setMessage(`Đã xóa bài #${id} – Status: ${response.status}`);
      })
      .catch(error => setError(error.message));
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>DELETE – Xóa bài viết</h2>
      {message && <p>{message}</p>}
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            #{post.id} – {post.title}{' '}
            <button onClick={() => handleDelete(post.id)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeletePost;
