import express from "express";
import { addTask, deleteTask, getTasks, toggleTask } from "./store";
import { isFilter } from "./types";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/tasks", (req, res) => {
  const filter = req.query.filter ?? "all";

  if (!isFilter(filter)) {
    res.status(400).json({ error: "Filter must be all, active or completed" });
    return;
  }

  res.json(getTasks(filter));
});

app.post("/api/tasks", (req, res) => {
  const title = req.body?.title;
  const notes = req.body?.notes ?? "";

  if (typeof title !== "string" || title.trim() === "") {
    res.status(400).json({ error: "Title is required" });
    return;
  }

  if (typeof notes !== "string" || notes.length > 500) {
    res.status(400).json({ error: "Notes must be text of 500 characters or fewer" });
    return;
  }

  const task = addTask(title.trim(), notes.trim());
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

app.delete("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const deleted = deleteTask(id);

  if (!deleted) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});