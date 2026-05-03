function initApprovalManagement() {

    const tableBody = document.getElementById("approvalTableBody")

    if (!tableBody) {
        return
    }

    // ================= FETCH DATA =================
    fetch("http://localhost:4711/api/v1.0/pdt/registration/list-all")
        .then(res => res.json())
        .then(res => {
            console.log("API data:", res)
            renderTable(res.data)
        })
        .catch(err => {
            console.error("API error:", err)
        })


    // ================= RENDER TABLE =================
    function renderTable(registrations) {

        tableBody.innerHTML = ""

        const statusMap = {
            "WAITING": "Chờ duyệt",
            "APPROVED": "Đã duyệt",
            "DECLINED": "Từ chối"
        }

        registrations.forEach(reg => {

            const statusText = statusMap[reg.status] || reg.status

            let actionHtml = ""

            if (reg.status === "WAITING") {
                actionHtml = `
                    <button class="mini-btn green approve-btn" data-id="${reg.id}">Duyệt</button>
                    <button class="mini-btn red reject-btn" data-id="${reg.id}">Từ chối</button>
                `
            } else if (reg.status === "APPROVED") {
                actionHtml = `
                    <button class="mini-btn gray disabled-btn" disabled>Đã duyệt</button>
                `
            } else {
                actionHtml = `
                    <button class="mini-btn gray disabled-btn" disabled>Đã từ chối</button>
                `
            }

            const row = document.createElement("tr")

            row.innerHTML = `
                <td>${reg.code}</td>
                <td>${reg.student_name}</td>
                <td>${reg.student_code}</td>
                <td>${reg.student_unit}</td>
                <td>${reg.course_code}</td>
                <td>${reg.course_name}</td>
                <td class="approval-status-text">${statusText}</td>
                <td class="action-cell approval-actions">
                    ${actionHtml}
                </td>
            `

            tableBody.appendChild(row)
        })
    }


    // ================= BUTTON ALL =================
    const approveAllBtn = document.getElementById("approveAllBtn")
    const rejectAllBtn = document.getElementById("rejectAllBtn")

    approveAllBtn.addEventListener("click", () => {
        fetch("http://localhost:4711/api/v1.0/pdt/registration/approveAll", {
            method: "PUT"
        })
            .then(res => res.json())
            .then(() => {
                console.log("✅ Approve all success")
                reloadData()
            })
            .catch(err => console.error(err))
    })

    rejectAllBtn.addEventListener("click", () => {
        fetch("http://localhost:4711/api/v1.0/pdt/registration/rejectAll", {
            method: "PUT"
        })
            .then(res => res.json())
            .then(() => {
                console.log("✅ Reject all success")
                reloadData()
            })
            .catch(err => console.error(err))
    })


    // ================= CLICK ACTION =================
    tableBody.addEventListener("click", (e) => {

        const btn = e.target

        // APPROVE
        if (btn.classList.contains("approve-btn")) {
            const id = btn.dataset.id

            fetch(`http://localhost:4711/api/v1.0/pdt/registration/approve?id=${id}`, {
                method: "PUT"
            })
                .then(res => res.json())
                .then(() => {
                    console.log("✅ Approve success")
                    reloadData()
                })
                .catch(err => console.error(err))
        }

        // REJECT
        if (btn.classList.contains("reject-btn")) {
            const id = btn.dataset.id

            fetch(`http://localhost:4711/api/v1.0/pdt/registration/reject?id=${id}`, {
                method: "PUT"
            })
                .then(res => res.json())
                .then(() => {
                    console.log("✅ Reject success")
                    reloadData()
                })
                .catch(err => console.error(err))
        }

    })


    // ================= RELOAD =================
    function reloadData() {
        fetch("http://localhost:4711/api/v1.0/pdt/registration/list-all")
            .then(res => res.json())
            .then(res => renderTable(res.data))
    }
}