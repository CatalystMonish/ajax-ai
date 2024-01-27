import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import ChatScreen from "./screens/ChatScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import SignUp from "./screens/SignUpScreen.jsx";
import { UserAuth } from "./context/AuthContext.jsx";
import Protected from "./secure/Protected.jsx";
import SignUpScreen from "./screens/SignUpScreen.jsx";

function App() {
  return (
    <>
      <div className="bg-background h-screen">
        <AuthContextProvider>
        <Router>
          <Routes>
            <Route index path="/login" element={<LoginScreen/>}/>
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/" element={<Protected><HomeScreen /></Protected>} />
            <Route path="/chat" element={<Protected><ChatScreen /></Protected>} />
          </Routes>
        </Router>
        </AuthContextProvider>
      </div>
    </>
  );
}

export default App;
