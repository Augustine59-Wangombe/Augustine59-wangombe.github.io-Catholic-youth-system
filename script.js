// -----------------------
// SHOW FORM FUNCTION
// -----------------------
window.showform = function(formId) {
  document.querySelectorAll(".form-box").forEach(form => form.classList.remove("active"));
  const el = document.getElementById(formId);
  if (el) el.classList.add("active");
};

// -----------------------
// SECURE AUTH REGISTRATION
// -----------------------
window.registerUser = function() {
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const denary = document.getElementById("denary").value;
  const parish = document.getElementById("parish").value;
  const role = document.getElementById("role").value;
  const level = document.getElementById("level").value;
  const position = document.getElementById("position").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCred => {
      const user = userCred.user;

      // Save extra user info in Firestore
      return db.collection("users").doc(user.uid).set({
        uid: user.uid,
        fullName,
        email,
        denary,
        parish,
        role,
        level,
        position,
        createdAt: new Date()
      });
    })
    .then(() => {
      alert("Registration successful. Please login.");
      showform("login-form");
    })
    .catch(error => {
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already registered. Please login.");
        showform("login-form");
      } else {
        alert(error.message);
      }
    });
};

// -----------------------
// SECURE LOGIN
// -----------------------
window.loginUser = function() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      localStorage.setItem("loggedIn", "true");  
      window.location.href = "Youth dashboard.html";   
    })
    .catch(error => {
      if (error.code === "auth/user-not-found") {
        alert("Account does not exist. Please register.");
        showform("register-form");
      } else if (error.code === "auth/wrong-password") {
        alert("Wrong password.");
      } else {
        alert(error.message);
      }
    });
};

// -----------------------
// PAGE LOAD EVENTS
// -----------------------
document.addEventListener('DOMContentLoaded', function() {

  // CLICK LINKS FOR LOGIN/REGISTER
  const showRegisterLinks = document.querySelectorAll('.show-register');
  showRegisterLinks.forEach(a => {
    a.addEventListener('click', function(e) {
      e.preventDefault();
      showform('register-form');
    });
  });

  const showLoginLinks = document.querySelectorAll('.show-login');
  showLoginLinks.forEach(a => {
    a.addEventListener('click', function(e) {
      e.preventDefault();
      showform('login-form');
    });
  });

  // -----------------------
  // DENARY → PARISH LOGIC
  // (Your original code preserved)
  // -----------------------
  const parishData = {
    nyeri: [
      "Our Lady of Consolata Cathedral",
      "St. Jude Parish",
      "King'ong'o Parish",
      "Mwenji Parish",
      "Kiamuiru Parish",
      "Mathari Institutions Chaplaincy",
      "St. Charles Lwanga Parish"
    ],
    othaya: [
      "Othaya Parish",
      "Kariko Parish",
      "Birithia Parish",
      "Karima Parish",
      "Kagicha Parish",
      "Karuthi Parish",
      "Kigumo Parish"
    ],
    karatina: [
      "Karatina Parish",
      "Miiri Parish",
      "Giakaibei Parish",
      "Gikumbo Parish",
      "Gathugu Parish",
      "Ngandu Parish",
      "Kabiru-ini Parish",
      "Kahira-ini Parish"
    ],
    mukurweini: [
      "Mukurwe-ini Parish",
      "Kaheti Parish",
      "Kimondo Parish",
      "Gikondi Parish"
    ],
    mweiga: [
      "Mweiga Parish",
      "Endarasha Parish",
      "Gatarakwa Parish",
      "Karemeno Parish",
      "Mugunda Parish",
      "Sirima Parish",
      "Winyumiririe Parish",
      "Kamariki Parish"
    ],
    tetu: [
      "Tetu Parish",
      "Wamagana Parish",
      "Kigogo-ini Parish",
      "Itheguri Parish",
      "Gititu Parish",
      "Kagaita Parish",
      "Giakanja Parish",
      "Karangia Parish"
    ],
    naromoru: [
      "Narumoru Town Parish",
      "Irigithathi Parish",
      "Thegu Parish",
      "Kiganjo Parish",
      "Munyu Parish"
    ],
    nanyuki: [
      "Nanyuki Parish",
      "Dol Dol Parish",
      "Matanya Parish",
      "St. Teresa Parish",
      "Kalalu Parish"
    ]
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
        defaultOption.value = "";
        parishSelect.add(defaultOption);

        parishData[selectedDenary].forEach(parish => {
          const option = document.createElement("option");
          option.text = parish;
          option.value = parish.toLowerCase().replace(/\s+/g, "_");
          parishSelect.add(option);
        });
      } else {
        const option = document.createElement("option");
        option.text = "-- Select Denary First --";
        option.value = "";
        parishSelect.add(option);
      }
    });
  }

  // -----------------------
  // LEADERSHIP LOGIC
  // (Your original code preserved)
  // -----------------------
  const roleSelect = document.getElementById('role');
  const leadershipSection = document.getElementById('leadershipSection');
  const positionSection = document.getElementById('positionSection');
  const levelSelect = document.getElementById('level');
  const positionSelect = document.getElementById('position');

  const parishPositions = [
    "Parish Coordinator",
    "Parish vice coordinator",
    "Parish Secretary",
    "Parish vice secretary",
    "Parish Treasurer",
    "Parish litergist",
    "Parish vice litergist",
    "Parish organing secretary",
    "Parish games captain",
    "Parish Disciplinarian"
  ];

  const localPositions = [
    "Local Coordinator",
    "Local vice coordinator",
    "Local Secretary",
    "Local vice secretary",
    "Local litergist",
    "Local vice litergist",
    "Local organing secretary",
    "Local games captain",
    "Local Disciplinarian"
  ];

  if (roleSelect) {
    roleSelect.addEventListener('change', function() {
      if (this.value === 'leader') {
        leadershipSection.style.display = 'block';
      } else {
        leadershipSection.style.display = 'none';
        positionSection.style.display = 'none';
        levelSelect.value = '';
        positionSelect.innerHTML = '<option value="">-- Choose Position --</option>';
      }
    });
  }

  if (levelSelect) {
    levelSelect.addEventListener('change', function() {
      positionSelect.innerHTML = '<option value="">-- Choose Position --</option>';
      
      if (this.value === 'parish') {
        parishPositions.forEach(pos => {
          const option = document.createElement('option');
          option.value = pos.toLowerCase().replace(/\s+/g, '-');
          option.textContent = pos;
          positionSelect.appendChild(option);
        });
        positionSection.style.display = 'block';

      } else if (this.value === 'local') {
        localPositions.forEach(pos => {
          const option = document.createElement('option');
          option.value = pos.toLowerCase().replace(/\s+/g, '-');
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

