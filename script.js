// script.js - consolidated JS: showform, denary->parish, leadership toggles

// make showform available globally (for compatibility)
window.showform = function(formId) {
  document.querySelectorAll(".form-box").forEach(form => form.classList.remove("active"));
  const el = document.getElementById(formId);
  if (el) el.classList.add("active");
};

document.addEventListener('DOMContentLoaded', function() {
  // Attach click handlers for the inline links (no inline onclicks required)
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

  // PARISH/DENARY logic
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
      parishSelect.innerHTML = ""; // clear old options

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

  // LEADERSHIP toggle and positions
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
        // reset selects
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
