import { useState } from "react";

import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import JoinRequest from "./components/mypage/JoinRequest/JoinRequest";
import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./features/User/Login";

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
