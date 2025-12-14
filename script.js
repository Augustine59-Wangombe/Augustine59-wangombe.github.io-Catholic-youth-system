// -----------------------
// SHOW FORM FUNCTION
// -----------------------
window.showform = function(formId) {
  document.querySelectorAll(".form-box").forEach(f => f.classList.remove("active"));
  const el = document.getElementById(formId);
  if (el) el.classList.add("active");
};

// -----------------------
// REGISTER USER (AFTER PAYMENT CONFIRMED)
// -----------------------
async function registerUserAfterPayment() {
  const fullName = document.getElementById("fullName")?.value.trim();
  const email = document.getElementById("email")?.value.toLowerCase().trim();
  const password = document.getElementById("password")?.value;
  const denary = document.getElementById("denary")?.value;
  const parish = document.getElementById("parish")?.value;
  const role = document.getElementById("role")?.value;
  const level = document.getElementById("level")?.value;
  const position = document.getElementById("position")?.value;

  if (!fullName || !email || !password || !denary || !parish || !role) {
    alert("Please fill all required fields");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[email]) {
    alert("This email is already registered. Please login.");
    showform("login-form");
    return;
  }

  users[email] = {
    fullName,
    email,
    password, // ⚠️ Plain text for testing only
    denary,
    parish,
    role,
    level,
    position,
    createdAt: new Date().toISOString()
  };

  localStorage.setItem("users", JSON.stringify(users));
  alert("✅ Registration successful! Please login.");
  showform("login-form");
}

// -----------------------
// LOGIN USER
// -----------------------
window.loginUser = function() {
  const email = document.getElementById("loginEmail")?.value.toLowerCase().trim();
  const password = document.getElementById("loginPassword")?.value;

  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (!users[email]) {
    alert("Account not found. Please register.");
    showform("register-form");
    return;
  }

  if (users[email].password !== password) {
    alert("Incorrect password");
    return;
  }

  localStorage.setItem("loggedInUser", email);
  window.location.href = "Youths dashboard.html";
};

// -----------------------
// LOGOUT
// -----------------------
window.logoutUser = function() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
};

// ----------------------------
// DENARY → PARISH LOGIC
// ----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const parishData = {
    nyeri: ["Our Lady of Consolata Cathedral","St. Jude Parish","King'ong'o Parish","Mwenji Parish","Kiamuiru Parish","Mathari Institutions Chaplaincy","St. Charles Lwanga Parish"],
    othaya: ["Othaya Parish","Kariko Parish","Birithia Parish","Karima Parish","Kagicha Parish","Karuthi Parish","Kigumo Parish"],
    karatina: ["Karatina Parish","Miiri Parish","Giakaibei Parish","Gikumbo Parish","Gathugu Parish","Ngandu Parish","Kabiru-ini Parish","Kahira-ini Parish"],
    mukurweini: ["Mukurwe-ini Parish","Kaheti Parish","Kimondo Parish","Gikondi Parish"],
    mweiga: ["Mweiga Parish","Endarasha Parish","Gatarakwa Parish","Karemeno Parish","Mugunda Parish","Sirima Parish","Winyumiririe Parish","Kamariki Parish"],
    tetu: ["Tetu Parish","Wamagana Parish","Kigogo-ini Parish","Itheguri Parish","Gititu Parish","Kagaita Parish","Giakanja Parish","Karangia Parish"],
    naromoru: ["Narumoru Town Parish","Irigithathi Parish","Thegu Parish","Kiganjo Parish","Munyu Parish"],
    nanyuki: ["Nanyuki Parish","Dol Dol Parish","Matanya Parish","St. Teresa Parish","Kalalu Parish"]
  };

  const denarySelect = document.getElementById("denary");
  const parishSelect = document.getElementById("parish");

  if (denarySelect && parishSelect) {
    denarySelect.addEventListener("change", () => {
      parishSelect.innerHTML = '<option value="">-- Choose Parish --</option>';
      parishData[denarySelect.value]?.forEach(p => {
        const opt = document.createElement("option");
        opt.value = p;
        opt.textContent = p;
        parishSelect.appendChild(opt);
      });
    });
  }

  // -----------------------
  // LEADERSHIP LOGIC
  // -----------------------
  const roleSelect = document.getElementById("role");
  const leadershipSection = document.getElementById("leadershipSection");
  const levelSelect = document.getElementById("level");
  const positionSection = document.getElementById("positionSection");
  const positionSelect = document.getElementById("position");

  const parishPositions = ["Parish Coordinator","Parish vice coordinator","Parish Secretary","Parish vice secretary","Parish Treasurer","Parish litergist","Parish vice litergist","Parish organing secretary","Parish games captain","Parish Disciplinarian"];
  const localPositions = ["Local Coordinator","Local vice coordinator","Local Secretary","Local vice secretary","Local litergist","Local vice litergist","Local organing secretary","Local games captain","Local Disciplinarian"];

  roleSelect?.addEventListener("change", () => {
    if (roleSelect.value === "leader") {
      leadershipSection.style.display = "block";
    } else {
      leadershipSection.style.display = "none";
      positionSection.style.display = "none";
    }
  });

  levelSelect?.addEventListener("change", () => {
    positionSelect.innerHTML = '<option value="">-- Choose Position --</option>';
    if (levelSelect.value === "parish") {
      parishPositions.forEach(pos => {
        const opt = document.createElement("option");
        opt.value = pos;
        opt.textContent = pos;
        positionSelect.appendChild(opt);
      });
      positionSection.style.display = "block";
    } else if (levelSelect.value === "local") {
      localPositions.forEach(pos => {
        const opt = document.createElement("option");
        opt.value = pos;
        opt.textContent = pos;
        positionSelect.appendChild(opt);
      });
      positionSection.style.display = "block";
    } else {
      positionSection.style.display = "none";
    }
  });
});

// ----------------------------
// M-PESA STK PUSH
// ----------------------------
const renderBackend = "https://youth-data-backend.onrender.com";
const PAYMENT_AMOUNT = 100;

async function sendSTKPush() {
  const phone = document.getElementById("phone")?.value.trim();
  if (!/^2547\d{8}$/.test(phone)) {
    alert("Use phone format 2547XXXXXXXX");
    return;
  }

  try {
    const res = await fetch(`${renderBackend}/stkpush`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, amount: PAYMENT_AMOUNT })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "STK push failed");

    alert("📲 Check your phone for STK prompt");
    pollPaymentStatus(phone);

  } catch (err) {
    console.error(err);
    alert("❌ Payment request failed");
  }
}

// ----------------------------
// POLL PAYMENT STATUS
// ----------------------------
async function pollPaymentStatus(phone) {
  const statusEl = document.getElementById("paymentStatus");
  statusEl.textContent = "Waiting for payment confirmation...";

  let attempts = 0;
  const maxAttempts = 12;

  const timer = setInterval(async () => {
    attempts++;
    try {
      const res = await fetch(`${renderBackend}/check-payment?phone=${phone}`);
      const data = await res.json();

      if (data.paid) {
        clearInterval(timer);
        statusEl.textContent = "✅ Payment confirmed!";
        await registerUserAfterPayment();
      }

      if (attempts >= maxAttempts) {
        clearInterval(timer);
        statusEl.textContent = "⏱ Payment timeout. Try again.";
      }
    } catch (err) {
      clearInterval(timer);
      statusEl.textContent = "❌ Error checking payment";
    }
  }, 5000);
}

// ----------------------------
// PAY BUTTON
// ----------------------------
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("payBtn")?.addEventListener("click", e => {
    e.preventDefault();
    sendSTKPush();
  });
});
