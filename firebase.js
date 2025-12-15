
window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  if (!form) {
    console.error("❌ registerForm not found in DOM!");
    return;
  }

  // Helper function to get input value safely
  const getVal = (id) => form.querySelector(`#${id}`)?.value || "";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      // Collect all form data consistently
      const data = {
        name: getVal("name"),
        diocese: getVal("diocese"),
        denary: getVal("denary"),
        parish: getVal("parish"),
        local_church: getVal("local_church"),
        Education: getVal("Education"),
        Current_Status: getVal("Current-Status"),
        Baptised: getVal("Baptised"),
        Confirmed: getVal("Confirmed"),
        Gender: getVal("Gender"),
        Marital_Status: getVal("Marital-Status"),
        Different_abled: getVal("Different-abled"),
        role: getVal("role"),
        Age: getVal("Age"),
        position: getVal("position"),
        phone: getVal("phone"),
        Email: getVal("Email"),
        password: getVal("password"),
        timestamp: new Date()
      };

      // Save to Firestore
      await addDoc(collection(db, "registrations"), data);

      alert("✅ Registration saved successfully!");
      form.reset();
      window.location.href = "Youths dashboard.html";   

    } catch (error) {
      console.error("❌ Error saving registration:", error);
      alert("Error saving registration. Check console for details.");
    }
  });
});
