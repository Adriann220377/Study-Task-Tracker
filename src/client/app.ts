type Task = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
};

type Filter = "all" | "active" | "completed";

function isFilter(value: unknown): value is Filter {
  return value === "all" || value === "active" || value === "completed";
}

function getElement<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector<T>(selector);

  if (!element) {
    throw new Error(`Could not find element: ${selector}`);
  }

  return element;
}

const taskList = getElement<HTMLUListElement>("#task-list");
const taskForm = getElement<HTMLFormElement>("#task-form");
const taskInput = getElement<HTMLInputElement>("#task-input");
let currentFilter: Filter = "all";
const filterButtons = document.querySelectorAll<HTMLButtonElement>("#filters button");

async function loadTasks(filter: Filter): Promise<Task[]> {
  const response = await fetch(`/api/tasks?filter=${filter}`);
  return response.json();
}

async function toggleTaskRequest(id: number): Promise<void> {
  await fetch(`/api/tasks/${id}/toggle`, { method: "PATCH" });
}

async function deleteTaskRequest(id: number): Promise<void> {
  await fetch(`/api/tasks/${id}`, { method: "DELETE" });
}
async function addTaskRequest(title: string): Promise<void> {
  await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
}

async function refresh(): Promise<void> {
  const tasks = await loadTasks(currentFilter);
  renderTasks(tasks);
  renderFilters();
}

async function init(): Promise<void> {
  taskForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = taskInput.value.trim();
    if (title === "") {
      return;
    }

    await addTaskRequest(title);
    taskInput.value = "";
    await refresh();
  });
  filterButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const value = button.dataset.filter;

      if (!isFilter(value)) {
        return;
      }

      currentFilter = value;
      await refresh();
    });
  });
  renderFilters();
  await refresh();
}

const baseFilterClasses = "cursor-pointer rounded-full border px-4 py-1 text-sm font-medium transition";
const selectedFilterClasses = "border-blush-100 bg-blush-100 text-plum-950";
const unselectedFilterClasses = "border-plum-700 bg-plum-900 text-blush-300 hover:bg-plum-700";

function renderFilters(): void {
  filterButtons.forEach((button) => {
    const isSelected = button.dataset.filter === currentFilter;
    button.className = `${baseFilterClasses} ${isSelected ? selectedFilterClasses : unselectedFilterClasses}`;
  });
}

function renderTasks(tasks: Task[]): void {
  taskList.replaceChildren();
  if (tasks.length === 0) {
    const empty = document.createElement("li");
    empty.className = "py-6 text-center text-slate-500";
    empty.textContent = "No tasks here yet.";
    taskList.appendChild(empty);
    return;
  }

  for (const task of tasks) {
  const item = document.createElement("li");
  item.className = "flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm";

  const title = document.createElement("span");
  title.textContent = task.title;
    if (task.completed) {
    title.className = "text-slate-400 line-through";
    }
    
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.className = "h-4 w-4 cursor-pointer";
  checkbox.addEventListener("change", async () => {
    await toggleTaskRequest(task.id);
    await refresh();
  });
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "ml-auto cursor-pointer rounded-lg px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50";
  deleteButton.addEventListener("click", async () => {
    await deleteTaskRequest(task.id);
    await refresh();
  });

  item.append(checkbox, title, deleteButton);
  taskList.appendChild(item);
  }
}

init();

export {};