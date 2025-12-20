
// -----------------------
// SHOW FORM FUNCTION
// -----------------------
window.showform = function (formId) {
  document.querySelectorAll(".form-box")
    .forEach(form => form.classList.remove("active"));

  const el = document.getElementById(formId);
  if (el) el.classList.add("active");
};

// Wait until page loads
document.addEventListener("DOMContentLoaded", function () {

  const showRegisterLinks = document.querySelectorAll(".show-register");

  showRegisterLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      showform("register-form");
    });
  });

});
// -----------------------
// LOGIN FUNCTION
// -----------------------
import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const auth = getAuth();

window.loginUser = async function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginpassword").value; // fixed ID

  if (!email || !password) {
    alert("Email and password are required");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "Youths dashboard.html";
  } catch (error) {
    alert("Login failed: " + error.message);
    console.error(error);
  }
};

// -----------------------
// DENARY → PARISH LOGIC
// -----------------------
document.addEventListener('DOMContentLoaded', function() {
  const parishData = {
    nyeri: ["Our Lady of Consolata Cathedral", "St. Jude Parish", "King'ong'o Parish", "Mwenji Parish", "Kiamuiru Parish", "Mathari Institutions Chaplaincy", "St. Charles Lwanga Parish"],
    othaya: ["Othaya Parish", "Kariko Parish", "Birithia Parish", "Karima Parish", "Kagicha Parish", "Karuthi Parish", "Kigumo Parish"],
    karatina: ["Karatina Parish", "Miiri Parish", "Giakaibei Parish", "Gikumbo Parish", "Gathugu Parish", "Ngandu Parish", "Kabiru-ini Parish", "Kahira-ini Parish"],
    mukurweini: ["Mukurwe-ini Parish", "Kaheti Parish", "Kimondo Parish", "Gikondi Parish"],
    mweiga: ["Mweiga Parish", "Endarasha Parish", "Gatarakwa Parish", "Karemeno Parish", "Mugunda Parish", "Sirima Parish", "Winyumiririe Parish", "Kamariki Parish"],
    tetu: ["Tetu Parish", "Wamagana Parish", "Kigogo-ini Parish", "Itheguri Parish", "Gititu Parish", "Kagaita Parish", "Giakanja Parish", "Karangia Parish"],
    naromoru: ["Narumoru Town Parish", "Irigithathi Parish", "Thegu Parish", "Kiganjo Parish", "Munyu Parish"],
    nanyuki: ["Nanyuki Parish", "Dol Dol Parish", "Matanya Parish", "St. Teresa Parish", "Kalalu Parish"]
  };

  const denarySelect = document.getElementById("denary");
  const parishSelect = document.getElementById("parish");

  if (denarySelect && parishSelect) {
    denarySelect.addEventListener("change", function() {
      const selectedDenary = this.value;
      parishSelect.innerHTML = "";

      if (selectedDenary && parishData[selectedDenary]) {
        const defaultOption = document.createElement("option");
        defaultOption.text = "-- Choose Parish --";
        parishSelect.add(defaultOption);

        parishData[selectedDenary].forEach(parish => {
          const option = document.createElement("option");
          option.text = parish;
          option.value = parish.toLowerCase().replace(/\s+/g, "_");
          parishSelect.add(option);
        });
      } else {
        parishSelect.innerHTML = "<option>-- Select Denary First --</option>";
      }
    });
  }

  // -----------------------
  // LEADERSHIP LOGIC 
  // -----------------------
  const roleSelect = document.getElementById('role');
  const leadershipSection = document.getElementById('leadershipSection');
  const positionSection = document.getElementById('positionSection');
  const levelSelect = document.getElementById('level');
  const positionSelect = document.getElementById('position');

  const parishPositions = ["Parish Coordinator", "Parish vice coordinator", "Parish Secretary", "Parish vice secretary", "Parish Treasurer", "Parish litergist", "Parish vice litergist", "Parish organing secretary", "Parish games captain", "Parish Disciplinarian"];
  const localPositions = ["Local Coordinator", "Local vice coordinator", "Local Secretary", "Local vice secretary", "Local litergist", "Local vice litergist", "Local organing secretary", "Local games captain", "Local Disciplinarian"];

  if (roleSelect) {
    roleSelect.addEventListener('change', function() {
      if (this.value === 'leader') {
        leadershipSection.style.display = 'block';
      } else {
        leadershipSection.style.display = 'none';
        positionSection.style.display = 'none';
      }
    });
  }

  if (levelSelect) {
    levelSelect.addEventListener('change', function() {
      positionSelect.innerHTML = '<option value="">-- Choose Position --</option>';

      if (this.value === 'parish') {
        parishPositions.forEach(pos => {
          const option = document.createElement('option');
          option.value = pos;
          option.textContent = pos;
          positionSelect.appendChild(option);
        });
        positionSection.style.display = 'block';
      } else if (this.value === 'local') {
        localPositions.forEach(pos => {
          const option = document.createElement('option');
          option.value = pos;
          option.textContent = pos;
          positionSelect.appendChild(option);
        });
        positionSection.style.display = 'block';
      } else {
        positionSection.style.display = 'none';
      }
    });
  }
});


document.getElementById("showLoginPassword").addEventListener("change", function() {
  const input = document.getElementById("loginpassword");
  input.type = this.checked ? "text" : "password";
});


document.getElementById("showRegisterPassword").addEventListener("change", function() {
  const input = document.getElementById("registerpassword");
  input.type = this.checked ? "text" : "password";
});






