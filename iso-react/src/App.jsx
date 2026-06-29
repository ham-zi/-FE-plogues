import { useState } from "react";
import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";
import { Routes, Route } from "react-router-dom";
import JoinList from "./components/Boards/Join/JoinList";
import BoardList from "./components/Boards/Board/BoardList";
import ProofList from "./components/Boards/Proof/ProofList";

import "./App.css";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/boards" element={<BoardList />} />
        <Route path="/joins" element={<JoinList />} />
        <Route path="/proofs" element={<ProofList />} />
      </Routes>
      <Footer />



    </>
  );
}

export default App;