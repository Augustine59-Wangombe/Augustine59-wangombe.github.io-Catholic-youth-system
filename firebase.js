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
  appId: "1:2807748399:web:a33abb5ea33a2d387bb3da",
  measurementId: "G-9HRL1S4BDP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import {
  getAuth,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const db = getFirestore(app);
const auth = getAuth(app);

window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const getVal = (id) => form.querySelector(`#${id}`)?.value || "";

    const email = getVal("registerEmail");
    const password = getVal("registerPassword");

    try {
      // 1️⃣ Create Auth account
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      // 2️⃣ Save profile (NO password)
      await addDoc(collection(db, "registrations"), {
        uid: userCred.user.uid,
        name: getVal("name"),
        diocese: getVal("diocese"),
        denary: getVal("denary"),
        parish: getVal("parish"),
        local_church: getVal("local_church"),
        education: getVal("Education"),
        current_status: getVal("Current-Status"),
        baptised: getVal("Baptised"),
        confirmed: getVal("Confirmed"),
        gender: getVal("Gender"),
        marital_status: getVal("Marital-Status"),
        different_abled: getVal("Different-abled"),
        role: getVal("role"),
        age: getVal("Age"),
        phone: getVal("phone"),
        createdAt: new Date()
      });

      alert("✅ Registration successful!");
      window.location.href = "Youths dashboard.html";

    } catch (error) {
      alert(error.message);
    }
  });
});


