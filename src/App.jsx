import { Routes, Route, Outlet } from "react-router";

import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import SharedPage from "./pages/SharedPage";
import NoteTreePage from "./pages/NoteTreePage";
import ErrorPage from "./pages/ErrorPage";
import NoteEditingPage from "./pages/NoteEditingPage";

import Layout from "./components/common/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/notes" element={<Outlet />}>
          <Route path="" element={<UserPage />} />
          <Route path=":noteId" element={<NoteEditingPage />} />
        </Route>
        <Route path="/shared" element={<Outlet />}>
          <Route path="" element={<SharedPage />} />
          <Route path=":noteId" element={<NoteEditingPage />} />
        </Route>
        <Route path="noteTree" element={<NoteTreePage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
