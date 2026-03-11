const writeNewTaskInput = document.querySelector(".input");
const addNewTaskBtn = document.querySelector(".add");
const listOfTasks = document.querySelector(".tasks");
const counter = document.querySelector(".counter");
const deleteAllTasksBtn = document.querySelector(".deleteAll");
const searchInput = document.querySelector(".search");

let arrayToFilter = [];

function saveToStorage() {
  localStorage.setItem("tasks", JSON.stringify(arrayToFilter));
}

function loadFromStorage() {
  const data = localStorage.getItem("tasks");

  if (data) {
    arrayToFilter = JSON.parse(data);

    arrayToFilter.forEach((text) => {
      listOfTasks.insertAdjacentHTML(
        "beforeend",
        `
        <li class="task">
          <input class="checkb" type="checkbox" />
          <div class="text">${text}</div>
          <button class="deleteTask">DELETE</button>
        </li>
      `,
      );
    });
  }

  counter.textContent = `Total Tasks: ${listOfTasks.children.length}`;
}

loadFromStorage();

function addTask() {
  const text = writeNewTaskInput.value.trim();

  if (text === "" || arrayToFilter.includes(text)) return;

  listOfTasks.insertAdjacentHTML(
    "beforeend",
    `
    <li class="task">
      <input class="checkb" type="checkbox" />
      <p class="text">${text}</p>
      <button class="deleteTask">DELETE</button>
    </li>
  `,
  );

  arrayToFilter.push(text);
  saveToStorage();

  writeNewTaskInput.value = "";
  writeNewTaskInput.focus();

  counter.textContent = `Total Tasks: ${listOfTasks.children.length}`;
}

addNewTaskBtn.addEventListener("click", addTask);

writeNewTaskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

listOfTasks.addEventListener("click", (event) => {
  const task = event.target.closest(".task");
  if (!task) return;

  if (event.target.classList.contains("deleteTask")) {
    const removedText = task.querySelector(".text").textContent;
    const index = arrayToFilter.indexOf(removedText);

    if (index !== -1) {
      arrayToFilter.splice(index, 1);
    }

    task.remove();
    saveToStorage();

    counter.textContent = `Total Tasks: ${listOfTasks.children.length}`;
  }

  if (event.target.classList.contains("checkb")) {
    const textElement = task.querySelector(".text");

    if (event.target.checked) {
      textElement.classList.add("line");
    } else {
      textElement.classList.remove("line");
    }
  }
});

deleteAllTasksBtn.addEventListener("click", () => {
  listOfTasks.innerHTML = "";
  arrayToFilter = [];

  localStorage.removeItem("tasks");

  counter.textContent = `Total Tasks: 0`;
});

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  const tasks = document.querySelectorAll(".task");

  tasks.forEach((task) => {
    const text = task.querySelector(".text").textContent.toLowerCase();

    if (text.includes(value)) {
      task.classList.remove("none");
    } else {
      task.classList.add("none");
    }
  });
});
