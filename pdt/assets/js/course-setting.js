const settingSearch = document.getElementById("settingSearch");
const settingCourseType = document.getElementById("settingCourseType");
const settingCourseTableBody = document.getElementById("settingCourseTableBody");

const courseCodeInput = document.getElementById("courseCodeInput");
const courseNameInput = document.getElementById("courseNameInput");
const courseCreditInput = document.getElementById("courseCreditInput");
const courseTypeInput = document.getElementById("courseTypeInput");

const addCourseBtn = document.getElementById("addCourseBtn");
const updateCourseBtn = document.getElementById("updateCourseBtn");
const deleteCourseBtn = document.getElementById("deleteCourseBtn");
const resetCourseBtn = document.getElementById("resetCourseBtn");

let selectedCourseRow = null;

function getSettingRows() {
  return Array.from(settingCourseTableBody.querySelectorAll("tr"));
}

function applySettingCourseFilters() {
  const keyword = settingSearch.value.toLowerCase().trim();
  const type = settingCourseType.value;

  getSettingRows().forEach((row) => {
    const text = row.innerText.toLowerCase();
    const rowType = row.dataset.type;

    const matchKeyword = text.includes(keyword);
    const matchType = type === "Tất cả" || rowType === type;

    row.style.display = matchKeyword && matchType ? "" : "none";
  });
}

function resetCourseForm() {
  courseCodeInput.value = "";
  courseNameInput.value = "";
  courseCreditInput.value = "2";
  courseTypeInput.value = "Bắt buộc";
  selectedCourseRow = null;
}

function fillCourseForm(row) {
  courseCodeInput.value = row.dataset.code;
  courseNameInput.value = row.dataset.name;
  courseCreditInput.value = row.dataset.credit;
  courseTypeInput.value = row.dataset.type;
  selectedCourseRow = row;
}

function buildCourseRow(code, name, credit, type) {
  const tr = document.createElement("tr");
  tr.dataset.code = code;
  tr.dataset.name = name;
  tr.dataset.credit = credit;
  tr.dataset.type = type;

  tr.innerHTML = `
    <td>${code}</td>
    <td>${name}</td>
    <td>${credit}</td>
    <td>${type}</td>
    <td class="action-cell"><button class="mini-btn blue edit-course-btn">Sửa</button></td>
  `;
  return tr;
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-course-btn")) {
    const row = e.target.closest("tr");
    fillCourseForm(row);
  }
});

addCourseBtn.addEventListener("click", () => {
  const code = courseCodeInput.value.trim();
  const name = courseNameInput.value.trim();
  const credit = courseCreditInput.value.trim();
  const type = courseTypeInput.value;

  if (!code || !name || !credit) return;

  const existed = getSettingRows().some((row) => row.dataset.code === code);
  if (existed) {
    alert("Mã học phần đã tồn tại.");
    return;
  }

  const newRow = buildCourseRow(code, name, credit, type);
  settingCourseTableBody.appendChild(newRow);
  resetCourseForm();
  applySettingCourseFilters();
});

updateCourseBtn.addEventListener("click", () => {
  if (!selectedCourseRow) return;

  const code = courseCodeInput.value.trim();
  const name = courseNameInput.value.trim();
  const credit = courseCreditInput.value.trim();
  const type = courseTypeInput.value;

  if (!code || !name || !credit) return;

  selectedCourseRow.dataset.code = code;
  selectedCourseRow.dataset.name = name;
  selectedCourseRow.dataset.credit = credit;
  selectedCourseRow.dataset.type = type;

  selectedCourseRow.innerHTML = `
    <td>${code}</td>
    <td>${name}</td>
    <td>${credit}</td>
    <td>${type}</td>
    <td class="action-cell"><button class="mini-btn blue edit-course-btn">Sửa</button></td>
  `;

  resetCourseForm();
  applySettingCourseFilters();
});

deleteCourseBtn.addEventListener("click", () => {
  if (!selectedCourseRow) return;
  selectedCourseRow.remove();
  resetCourseForm();
});

resetCourseBtn.addEventListener("click", resetCourseForm);
settingSearch.addEventListener("input", applySettingCourseFilters);
settingCourseType.addEventListener("change", applySettingCourseFilters);