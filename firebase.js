// -----------------------------
// FIREBASE SDKs (CDN - REQUIRED)
// -----------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// -----------------------------
// FIREBASE CONFIG
// -----------------------------
const firebaseConfig = {
  apiKey: "AIzaSyAeKFby7DVFy80702igVrqN-dauNiK-C_Q",
  authDomain: "nyeri-catholic-youth-app.firebaseapp.com",
  projectId: "nyeri-catholic-youth-app",
  storageBucket: "nyeri-catholic-youth-app.appspot.com",
  messagingSenderId: "2807748399",
  appId: "1:2807748399:web:a33abb5ea33a2d387bb3da"
};

// -----------------------------
// INITIALIZE FIREBASE
// -----------------------------
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// -----------------------------
// REGISTER FORM HANDLER
// -----------------------------
window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const getVal = (id) => form.querySelector(`#${id}`)?.value || "";

    const email = getVal("registerEmail");
    const password = getVal("registerPassword");

    try {
      // 1️⃣ Create Auth account
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      // 2️⃣ Save profile to Firestore
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
      console.error(error);
    }
  });
});
