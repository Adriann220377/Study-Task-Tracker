import type { Task } from "./types";

const tasks: Task[] = [];

export function getTasks(): Task[] {
  return tasks;
}