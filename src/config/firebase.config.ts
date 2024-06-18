// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChXFLb-uN61IfWt7TXCVs0KHLeF_xMOjQ",
  authDomain: "marketplace-pty.firebaseapp.com",
  projectId: "marketplace-pty",
  storageBucket: "marketplace-pty.appspot.com",
  messagingSenderId: "942738404866",
  appId: "1:942738404866:web:2a8530b55253349eb5191b",
  measurementId: "G-2NYQVGJ9P9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authFirebase = getAuth(app);
