import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../images/ajax.png";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Adjust the path as needed
import { useNavigate } from "react-router-dom";
// import NewVideoButton from "./NewVideoButton.jsx";
import { UserAuth } from "../context/AuthContext.jsx"; // Adjust the path as needed

function TopBar() {
  const navigate = useNavigate();
  const location = useLocation(); // Use the useLocation hook
  const { user, logOut } = UserAuth();
//   const [isAdmin, setIsAdmin] = useState(false);
  const goHome = async () => {
    navigate("/");
  };

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        const userRef = doc(db, `users/${user.uid}`);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists() && userSnap.data().admin === true) {
          setIsAdmin(true);
          console.log(user.photoURL);
        }
      }
    };

    fetchUserData();
  }, [user?.uid]);

  const goAdmin = async () => {
    navigate("/admin");
  };

  return (
    <div className="flex flex-row w-full z-20 fixed top-0  items-center  font-lexend text-heading h-[4.375rem] font-heading ">
      {/* <img
        onClick={goHome}
        src={logo}
        className="hover:scale-105 transform transition-transform w-[10.1875rem] ml-m-20"
      /> */}
      <div className="ml-auto flex flex-row items-center">
        
          <div className="group flex relative">
            <button
              onClick={handleLogout}
              className="bg-gradient-to-t from-[#322E78] to-[#918DFC] w-fit py-s-10 px-s-20 rounded-[1.5625rem] ml-auto mr-m-10"
            >
              <div className="flex flex-row gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z"
                    clipRule="evenodd"
                  />
                </svg>

                <p className="text-white text-label-small font-label-small font-work">
                  Logout
                </p>
              </div>
            </button>
            <span
              className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2
    -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto font-work"
            >
              Logout
            </span>
          </div>
        
        
        {/* Conditional rendering for user's profile image */}
        {user && user.photoURL && (
          <div className="group flex relative">
            <img
              title="profile"
              alt="User Profile"
              src={user.photoURL}
              className="w-[30px] h-[30px] rounded-full mr-m-10 transform  transition-transform hover:shadow-xl hover:-translate-y-1  "
            />
            <span
              className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2
    -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto font-work"
            >
              Profile Image
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default TopBar;
