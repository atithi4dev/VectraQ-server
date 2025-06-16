import React from "react";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <main className="min-h-screen bg-gray-100 text-gray-900 font-sans">
        <Home />
      </main>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;