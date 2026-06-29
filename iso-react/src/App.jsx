import { useState } from "react";

import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";

import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import JoinRequest from "./components/mypage/JoinRequest/JoinRequest";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
      </Routes>
      <Footer />

      <Routes>
        <Route path="/request" element={<JoinRequest />} />
      </Routes>
    </>
  );
}

export default App;
