import { useState } from "react";
import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";
import { Routes, Route } from "react-router-dom";
import JoinList from "./features/Boards/Join/JoinList";
import BoardList from "./features/Boards/Board/BoardList";
import ProofList from "./features/Boards/Proof/ProofList";
import BoardDetail from "./features/Boards/Board/BoardDetail";
import BoardForm from "./features/Boards/Board/BoardForm";

import "./App.css";
import Login from "./features/User/Login";
import SignUp from "./features/User/SignUp";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/boards" element={<BoardList />} />
        <Route path="/boards/:boardNo" element={<BoardDetail />} />
        <Route path="/boards/write" element={<BoardForm />} />
        <Route path="/board/:boardNo/edit" element={<BoardForm />} />
        <Route path="/joins" element={<JoinList />} />
        <Route path="/proofs" element={<ProofList />} />
      </Routes>
      <Footer />



    </>
  );
}

export default App;