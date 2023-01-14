import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./common/Layout";
import AdminMain from "./screens/admin/AdminMain";

import Contact from "./screens/admin/Contact";
import Project from "./screens/admin/Project";
import Tags from "./screens/admin/Tags";
import PostingEdit from "./screens/admin/PostingEdit";
import PostingId from "./screens/admin/PostingId";

function App() {
  return (
    <HashRouter>
      <ToastContainer />
      <Layout>
        <Routes>

          {/* admin */}
          <Route path="/" element={<AdminMain />} />
          <Route path = "/admin/postingedit" element={<PostingEdit/>} />
          <Route path="/admin/postingId" element={<PostingId />} />
          <Route path="/admin/tags" element={<Tags />} />
          <Route path="/admin/project" element={<Project />} />

          <Route path="/admin/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
