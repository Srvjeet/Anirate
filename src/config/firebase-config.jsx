import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDgOg9v4yh2AewNZWjlzbRLVsAwfx7IuhE",
  authDomain: "project-2-b2341.firebaseapp.com",
  projectId: "project-2-b2341",
  storageBucket: "project-2-b2341.appspot.com",
  messagingSenderId: "347061219708",
  appId: "1:347061219708:web:333f84dc7253f21a2bb4f9",
  measurementId: "G-LKNKPC1LMJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);
export const googleProvider= new GoogleAuthProvider();
export const db= getFirestore(app);
export const Storage = getStorage(app);
