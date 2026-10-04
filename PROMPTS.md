## Task 1: Render Book List with Local Mock Data

- **Prompt:** Please read `AGENTS.md`, `PRD.md`, and `tasks.md`. Follow the rules strictly and let's implement Task 1 only. Guide me step by step and give me the summary for `prompts.md` and the Git commit at the end.
- **Agent did:** Created a minimal React/Vite app foundation (`package.json`, `index.html`, `src/main.jsx`), local mock book data (`src/data/books.json`), the `BookList` and `BookCard` components, and responsive styling in `src/App.css` with the app entry in `src/App.jsx`. No API calls or later-task features were added.
- **I checked:** Reviewed Task 1's requirements against the local data and card markup; `git diff --check` passed. `npm.cmd run build` could not complete because dependencies are not installed (`vite` was not recognized). The initial `npm run build` invocation was blocked by this machine's PowerShell script policy.

### Prompt 2 — Item Selection and Master-Detail Panel

- **Prompt:** Please read AGENTS.md, PRD.md, and tasks.md.

I need to adjust the UI structure to strictly match our Master-Detail requirements:
1. In `BookCard.jsx`: Keep the card minimal. Display ONLY the book cover image and the book title. Remove author, publish year, and description from the card view.
2. In `BookDetails.jsx`: This sidebar component must show the complete information of the selected book (larger cover image, full title, author, publish year, description snippet, and genre tags).
3. If no book is clicked/selected yet, the sidebar must display the placeholder text: "Select a book from the list".
4. When a user clicks any book card, that card must receive an active highlight/border, and the sidebar must immediately display that book's details.
5. Log this prompt and execution directly into `prompts.md` per the updated AGENTS.md rules.
6. Run the terminal git command to stage and commit these changes with a clear commit message.

- **Agent did:** Added `src/components/BookDetails.jsx`; added selected-book state and master-detail composition in `src/App.jsx`; made `BookCard` show only its cover and title and respond to clicks; passed selection state through `BookList`; added sidebar, genre tag, active card, focus, and responsive layout styles in `src/App.css`.
- **I checked:** `npm.cmd run build` succeeded and `git diff --check` passed. A headless browser rendered the initial placeholder and all three cover/title cards. Reviewed the state and prop flow that applies the selected border and fills the details panel when a card is clicked.

### Prompt 3 — Make the Task 2 Details Panel Visible

- **Prompt:** Please check the current UI layout against Task 2 requirements.
Currently, cards have an active border when clicked, but the details side panel is missing from the layout.

Please implement the following:
1. In `src/components/BookDetails.jsx`: Render the full details of the selected book (larger cover, title, author, publish year, snippet/description, and genres).
2. If no book is selected, show the empty state message: "Select a book from the list".
3. Update `src/App.jsx` and `src/App.css` to use a Master-Detail layout (books list on one side, details panel on the other).
4. Run the git command to commit the changes as Task 2 completion.
5. Add the log entry into `prompts.md`.

- **Agent did:** Confirmed `App.jsx` already passes selected-book state to `BookDetails.jsx`, which renders the cover, full metadata, genres, and empty-state message. Updated `src/App.css` to place the list and details sidebar in explicit named grid areas, keep them side by side at wider sizes, and stack them on narrow screens.
- **I checked:** `npm.cmd run build` succeeded; `git diff --check` passed. A headless browser rendered the empty-state sidebar alongside all three book cards at a desktop viewport.
