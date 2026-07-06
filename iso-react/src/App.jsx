import { useState } from "react";
import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";
import { Routes, Route } from "react-router-dom";
import JoinList from "./features/Boards/Join/JoinList";
import BoardList from "./features/Boards/Board/BoardList";
import ProofList from "./features/Boards/Proof/ProofList";
import Login from "./features/User/Login";
import SignUp from "./features/User/SignUp";
import "./App.css";
import QuestionForm from "./features/Boards/Question/QuestionForm";
import QuestionPage from "./features/Boards/Question/QuestionPage";
import QuestionAdminList from "./features/Boards/Question/QuestionAdminList";
import QuestionUserList from "./features/Boards/Question/QuestionUserList";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/boards" element={<BoardList />} />
        <Route path="/joins" element={<JoinList />} />
        <Route path="/proofs" element={<ProofList />} />
        <Route path="/questions/page" element={<QuestionPage />} />
        <Route path="/questions/admin" element={<QuestionAdminList />} />
        <Route path="/questions/user" element={<QuestionUserList />} />
        <Route path="/questions/user/form" element={<QuestionForm />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
