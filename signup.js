// ===============================
// VibeCarve Signup Page JS
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");

  // Elements
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  const togglePassword = document.getElementById("togglePassword");
  const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

  // ✅ If signupForm not found, stop (prevents errors on other pages)
  if (!signupForm) return;

  // ===============================
  // Signup Form Submit
  // ===============================
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all the fields!");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    alert("Signup successful ✅ Please login now.");
    window.location.href = "login.html";
  });

  // ===============================
  // Toggle Password Show/Hide
  // ===============================
  togglePassword.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type");

    if (type === "password") {
      passwordInput.setAttribute("type", "text");
      togglePassword.classList.remove("fa-eye");
      togglePassword.classList.add("fa-eye-slash");
    } else {
      passwordInput.setAttribute("type", "password");
      togglePassword.classList.remove("fa-eye-slash");
      togglePassword.classList.add("fa-eye");
    }
  });

  // ===============================
  // Toggle Confirm Password Show/Hide
  // ===============================
  toggleConfirmPassword.addEventListener("click", () => {
    const type = confirmPasswordInput.getAttribute("type");

    if (type === "password") {
      confirmPasswordInput.setAttribute("type", "text");
      toggleConfirmPassword.classList.remove("fa-eye");
      toggleConfirmPassword.classList.add("fa-eye-slash");
    } else {
      confirmPasswordInput.setAttribute("type", "password");
      toggleConfirmPassword.classList.remove("fa-eye-slash");
      toggleConfirmPassword.classList.add("fa-eye");
    }
  });
});
