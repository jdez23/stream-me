import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC22tOd8atzJGSmZK9aNeaCzmbK7ZibzTY",
  authDomain: "stream-me-f0fa6.firebaseapp.com",
  projectId: "stream-me-f0fa6",
  storageBucket: "stream-me-f0fa6.appspot.com",
  messagingSenderId: "424910893689",
  appId: "1:424910893689:web:3eefab9bf29b95f6f21aa8",
  measurementId: "G-K1TGTDCZ75",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
