import { useState } from 'react';
import { STAR_RATING_LABELS } from '../../data/homework-data';

export default function StarRating({ value = 0, onChange, max = 5 }) {
  const [hovered, setHovered] = useState(0);

  const display = hovered || value;
  const label = STAR_RATING_LABELS[display] || (value > 0 ? STAR_RATING_LABELS[value] : 'Chưa đánh giá');

  return (
    <div onMouseLeave={() => setHovered(0)} className="d-inline-flex flex-column align-items-center">
      <div className="d-flex gap-1 fs-3" style={{ cursor: 'pointer', userSelect: 'none' }}>
        {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
          <span
            key={star}
            onMouseEnter={() => setHovered(star)}
            onClick={() => onChange(star === value ? 0 : star)}
            style={{
              color: star <= display ? '#ffc107' : '#dee2e6',
              transition: 'color 0.15s ease',
            }}
          >
            ★
          </span>
        ))}
      </div>
      <small className="text-muted fw-semibold mt-1">{label}</small>
    </div>
  );
}
