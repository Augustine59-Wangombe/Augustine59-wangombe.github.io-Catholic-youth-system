import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAeKby7DVfy8070ZjgVRqN-dauNiK_CrQ",
  authDomain: "nyeri-catholic-youth-app.firebaseapp.com",
  projectId: "nyeri-catholic-youth-app",
  storageBucket: "nyeri-catholic-youth-app.appspot.com",
  messagingSenderId: "2807748399",
  appId: "1:2807748399:web:a33bb5ea33a2ad87bb3da",
  measurementId: "G-9HRL154BDP",
};

const app = initializeApp(firebaseConfig);
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

