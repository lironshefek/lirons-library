# Product Requirements Document (PRD) – BookFinder

## 1. One-Sentence Pitch
A clean and responsive React web application that lets book lovers search and inspect book information in real time using the Open Library API.

## 2. Who It Is For
Individuals and avid readers who want a fast, effortless way to look up books, explore titles as they type, and inspect publishing and genre details in one place.

## 3. Screens
The application features a single-page Master-Detail layout split into two primary areas:
* **List View (Main Panel):** An active search bar at the top with a scrollable grid/list of book cards below. Each card presents high-level book details.
* **Details Panel (Sidebar):** A fixed side panel next to the book list that shows deeper information for the currently active book, or a placeholder state if no book is selected.

## 4. Must-Have Features
1. **Live Search Input:** An input field that triggers queries to Open Library and filters results as the user types.
2. **Book Cards Grid:** Results area showing each book's cover image, title, author, publication year, and a short snippet.
3. **Selected Card Highlight:** Clear visual indicator (outline border/shadow) highlighting the currently clicked book.
4. **Persistent Details Panel:** A dedicated side panel showing the selected book's larger cover, full title, author, publication year, description snippet, and genre/subject tags.
5. **Clear Feedback States:** Visible status messages for empty initial state, active loading, network errors, and when no results are found.

## 5. Acceptance Criteria
* When I open the app, I see an empty search input with the placeholder "Search for a book..." and a side panel displaying the message "Select a book from the list".
* When I type "harry potter" into the search bar, I see a list of book cards where each card displays a cover image, the title "Harry Potter...", author "J. K. Rowling", and publication year "1997".
* When I click on the first book card in the list, I see a prominent colored border appear around that card, and the side panel updates immediately to show its larger cover, author name, and genre tags such as "Fantasy" and "Wizards".
* When I clear the search box completely, I see the book list clear out and return to the initial state.

## 6. Not Now (Ideas for Later)
* "Favorites / Books I Liked" shelf to bookmark preferred books.
* Local storage persistence so saved favorites remain after page reload.
* Quick genre filter chips (e.g., "Fantasy", "Science Fiction", "History") above the search bar.

## 7. Data
* **API Base URL:** `https://openlibrary.org/search.json?q={searchQuery}`
* **Book Cover CDN URL:** `https://covers.openlibrary.org/b/id/{cover_i}-M.jpg` (or `-L.jpg` for the details panel)
* **API Fields Used:**
  * `title`: Book title
  * `author_name`: List of authors (first author displayed)
  * `first_publish_year`: First publication year
  * `cover_i`: Cover image identifier
  * `first_sentence` / `subtitle`: Short description snippet
  * `subject`: List of genre and subject tags