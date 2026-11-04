export type Task = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
};

export type Filter = "all" | "active" | "completed";