# Development Tasks – BookFinder

## Task 1: Render Book List with Local Mock Data (Completed)
Create a local JSON file containing 2–3 sample book objects (including title, author, year, mock cover image URL, description snippet, and genres). Build the `BookList` and `BookCard` components and render these sample items on the screen inside a responsive grid.
**Done when:** The page renders the sample book cards showing their cover, title, author, publication year, and description snippet without connecting to any external API.
**Note:** Since Task 4 the cards use live Open Library data and show the cover, title, author, and publication year. The description snippet was dropped because the Search API does not provide one reliably. `src/data/mockBooks.json` is kept for reference.

## Task 2: Implement Item Selection and Master-Detail Panel (Completed)
Create the `BookDetails` sidebar component and introduce selection state in `App`. When no book is selected, the sidebar displays the placeholder text "Select a book from the list". Clicking any card updates the state, highlights that card with an active border, and displays its full details and genre tags in the sidebar.
**Done when:** Clicking a sample book card visibly highlights it and displays its expanded information and genres in the side panel.
**Note:** In Task 5 the sidebar was replaced by the dedicated `/books/:id` details page.

## Task 3: Build Search Input Component and Controlled State (Completed)
Create the `SearchBar` component with an input field and the placeholder "Search for a book...". Wire it up to React state so the input text updates as the user types, and render it at the top of the main view above the book list.
**Done when:** I can type text into the search bar, see the typed characters in real time, and verify the value is tracked in state.

## Task 4: Connect Live Search to Open Library API (Completed)
Create an API helper module that fetches a list of popular books from the Open Library Search endpoint and replace the local mock data source with it. Typing in `SearchBar` filters only these loaded books by title (no new API request while typing); if no title matches, the list is empty. When the input is empty, the full list of popular books is shown.
**Done when:** The home page shows live books from the Open Library API, typing letters shows only the loaded books whose titles contain them (or an empty list with "No books match your search."), and clearing the input restores the full list.

## Task 5: TypeScript Migration, React Router & Dedicated Details Page (Completed)
Migrate the project from JavaScript to TypeScript: configure tsconfig.json, convert all .jsx/.js files to .tsx/.ts, and define strict types in `src/types/book.ts` without any `any`. Install `react-router-dom` and replace the inline details sidebar with dedicated routing (`/` for book list and `/books/:id` for details reading the id via `useParams`). If the book is not already loaded (for example after a page refresh), the details page fetches it from Open Library by its id.
**Done when:** All source files use TypeScript, `npm run build` passes with zero errors, and clicking a book navigates to its dedicated `/books/:id` URL with a working back button, and refreshing a details page still shows the book.

## Task 6: Unit Testing with Vitest and Vitest UI (Completed)
Install and configure Vitest and `@vitest/ui`. Extract book filtering, publish year formatting, and cover URL fallback logic into pure utility functions in `src/utils/bookHelpers.ts` with explicit TypeScript types. Write unit tests covering these helpers and configure scripts `test` and `test:ui`.
**Done when:** Running `npm test` passes all tests in the terminal, and `npm run test:ui` launches the Vitest browser interface with all tests passing.

## Task 7: Build Favorites Page with LocalStorage (Bonus) & 404 Route (Completed)
Implement a Favorites page at route `/favorites`. Allow users to bookmark books from cards and detail views, persisting the list in browser `localStorage`. Display saved books in a grid with an empty state message if none are saved. Add a customized 404 "Page Not Found" route for any invalid path.
**Done when:** Bookmarked books persist across browser reloads, `/favorites` renders all saved items, and invalid URLs display a styled 404 page with a link back to `/`.

## Task 8: Build Mystery Book Roulette Page, Custom Color Palette & Responsive CSS
Implement an interactive book roulette page at route `/random` that picks a surprise random book from the home page's book list (the books shown when the search is empty), displaying its cover and full details directly on the page. The cover switches together with the text while the roulette spins. Introduce a custom CSS color palette using CSS variables for a cohesive theme, and refine responsive styling across mobile and desktop.
**Done when:** The `/random` roulette works smoothly, the custom color palette and responsive design are applied across the entire app, at least 5 unit tests pass, and `npm run build` succeeds cleanly.
**Progress:**
- [x] `/random` roulette page with Spin button, back link, nav link, cover switching while spinning, and `pickRandomBook` tests (checked by the student)
- [ ] Custom CSS color palette with variables (waiting for the student to choose colors)
- [ ] Responsive styling refinements across mobile and desktop
