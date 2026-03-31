const studentLoginForm = document.getElementById("studentLoginForm");
const studentUsername = document.getElementById("studentUsername");
const studentPassword = document.getElementById("studentPassword");
const studentLoginMessage = document.getElementById("studentLoginMessage");

const STUDENT_USERNAME = "sv";
const STUDENT_PASSWORD = "sv";

if (localStorage.getItem("student_logged_in") === "true") {
  window.location.href = "student.html";
}

studentLoginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = studentUsername.value.trim();
  const password = studentPassword.value.trim();

  if (username === STUDENT_USERNAME && password === STUDENT_PASSWORD) {
    localStorage.setItem("student_logged_in", "true");
    localStorage.setItem("student_user", "SV001");
    window.location.href = "student.html";
  } else {
    studentLoginMessage.textContent = "Sai tài khoản hoặc mật khẩu sinh viên.";
  }
});