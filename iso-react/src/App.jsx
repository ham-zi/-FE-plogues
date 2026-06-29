import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import JoinRequest from "./components/mypage/JoinRequest/JoinRequest";

function App() {
  return (
    <>
      <Routes>
        <Route path="/request" element={<JoinRequest />} />
      </Routes>
    </>
  );
}

export default App;
