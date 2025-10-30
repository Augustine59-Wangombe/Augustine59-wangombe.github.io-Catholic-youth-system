
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeKFby7DVFy80702igVrqN-dauNiK-C_Q",
  authDomain: "nyeri-catholic-youth-app.firebaseapp.com",
  databaseURL: "https://nyeri-catholic-youth-app-default-rtdb.firebaseio.com",
  projectId: "nyeri-catholic-youth-app",
  storageBucket: "nyeri-catholic-youth-app.firebasestorage.app",
  messagingSenderId: "2807748399",
  appId: "1:2807748399:web:be188cd566aeb5a77bb3da",
  measurementId: "G-JBFJ3Q968Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);