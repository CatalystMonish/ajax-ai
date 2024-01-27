import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import logo from "../images/header_logo.png";
import { Link } from "react-router-dom";

function LoginScreen() {
  const { googleSignIn, emailSignIn, user } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailSignIn = async () => {
    try {
      await emailSignIn(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      const name = user?.displayName;
      console.log(user);
      console.log("User", name);
      console.log(window.location.pathname);
      if (window.location.pathname === "/chat") {
        navigate("/chat");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  return (
    <div className="relative w-full h-full">
      <div className="flex h-screen justify-center items-center bg-container">
        <div className="flex flex-col bg-background items-center justify-center p-[3.875rem] rounded-[0.3125rem] shadow-lg relative  z-10 ">
          <img src={logo} className="w-[25rem] h-[8.375rem]" />
          <p className="text-[1.5625rem] font-semibold font-work pt-m-30 text-white mt-m-30 mb-5 text-center">
            Welcome to Concrete AI
          </p>
          {/* <p className="text-[1.25rem] font-medium font-work text-text-light mt-m-10 mb-[1.125rem] text-center">
            Please login to continue
          </p> */}

          <div className="mb-2">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" relative px-[1.5625rem] py-[0.9375rem] font-pop font-medium text-[1.0625rem] border-[#6948C9] rounded-[0.625rem] border-2 bg-[#3E3E72] text-white focus:outline-none w-[25rem] "
              />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleEmailSignIn();
                }
              }}
              className=" relative px-[1.5625rem] py-[0.9375rem] font-pop font-medium text-[1.0625rem] border-[#6948C9] rounded-[0.625rem] border-2 bg-[#3E3E72] text-white focus:outline-none w-[25rem] "
              />
          </div>

          {/* {error && <p className="text-red-500">{error}</p>} */}
          <Link to="/signup" className="mb-4">Don't have an account? Sign Up</Link>
          <button
            onClick={handleEmailSignIn}
            className="w-full mb-4 flex rounded-[0.5125rem] bg-gradient-to-t from-[#322E78] to-[#918DFC] py-[1rem] px-[2.8125rem] hover:scale-105 transform transition-transform group"
          >
            <div className="flex flex-row items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-[1.5625rem] h-[1.5625rem]"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 4l-7 5-7-5V6l7 5 7-5v2z" />
              </svg>

              <p className="ml-m-10 text-[1.125rem] text-white font-work font-label">
                Continue
              </p>
            </div>
          </button>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex rounded-[0.5125rem] bg-gradient-to-t from-[#322E78] to-[#918DFC] py-[1rem] px-[2.8125rem] hover:scale-105 transform transition-transform group"
          >
            <div className="flex flex-row items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-[1.5625rem] h-[1.5625rem] "
              >
                <path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z"></path>
              </svg>
              <p className="ml-m-10 text-[1.125rem] text-white font-work font-label">
                Continue with Google
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
