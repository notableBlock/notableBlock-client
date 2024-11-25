import NavBar from "./components/NavBar";
import NoteViewer from "./components/NoteViewer";
import Option from "./components/Option";
import LoginForm from "./components/LoginForm";
import NoteEditor from "./components/NoteEditor";
import Notification from "./components/Notification";

function App() {
  return (
    <>
      <NavBar />
      <NoteViewer />
      <Option />
      <LoginForm />
      <NoteEditor />
      <Notification />
    </>
  );
}

export default App;
