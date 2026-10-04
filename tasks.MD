# Development Tasks – BookFinder

## Task 1: Render Book List with Local Mock Data
Create a local JSON file containing 2–3 sample book objects (including title, author, year, mock cover image URL, description snippet, and genres). Build the `BookList` and `BookCard` components and render these sample items on the screen inside a responsive grid.
**Done when:** The page renders the sample book cards showing their cover, title, author, publication year, and description snippet without connecting to any external API.

## Task 2: Implement Item Selection and Master-Detail Panel
Create the `BookDetails` sidebar component and introduce selection state in `App`. When no book is selected, the sidebar displays the placeholder text "Select a book from the list". Clicking any card updates the state, highlights that card with an active border, and displays its full details and genre tags in the sidebar.
**Done when:** Clicking a sample book card visibly highlights it and displays its expanded information and genres in the side panel.

## Task 3: Build Search Input Component and Controlled State
Create the `SearchBar` component with an input field and the placeholder "Search for a book...". Wire it up to React state so the input text updates as the user types, and render it at the top of the main view above the book list.
**Done when:** I can type text into the search bar, see the typed characters in real time, and verify the value is tracked in state.

## Task 4: Connect Live Search to Open Library API
Create an API helper module to fetch book data from the Open Library Search endpoint using the query string typed into `SearchBar`. Replace the local mock data source with this live API call, and clear results when the input is empty.
**Done when:** Typing "harry potter" queries the Open Library API and populates the list with live book search results.

## Task 5: Handle Image Fallbacks and Dynamic Cover URLs
Construct valid Open Library cover URLs using the returned `cover_i` field (`-M.jpg` for cards, `-L.jpg` for details). Add a graceful fallback placeholder image for any book returned without a cover identifier.
**Done when:** Books with valid cover IDs display real book covers, and books missing covers display a clean placeholder image without broken image icons.

## Task 6: Add Loading, Error, and Empty Feedback States
Introduce `loading` and `error` states for the API fetch flow. Render a loading indicator while the network request is pending, an error notice if the network fails, and a "No books found" message when a query returns zero matches.
**Done when:** Searching shows a visible loading state during the request, an error message if offline, and an empty state message if no books match the search term.

## Task 7: Layout Polish and Responsive Styling
Refine the CSS layout to enforce the two-column Master-Detail structure (search bar and card grid on the main side, fixed sticky panel on the sidebar). Add clean card shadows, hover effects, and ensure proper spacing across different screen widths.
**Done when:** The application looks cohesive with a clear two-panel layout, distinct active card styling, and neatly aligned genre tags.