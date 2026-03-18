// Firebase Config (Public only - no secrets!)
const firebaseConfig = {
  apiKey: "AIzaSyDfcG88fq0ziiVnJpVnQnJKPCWaoNBLc-M",
  authDomain: "justin-animation-d53a5.firebaseapp.com",
  projectId: "justin-animation-d53a5",
  storageBucket: "justin-animation-d53a5.firebasestorage.app",
  messagingSenderId: "511036806138",
  appId: "1:511036806138:web:3dd759872438685a47ca43"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Backend URL (UPDATE THIS after deployment!)
const API_URL = 'http://localhost:3000'; // Change to your Render URL in production

// UI references
const modal = document.getElementById("authModal");
const title = document.getElementById("formTitle");
let isLogin = true;

// Show login/signup modal
function showLogin() { modal.classList.remove("hidden"); title.innerText = "Login"; isLogin = true; }
function showSignup() { modal.classList.remove("hidden"); title.innerText = "Sign Up"; isLogin = false; }

// Authentication
function submitAuth() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (isLogin) {
    auth.signInWithEmailAndPassword(email, password)
      .then(() => alert("Login successful 🔥"))
      .catch(err => alert(err.message));
  } else {
    auth.createUserWithEmailAndPassword(email, password)
      .then(() => alert("Account created 🚀"))
      .catch(err => alert(err.message));
  }
}

// AI Generation - NOW CALLS SECURE BACKEND!
async function generateImage() {
  const prompt = document.getElementById("prompt").value;
  const result = document.getElementById("result");

  if (!prompt) { alert("Please enter a prompt!"); return; }

  result.innerHTML = `<p>🎨 Generating AI animation for: "${prompt}"...</p>`;

  try {
    // Call backend instead of OpenAI directly!
    const response = await fetch(`${API_URL}/api/openai/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: prompt })
    });

    const data = await response.json();
    
    if (response.ok && data.url) {
      result.innerHTML = `<img src="${data.url}" alt="Generated" style="max-width:100%; margin-top:10px; border-radius:8px;" />`;
    } else {
      result.innerHTML = `<p>❌ Failed: ${data.error || 'Unknown error'}</p>`;
    }
  } catch (error) {
    result.innerHTML = `<p>❌ Error: ${error.message}</p>`;
  }
}