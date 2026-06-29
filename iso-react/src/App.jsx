import { useState } from "react";
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
    </>
  );
}

export default App;
