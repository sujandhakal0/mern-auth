// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, 
  authDomain: "mern-auth-cc164.firebaseapp.com",
  projectId: "mern-auth-cc164",
  storageBucket: "mern-auth-cc164.appspot.com",
  messagingSenderId: "695527069043",
  appId: "1:695527069043:web:0b0b264ce19ebd6417e106",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
