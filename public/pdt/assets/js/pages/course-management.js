function initCourseManagement() {

    const tableBody = document.getElementById("courseTableBody")

    if (!tableBody) {
        return
    }

    fetch("http://localhost:4711/api/v1.0/pdt/course/list-all")
        .then(res => res.json())
        .then(res => {
            console.log("API data:", res)
            renderTable(res.data)
        })
        .catch(err => {
            console.error("API error:", err)
        })


    function renderTable(courses) {

        tableBody.innerHTML = ""

        const typeMap = {
            "FORCE": "Bắt buộc",
            "OPTIONAL": "Tự chọn",
            "BASE": "Cơ sở"
        }

        courses.forEach(course => {

            const isOpen = course.status === "OPEN"

            const statusText = isOpen ? "Đang mở" : "Đóng"
            const statusClass = isOpen ? "open" : "closed"
            const btnText = isOpen ? "Đóng" : "Mở"
            const btnClass = isOpen ? "red" : "green"

            const row = document.createElement("tr")

            row.innerHTML = `
                <td>${course.code}</td>
                <td>${course.name}</td>
                <td>${typeMap[course.type] || course.type}</td>
                <td>${formatDate(course.start_at)} - ${formatDate(course.end_at)}</td>
                <td class="status-text ${statusClass}">${statusText}</td>
                <td>${course.regis_num ?? 0}</td>
                <td>
                    <button 
                        class="mini-btn ${btnClass} toggle-btn"
                        data-id="${course.id}"
                        data-status="${course.status}"
                    >
                        ${btnText}
                    </button>
                </td>
            `

            tableBody.appendChild(row)
        })
    }

    function formatDate(dateStr) {
        if (!dateStr) return ""
        return new Date(dateStr).toLocaleDateString("vi-VN")
    }

    const openAllBtn = document.getElementById("openAllBtn")
    const closeAllBtn = document.getElementById("closeAllBtn")

    openAllBtn.addEventListener("click", () => {
        fetch("http://localhost:4711/api/v1.0/pdt/course/openAll", {
            method: "PUT"
        })
            .then(res => res.json())
            .then(() => {
                console.log("✅ Open all success")
                reloadData()
            })
            .catch(err => console.error(err))
    })

    closeAllBtn.addEventListener("click", () => {
        fetch("http://localhost:4711/api/v1.0/pdt/course/closeAll", {
            method: "PUT"
        })
            .then(res => res.json())
            .then(() => {
                console.log("✅ Close all success")
                reloadData()
            })
            .catch(err => console.error(err))
    })


    tableBody.addEventListener("click", (e) => {
    if (!e.target.classList.contains("toggle-btn")) return

    const btn = e.target
    const courseId = btn.dataset.id
    const status = btn.dataset.status

    const isOpen = status === "OPEN"
    const url = isOpen
        ? "http://localhost:4711/api/v1.0/pdt/course/close"
        : "http://localhost:4711/api/v1.0/pdt/course/open"

    fetch(`${url}?id=${courseId}`, {
        method: "PUT"
    })
    .then(res => res.json())
    .then(() => {
        console.log("✅ Toggle success")
        reloadData()
    })
    .catch(err => console.error(err))
})


    function reloadData() {
        fetch("http://localhost:4711/api/v1.0/pdt/course/list-all")
            .then(res => res.json())
            .then(res => renderTable(res.data))
    }
}