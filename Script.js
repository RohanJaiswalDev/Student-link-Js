const students = [];

        document.getElementById("btn").addEventListener("click", function (e) {
            e.preventDefault();

            const rollNo = document.getElementById("rollno").value;
            const firstName = document.getElementById("fname").value;
            const lastName = document.getElementById("lname").value;
            const course = document.getElementById("course").value;
            const email = document.getElementById("email").value;

            if (!rollNo || !firstName || !lastName || !course || !email) {
                alert("All fields are required.");
                return;
            }

            const student = { rollNo, firstName, lastName, course, email };
            students.push(student);
            renderTable();
            renderFilters();
            document.getElementById("form-box").reset();
        });

        function renderTable() {
            const tbody = document.getElementById("student-tbody");
            tbody.innerHTML = students.map(student => `
                <tr>
                    <td>${student.rollNo}</td>
                    <td>${student.firstName}</td>
                    <td>${student.lastName}</td>
                    <td>${student.course}</td>
                    <td>${student.email}</td>
                </tr>
            `).join("");
        }

        function renderFilters() {
            document.querySelectorAll(".filter-dropdown").forEach(dropdown => {
                const column = dropdown.getAttribute("data-column");
                const uniqueValues = Array.from(new Set(students.map(s => s[column])));
                dropdown.innerHTML = uniqueValues.map(value => `
                    <label><input type="checkbox" value="${value}" checked> ${value}</label>
                `).join("");

                dropdown.querySelectorAll("input").forEach(checkbox => {
                    checkbox.addEventListener("change", applyFilters);
                });
            });
        }

        function applyFilters() {
            const filters = {};
            document.querySelectorAll(".filter-dropdown").forEach(dropdown => {
                const column = dropdown.getAttribute("data-column");
                filters[column] = Array.from(dropdown.querySelectorAll("input:checked")).map(input => input.value);
            });

            const filteredStudents = students.filter(student => {
                return Object.keys(filters).every(column => filters[column].includes(student[column]));
            });

            const tbody = document.getElementById("student-tbody");
            tbody.innerHTML = filteredStudents.map(student => `
                <tr>
                    <td>${student.rollNo}</td>
                    <td>${student.firstName}</td>
                    <td>${student.lastName}</td>
                    <td>${student.course}</td>
                    <td>${student.email}</td>
                </tr>
            `).join("");
        }

        document.querySelectorAll(".filter-btn").forEach(button => {
            button.addEventListener("click", function () {
                const dropdown = this.nextElementSibling;
                dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
            });
        });

        document.addEventListener("click", function (e) {
            if (!e.target.classList.contains("filter-btn")) {
                document.querySelectorAll(".filter-dropdown").forEach(dropdown => dropdown.style.display = "none");
            }
        });