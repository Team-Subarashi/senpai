// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBMDax-vvsBCSpH8akK2PT82LowbbfRthA",
    authDomain: "senpai-dev-cfd7a.firebaseapp.com",
    projectId: "senpai-dev-cfd7a",
    storageBucket: "senpai-dev-cfd7a.appspot.com",
    messagingSenderId: "470571409563",
    appId: "1:470571409563:web:bd3c3736a499bc2263263e"
  };
  

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

