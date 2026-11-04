import type { Task } from "./types";

const tasks: Task[] = [];
let nextId = 1;

export function getTasks(): Task[] {
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