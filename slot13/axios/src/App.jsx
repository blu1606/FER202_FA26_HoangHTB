import React from 'react';
import AxiosDemo from './components/AxiosDemo';
import PostList from './components/PostList'
import CreatePost from './components/CreatePost'

function App() {
  return (
    <React.StrictMode>
      <AxiosDemo />
      <h1>2.1</h1>
      <PostList />
      <h1>2.2</h1>
      <CreatePost />
    </React.StrictMode>
  );
}

export default App;
