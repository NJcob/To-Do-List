const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Add a task
function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!!");
    } else {
        let task = {
            text: inputBox.value,
            checked: false
        };
        let tasks = getTasks();  // Get existing tasks from localStorage
        tasks.push(task);        // Add new task
        saveData(tasks);         // Save updated tasks
        renderTasks(tasks);      // Re-render tasks
    }
    inputBox.value = "";
}

// Get tasks from localStorage
function getTasks() {
    let tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];  // Parse JSON if tasks exist
}

// Save tasks to localStorage
function saveData(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));  // Store tasks as a JSON string
}

// Render tasks on the page
function renderTasks(tasks) {
    listContainer.innerHTML = "";  // Clear the current list
    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        if (task.checked) {
            li.classList.add("checked");
        }
        li.innerHTML = task.text;

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";  // Create a delete button (×)
        li.appendChild(span);
        listContainer.appendChild(li);
    });
}

// Event listener for checking or removing tasks
listContainer.addEventListener("click", function(e) {
    let tasks = getTasks();
    if (e.target.tagName === "LI") {
        // Toggle checked state
        const li = e.target;
        const index = Array.from(li.parentNode.children).indexOf(li);
        tasks[index].checked = !tasks[index].checked;
        saveData(tasks);
        renderTasks(tasks);
    } else if (e.target.tagName === "SPAN") {
        // Remove task
        const span = e.target;
        const li = span.parentElement;
        const index = Array.from(li.parentNode.children).indexOf(li);
        tasks.splice(index, 1);  // Remove task from array
        saveData(tasks);
        renderTasks(tasks);
    }
}, false);

// Show tasks on page load
function showTask() {
    let tasks = getTasks();  // Get tasks from localStorage
    renderTasks(tasks);      // Render tasks
}

// Show tasks on page load
showTask();

// Add event listener to input box to listen for the "Enter" key
inputBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();  // Call addTask() when "Enter" is pressed
    }
});
