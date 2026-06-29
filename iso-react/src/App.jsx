import { useState } from "react";
<<<<<<< HEAD
import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";
import { Routes, Route } from "react-router-dom";
import "./App.css";
=======
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import JoinRequest from "./components/mypage/JoinRequest/JoinRequest";
>>>>>>> dbef1a4b84db92f0929469ab261d99c29280c73e

function App() {
  return (
    <>
<<<<<<< HEAD
      <Header />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
      </Routes>
      <Footer />
=======
      <Routes>
        <Route path="/request" element={<JoinRequest />} />
      </Routes>
>>>>>>> dbef1a4b84db92f0929469ab261d99c29280c73e
    </>
  );
}

export default App;
