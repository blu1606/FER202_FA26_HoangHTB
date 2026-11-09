import { useSelector, useDispatch } from 'react-redux';
import { ButtonGroup, Button } from 'react-bootstrap';
import { setFilter } from '../redux/actions';
import { selectFilter } from '../redux/selectors';

const FILTERS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'active', label: 'Chưa xong' },
  { key: 'done', label: 'Đã xong' },
];

export default function FilterBar() {
  const current = useSelector(selectFilter);
  const dispatch = useDispatch();

  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <ButtonGroup size="sm">
        {FILTERS.map((f) => (
          <Button
            key={f.key}
            variant={current === f.key ? 'primary' : 'outline-primary'}
            onClick={() => dispatch(setFilter(f.key))}
          >
            {f.label}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}
