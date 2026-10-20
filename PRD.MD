# Product Requirements Document (PRD) – BookFinder

## 1. One-Sentence Pitch
A clean and responsive React web application that lets book lovers browse popular books from the Open Library API, filter them by title as they type, and inspect their details.

## 2. Who It Is For
Individuals and avid readers who want a fast, effortless way to look up books, explore titles as they type, and inspect publishing and genre details in one place.

## 3. Screens
The application uses React Router with dedicated pages:
* **Home (`/`):** A search bar at the top with a responsive grid of popular books loaded from Open Library. Typing filters this list by title.
* **Book Details (`/books/:id`):** A dedicated page with the selected book's larger cover, title, author, publication year, rating, genre tags, a favorite toggle, and a back link.
* **Favorites (`/favorites`):** A grid of bookmarked books, or an empty-state message when none are saved.
* **Mystery Book Roulette (`/random`):** Picks a surprise random book and links to its details page (Task 8).
* **404 Page (`*`):** A styled "Page Not Found" page with a link back to `/`.

## 4. Must-Have Features
1. **Live Title Filter:** An input field that filters the loaded books by title as the user types; the list is empty when nothing matches.
2. **Book Cards Grid:** Results showing each book's cover image, title, author, and publication year.
3. **Dedicated Details Page:** Clicking a card navigates to `/books/:id`, which shows the larger cover, author, year, rating, and genre/subject tags. The page also loads the book by id when opened directly or refreshed.
4. **Favorites:** Bookmark books from cards and the details page; saved in `localStorage` so they persist after reloads.
5. **Clear Feedback States:** Visible messages for loading, no results, an empty favorites list, a missing book, and invalid URLs.

## 5. Acceptance Criteria
* When I open the app, I see the search input with the placeholder "Search for a book..." and a grid of popular books.
* When I type letters into the search bar, I see only the loaded books whose titles contain those letters, each card showing a cover image, title, author, and publication year.
* When no loaded title matches, the list is empty and I see "No books match your search."
* When I click a book card, the URL changes to `/books/:id` and I see its larger cover, author name, and genre tags; the back link returns me to the list.
* When I refresh a details page, the same book is still shown.
* When I clear the search box completely, the default list of popular books returns.
* When I bookmark a book and reload the page, it still appears on `/favorites`.
* When I visit an invalid URL, I see a styled 404 page with a link back to `/`.

## 6. Not Now (Ideas for Later)
* Quick genre filter chips (e.g., "Fantasy", "Science Fiction", "History") above the search bar.
* A short description snippet on cards (not reliably available from the Search API).

## 7. Data
* **API Base URL:** `https://openlibrary.org/search.json?q={query}` (called once on load with a fixed popular-genres query)
* **Single Book Lookup:** `https://openlibrary.org/search.json?q=key:/works/{id}` (used when a details page is refreshed)
* **Book Cover CDN URL:** `https://covers.openlibrary.org/b/id/{cover_i}-M.jpg` (or `-L.jpg` for the details page)
* **API Fields Used:**
  * `key`: Work id used in the `/books/:id` URL
  * `title`: Book title
  * `author_name`: List of authors (first author displayed)
  * `first_publish_year`: First publication year
  * `cover_i`: Cover image identifier
  * `subject`: List of genre and subject tags
  * `ratings_average` / `ratings_count`: Rating shown on the details page