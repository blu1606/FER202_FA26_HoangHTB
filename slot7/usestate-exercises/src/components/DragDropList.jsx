import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

const INITIAL_TASK_LIST = [
  '1. Khởi tạo dự án Vite với React 19',
  '2. Cài đặt React-Bootstrap và tích hợp CSS',
  '3. Thực hành Hook useState với Simple Counter',
  '4. Xây dựng Controlled Input Field và Real-time Preview',
  '5. Lập trình Toggle Visibility ẩn hiện nội dung',
  '6. Quản lý mảng State với ứng dụng Todo List',
  '7. Tương tác Dropdown động với Color Switcher',
  '8. Lọc dữ liệu thời gian thực với Search Filter',
  '9. Kéo thả sắp xếp danh sách với Drag and Drop API',
];

export default function DragDropList() {
  const [items, setItems] = useState(INITIAL_TASK_LIST);
  const [draggingItem, setDraggingItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggingItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnter = (e, index) => {
    e.preventDefault();
    setDragOverItem(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggingItem === null || draggingItem === targetIndex) {
      setDraggingItem(null);
      setDragOverItem(null);
      return;
    }

    const updatedItems = [...items];
    const [draggedItemContent] = updatedItems.splice(draggingItem, 1);
    updatedItems.splice(targetIndex, 0, draggedItemContent);

    setItems(updatedItems);
    setDraggingItem(null);
    setDragOverItem(null);
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
    setDragOverItem(null);
  };

  const handleReset = () => {
    setItems(INITIAL_TASK_LIST);
  };

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Header className="bg-dark text-white py-3 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-semibold">Bài 7: Drag and Drop List</h5>
        <Button variant="outline-light" size="sm" onClick={handleReset}>
          ↻ Đặt lại thứ tự ban đầu
        </Button>
      </Card.Header>
      <Card.Body className="p-4">
        <p className="text-muted mb-3">
          Nhấp và giữ chuột vào bất kỳ mục nào để kéo và thả sang vị trí khác để sắp xếp lại danh sách.
        </p>

        <ListGroup className="rounded overflow-hidden">
          {items.map((item, index) => {
            const isDragging = draggingItem === index;
            const isOver = dragOverItem === index && !isDragging;

            return (
              <ListGroup.Item
                key={item}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                className={`py-3 px-3 d-flex align-items-center justify-content-between ${
                  isDragging ? 'bg-light text-muted opacity-50 border-primary' : ''
                } ${isOver ? 'bg-primary-subtle border-2 border-primary' : ''}`}
                style={{
                  cursor: 'grab',
                  userSelect: 'none',
                  transition: 'background-color 0.2s ease, border-color 0.2s ease',
                }}
              >
                <div className="d-flex align-items-center gap-3">
                  <span className="text-muted fs-5 fw-bold" style={{ cursor: 'grab' }}>
                    ⋮⋮
                  </span>
                  <Badge bg="primary" pill>
                    #{index + 1}
                  </Badge>
                  <span className="fw-medium text-dark">{item}</span>
                </div>
                <small className="text-muted fst-italic">Kéo để di chuyển</small>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
