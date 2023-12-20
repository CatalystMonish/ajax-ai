import { getApp } from "firebase/app";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth } from "firebase/auth"; // Updated this line
// import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCW1oRvOX03eM6RrNJHUEktUVHt7pBSwU0",
    authDomain: "ajaxchats.firebaseapp.com",
    projectId: "ajaxchats",
    storageBucket: "ajaxchats.appspot.com",
    messagingSenderId: "363628103149",
    appId: "1:363628103149:web:248b5b4cb1e5f1d99f13e4",
    measurementId: "G-ZXRLPMHZCS"
  };

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
// const storage = getStorage(app);

export { app,  db, auth};
