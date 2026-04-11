import NexusMainGuest from "./pages/NexusMainGuest"
import './App.css';
import Header from "./layout/Header";

function App() {

  return (
    <>
      <Header />
      <main>
        {/* 화면 확인이 필요한 경우 여기에서 확인해주세요. 
        그리고 충돌 날 수 있으니 라우터 설정 전까지는 App.jsx 파일에서 화면 확인 후 확인한 내용 지운 다음에 푸시 해주세요 */}

        <NexusMainGuest />
      </main>

    </>
  )
}

export default App