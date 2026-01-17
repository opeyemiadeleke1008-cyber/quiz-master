// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBj7S69wR_gLkZhPfCQ5YT6-S47ufhXRG0",
  authDomain: "quiz-master-b5c9d.firebaseapp.com",
  projectId: "quiz-master-b5c9d",
  storageBucket: "quiz-master-b5c9d.firebasestorage.app",
  messagingSenderId: "16578840017",
  appId: "1:16578840017:web:19badf982490ece44a4cf0",
  measurementId: "G-WHJBZKC0CM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Connect Firestore
const db = getFirestore(app);

// Save Data
window.saveData = async (username, email, password) => {
  try {
    await addDoc(collection(db, "users"), {
      name: username,
      email: email,
      password: password
    });
    console.log("User data saved successfully!");
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error;
  }
};

// Get all users
async function getData() {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
      console.log(doc.data());
    });
    return users;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Login function
window.loginUser = async (email, password) => {
  try {
    const users = await getData();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      console.log("Login successful for user:", user.name);
      return { success: true, user };
    } else {
      console.log("Invalid email or password");
      return { success: false, message: "Invalid email or password" };
    }
  } catch (error) {
    console.error("Error during login:", error);
    return { success: false, message: "Login failed. Please try again." };
  }
};

document.getElementById("sign-up-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const signupBtn = document.getElementById("signup-btn");
  const errorMsg = document.getElementById("errormsg");
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (username === "" || email === "" || password === "") {
    errorMsg.textContent = "All fields are required.";
    errorMsg.style.color = "red";
    setTimeout(() => {
      errorMsg.textContent = "";
    }, 2000);
    return;
  }
  if (!emailPattern.test(email)) {
    errorMsg.textContent = "Please enter a valid email address.";
    errorMsg.style.color = "red";
    setTimeout(() => {
      errorMsg.textContent = "";
    }, 2000);
    return;
  }

  // Call saveData function to save user data
  await saveData(username, email, password);

  errorMsg.textContent = "Sign up successful!";
  errorMsg.style.color = "green";
  signupBtn.disabled = true;

  // Redirect to dashboard after 2 seconds
  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 2000);
});

document.getElementById("login-bttn").addEventListener("click", () => {
  document.getElementById("signup-section").classList.add("hidden");
  document.getElementById("login-section").classList.remove("hidden");
});
document.getElementById("signup-bttn").addEventListener("click", () => {
  document.getElementById("login-section").classList.add("hidden");
  document.getElementById("signup-section").classList.remove("hidden");
});

// Login form handler
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const loginEmail = document.getElementById("login-email").value.trim();
    const loginPassword = document.getElementById("login-password").value;
    const loginBtn = document.getElementById("login-btn");
    const loginErrorMsg = document.getElementById("login-errormsg");

    if (loginEmail === "" || loginPassword === "") {
      loginErrorMsg.textContent = "All fields are required.";
      loginErrorMsg.style.color = "red";
      setTimeout(() => {
        loginErrorMsg.textContent = "";
      }, 2000);
      return;
    }

    const result = await loginUser(loginEmail, loginPassword);

    if (result.success) {
      loginErrorMsg.textContent = "Login successful!";
      loginErrorMsg.style.color = "green";
      loginBtn.disabled = true;

      // Store user info in localStorage
      localStorage.setItem("currentUser", JSON.stringify(result.user));

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 2000);
    } else {
      loginErrorMsg.textContent = result.message;
      loginErrorMsg.style.color = "red";
      setTimeout(() => {
        loginErrorMsg.textContent = "";
      }, 2000);
    }
  });
}
