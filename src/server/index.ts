import express from "express";
import { addTask, getTasks, toggleTask } from "./store";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/tasks", (_req, res) => {
  res.json(getTasks());
});

app.post("/api/tasks", (req, res) => {
  const title = req.body?.title;

  if (typeof title !== "string" || title.trim() === "") {
    res.status(400).json({ error: "Title is required" });
    return;
  }

  const task = addTask(title.trim());
  res.status(201).json(task);
});

app.patch("/api/tasks/:id/toggle", (req, res) => {
  const id = Number(req.params.id);
  const task = toggleTask(id);

  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  res.json(task);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});