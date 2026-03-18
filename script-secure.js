// 🔥 Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfcG88fq0ziiVnJpVnQnJKPCWaoNBLc-M",
  authDomain: "justin-animation-d53a5.firebaseapp.com",
  projectId: "justin-animation-d53a5",
  storageBucket: "justin-animation-d53a5.firebasestorage.app",
  messagingSenderId: "511036806138",
  appId: "1:511036806138:web:3dd759872438685a47ca43"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// UI Elements
const modal = document.getElementById("authModal");
const title = document.getElementById("formTitle");

let isLogin = true;

// ✅ Show Login
function showLogin() {
  modal.classList.remove("hidden");
  title.innerText = "Login";
  isLogin = true;
}

// ✅ Show Signup
function showSignup() {
  modal.classList.remove("hidden");
  title.innerText = "Sign Up";
  isLogin = false;
}

// ✅ Close modal when clicking outside
window.onclick = function(e) {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
};

// ✅ Authentication
function submitAuth() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  if (isLogin) {
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        alert("Login successful 🔥");
        modal.classList.add("hidden");
      })
      .catch(err => alert(err.message));
  } else {
    auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        alert("Account created 🚀");
        modal.classList.add("hidden");
      })
      .catch(err => alert(err.message));
  }
}

// ✅ AI Image Generator
async function generateImage() {
  const prompt = document.getElementById("prompt").value;
  const result = document.getElementById("result");

  if (!prompt) {
    alert("Please enter a prompt!");
    return;
  }

  // Loading message
  result.innerHTML = `<p>Generating AI image for: "${prompt}"...</p>`;

  try {
    const response = await fetch("https://justin-animation--calmiazaman.replit.app/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();

    // Debug log (optional)
    console.log(data);

    if (data.data && data.data[0].url) {
      result.innerHTML = `
        <img src="${data.data[0].url}" 
             style="max-width:100%; margin-top:15px; border-radius:10px;" />
      `;
    } else {
      result.innerHTML = `<p>❌ Failed to generate image. Try again.</p>`;
    }

  } catch (error) {
    console.error(error);
    result.innerHTML = `<p>❌ Error: ${error.message}</p>`;
  }
}
