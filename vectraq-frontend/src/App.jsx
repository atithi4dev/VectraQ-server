import React from "react";
import CustomToastContainer from "./services/toastContainer/CustomToastContainer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const notify = () => {
    toast("👋 Hello, this is a toast notification!");
  };

  return (
    <>
      <nav className="bg-white text-black p-4 flex justify-center gap-6 shadow">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/about" className="hover:underline">
          About
        </Link>
      </nav>

    <main className="min-h-screen font-sans flex items-center justify-center bg-gray-900 text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Home />} />
        </Routes>
      </main>

      <CustomToastContainer  />
    </>
  );
}

export default App;
