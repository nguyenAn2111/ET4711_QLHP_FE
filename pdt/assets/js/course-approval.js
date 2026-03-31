const approvalSearch = document.getElementById("approvalSearch");
const approvalStatus = document.getElementById("approvalStatus");
const approvalSemester = document.getElementById("approvalSemester");
const approvalFaculty = document.getElementById("approvalFaculty");

const approvalRows = () => Array.from(document.querySelectorAll("#approvalTableBody tr"));

function applyApprovalFilters() {
  const keyword = approvalSearch.value.toLowerCase().trim();
  const status = approvalStatus.value;
  const semester = approvalSemester.value;
  const faculty = approvalFaculty.value;

  approvalRows().forEach((row) => {
    const text = row.innerText.toLowerCase();
    const rowStatus = row.dataset.status;
    const rowSemester = row.dataset.semester;
    const rowFaculty = row.dataset.faculty;

    const matchKeyword = text.includes(keyword);
    const matchStatus = status === "Tất cả" || rowStatus === status;
    const matchSemester = semester === "Tất cả" || rowSemester === semester;
    const matchFaculty = faculty === "Tất cả" || rowFaculty === faculty;

    row.style.display =
      matchKeyword && matchStatus && matchSemester && matchFaculty ? "" : "none";
  });
}

function setApprovalState(row, state) {
  const statusText = row.querySelector(".approval-status-text");
  const actionCell = row.querySelector(".approval-actions");

  row.dataset.status = state;
  statusText.textContent = state;

  if (state === "Đã duyệt") {
    actionCell.innerHTML = `<button class="mini-btn gray disabled-btn" disabled>Đã duyệt</button>`;
  } else if (state === "Từ chối") {
    actionCell.innerHTML = `<button class="mini-btn gray disabled-btn" disabled>Đã từ chối</button>`;
  } else {
    actionCell.innerHTML = `
      <button class="mini-btn green approve-btn">Duyệt</button>
      <button class="mini-btn red reject-btn">Từ chối</button>
    `;
  }
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("approve-btn")) {
    const row = e.target.closest("tr");
    setApprovalState(row, "Đã duyệt");
    applyApprovalFilters();
  }

  if (e.target.classList.contains("reject-btn")) {
    const row = e.target.closest("tr");
    setApprovalState(row, "Từ chối");
    applyApprovalFilters();
  }
});

document.getElementById("approveAllBtn").addEventListener("click", () => {
  approvalRows().forEach((row) => {
    if (row.style.display !== "none") setApprovalState(row, "Đã duyệt");
  });
  applyApprovalFilters();
});

document.getElementById("rejectAllBtn").addEventListener("click", () => {
  approvalRows().forEach((row) => {
    if (row.style.display !== "none") setApprovalState(row, "Từ chối");
  });
  applyApprovalFilters();
});

approvalSearch.addEventListener("input", applyApprovalFilters);
approvalStatus.addEventListener("change", applyApprovalFilters);
approvalSemester.addEventListener("change", applyApprovalFilters);
approvalFaculty.addEventListener("change", applyApprovalFilters);