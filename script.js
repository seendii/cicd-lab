const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

loadTasks();

function addTask() {
    if (taskInput.value.trim() === "") {
        alert("Enter a task");
        return;
    }

    const task = {
        text: taskInput.value,
        completed: false
    };

    let tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);

    taskInput.value = "";

    loadTasks();
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {

    taskList.innerHTML = "";

    let tasks = getTasks();

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="task ${task.completed ? "completed" : ""}">
                ${task.text}
            </span>

            <div class="actions">

                <button class="complete" onclick="toggleTask(${index})">
                    ✓
                </button>

                <button class="edit" onclick="editTask(${index})">
                    Edit
                </button>

                <button class="delete" onclick="deleteTask(${index})">
                    Delete
                </button>

            </div>
        `;

        taskList.appendChild(li);

    });

}

function toggleTask(index) {

    let tasks = getTasks();

    tasks[index].completed = !tasks[index].completed;

    saveTasks(tasks);

    loadTasks();

}

function editTask(index) {

    let tasks = getTasks();

    let updated = prompt("Edit Task", tasks[index].text);

    if (updated !== null && updated.trim() !== "") {

        tasks[index].text = updated;

        saveTasks(tasks);

        loadTasks();

    }

}

function deleteTask(index) {

    let tasks = getTasks();

    tasks.splice(index, 1);

    saveTasks(tasks);

    loadTasks();

}
