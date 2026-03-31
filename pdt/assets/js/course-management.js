const searchInput = document.getElementById("search");
const statusFilter = document.getElementById("status");

const courseRows = () => Array.from(document.querySelectorAll("#courseTableBody tr"));

function applyCourseFilters() {
  const keyword = searchInput.value.toLowerCase().trim();
  const status = statusFilter.value;

  courseRows().forEach((row) => {
    const text = row.innerText.toLowerCase();
    const rowStatus = row.dataset.status;

    const matchKeyword = text.includes(keyword);
    const matchStatus = status === "Tất cả" || rowStatus === status;

    row.style.display = matchKeyword && matchStatus ? "" : "none";
  });
}

function setCourseRowState(row, open) {
  const statusText = row.querySelector(".status-text");
  const btn = row.querySelector(".toggle-btn");

  if (open) {
    row.dataset.status = "Đang mở";
    statusText.textContent = "Đang mở";
    btn.textContent = "Đóng";
    btn.classList.remove("green");
    btn.classList.add("red");
  } else {
    row.dataset.status = "Đóng";
    statusText.textContent = "Đóng";
    btn.textContent = "Mở";
    btn.classList.remove("red");
    btn.classList.add("green");
  }
}

document.querySelectorAll(".toggle-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const row = btn.closest("tr");
    const isOpen = row.dataset.status === "Đang mở";
    setCourseRowState(row, !isOpen);
    applyCourseFilters();
  });
});

document.getElementById("openAllBtn").addEventListener("click", () => {
  courseRows().forEach((row) => setCourseRowState(row, true));
  applyCourseFilters();
});

document.getElementById("closeAllBtn").addEventListener("click", () => {
  courseRows().forEach((row) => setCourseRowState(row, false));
  applyCourseFilters();
});

searchInput.addEventListener("input", applyCourseFilters);
statusFilter.addEventListener("change", applyCourseFilters);