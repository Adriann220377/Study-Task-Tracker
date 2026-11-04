import express from "express";
import { getTasks } from "./store";

const app = express();
const PORT = 3000;

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/tasks", (_req, res) => {
  res.json(getTasks());
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});