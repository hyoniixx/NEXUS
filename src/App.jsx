import "./App.css";
import Header from "./layout/Header";
import Chat from "./pages/chat/Chat";
import LectureList from "./pages/lecture/LectureList";

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <Chat />
      </main>
    </>
  );
}

export default App;
