if (localStorage.getItem("student_logged_in") !== "true") {
  window.location.href = "student-login.html";
}

const studentCurrentUser = document.getElementById("studentCurrentUser");
const studentLogoutBtn = document.getElementById("studentLogoutBtn");

if (studentCurrentUser) {
  studentCurrentUser.textContent = localStorage.getItem("student_user") || "SV001";
}

studentLogoutBtn.addEventListener("click", () => {
  localStorage.removeItem("student_logged_in");
  localStorage.removeItem("student_user");
  window.location.href = "student-login.html";
});

/* =========================
   CHUYỂN TAB
========================= */
const studentTabs = document.querySelectorAll(".student-tab");
const studentTabContents = document.querySelectorAll(".student-tab-content");

studentTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    studentTabs.forEach((item) => item.classList.remove("active"));
    studentTabContents.forEach((content) => content.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

/* =========================
   TÌM KIẾM HỌC PHẦN
========================= */
const studentSearch = document.getElementById("studentSearch");
const studentCourseTableBody = document.getElementById("studentCourseTableBody");

function getStudentCourseRows() {
  return Array.from(studentCourseTableBody.querySelectorAll("tr"));
}

function filterStudentCourses() {
  const keyword = studentSearch.value.toLowerCase().trim();

  getStudentCourseRows().forEach((row) => {
    const text = row.innerText.toLowerCase();
    row.style.display = text.includes(keyword) ? "" : "none";
  });
}

studentSearch.addEventListener("input", filterStudentCourses);

/* =========================
   LIST ĐĂNG KÝ HỌC PHẦN
========================= */
const selectedCoursesList = document.getElementById("selectedCoursesList");
const selectedCoursesEmpty = document.getElementById("selectedCoursesEmpty");
const clearAllBtn = document.getElementById("clearAllBtn");
const creditSummaryText = document.getElementById("creditSummaryText");
const creditBarFill = document.getElementById("creditBarFill");
const creditWarning = document.getElementById("creditWarning");
const submitRegisterBtn = document.getElementById("submitRegisterBtn");

let selectedCourses = [];

function updateSelectedCoursesUI() {
  selectedCoursesList.innerHTML = "";

  if (selectedCourses.length === 0) {
    selectedCoursesEmpty.style.display = "block";
  } else {
    selectedCoursesEmpty.style.display = "none";
  }

  selectedCourses.forEach((course) => {
    const item = document.createElement("div");
    item.className = "selected-course-item";
    item.innerHTML = `
      <div class="selected-course-top">
        <div>
          <div class="selected-course-code">${course.code}</div>
          <div class="selected-course-name">${course.name}</div>
          <div class="selected-course-credit">${course.credit} tín chỉ • ${course.type}</div>
        </div>
        <button class="remove-btn" data-code="${course.code}">Xóa</button>
      </div>
    `;
    selectedCoursesList.appendChild(item);
  });

  const totalCredits = selectedCourses.reduce((sum, item) => sum + Number(item.credit), 0);
  creditSummaryText.textContent = `${totalCredits}/24 TC`;
  creditBarFill.style.width = `${Math.min((totalCredits / 24) * 100, 100)}%`;

  if (totalCredits < 12) {
    creditWarning.textContent = "Cần đăng ký tối thiểu 12 tín chỉ để hoàn tất.";
  } else if (totalCredits > 24) {
    creditWarning.textContent = "Bạn đã vượt quá số tín chỉ tối đa.";
  } else {
    creditWarning.textContent = "Đủ điều kiện gửi đăng ký.";
  }

  document.querySelectorAll(".add-btn").forEach((btn) => {
    const row = btn.closest("tr");
    const code = row.dataset.code;
    const existed = selectedCourses.some((course) => course.code === code);
    btn.disabled = existed;
    btn.textContent = existed ? "ĐÃ THÊM" : "THÊM";
    btn.style.opacity = existed ? "0.65" : "1";
    btn.style.cursor = existed ? "not-allowed" : "pointer";
  });
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-btn")) {
    const row = e.target.closest("tr");
    const course = {
      code: row.dataset.code,
      name: row.dataset.name,
      credit: row.dataset.credit,
      type: row.dataset.type,
    };

    const existed = selectedCourses.some((item) => item.code === course.code);
    if (!existed) {
      selectedCourses.push(course);
      updateSelectedCoursesUI();
    }
  }

  if (e.target.classList.contains("remove-btn")) {
    const code = e.target.dataset.code;
    selectedCourses = selectedCourses.filter((item) => item.code !== code);
    updateSelectedCoursesUI();
  }
});

clearAllBtn.addEventListener("click", () => {
  selectedCourses = [];
  updateSelectedCoursesUI();
});

submitRegisterBtn.addEventListener("click", () => {
  const totalCredits = selectedCourses.reduce((sum, item) => sum + Number(item.credit), 0);

  if (selectedCourses.length === 0) {
    alert("Bạn chưa chọn học phần nào.");
    return;
  }

  if (totalCredits < 12) {
    alert("Cần đăng ký tối thiểu 12 tín chỉ.");
    return;
  }

  if (totalCredits > 24) {
    alert("Không được vượt quá 24 tín chỉ.");
    return;
  }

  alert("Đăng ký học phần thành công.");
});

updateSelectedCoursesUI();