import { useEffect, useState } from 'react';
import { Badge, Table } from 'react-bootstrap';
import orderApi from '../../api/orderApi';
import { getErrorMessage } from '../../api/axiosClient';
import Loading from '../../components/Loading';
import ErrorAlert from '../../components/ErrorAlert';
import { formatVND } from '../../utils/format';
import { getOrderStatus } from '../../utils/orderStatus';

/**
 * ===================== AdminOrderPage (/admin/orders, chỉ admin) – TODO-11 (1.0) =====================
 * Route đã được ProtectedRoute bảo vệ. Kiểm tra: đăng nhập admin@fpt.edu.vn / 12345678 → Quản trị → Đơn hàng.
 * ĐÃ CÓ SẴN: state orders / loading / error, khung useEffect, phần <thead>, dòng "Doanh thu" (đang = 0).
 *
 * TODO-11  1. Trong useEffect: async load() + try/catch/finally:
 *             try → setOrders(await orderApi.getAll()); catch → setError(getErrorMessage(err)); finally → setLoading(false).
 *          2. Đang tải → <Loading text="Đang tải đơn hàng..." />; có lỗi → <ErrorAlert message={error} />.
 *          3. Tiêu đề "Đơn hàng ({orders.length})".
 *          4. revenue = tổng o.total của các đơn có status === 'delivered'.
 *          5. Mỗi đơn một <tr key={o.id}> gồm 5 ô: #{o.id} · o.receiver · tổng quantity các món · formatVND(o.total)
 *             · <Badge bg={status.bg}>{status.label}</Badge> với status = getOrderStatus(o.status).
 * ======================================================================================================
 */
export default function AdminOrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO-11: const load = async () => { try { ... } catch (err) { ... } finally { ... } };  load();
    const load = async () => {
      try {
        setOrders(await orderApi.getAll());
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // TODO-11: loading → <Loading ... />; error → <ErrorAlert ... />
  { if (loading) return <Loading text="Đang tải đơn hàng..." /> }
  { if (error) return <ErrorAlert message={error} /> }
  const revenue = orders.filter((o) => o.status === 'delivered').reduce((sum, o) => sum + o.total, 0);
  return (
    <>
      {/* TODO-11: tiêu đề kèm số đơn */}
      <h3 className="fw-bold mb-3">Đơn hàng ({orders.length})</h3>
      <p>
        Doanh thu (đơn đã giao):{' '}
        <span className="fw-bold text-success" data-testid="revenue">
          {formatVND(revenue)}
        </span>
      </p>

      <Table bordered hover responsive className="align-middle">
        <thead>
          <tr>
            <th>Mã đơn</th>
            <th>Khách hàng</th>
            <th className="text-center">Số phần</th>
            <th className="text-end">Tổng tiền</th>
            <th className="text-center">Trạng thái</th>
          </tr>
        </thead>
        <tbody>{/* TODO-11: orders.map((o) => <tr key={o.id}> ... </tr>) */
          orders.map((o) => {
            const status = getOrderStatus(o.status)
            const totalItems = o.items.reduce((sum, i) => sum + i.quantity, 0);
            return (
              < tr key={o.id} >
                <td>#{o.id}</td>
                <td>{o.receiver}</td>
                <td className="text-center">{totalItems}</td>
                <td className="text-end">{formatVND(o.total)}</td>
                <td className="text-center">
                  <Badge bg={status.bg}>{status.label}</Badge>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table >
    </>
  );
}
