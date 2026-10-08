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

### Prompt 5 — Explain Book Selection Architecture in README

- **Prompt:** Please inspect our code architecture and append a short section at the end of README.md titled "## בחירת ספר והצגת פרטים .

In this section, write exactly 5 concise sentences in Hebrew explaining:
1. In which component the selected book item/state is stored and managed.
2. How the selection event flows from the clicked card back up to the parent component.
3. How the selected book data is passed down to the details panel component.

Make sure the Hebrew explanation is natural, clear, and serves as prep notes for a student video walkthrough.
Log this interaction in prompts.md and commit the changes via terminal when done.
- **Agent did:** Created `README.md` with the requested Hebrew section describing selected-book state in `App`, the selection callback through `BookCard` and `BookList`, and the selected book prop passed to `BookDetails`. Added this request to `PROMPTS.md`.
- **I checked:** Inspected the current `App`, `BookCard`, `BookList`, and `BookDetails` implementations to confirm the described state and prop flow; checked that the new README section contains exactly five Hebrew sentences.

### Prompt 6 — Diagnose Push Internal Server Error

- **Prompt:** solve the internal server error when i push the commits to the rempote repo
- **Agent did:** Inspected the failed push response and outgoing commits; retried over HTTPS, tried HTTP/1.1, and pushed the first commit individually to isolate the failure. No repository or commit content was changed.
- **I checked:** Each attempt was rejected by GitHub with `remote: Internal Server Error` after object resolution. `origin/main` remains at `297db235`, and local `main` is two commits ahead. GitHub Status reported Git operations operational; SSH could not be tested because the host key is not verified on this machine.

### Prompt 7 — Build Task 3 Search Input

- **Prompt:** Please implement Task 3 strictly according to PRD.md, tasks.md, and AGENTS.md:

1. Replace the static import of `mockBooks.json` in `src/App.jsx` with dynamic data fetching using `useEffect` and `fetch`.
2. Fetch book data from the free public Open Library API targeting psychological thrillers:
   `https://openlibrary.org/search.json?subject=psychological_thriller&limit=30`
3. Map/normalize the API response items to match our existing book object format:
   - id: `doc.key`
   - title: `doc.title`
   - author: `doc.author_name ? doc.author_name[0] : "Unknown Author"`
   - year: `doc.first_publish_year || "N/A"`
   - coverUrl: Use Open Library covers service: `doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : "https://via.placeholder.com/150x220?text=No+Cover"`
   - description / snippet: `doc.first_sentence ? (Array.isArray(doc.first_sentence) ? doc.first_sentence[0] : doc.first_sentence) : "A gripping psychological thriller exploring deception, suspense, and dark human secrets."`
   - genres: `doc.subject ? doc.subject.slice(0, 3) : ["Psychological Thriller", "Suspense", "Mystery"]`
4. Implement and display the three required UI states:
   - Loading: show a clean loading indicator while fetching ("Loading books...").
   - Error: display a helpful error message if the fetch fails.
   - Data ready: render the Master-Detail layout with the fetched books.
5. Ensure the list of ~30 books is scrollable/viewable without breaking the layout, and that selecting any book updates BookDetails immediately.
6. Append this interaction to PROMPTS.md following our project template.
7. Execute git commit via terminal: `git commit -m "feat: Task 3 - fetch 30 psychological thrillers from Open Library API with loading and error states"`.

- **Agent did:** Added `src/components/SearchBar.jsx` with a controlled search input and wired its value to React state in `src/App.jsx`; placed it above the book list and styled it in `src/App.css`. Kept the mock data and selection behavior unchanged because `tasks.md` defines Task 3 as the search input, while API fetching is Task 4 and loading/error states are Task 6.
- **I checked:** `npm.cmd run build` succeeded. Inspected the input `value`/`onChange` wiring and the app state passed to `SearchBar`; no test suite was run.

### Prompt 8 — Add Real-Time Search Filtering

- **Prompt:** Please fix the search input behavior in `src/App.jsx` (and child components if applicable) to implement real-time dynamic filtering:

1. When the search box is empty (`""`), display ALL fetched books in the list.
2. As the user types, immediately filter the visible books in real time.
3. The search must be case-insensitive (`toLowerCase()`).
4. Match against either the book `title` OR `author` (e.g., `book.title.toLowerCase().includes(term) || book.author.toLowerCase().includes(term)`).
5. If no books match the query, display a friendly message in the list: "No books match your search."

Selection & State Integrity:
- Keep the original fetched books array intact (do not mutate the original state on search).
- Use a derived list: `filteredBooks = books.filter(...)`.
- Pass `filteredBooks` down to `BookList`.
- Ensure clicking on any book in the filtered list still correctly selects it and displays its full info in `BookDetails`.

Process & Documentation:
- Append this interaction to `PROMPTS.md` with prompt text, agent actions, and a placeholder for student testing.
- Stage and commit the changes via terminal: `git commit -m "feat: implement real-time case-insensitive search filtering for book list"`.

- **Agent did:** Added a case-insensitive title/author filter as derived `filteredBooks` in `src/App.jsx`, passed that array to `BookList`, and added the no-match message and styling in `BookList.jsx` and `App.css`. The original books data and selection state remain unchanged.
- **I checked:** `npm.cmd run build` succeeded; reviewed the empty-query, title, author, no-match, and selected-book prop paths. Student browser testing: [ ] Type a title/author, clear the input, and try a term with no matches.
