type Task = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
};

function getElement<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector<T>(selector);

  if (!element) {
    throw new Error(`Could not find element: ${selector}`);
  }

  return element;
}

const taskList = getElement<HTMLUListElement>("#task-list");

async function loadTasks(): Promise<Task[]> {
  const response = await fetch("/api/tasks");
  return response.json();
}

async function toggleTaskRequest(id: number): Promise<void> {
  await fetch(`/api/tasks/${id}/toggle`, { method: "PATCH" });
}

async function deleteTaskRequest(id: number): Promise<void> {
  await fetch(`/api/tasks/${id}`, { method: "DELETE" });
}

async function refresh(): Promise<void> {
  const tasks = await loadTasks();
  renderTasks(tasks);
}

async function init(): Promise<void> {
  await refresh();
}


function renderTasks(tasks: Task[]): void {
  taskList.replaceChildren();

  for (const task of tasks) {
  const item = document.createElement("li");
  item.className = "flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm";

  const title = document.createElement("span");
  title.textContent = task.title;

  item.appendChild(title);
  taskList.appendChild(item);
  }
}

init();

export {};