// import LogInPage from "./pages/LogInPage/LogInPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import LogInPage from "./pages/LogInPage/LogInPage";
import {Routes, Route} from "react-router-dom"

function App() {
  return (
      <>
      <Routes>
        <Route path="/" element={<LogInPage/>}/>
        <Route path="/chat" element={<ChatPage/>}/>
      </Routes>
      </>
  );
}

export default App;
