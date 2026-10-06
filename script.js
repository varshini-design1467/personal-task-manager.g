const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priorityInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const filterTasks = document.getElementById("filterTasks");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const emptyMessage = document.getElementById("emptyMessage");

let tasks = [];

// =========================
// DATE
// =========================

const todayDate = document.getElementById("todayDate");

const today = new Date();

todayDate.textContent = today.toLocaleDateString("en-IN", {
weekday: "long",
day: "numeric",
month: "long",
year: "numeric"
});

// =========================
// ADD TASK
// =========================

function addTask() {

```
const taskText = taskInput.value.trim();

if (taskText === "") {
    alert("Please enter a task.");
    taskInput.focus();
    return;
}

const newTask = {
    id: Date.now(),
    text: taskText,
    priority: priorityInput.value,
    completed: false
};

tasks.push(newTask);

taskInput.value = "";

priorityInput.value = "Medium";

displayTasks();

taskInput.focus();
```

}

// =========================
// DISPLAY TASKS
// =========================

function displayTasks() {

```
taskList.innerHTML = "";

const selectedFilter = filterTasks.value;

let filteredTasks = tasks;

if (selectedFilter === "pending") {

    filteredTasks = tasks.filter(function(task) {
        return task.completed === false;
    });

}

if (selectedFilter === "completed") {

    filteredTasks = tasks.filter(function(task) {
        return task.completed === true;
    });

}


if (filteredTasks.length === 0) {

    taskList.appendChild(emptyMessage);

    if (tasks.length === 0) {
        emptyMessage.querySelector("h3").textContent = "No tasks yet";
        emptyMessage.querySelector("p").textContent =
            "Add your first task above.";
    } else {
        emptyMessage.querySelector("h3").textContent = "No matching tasks";
        emptyMessage.querySelector("p").textContent =
            "Try another filter.";
    }

} else {

    filteredTasks.forEach(function(task) {

        const taskElement = document.createElement("div");

        taskElement.className = "task";

        if (task.completed) {
            taskElement.classList.add("completed");
        }


        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.className = "task-checkbox";

        checkbox.checked = task.completed;


        checkbox.addEventListener("change", function() {

            toggleTask(task.id);

        });


        const content = document.createElement("div");

        content.className = "task-content";


        const title = document.createElement("h3");

        title.textContent = task.text;


        const status = document.createElement("p");

        status.textContent = task.completed
            ? "Completed"
            : "Pending";


        content.appendChild(title);

        content.appendChild(status);


        const priority = document.createElement("span");

        priority.className =
            "priority " + task.priority.toLowerCase();

        priority.textContent = task.priority;


        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-button";

        deleteButton.textContent = "Delete";


        deleteButton.addEventListener("click", function() {

            deleteTask(task.id);

        });


        taskElement.appendChild(checkbox);

        taskElement.appendChild(content);

        taskElement.appendChild(priority);

        taskElement.appendChild(deleteButton);


        taskList.appendChild(taskElement);

    });

}


updateStatistics();
```

}

// =========================
// COMPLETE TASK
// =========================

function toggleTask(id) {

```
tasks.forEach(function(task) {

    if (task.id === id) {
        task.completed = !task.completed;
    }

});

displayTasks();
```

}

// =========================
// DELETE TASK
// =========================

function deleteTask(id) {

```
tasks = tasks.filter(function(task) {

    return task.id !== id;

});

displayTasks();
```

}

// =========================
// UPDATE STATISTICS
// =========================

function updateStatistics() {

```
const total = tasks.length;

const completed = tasks.filter(function(task) {

    return task.completed === true;

}).length;

const pending = total - completed;


totalTasks.textContent = total;

completedTasks.textContent = completed;

pendingTasks.textContent = pending;
```

}

// =========================
// BUTTON CLICK
// =========================

addButton.addEventListener("click", addTask);

// =========================
// ENTER KEY
// =========================

taskInput.addEventListener("keydown", function(event) {

```
if (event.key === "Enter") {

    addTask();

}
```

});

// =========================
// FILTER
// =========================

filterTasks.addEventListener("change", function() {

```
displayTasks();
```

});

// =========================
// INITIAL DISPLAY
// =========================

displayTasks();
