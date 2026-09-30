import { useReducer, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Badge from 'react-bootstrap/Badge';
import { undoable, createHistory } from './undoable';
import { notesReducer, initialNotes, COLORS } from './notesReducer';

// Khởi tạo higher-order reducer một lần duy nhất ở ngoài component
const notesWithHistory = undoable(notesReducer);

export default function NotesBoard() {
  const [history, dispatch] = useReducer(notesWithHistory, initialNotes, createHistory);
  const [text, setText] = useState('');
  const [color, setColor] = useState(COLORS[0]);

  const { past, present, future } = history;
  // Ghi chú được ghim được hiển thị lên đầu (tính toán dẫn xuất, không sửa state)
  const notes = [...present.items].sort((a, b) => Number(b.pinned) - Number(a.pinned));

  const handleAdd = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch({ type: 'ADD_NOTE', payload: { text, color } });
    setText('');
  };

  // Bắt phím tắt Ctrl+Z / Ctrl+Y
  const handleKeyDown = (e) => {
    if (!e.ctrlKey) return;
    if (e.key === 'z' || e.key === 'Z') {
      e.preventDefault();
      dispatch({ type: 'UNDO' });
    }
    if (e.key === 'y' || e.key === 'Y') {
      e.preventDefault();
      dispatch({ type: 'REDO' });
    }
  };

  const isTextInvalid = text.length > 0 && !text.trim();

  return (
    <Card className="shadow-sm border-0 mb-4" onKeyDown={handleKeyDown} tabIndex={0} style={{ outline: 'none' }}>
      <Card.Header className="bg-warning text-dark py-3 d-flex justify-content-between align-items-center flex-wrap gap-2">
        <h5 className="mb-0 fw-semibold">Bài 5: Bảng ghi chú với Hoàn tác / Làm lại (Undoable)</h5>
        <div className="d-flex gap-2">
          <Badge bg="dark" className="px-3 py-2 fs-6">
            {present.items.length} ghi chú
          </Badge>
        </div>
      </Card.Header>
      <Card.Body className="p-4">
        <p className="text-muted small mb-3">
          Sử dụng <strong>Higher-order reducer <code>undoable(reducer)</code></strong> quản lý lịch sử <code>past / present / future</code> (tối đa 20 bước). Hỗ trợ phím tắt <code>Ctrl + Z</code> và <code>Ctrl + Y</code>.
        </p>

        <div className="d-flex flex-wrap gap-2 mb-4 align-items-start">
          <Form onSubmit={handleAdd} className="flex-grow-1">
            <InputGroup hasValidation>
              <Form.Control
                placeholder="Nhập nội dung ghi chú dán..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                isInvalid={isTextInvalid}
              />
              <Form.Select
                style={{ maxWidth: 120 }}
                value={color}
                onChange={(e) => setColor(e.target.value)}
                aria-label="Màu sắc"
              >
                {COLORS.map((c, i) => (
                  <option key={c} value={c}>{`Màu ${i + 1}`}</option>
                ))}
              </Form.Select>
              <Button type="submit" variant="primary" disabled={!text.trim()}>
                + Thêm
              </Button>
              <Form.Control.Feedback type="invalid">
                Vui lòng không để trống nội dung ghi chú.
              </Form.Control.Feedback>
            </InputGroup>
          </Form>

          <ButtonGroup>
            <Button
              variant="outline-dark"
              disabled={past.length === 0}
              onClick={() => dispatch({ type: 'UNDO' })}
              title="Phím tắt: Ctrl + Z"
            >
              {`↶ Hoàn tác (${past.length})`}
            </Button>
            <Button
              variant="outline-dark"
              disabled={future.length === 0}
              onClick={() => dispatch({ type: 'REDO' })}
              title="Phím tắt: Ctrl + Y"
            >
              {`↷ Làm lại (${future.length})`}
            </Button>
          </ButtonGroup>

          <Button
            variant="outline-danger"
            disabled={present.items.length === 0}
            onClick={() => dispatch({ type: 'CLEAR_ALL' })}
          >
            Xóa hết
          </Button>
        </div>

        <Row xs={1} md={2} lg={3} className="g-3">
          {notes.map(({ id, text: noteText, color: noteColor, pinned }) => (
            <Col key={id}>
              <Card
                style={{
                  background: noteColor,
                  border: pinned ? '2px solid #fd7e14' : '1px solid rgba(0,0,0,0.1)',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                  minHeight: '140px',
                }}
                className="h-100 rounded-3"
              >
                <Card.Body className="d-flex flex-column p-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <span className="small text-muted font-monospace">#{id}</span>
                    {pinned && <Badge bg="warning" text="dark">📌 Đã ghim</Badge>}
                  </div>
                  <Card.Text className="flex-grow-1 text-dark fs-6 fw-medium mb-3">
                    {noteText}
                  </Card.Text>
                  <div className="d-flex gap-1 align-items-center mt-auto pt-2 border-top border-dark border-opacity-10">
                    <span className="small text-muted me-1">Màu:</span>
                    {COLORS.map((c) => (
                      <button
                        key={c}
                        type="button"
                        aria-label={`Đổi màu ${c}`}
                        onClick={() => dispatch({ type: 'CHANGE_COLOR', payload: { id, color: c } })}
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          background: c,
                          border: c === noteColor ? '2px solid #212529' : '1px solid #adb5bd',
                          cursor: 'pointer',
                        }}
                      />
                    ))}
                    <Button
                      size="sm"
                      variant="link"
                      className="ms-auto text-decoration-none p-0 text-dark"
                      onClick={() => dispatch({ type: 'TOGGLE_PIN', payload: id })}
                    >
                      {pinned ? 'Bỏ ghim' : 'Ghim'}
                    </Button>
                    <Button
                      size="sm"
                      variant="link"
                      className="text-danger text-decoration-none p-0 ms-2"
                      onClick={() => dispatch({ type: 'DELETE', payload: id })}
                    >
                      Xóa
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
          {notes.length === 0 && (
            <Col xs={12}>
              <div className="text-center py-5 bg-light rounded text-muted">
                Bảng ghi chú đang trống. Hãy nhập nội dung và thêm ghi chú mới!
              </div>
            </Col>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
}
