import React from "react";
import CustomToastContainer from "./services/toastContainer/CustomToastContainer";
import Summarizer from "./pages/Summarizer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen font-sans px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/summarizer" element={<Summarizer />} />
        </Routes>
      </main>
      <CustomToastContainer />
    </>
  );
}

export default App;
