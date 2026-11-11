'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  decrement,
  increment,
  incrementByAmount,
  reset,
  selectCount,
  selectStep,
  stepChanged,
} from '@/lib/features/counter/counterSlice';

const STEPS = [1, 5, 10] as const;

export default function Counter() {
  const count = useAppSelector(selectCount);
  const step = useAppSelector(selectStep);
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState<string>('2');

  const amountNumber = Number(amount) || 0;
  const color =
    count > 0
      ? 'text-green-600'
      : count < 0
        ? 'text-red-600'
        : 'text-gray-400';

  return (
    <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow-lg dark:bg-gray-900">
      <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
        Giá trị hiện tại
      </p>
      <p className={`my-4 text-7xl font-black tabular-nums transition ${color}`}>
        {count}
      </p>

      {/* Nút tăng / giảm */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => dispatch(decrement())}
          className="size-14 rounded-full bg-red-500 text-2xl font-bold text-white transition hover:bg-red-600 active:scale-90"
          aria-label="Giảm"
        >
          −
        </button>
        <button
          onClick={() => dispatch(reset())}
          className="rounded-full border border-gray-300 px-6 font-semibold transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          Reset
        </button>
        <button
          onClick={() => dispatch(increment())}
          className="size-14 rounded-full bg-green-500 text-2xl font-bold text-white transition hover:bg-green-600 active:scale-90"
          aria-label="Tăng"
        >
          +
        </button>
      </div>

      {/* Chọn bước nhảy */}
      <div className="mt-6">
        <p className="mb-2 text-sm text-gray-500">Bước nhảy</p>
        <div className="inline-flex overflow-hidden rounded-lg border border-gray-300 dark:border-gray-700">
          {STEPS.map((s) => (
            <button
              key={s}
              onClick={() => dispatch(stepChanged(s))}
              className={`px-4 py-1.5 text-sm font-semibold transition ${
                step === s
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Cộng một lượng tùy ý */}
      <div className="mt-6 flex gap-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
        />
        <button
          onClick={() => dispatch(incrementByAmount(amountNumber))}
          disabled={amountNumber === 0}
          className="whitespace-nowrap rounded-lg bg-blue-600 px-4 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-40"
        >
          Cộng {amountNumber}
        </button>
      </div>
    </div>
  );
}
