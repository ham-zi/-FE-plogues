import { useState } from "react";
import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";
import { Routes, Route } from "react-router-dom";
import PlogList from "./features/Boards/Join/PlogList";
import PlantList from "./features/Boards/Join/PlantList";
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
        <Route path="/joins/plogging" element={<PlogList />} />
        <Route path="/joins/plant" element={<PlantList />} />
        <Route path="/proofs" element={<ProofList />} />
        <Route path="/questions/page" element={<QuestionPage />} />
        <Route path="/questions/admin" element={<QuestionAdminList />} />
        <Route path="/questions/user" element={<QuestionUserList />} />
        <Route path="/questions/form" element={<QuestionForm />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
