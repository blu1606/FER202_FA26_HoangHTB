import { useState } from 'react';
import AxiosDemo from './components/AxiosDemo';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import UpdatePost from './components/UpdatePost';
import PatchPost from './components/PatchPost';
import DeletePost from './components/DeletePost';
import RequestConfig from './components/RequestConfig';

// Advanced Components (NC2 - NC10)
import NC2AxiosClientDemo from './components/NC2AxiosClientDemo';
import NC3PostDetail from './components/NC3PostDetail';
import NC4AbortControllerDemo from './components/NC4AbortControllerDemo';
import NC5BootstrapPostForm from './components/NC5BootstrapPostForm';
import NC6RouterCrud from './components/NC6RouterCrud';
import NC7JsonServerDemo from './components/NC7JsonServerDemo';
import NC8UseAxiosDemo from './components/NC8UseAxiosDemo';
import NC9DebounceSearch from './components/NC9DebounceSearch';
import NC10BulkOptimisticDelete from './components/NC10BulkOptimisticDelete';

function App() {
  const [activeTab, setActiveTab] = useState('advanced'); // 'basic' | 'advanced'

  return (
    <div className="container my-4" style={{ maxWidth: '960px' }}>
      <header className="text-center mb-4 pb-2 border-bottom">
        <h2 className="fw-bold text-dark">Slot 13: Demo & Bài tập AXIOS (Exercise 27)</h2>
        <p className="text-muted">Tổng hợp thực hành từ cơ bản (HTTP Methods) đến nâng cao (NC2 - NC10)</p>

        <div className="d-flex justify-content-center gap-2 mt-3">
          <button
            className={`btn px-4 ${activeTab === 'advanced' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setActiveTab('advanced')}
          >
            🔥 Phần 3: Nâng Cao (NC2 - NC10)
          </button>
          <button
            className={`btn px-4 ${activeTab === 'basic' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setActiveTab('basic')}
          >
            📚 Phần 1 & 2: Cơ Bản (Bài 1 - 2.6)
          </button>
        </div>
      </header>

      {activeTab === 'advanced' ? (
        <div>
          <div id="nc2"><NC2AxiosClientDemo /></div>
          <div id="nc3"><NC3PostDetail /></div>
          <div id="nc4"><NC4AbortControllerDemo /></div>
          <div id="nc5"><NC5BootstrapPostForm /></div>
          <div id="nc6"><NC6RouterCrud /></div>
          <div id="nc7"><NC7JsonServerDemo /></div>
          <div id="nc8"><NC8UseAxiosDemo /></div>
          <div id="nc9"><NC9DebounceSearch /></div>
          <div id="nc10"><NC10BulkOptimisticDelete /></div>
        </div>
      ) : (
        <div>
          <div className="card shadow-sm p-3 mb-3"><AxiosDemo /></div>
          <div className="card shadow-sm p-3 mb-3"><PostList /></div>
          <div className="card shadow-sm p-3 mb-3"><CreatePost /></div>
          <div className="card shadow-sm p-3 mb-3"><UpdatePost /></div>
          <div className="card shadow-sm p-3 mb-3"><PatchPost /></div>
          <div className="card shadow-sm p-3 mb-3"><DeletePost /></div>
          <div className="card shadow-sm p-3 mb-3"><RequestConfig /></div>
        </div>
      )}
    </div>
  );
}

export default App;
