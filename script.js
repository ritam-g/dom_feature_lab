function openFeatures() {
    const elements = document.querySelectorAll(".element");
    const fullElements = document.querySelectorAll(".full-element");
    const allElement = document.querySelector(".all-elements");
    const closeButtons = document.querySelectorAll("#cross");

    // OPEN FULL VIEW
    elements.forEach((element, index) => {
        element.addEventListener("click", function () {
            allElement.style.display = "none";
            fullElements.forEach(sec => sec.style.display = "none");
            
            // Matches the clicked element to the corresponding full view
            fullElements[index].style.display = "block";
        });
    });

    // CLOSE FULL VIEW
    closeButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            fullElements.forEach(sec => sec.style.display = "none");
            allElement.style.display = "flex";
        });
    });
}

// To-Do List Logic
let form = document.querySelector(".todo-list-fullpage form");
let taskInput = document.querySelector(".todo-list-fullpage form input");
let tasktextarea = document.querySelector(".todo-list-fullpage form textarea");
let rightBox = document.querySelector(".todo-list-fullpage .right");
let tasks = [];

form.addEventListener("submit", function (e) {
    e.preventDefault();
    
    // Validation: Don't add if title is empty
    if (taskInput.value.trim() === "") return;

    // Push new data
    tasks.push({
        title: taskInput.value,
        desc: tasktextarea.value
    });

    renderTasks();
    
    // Reset the form
    form.reset();
});

function renderTasks() {
    // Clear the container
    rightBox.innerHTML = "";

    tasks.forEach((item, index) => {
        let taskDiv = document.createElement("div");
        taskDiv.classList.add("task");

        taskDiv.innerHTML = `
            <div class="task-info">
                <h2>${item.title}</h2>
                <p>${item.desc}</p>
            </div>
            <button onclick="deleteTask(${index})">
                <i class="ri-delete-bin-6-line"></i>
            </button>
        `;
        rightBox.appendChild(taskDiv);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Initialize
openFeatures();