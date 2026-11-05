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

async function init(): Promise<void> {
  const tasks = await loadTasks();
  console.log(tasks);
}

init();

export {};