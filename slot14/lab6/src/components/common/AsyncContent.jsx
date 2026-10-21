import LoadingSpinner from "./LoadingSpinner";
import ErrorAlert from "./ErrorAlert";
import EmptyState from "./EmptyState";

const defaultIsEmpty = (data) => data == null || (Array.isArray(data) && data.length === 0);

/**
 * Hiển thị theo thứ tự: LOADING → ERROR → EMPTY → SUCCESS
 * - keepPrevious: đang tải lại nhưng đã có dữ liệu → giữ dữ liệu cũ + làm mờ
 * - children: render prop (data) => JSX
 */
export default function AsyncContent({
  loading,
  error,
  data,
  onRetry,
  emptyText,
  isEmpty = defaultIsEmpty,
  keepPrevious = false,
  children,
}) {
  const empty = isEmpty(data);

  if (loading && (!keepPrevious || empty)) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} onRetry={onRetry} />;
  if (empty) return <EmptyState text={emptyText} />;

  return <div className={loading ? "opacity-50" : ""}>{children(data)}</div>;
}
