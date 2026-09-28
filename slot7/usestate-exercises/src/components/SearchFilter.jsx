import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import InputGroup from 'react-bootstrap/InputGroup';

const INITIAL_ITEMS = [
  { id: 1, name: 'React', category: 'Frontend Library', desc: 'Thư viện UI nổi tiếng của Meta' },
  { id: 2, name: 'JavaScript', category: 'Programming Language', desc: 'Ngôn ngữ nền tảng của Web hiện đại' },
  { id: 3, name: 'TypeScript', category: 'Language SuperSet', desc: 'JavaScript bổ sung hệ thống kiểu chặt chẽ' },
  { id: 4, name: 'Vite', category: 'Build Tool', desc: 'Công cụ build và dev server siêu tốc' },
  { id: 5, name: 'Bootstrap', category: 'CSS Framework', desc: 'Thư viện UI responsive phổ biến nhất' },
  { id: 6, name: 'Next.js', category: 'Fullstack Framework', desc: 'Framework React hỗ trợ SSR và App Router' },
  { id: 7, name: 'Node.js', category: 'Runtime Environment', desc: 'Môi trường thực thi JavaScript phía Server' },
  { id: 8, name: 'Redux Toolkit', category: 'State Management', desc: 'Công cụ quản lý Global State chuyên nghiệp' },
  { id: 9, name: 'Tailwind CSS', category: 'CSS Framework', desc: 'Utility-first CSS framework tốc độ cao' },
  { id: 10, name: 'Python', category: 'Programming Language', desc: 'Ngôn ngữ đa dụng cho Backend và AI/ML' },
];

export default function SearchFilter() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = INITIAL_ITEMS.filter((item) => {
    const q = searchTerm.toLowerCase().trim();
    return (
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q)
    );
  });

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Header className="bg-secondary text-white py-3 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-semibold">Bài 6: Search Filter</h5>
        <Badge bg="light" text="dark" className="fs-6 px-3 py-1">
          {filteredItems.length} / {INITIAL_ITEMS.length} kết quả
        </Badge>
      </Card.Header>
      <Card.Body className="p-4">
        <p className="text-muted mb-3">
          Nhập từ khóa tìm kiếm để lọc danh sách công nghệ và ngôn ngữ lập trình theo thời gian thực.
        </p>

        <InputGroup size="lg" className="mb-4">
          <Form.Control
            type="search"
            placeholder="Tìm theo tên công nghệ, danh mục hoặc mô tả..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => setSearchTerm('')}
            >
              ✕ Xóa
            </button>
          )}
        </InputGroup>

        {filteredItems.length === 0 ? (
          <div className="text-center py-5 bg-light rounded text-muted">
            <p className="fs-5 mb-1">🔍 Không tìm thấy kết quả nào phù hợp!</p>
            <small>Thử tìm kiếm với từ khóa khác như "React", "CSS", "Language"...</small>
          </div>
        ) : (
          <ListGroup className="border rounded">
            {filteredItems.map((item) => (
              <ListGroup.Item
                key={item.id}
                className="d-flex justify-content-between align-items-center py-3"
              >
                <div>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span className="fw-bold text-dark fs-5">{item.name}</span>
                    <Badge bg="info" className="text-dark">
                      {item.category}
                    </Badge>
                  </div>
                  <span className="text-muted small">{item.desc}</span>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
}
