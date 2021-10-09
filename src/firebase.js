// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyD7FMIaT7_LmA0S9cNy0-54tOFunQitIVA",
  authDomain: "senpai-cc22.firebaseapp.com",
  databaseURL: "https://senpai-cc22-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "senpai-cc22",
  storageBucket: "senpai-cc22.appspot.com",
  messagingSenderId: "975615194597",
  appId: "1:975615194597:web:2617a29b9609d8662a2b0c",
  measurementId: "G-WD5SL158M1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();