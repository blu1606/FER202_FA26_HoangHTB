import { useEffect, useState } from 'react';
import { Badge, Table } from 'react-bootstrap';
import userApi from '../../api/userApi';
import { getErrorMessage } from '../../api/axiosClient';
import Loading from '../../components/Loading';
import ErrorAlert from '../../components/ErrorAlert';

/**
 * ===================== AdminUserPage (/admin/users, chỉ admin) – TODO-11 (1.0) =====================
 * Route đã được ProtectedRoute bảo vệ. Kiểm tra: đăng nhập admin@autoshop.vn / 12345678 → /admin/users.
 * ĐÃ CÓ SẴN: state users / loading / error, khung useEffect, phần <thead> của bảng.
 *
 * TODO-11  1. Trong useEffect: viết async load() dùng try/catch/finally:
 *             try → setUsers(await userApi.getAll()); catch → setError(getErrorMessage(err));
 *             finally → setLoading(false). Gọi load().
 *          2. Đang tải → <Loading text="Đang tải người dùng..." />; có lỗi → <ErrorAlert message={error} />.
 *          3. Tiêu đề "Quản lý người dùng ({users.length})".
 *          4. Mỗi user một <tr key={u.id}> gồm 5 ô: ID · Họ tên · Email
 *             · Vai trò: <Badge bg="danger">Admin</Badge> / <Badge bg="secondary">Khách hàng</Badge>
 *             · Trạng thái: <Badge bg="success">Hoạt động</Badge> / <Badge bg="dark">Đã khoá</Badge>
 * ===================================================================================================
 */
export default function AdminUserPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setUsers(await userApi.getAll());
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);
  // TODO-11: loading → <Loading ... />; error → <ErrorAlert ... />
  if (loading) return <Loading text="Đang tải người dùng..." />;
  if (error) return <ErrorAlert message={error} />;
  return (
    <>
      {/* TODO-11: tiêu đề kèm số lượng users */}
      <h3 className="fw-bold mb-3">Quản lý người dùng ({users.length})</h3>

      <Table bordered hover responsive className="align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>{
          users.map((u) => {
            return (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.fullName}</td>
                <td>{u.email}</td>
                <td>{u.role === 'admin' ? <Badge bg="danger">Admin</Badge> : <Badge bg="secondary">Khách hàng</Badge>} </td>
                <td> {u.active ? <Badge bg="success">Hoạt động</Badge> : <Badge bg="dark">Đã khoá</Badge>}</td>
              </tr>

            )
          })
        /* TODO-11: users.map((u) => <tr key={u.id}> ... </tr>) */}</tbody>
      </Table>
    </>
  );
}
