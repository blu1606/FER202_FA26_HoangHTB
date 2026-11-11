import Link from 'next/link';

export default function Home() {
  return (
    <main className="py-20 text-center">
      <h1 className="text-4xl font-extrabold">Slot 20 – Next.js + RTK</h1>
      <p className="mt-3 text-gray-600">Bài 1: Khởi tạo project + Store + Counter</p>
      <Link
        href="/counter"
        className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white transition hover:bg-blue-700"
      >
        Đến Counter →
      </Link>
    </main>
  );
}
