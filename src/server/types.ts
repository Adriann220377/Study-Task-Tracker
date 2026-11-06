export type Task = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
};

export type Filter = "all" | "active" | "completed";

export function isFilter(value: unknown): value is Filter {
  return value === "all" || value === "active" || value === "completed";
}