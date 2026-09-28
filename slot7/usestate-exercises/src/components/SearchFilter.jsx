import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import InputGroup from 'react-bootstrap/InputGroup';
import { SEARCH_TECH_ITEMS } from '../data/exercise-data';

export default function SearchFilter() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = SEARCH_TECH_ITEMS.filter((item) => {
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
          {filteredItems.length} / {SEARCH_TECH_ITEMS.length} kết quả
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
