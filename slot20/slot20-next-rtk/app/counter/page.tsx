import type { Metadata } from 'next';
import Counter from './Counter';

export const metadata: Metadata = { title: 'Counter' };

export default function CounterPage() {
  return (
    <main className="px-4 py-12">
      <h1 className="mb-8 text-center text-3xl font-bold">🔢 Redux Counter</h1>
      <Counter />
    </main>
  );
}
