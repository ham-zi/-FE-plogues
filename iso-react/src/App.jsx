import { useState } from "react";
import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";
import { Routes, Route } from "react-router-dom";
import JoinList from "./features/Boards/Join/JoinList";
import BoardList from "./features/Boards/Board/BoardList";
import ProofList from "./features/Boards/Proof/ProofList";

import "./App.css";
import QuestionList from "./features/Boards/Question/QuestionList";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/boards" element={<BoardList />} />
        <Route path="/joins" element={<JoinList />} />
        <Route path="/proofs" element={<ProofList />} />
        <Route path="/questions" element={<QuestionList />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
