// Встановлення заголовка
document.querySelector(".text").innerText += `To Do List`;

// Завантаження завдань із LocalStorage
window.onload = function () {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => addTaskToDOM(task.text, task.completed));
};

// Додавання завдання до DOM
function addTaskToDOM(taskText, isCompleted = false) {
  const taskHTML = `
        <div class="task ${isCompleted ? "completed" : ""}">
            <span id="taskname">${taskText}</span>
            <button class="delete">
                <svg class="ico__delete" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
            </button>
        </div>
    `;
  document.querySelector("#tasks").innerHTML += taskHTML;

  updateEventListeners();
  saveTasksToLocalStorage();
}

// Оновлення завдань у LocalStorage
function saveTasksToLocalStorage() {
  const tasks = [];
  document.querySelectorAll(".task").forEach((task) => {
    tasks.push({
      text: task.querySelector("#taskname").innerText,
      completed: task.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Додавання обробників подій
function updateEventListeners() {
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.onclick = function () {
      this.parentNode.remove();
      saveTasksToLocalStorage();
    };
  });

  const tasks = document.querySelectorAll(".task");
  tasks.forEach((task) => {
    task.onclick = function () {
      this.classList.toggle("completed");
      saveTasksToLocalStorage();
    };
  });
}

// Обробка натискання кнопки "Add"
document.querySelector("#push").onclick = function () {
  const taskInput = document.querySelector("#newtask input");
  const taskText = taskInput.value.trim();

  if (taskText.length === 0) {
    alert("Please Enter a Task");
  } else {
    addTaskToDOM(taskText);
    taskInput.value = "";
  }
};
