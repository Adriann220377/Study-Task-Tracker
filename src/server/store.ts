import type { Filter, Task } from "./types";

const tasks: Task[] = [];
let nextId = 1;

export function getTasks(filter: Filter = "all"): Task[] {
  if (filter === "active") {
    return tasks.filter((t) => !t.completed);
  }

  if (filter === "completed") {
    return tasks.filter((t) => t.completed);
  }

  return tasks;
}

export function addTask(title: string): Task {
  const task: Task = {
    id: nextId,
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  nextId++;
  tasks.push(task);
  return task;
}

export function toggleTask(id: number): Task | undefined {
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return undefined;
  }

  task.completed = !task.completed;
  return task;
}

export function deleteTask(id: number): boolean {
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return false;
  }

  tasks.splice(index, 1);
  return true;
}