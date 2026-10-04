## Task 1: Render Book List with Local Mock Data

- **Prompt:** Please read `AGENTS.md`, `PRD.md`, and `tasks.md`. Follow the rules strictly and let's implement Task 1 only. Guide me step by step and give me the summary for `prompts.md` and the Git commit at the end.
- **Agent did:** Created a minimal React/Vite app foundation (`package.json`, `index.html`, `src/main.jsx`), local mock book data (`src/data/books.json`), the `BookList` and `BookCard` components, and responsive styling in `src/App.css` with the app entry in `src/App.jsx`. No API calls or later-task features were added.
- **I checked:** Reviewed Task 1's requirements against the local data and card markup; `git diff --check` passed. `npm.cmd run build` could not complete because dependencies are not installed (`vite` was not recognized). The initial `npm run build` invocation was blocked by this machine's PowerShell script policy.
