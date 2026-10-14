# Development Tasks – BookFinder

## Task 1: Render Book List with Local Mock Data (Completed)
Create a local JSON file containing 2–3 sample book objects (including title, author, year, mock cover image URL, description snippet, and genres). Build the `BookList` and `BookCard` components and render these sample items on the screen inside a responsive grid.
**Done when:** The page renders the sample book cards showing their cover, title, author, publication year, and description snippet without connecting to any external API.

## Task 2: Implement Item Selection and Master-Detail Panel (Completed)
Create the `BookDetails` sidebar component and introduce selection state in `App`. When no book is selected, the sidebar displays the placeholder text "Select a book from the list". Clicking any card updates the state, highlights that card with an active border, and displays its full details and genre tags in the sidebar.
**Done when:** Clicking a sample book card visibly highlights it and displays its expanded information and genres in the side panel.

## Task 3: Build Search Input Component and Controlled State (Completed)
Create the `SearchBar` component with an input field and the placeholder "Search for a book...". Wire it up to React state so the input text updates as the user types, and render it at the top of the main view above the book list.
**Done when:** I can type text into the search bar, see the typed characters in real time, and verify the value is tracked in state.

## Task 4: Connect Live Search to Open Library API (Completed)
Create an API helper module to fetch book data from the Open Library Search endpoint using the query string typed into `SearchBar`. Replace the local mock data source with this live API call, and clear results when the input is empty.
**Done when:** Typing "harry potter" queries the Open Library API and populates the list with live book search results.

## Task 5: TypeScript Migration, React Router & Dedicated Details Page
Migrate the project from JavaScript to TypeScript: configure tsconfig.json, convert all .jsx/.js files to .tsx/.ts, and define strict types in `src/types/book.ts` without any `any`. Install `react-router-dom` and replace the inline details sidebar with dedicated routing (`/` for book list and `/books/:id` for details reading the id via `useParams`).
**Done when:** All source files use TypeScript, `npm run build` passes with zero errors, and clicking a book navigates to its dedicated `/books/:id` URL with a working back button.

## Task 6: Unit Testing with Vitest and Vitest UI
Install Vitest, `@vitest/ui`, and testing utilities. Extract book filtering, publish year formatting, and cover URL generation logic into pure functions in `src/utils/bookHelpers.ts` with explicit types. Write unit tests covering these functions and configure scripts `test` and `test:ui`.
**Done when:** Running `npm test` runs in the terminal and passes all tests green, and `npm run test:ui` launches the Vitest browser interface without errors.

## Task 7: Build Favorites Page with LocalStorage (Extra Page 1)
Implement a Favorites page at route `/favorites`. Allow users to toggle books as favorites from cards and detail views, persisting the list in browser `localStorage`. Display saved books in a grid or an empty state message if none are saved, with a link to navigate back to search.
**Done when:** Favoriting books persists across page reloads, and the `/favorites` page displays all saved items with full navigation back to details.

## Task 8: Build Reading Statistics Dashboard Page & Responsive Polish (Extra Page 2)
Implement a dynamic statistics page at route `/stats` calculating metrics from current results and saved favorites (total books, earliest/latest publication year, and top authors). Create a reusable `StatCard` component, write 1–2 unit tests for the calculation logic, and refine responsive CSS across mobile and desktop.
**Done when:** Navigating to `/stats` displays calculated summary cards, at least 5 unit tests pass across the entire suite, and `npm run build` succeeds cleanly.
