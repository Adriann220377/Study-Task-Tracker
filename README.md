# Study Task Tracker

A small app for tracking study tasks. Add tasks, tick them off, delete them, and filter by status. I built it to learn Node.js, TypeScript and Tailwind CSS.

## Features

- Add, complete and delete tasks
- Filter by All, Active or Completed
- Express backend with a small JSON API
- Page styled with Tailwind and written in plain TypeScript (no framework)

## Tech stack

- **Node.js + Express** for the backend
- **TypeScript** for both the server and the browser code
- **Tailwind CSS** for styling

## Getting started

You need Node.js 20 or newer.

```bash
git clone https://github.com/YOUR-USERNAME/study-task-tracker.git
cd study-task-tracker
npm install
npm run dev:all
```

Then open http://localhost:3000.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev:all` | Runs the server, the CSS watcher and the client watcher together |
| `npm run build:all` | Builds the server, the CSS and the client code |
| `npm start` | Runs the compiled server (run `build:all` first) |
| `npm run dev` | Server only, restarts on changes |
| `npm run dev:css` | Rebuilds Tailwind CSS on changes |
| `npm run dev:client` | Recompiles the browser TypeScript on changes |

## Project structure

```
public/        index.html (styles.css and app.js are generated here)
src/client/    app.ts and input.css (browser code)
src/server/    index.ts, store.ts and types.ts (backend)
```

## API

| Method | Path | What it does |
| --- | --- | --- |
| GET | `/api/tasks` | Lists tasks. Add `?filter=` with `all`, `active` or `completed` |
| POST | `/api/tasks` | Creates a task from a JSON body like `{ "title": "..." }` |
| PATCH | `/api/tasks/:id/toggle` | Flips a task between done and not done |
| DELETE | `/api/tasks/:id` | Deletes a task |
| GET | `/api/health` | Returns `{ "status": "ok" }` |

## Notes

Tasks are stored in memory, so they disappear when the server restarts.