import { useState, useEffect } from 'react';
import postApi from '../api/postApi';

const NC9DebounceSearch = () => {
  const [keyword, setKeyword] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  // Debounce 500ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(keyword);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [keyword]);

  // Gọi API khi debouncedValue thay đổi
  useEffect(() => {
    if (!debouncedValue.trim()) {
      setResults([]);
      return;
    }

    const searchPosts = async () => {
      setSearching(true);
      try {
        const res = await postApi.getAll({ q: debouncedValue });
        setResults(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setSearching(false);
      }
    };

    searchPosts();
  }, [debouncedValue]);

  return (
    <div className="card shadow-sm p-3 mb-4">
      <h4 className="text-primary mb-2">NC9: Tìm Kiếm có Debounce (500ms)</h4>
      <p className="text-muted small">
        Tự động hoãn gọi API sau khi người dùng ngừng gõ phím 500ms để tối ưu số lượng request lên server.
      </p>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nhập từ khóa tìm kiếm (ví dụ: qui, sunt, dolor)..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="form-text">
          {keyword !== debouncedValue ? (
            <span className="text-warning">⏳ Đang chờ người dùng ngừng gõ (500ms debounce)...</span>
          ) : debouncedValue ? (
            <span className="text-success">
              ✅ Đang tìm kiếm từ khóa: <strong>"{debouncedValue}"</strong>
            </span>
          ) : (
            'Nhập ít nhất 1 ký tự để tìm kiếm.'
          )}
        </div>
      </div>

      {searching && <div className="text-muted small">Đang truy vấn dữ liệu từ API...</div>}

      {!searching && debouncedValue && results.length === 0 && (
        <div className="alert alert-light border small text-muted">
          Không tìm thấy bài viết nào khớp với từ khóa "{debouncedValue}".
        </div>
      )}

      {results.length > 0 && (
        <div>
          <h6 className="fw-semibold">Kết quả tìm kiếm ({results.length} bài):</h6>
          <ul className="list-group list-group-flush small">
            {results.slice(0, 5).map((p) => (
              <li key={p.id} className="list-group-item px-0">
                <span className="fw-bold">#{p.id}:</span> {p.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NC9DebounceSearch;
