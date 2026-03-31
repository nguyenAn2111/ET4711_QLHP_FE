const semesterKeyword = document.getElementById("semesterKeyword");
const semesterSearchBtn = document.getElementById("semesterSearchBtn");
const createSemesterBtn = document.getElementById("createSemesterBtn");

function applySemesterFilters() {
  const keyword = semesterKeyword.value.toLowerCase().trim();
  const rows = Array.from(document.querySelectorAll("#semesterTableBody tr"));

  rows.forEach((row) => {
    const text = row.dataset.keyword.toLowerCase();
    row.style.display = text.includes(keyword) ? "" : "none";
  });
}

semesterKeyword.addEventListener("input", applySemesterFilters);
semesterSearchBtn.addEventListener("click", applySemesterFilters);

createSemesterBtn.addEventListener("click", () => {
  alert("Bạn có thể nối tiếp chức năng tạo học kỳ mới tại đây.");
});