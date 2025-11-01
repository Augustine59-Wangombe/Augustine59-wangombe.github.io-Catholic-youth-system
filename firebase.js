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

// ✅ Confirm Firebase connection in console
console.log("✅ Firebase successfully initialized and Firestore is ready!");

// Handle registration form submission
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.querySelector('input[name="name"]').value,
    diocese: document.querySelector('input[name="diocese"]').value,
    denary: document.getElementById("denary").value,
    parish: document.getElementById("parish").value,
    local_church: document.querySelector('input[name="local_church"]').value,
    Education: document.getElementById("Education").value,
    CurrentStatus: document.getElementById("CurrentStatus").value,
    Baptised: document.getElementById("Baptised").value,
    Confirmed: document.getElementById("Confirmed").value,
    Gender: document.getElementById("Gender").value,
    MaritalStatus: document.getElementById("MaritalStatus").value,
    DifferentAbled: document.getElementById("Different-abled").value,
    role: document.getElementById("role").value,
    level: document.getElementById("level").value,
    position: document.getElementById("position").value,
    phone: document.getElementById("phone").value,
    password: document.querySelector('#registerForm input[name="password"]').value,
    timestamp: new Date()
  };

  try {
    await addDoc(collection(db, "registrations"), data);
    console.log("✅ Registration data saved to Firestore:", data);
    alert("✅ Registration saved successfully!");
    e.target.reset();
  } catch (error) {
    console.error("❌ Error saving registration:", error);
    alert("Error saving registration. Check console for details.");
  }
});


