import { useState } from "react";
import JoinRequest from "./components/mypage/JoinRequest/JoinRequest";
import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./features/User/Login";
import SignUp from "./features/User/SignUp";
import MyPage from "./features/User/MyPage/MyPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/request" element={<JoinRequest />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
