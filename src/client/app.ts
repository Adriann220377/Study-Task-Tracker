type Task = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
};

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