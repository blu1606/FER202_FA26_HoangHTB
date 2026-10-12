import Table from 'react-bootstrap/Table';

const BOOKS = [
  { id: 1, title: 'ReactJS Cơ bản đến Nâng cao', author: 'Dan Abramov', year: 2024 },
  { id: 2, title: 'Cấu trúc Dữ liệu & Giải thuật', author: 'Robert Sedgewick', year: 2022 },
  { id: 3, title: 'Clean Code', author: 'Robert C. Martin', year: 2021 },
];

export default function BooksPage() {
  return (
    <div className="py-3">
      <h4>Danh sách sách thư viện</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên sách</th>
            <th>Tác giả</th>
            <th>Năm</th>
          </tr>
        </thead>
        <tbody>
          {BOOKS.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.year}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
