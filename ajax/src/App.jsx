import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen.jsx";
import ChatScreen from "./screens/ChatScreen.jsx";

function App() {
  return (
    <>
      <div className="bg-background h-screen">
        <Router>
          <Routes>
            <Route index element={<HomeScreen />} />
            <Route path="/chat" element={<ChatScreen />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
