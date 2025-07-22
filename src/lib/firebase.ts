// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTLEWPIsANZTPtwK68tZ40OGn_trgFsVI",
  authDomain: "earth-watch-alert.firebaseapp.com",
  projectId: "earth-watch-alert",
  storageBucket: "earth-watch-alert.firebasestorage.app",
  messagingSenderId: "885694867906",
  appId: "1:885694867906:web:7af1ed9035e35b5e5a4e5b",
  measurementId: "G-RT4TTJKY0K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };