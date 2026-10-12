import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

const BOOKS = [
  {
    id: 1,
    title: 'Giáo trình ReactJS & Frontend Hiện Đại',
    author: 'Dan Abramov & Cộng sự',
    category: 'Công nghệ thông tin',
    year: 2024,
    status: 'Có sẵn',
    variant: 'success',
  },
  {
    id: 2,
    title: 'Cấu trúc dữ liệu & Giải thuật nâng cao',
    author: 'Robert Sedgewick',
    category: 'Khoa học máy tính',
    year: 2022,
    status: 'Đang mượn',
    variant: 'warning',
  },
  {
    id: 3,
    title: 'Clean Code: Nghệ thuật viết code sạch',
    author: 'Robert C. Martin',
    category: 'Kỹ thuật phần mềm',
    year: 2021,
    status: 'Có sẵn',
    variant: 'success',
  },
];

export default function BooksPage() {
  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-white py-3 border-0 d-flex justify-content-between align-items-center">
        <div>
          <h4 className="fw-bold text-primary mb-1">Danh mục sách nổi bật</h4>
          <p className="text-secondary small mb-0">Danh sách 3 tài liệu học tập được mượn nhiều nhất</p>
        </div>
        <Badge bg="primary" className="p-2">
          Tổng số: 3 cuốn
        </Badge>
      </Card.Header>
      <Card.Body className="p-0">
        <Table responsive hover className="mb-0 align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Tựa sách</th>
              <th>Tác giả</th>
              <th>Thể loại</th>
              <th>Năm XB</th>
              <th>Tình trạng</th>
              <th className="text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {BOOKS.map((book) => (
              <tr key={book.id}>
                <td className="fw-bold">{book.id}</td>
                <td className="fw-semibold text-dark">{book.title}</td>
                <td>{book.author}</td>
                <td>
                  <Badge bg="info" className="text-dark fw-normal">
                    {book.category}
                  </Badge>
                </td>
                <td>{book.year}</td>
                <td>
                  <Badge bg={book.variant}>{book.status}</Badge>
                </td>
                <td className="text-center">
                  <Button
                    size="sm"
                    variant={book.status === 'Có sẵn' ? 'outline-primary' : 'outline-secondary'}
                    disabled={book.status !== 'Có sẵn'}
                  >
                    {book.status === 'Có sẵn' ? 'Mượn sách' : 'Hết sách'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
