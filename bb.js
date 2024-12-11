document.addEventListener("DOMContentLoaded", () => {
    const calendarDays = document.getElementById("calendar-days");
    const monthYear = document.getElementById("month-year");
    const selectedDateElement = document.getElementById("selected-date");
    const taskList = document.getElementById("task-list");
    const addTaskBtn = document.getElementById("add-task-btn");

    let currentDate = new Date();
    let selectedDate = null;
    let tasks = {};

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        // Atualiza o título
        monthYear.textContent = `${currentDate.toLocaleString("default", {
            month: "long",
        })} ${year}`;

        // Limpa os dias
        calendarDays.innerHTML = "";

        // Primeiro dia do mês
        const firstDay = new Date(year, month, 1).getDay();

        // Dias no mês
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Espaços vazios
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement("div");
            calendarDays.appendChild(emptyDiv);
        }

        // Dias do mês
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement("div");
            dayElement.classList.add("date");
            dayElement.textContent = day;

            const today = new Date();
            if (
                day === today.getDate() &&
                year === today.getFullYear() &&
                month === today.getMonth()
            ) {
                dayElement.classList.add("today");
            }

            dayElement.addEventListener("click", () => {
                document.querySelectorAll(".date").forEach((date) => {
                    date.classList.remove("selected");
                });
                dayElement.classList.add("selected");
                selectedDate = new Date(year, month, day);
                updateTasks();
            });

            calendarDays.appendChild(dayElement);
        }
    }

    function updateTasks() {
        const dateKey = selectedDate.toISOString().split("T")[0];
        selectedDateElement.textContent = dateKey;
        taskList.innerHTML = "";

        const currentTasks = tasks[dateKey] || [];
        currentTasks.forEach((task, index) => {
            const taskItem = document.createElement("li");
            taskItem.textContent = task;

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Excluir";
            deleteBtn.addEventListener("click", () => {
                currentTasks.splice(index, 1);
                tasks[dateKey] = currentTasks;
                updateTasks();
            });

            taskItem.appendChild(deleteBtn);
            taskList.appendChild(taskItem);
        });
    }

    addTaskBtn.addEventListener("click", () => {
        const task = prompt("Digite a tarefa:");
        if (task) {
            const dateKey = selectedDate.toISOString().split("T")[0];
            if (!tasks[dateKey]) tasks[dateKey] = [];
            tasks[dateKey].push(task);
            updateTasks();
        }
    });

    document.getElementById("prev-month").addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById("next-month").addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
});