// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeKby7DVfy8070ZjgVRqN-dauNiK_CrQ",
  authDomain: "nyeri-catholic-youth-app.firebaseapp.com",
  databaseURL: "https://nyeri-catholic-youth-app-default-rtdb.firebaseio.com",
  projectId: "nyeri-catholic-youth-app",
  storageBucket: "nyeri-catholic-youth-app.appspot.com",
  messagingSenderId: "2807748399",
  appId: "1:2807748399:web:a33bb5ea33a2ad87bb3da",
  measurementId: "G-9HRL154BDP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // ✅ Initialize Firestore here

console.log("✅ Firebase successfully initialized and Firestore is ready!");

// Handle registration form submission
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.querySelector('input[name="name"]').value,
    diocese: document.querySelector('input[name="diocese"]').value,
    deanary: document.getElementById("deanary").value,
    parish: document.getElementById("parish").value,
    local_church: document.getElementById("local_church").value,
    Education: document.getElementById("Education").value,
    Baptised: document.getElementById("Baptised").value,
    Gender: document.getElementById("Gender").value,
    maritalStatus: document.getElementById("maritalStatus").value,
    Different_abled: document.getElementById("Different-abled").value,
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
