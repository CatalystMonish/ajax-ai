import React, { createContext, useContext, useEffect, useState } from "react";
// import { getStorage, ref, uploadBytes } from "firebase/storage";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase.js";
const AuthContext = createContext();

// ... (other imports)

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };
  const goHome = () => {
    // Use react-router-dom's navigate to go back to the home page
    navigate("/", { replace: true });
  };
  const checkAndCreateUserDoc = async (currentUser) => {
    const userRef = doc(db, "users", currentUser.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const { displayName, email, photoURL, emailVerified } = currentUser;
      await setDoc(userRef, {
        displayName,
        email,
        photoURL,
        emailVerified,
        // Add any other necessary fields here.
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      console.log("Currentuser", currentUser);

      if (currentUser) {
        await checkAndCreateUserDoc(currentUser);
        
      }
    });

    return () => {  
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user}}>
      {children}
    </AuthContext.Provider>
  );
};

// ... (other code)

export const UserAuth = () => {
  return useContext(AuthContext);
};
