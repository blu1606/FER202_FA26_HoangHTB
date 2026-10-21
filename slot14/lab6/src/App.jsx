import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AxiosDemoPage from "./pages/AxiosDemoPage";
import HttpRequestsPage from "./pages/HttpRequestsPage";
import PostListPage from "./pages/PostListPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostCreatePage from "./pages/PostCreatePage";
import PostEditPage from "./pages/PostEditPage";
import NotFoundPage from "./pages/NotFoundPage";

// NC6 – React Router: Layout route + nested routes + 404
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<AxiosDemoPage />} />            {/* Phần 1 nâng cao: NC1, NC4, NC5 */}
        <Route path="http" element={<HttpRequestsPage />} />   {/* Phần 2 nâng cao: NC1, NC2, NC5, NC8 */}
        <Route path="posts">
          <Route index element={<PostListPage />} />           {/* NC6, NC8, NC9, NC10 */}
          <Route path="new" element={<PostCreatePage />} />    {/* POST */}
          <Route path=":id" element={<PostDetailPage />} />    {/* NC3 + PATCH + DELETE */}
          <Route path=":id/edit" element={<PostEditPage />} /> {/* PUT */}
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
