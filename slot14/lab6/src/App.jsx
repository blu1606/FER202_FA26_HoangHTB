import AxiosDemo from './components/AxiosDemo';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import UpdatePost from './components/UpdatePost';
import PatchPost from './components/PatchPost';
import DeletePost from './components/DeletePost';
import RequestConfig from './components/RequestConfig';

function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '0 16px', fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1>Exercise 27: Demo about AXIOS</h1>
        <p style={{ color: '#666' }}>Phần 1 và Phần 2 (7 component kết nối JSONPlaceholder)</p>
      </header>
      <AxiosDemo />
      <hr />
      <PostList />
      <hr />
      <CreatePost />
      <hr />
      <UpdatePost />
      <hr />
      <PatchPost />
      <hr />
      <DeletePost />
      <hr />
      <RequestConfig />
    </div>
  );
}

export default App;
