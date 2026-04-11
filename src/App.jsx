import "./App.css";
import Header from "./layout/Header";
import LectureList from "./pages/lecture/LectureList";

function App() {
  return (
    <>
      <Header />
      <main>
        <LectureList />
      </main>
    </>
  );
}

export default App;
