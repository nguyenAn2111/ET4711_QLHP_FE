function initCourseSetting() {

    let selectedId = null

    const tableBody = document.getElementById("settingCourseTableBody")

    // ================= FETCH =================
    function loadData() {
        fetch("http://localhost:4711/api/v1.0/pdt/course/list-all")
            .then(res => res.json())
            .then(res => renderTable(res.data))
    }

    // ================= RENDER =================
    function renderTable(data) {

        const typeMap = {
            FORCE: "Bắt buộc",
            OPTIONAL: "Tự chọn",
            BASE: "Cơ sở"
        }

        tableBody.innerHTML = ""

        data.forEach(c => {

            const row = document.createElement("tr")

            row.innerHTML = `
                <td>${c.code}</td>
                <td>${c.name}</td>
                <td>${c.credit}</td>
                <td>${typeMap[c.type]}</td>
                <td class="action-cell">
                    <button class="mini-btn blue edit-btn" data-id="${c.id}">Sửa</button>
                </td>
            `

            tableBody.appendChild(row)
        })
    }

    // ================= EDIT =================
    tableBody.addEventListener("click", (e) => {

        if (!e.target.classList.contains("edit-btn")) return

        const id = e.target.dataset.id
        selectedId = id

        fetch(`http://localhost:4711/api/v1.0/pdt/course/detail/${id}`)
            .then(res => res.json())
            .then(res => {
                const c = res.data

                document.getElementById("courseCodeInput").value = c.code
                document.getElementById("courseNameInput").value = c.name
                document.getElementById("courseCreditInput").value = c.credit
                document.getElementById("courseTypeInput").value = c.type
            })
    })

    // ================= UPDATE =================
    document.getElementById("updateCourseBtn").onclick = () => {

        if (!selectedId) return alert("Chọn học phần trước")

        fetch(`http://localhost:4711/api/v1.0/pdt/course/detail/${selectedId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code: courseCodeInput.value,
                name: courseNameInput.value,
                credit: courseCreditInput.value,
                type: courseTypeInput.value
            })
        })
            .then(() => {
                alert("Cập nhật thành công")
                loadData()
            })
    }

    // ================= DELETE =================
    document.getElementById("deleteCourseBtn").onclick = () => {

        if (!selectedId) return alert("Chọn học phần")

        const confirmDelete = confirm("Bạn có chắc chắn muốn xóa học phần này?")

        if (!confirmDelete) return

        fetch(`http://localhost:4711/api/v1.0/pdt/course/${selectedId}`, {
            method: "DELETE"
        })
            .then(() => {
                alert("Xóa thành công")
                loadData()
            })
    }

    // ================= ADD =================
    const modal = document.getElementById("addCourseModal")

    document.getElementById("addCourseBtn").onclick = () => {
        modal.classList.remove("hidden")
    }

    document.getElementById("closeModal").onclick = () => {
        modal.classList.add("hidden")
    }

    document.getElementById("submitAddCourse").onclick = () => {

        fetch("http://localhost:4711/api/v1.0/pdt/course", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code: add_code.value,
                name: add_name.value,
                credit: Number(add_credit.value),
                startDate: new Date(add_start.value).toISOString(),
                endDate: new Date(add_end.value).toISOString(),
                type: add_type.value,
                term: "2025.2"
            })
        })
            .then(() => {
                alert("Thêm thành công")
                modal.classList.add("hidden")
                loadData()
            })
    }

    // ================= RESET =================
    document.getElementById("resetCourseBtn").onclick = () => {
        selectedId = null
        document.querySelectorAll("#course-setting-page input").forEach(i => i.value = "")
    }

    loadData()
}