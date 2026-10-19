import { useState } from 'react';
import { Card, Form, Button, Alert, Spinner, Modal, Toast, ToastContainer } from 'react-bootstrap';
import postApi from '../api/postApi';

const NC5BootstrapPostForm = () => {
  const [formData, setFormData] = useState({ title: '', body: '', userId: 1 });
  const [validated, setValidated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [createdPost, setCreatedPost] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Modal confirm delete
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  // Toast notification
  const [toast, setToast] = useState({ show: false, message: '', variant: 'success' });

  const showToast = (message, variant = 'success') => {
    setToast({ show: true, message, variant });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Kiểm tra tính hợp lệ: Title >= 5 ký tự, Body >= 10 ký tự
    const isTitleValid = formData.title.trim().length >= 5;
    const isBodyValid = formData.body.trim().length >= 10;

    if (!form.checkValidity() || !isTitleValid || !isBodyValid) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);
    try {
      const res = await postApi.create(formData);
      setCreatedPost(res.data);
      showToast(`Tạo bài viết thành công! ID: ${res.data.id || 101}`, 'success');
      setFormData({ title: '', body: '', userId: 1 });
      setValidated(false);
    } catch (err) {
      setErrorMessage(err.viMessage || err.message);
      showToast('Tạo bài viết thất bại!', 'danger');
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!postToDelete) return;
    try {
      await postApi.remove(postToDelete.id);
      showToast(`Đã xóa bài viết #${postToDelete.id} thành công!`, 'success');
      setCreatedPost(null);
    } catch (err) {
      showToast(err.viMessage || err.message, 'danger');
    } finally {
      setShowDeleteModal(false);
      setPostToDelete(null);
    }
  };

  return (
    <Card className="shadow-sm p-3 mb-4">
      <Card.Header as="h4" className="bg-white text-primary border-0 px-0">
        NC5: Giao diện React-Bootstrap & Form Validation
      </Card.Header>

      <Card.Body className="px-0 py-2">
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Tiêu đề bài viết (tối thiểu 5 ký tự):</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tiêu đề..."
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              required
              minLength={5}
              isInvalid={validated && formData.title.trim().length < 5}
              isValid={validated && formData.title.trim().length >= 5}
            />
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập tiêu đề bài viết có ít nhất 5 ký tự.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Nội dung bài viết (tối thiểu 10 ký tự):</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Nhập nội dung chi tiết..."
              value={formData.body}
              onChange={(e) => handleInputChange('body', e.target.value)}
              required
              minLength={10}
              isInvalid={validated && formData.body.trim().length < 10}
              isValid={validated && formData.body.trim().length >= 10}
            />
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập nội dung bài viết có ít nhất 10 ký tự.
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                Đang gửi dữ liệu...
              </>
            ) : (
              'Đăng bài viết mới'
            )}
          </Button>
        </Form>

        {createdPost && (
          <div className="mt-4 p-3 border rounded bg-light">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="text-success mb-0">Bài viết vừa được tạo (Server phản hồi):</h6>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => {
                  setPostToDelete(createdPost);
                  setShowDeleteModal(true);
                }}
              >
                Xóa bài viết này
              </Button>
            </div>
            <div className="mt-2">
              <strong>Tiêu đề:</strong> {createdPost.title}
            </div>
            <div>
              <strong>Nội dung:</strong> {createdPost.body}
            </div>
          </div>
        )}
      </Card.Body>

      {/* Modal xác nhận xóa */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa bài viết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa bài viết <strong>#{postToDelete?.id} - {postToDelete?.title}</strong> không? Thao tác này không thể hoàn tác.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Hủy bỏ
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Đồng ý Xóa
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast thông báo */}
      <ToastContainer position="bottom-end" className="p-3 position-fixed" style={{ zIndex: 1080 }}>
        <Toast
          show={toast.show}
          onClose={() => setToast((prev) => ({ ...prev, show: false }))}
          delay={4000}
          autohide
          bg={toast.variant}
        >
          <Toast.Header>
            <strong className="me-auto text-dark">Thông báo hệ thống</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Card>
  );
};

export default NC5BootstrapPostForm;
