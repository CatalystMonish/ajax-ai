import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import logo from "../images/header_logo.png";

function SignUpScreen() {
    const { signUp } = UserAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await signUp(email, password);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
      <div className="relative w-full h-full">
        <div className="flex h-screen justify-center items-center bg-container">
        <div className="flex flex-col bg-background items-center justify-center p-[3.875rem] rounded-[0.3125rem] shadow-lg relative  z-10 ">
          <img src={logo} className="w-[25rem] h-[8.375rem]" />
            
            <p className="text-[1.25rem] font-medium font-work text-text-light mt-m-20 mb-[1.125rem] text-center">
              Create new account
            </p>
  
            <form onSubmit={handleSignUp}>
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
                 signUp;
                }
              }}
              className=" relative px-[1.5625rem] py-[0.9375rem] font-pop font-medium text-[1.0625rem] border-[#6948C9] rounded-[0.625rem] border-2 bg-[#3E3E72] text-white focus:outline-none w-[25rem] "
             />
          </div>

              {error && <p className="text-red-500">{error}</p>}
              <div className="text-center mb-4"> {/* Added class here */}
                            <Link to="/login">Back to login page</Link>
                        </div>
                        <button
            onClick={signUp}
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
            </form>
            
          </div>
        </div>
      </div>
    );
}
export default SignUpScreen;
