import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";
import { Routes, Route } from "react-router-dom";
import PlogList from "./features/Boards/Join/PlogList";
import PlantList from "./features/Boards/Join/PlantList";
import BoardList from "./features/Boards/Board/BoardList";
import ProofList from "./features/Boards/Proof/ProofList";
import BoardDetail from "./features/Boards/Board/BoardDetail";
import BoardForm from "./features/Boards/Board/BoardForm";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./features/User/Login";
import SignUp from "./features/User/SignUp";
import MyPage from "./features/User/mypage/MyPage";
import MyJoin from "./features/User/mypage/MyJoin";
import QuestionForm from "./features/Boards/Question/QuestionForm";
import QuestionPage from "./features/Boards/Question/QuestionPage";
import QuestionAdminList from "./features/Boards/Question/QuestionAdminList";
import QuestionUserList from "./features/Boards/Question/QuestionUserList";
import QuestionDetail from "./features/Boards/Question/QuestionDetail";
import JoinDetail from "./features/Boards/Join/JoinDetail";

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />

      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/joins" element={<MyJoin />} />
        <Route path="/boards" element={<BoardList />} />
        <Route path="/boards/:boardNo" element={<BoardDetail />} />
        <Route path="/boards/write" element={<BoardForm />} />
        <Route path="/boards/:boardNo/edit" element={<BoardForm />} />
        <Route path="/joins/plogging" element={<PlogList />} />
        <Route path="/joins/plant" element={<PlantList />} />
        <Route path="/joins/:joinNo" element={<JoinDetail />} />
        <Route path="/proofs" element={<ProofList />} />
        <Route path="/questions/page" element={<QuestionPage />} />
        <Route path="/questions/admin" element={<QuestionAdminList />} />
        <Route path="/questions/user" element={<QuestionUserList />} />
        <Route path="/questions/form" element={<QuestionForm />} />
        <Route path="/questions/:boardNo" element={<QuestionDetail />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
