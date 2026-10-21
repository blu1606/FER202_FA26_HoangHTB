// Các bài 2.1 – 2.6 viết lại theo yêu cầu nâng cao:
// NC1 async/await · NC2 axiosClient + postApi · NC5 react-bootstrap
import { Row, Col } from "react-bootstrap";
import PostListCard from "../components/http/PostListCard";
import CreatePostCard from "../components/http/CreatePostCard";
import UpdatePostCard from "../components/http/UpdatePostCard";
import PatchPostCard from "../components/http/PatchPostCard";
import DeletePostCard from "../components/http/DeletePostCard";
import RequestConfigCard from "../components/http/RequestConfigCard";

export default function HttpRequestsPage() {
  return (
    <>
      <h2 className="mb-3">HTTP Requests với axios</h2>
      <Row xs={1} lg={2} className="g-4">
        <Col><PostListCard /></Col>
        <Col><CreatePostCard /></Col>
        <Col><UpdatePostCard /></Col>
        <Col><PatchPostCard /></Col>
        <Col><DeletePostCard /></Col>
        <Col><RequestConfigCard /></Col>
      </Row>
    </>
  );
}
