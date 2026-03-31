const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginMessage = document.getElementById("loginMessage");

const DEFAULT_USERNAME = "pdt";
const DEFAULT_PASSWORD = "pdt";

if (localStorage.getItem("agu_pdt_logged_in") === "true") {
  window.location.href = "index.html";
}

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
    localStorage.setItem("agu_pdt_logged_in", "true");
    localStorage.setItem("agu_pdt_user", username);
    window.location.href = "index.html";
  } else {
    loginMessage.textContent = "Sai tài khoản hoặc mật khẩu.";
  }
});