import { useState, useEffect } from 'react';
import axios from 'axios';

const URL = 'https://jsonplaceholder.typicode.com/posts/1';

const UpdatePost = () => {
  const [post, setPost] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(URL);
        setPost(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPost();
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(URL, {
        id: post.id,
        userId: post.userId,
        title: post.title,
        body: post.body,
      });
      setResult({ status: response.status, data: response.data });
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h2>PUT – Cập nhật bài viết #{post.id}</h2>
      <input value={post.title} onChange={e => setPost({ ...post, title: e.target.value })} />
      <br />
      <textarea value={post.body} onChange={e => setPost({ ...post, body: e.target.value })} />
      <br />
      <button onClick={handleUpdate}>Cập nhật (PUT)</button>

      {result && (
        <div>
          <p>Status: {result.status}</p>
          <pre>{JSON.stringify(result.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default UpdatePost;
