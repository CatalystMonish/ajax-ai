import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  createUserWithEmailAndPassword, 
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase.js";
import React, { createContext, useContext, useEffect, useState } from "react";
// ... (other imports)

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const emailSignIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const currentUser = userCredential.user;
      setUser(currentUser);
      await checkAndCreateUserDoc(currentUser);
    } catch (error) {
      console.error("Error signing in with email and password:", error.message);
      // Handle error (e.g., display an error message to the user)
    }
  };

  const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;
      setUser(newUser);
      await checkAndCreateUserDoc(newUser); // If you have logic to create a document in Firestore for new users
    } catch (error) {
      console.error("Error signing up:", error.message);
      // Handle error (e.g., display an error message to the user)
    }
  };

  const logOut = () => {
    signOut(auth);
  };

  const checkAndCreateUserDoc = async (currentUser) => {
    // ... (existing code)
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
    <AuthContext.Provider value={{ googleSignIn, emailSignIn, logOut, signUp, user }}>
      {children}
    </AuthContext.Provider>
  );
};

// ... (other code)
export const UserAuth = () => {
  return useContext(AuthContext);
};