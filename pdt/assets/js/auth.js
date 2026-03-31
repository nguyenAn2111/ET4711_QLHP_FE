if (localStorage.getItem("agu_pdt_logged_in") !== "true") {
  window.location.href = "login.html";
}

const currentUser = document.getElementById("currentUser");
if (currentUser) {
  currentUser.textContent = localStorage.getItem("agu_pdt_user") || "pdt";
}

const logoutBtn = document.querySelector(".logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("agu_pdt_logged_in");
    localStorage.removeItem("agu_pdt_user");
    window.location.href = "login.html";
  });
}