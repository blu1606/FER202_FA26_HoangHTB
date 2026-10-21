import { Container, Row, Col } from 'react-bootstrap';
import AxiosDemo from './components/AxiosDemo';
import PostListCard from './components/http/PostListCard';
import CreatePostCard from './components/http/CreatePostCard';
import UpdatePostCard from './components/http/UpdatePostCard';
import PatchPostCard from './components/http/PatchPostCard';
import DeletePostCard from './components/http/DeletePostCard';
import RequestConfigCard from './components/http/RequestConfigCard';
import PostDetail from './components/PostDetail';

export default function App() {
  return (
    <Container className="py-4">
      <AxiosDemo />
      <hr className="my-5" />
      <h2 className="mb-3">HTTP Requests với axios (NC5: React-Bootstrap)</h2>
      <Row xs={1} lg={2} className="g-4">
        <Col><PostListCard /></Col>
        <Col><CreatePostCard /></Col>
        <Col><UpdatePostCard /></Col>
        <Col><PatchPostCard /></Col>
        <Col><DeletePostCard /></Col>
        <Col><RequestConfigCard /></Col>
      </Row>
      <hr className="my-5" />
      <PostDetail postId={1} />
    </Container>
  );
}
