import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAeKby7DVfy8070ZjgVRqN-dauNiK_CrQ",
  authDomain: "nyeri-catholic-youth-app.firebaseapp.com",
  projectId: "nyeri-catholic-youth-app",
  storageBucket: "nyeri-catholic-youth-app.appspot.com",
  messagingSenderId: "2807748399",
  appId: "1:2807748399:web:a33bb5ea33a2ad87bb3da",
  measurementId: "G-9HRL154BDP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  if (!form) {
    console.error("❌ registerForm not found in DOM!");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const data = {
        name: form.name?.value || "",
        diocese: form.diocese?.value || "",
        deanary: form.deanary?.value || "",
        parish: form.parish?.value || "",
        local_church: form.local_church?.value || "",
        Education: form.Education?.value || "",
        Baptised: form.Baptised?.value || "",
        Gender: form.Gender?.value || "",
        maritalStatus: form.maritalStatus?.value || "",
        Different_abled: form["Different-abled"]?.value || "",
        level: form.level?.value || "",
        position: form.position?.value || "",
        phone: form.phone?.value || "",
        password: form.password?.value || "",
        timestamp: new Date()
      };

      await addDoc(collection(db, "registrations"), data);
      alert("✅ Registration saved successfully!");
      form.reset();
    } catch (error) {
      console.error("❌ Error saving registration:", error);
      alert("Error saving registration. Check console for details.");
    }
  });
});
