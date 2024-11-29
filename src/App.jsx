import { Routes, Route } from "react-router";

import UserPage from "./pages/NotePage";
import LoginPage from "./pages/LoginPage";
import SharedPage from "./pages/SharedPage";
import NoteTreePage from "./pages/NoteTreePage";
import ErrorPage from "./pages/ErrorPage";
import NoteEditingPage from "./pages/NoteEditingPage";
import NicknamePage from "./pages/NicknamePage";

import Layout from "./components/common/Layout";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/user/:id"
          element={
            <Layout>
              <UserPage />
            </Layout>
          }
        />
        <Route
          path="/shared"
          element={
            <Layout>
              <SharedPage />
            </Layout>
          }
        />
        <Route
          path="/noteTree"
          element={
            <Layout>
              <NoteTreePage />
            </Layout>
          }
        />
        <Route
          path="/note/:id"
          element={
            <Layout>
              <NoteEditingPage />
            </Layout>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/nickname" element={<NicknamePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
