import BookList from '../components/BookList';
import ErrorMessage from '../components/ErrorMessage';
import HeroSection from '../components/HeroSection';
import SearchBar from '../components/SearchBar';
import type { Book } from '../types/book';
import { filterBooksByTitle } from '../utils/bookHelpers';

interface HomePageProps {
  books: Book[];
  loading: boolean;
  loadError: boolean;
  onRetry: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  favoriteIds: ReadonlySet<string>;
  onToggleFavorite: (book: Book) => void;
}

function HomePage({
  books,
  loading,
  loadError,
  onRetry,
  searchQuery,
  onSearchChange,
  favoriteIds,
  onToggleFavorite,
}: HomePageProps) {
  // Search only filters the books already shown on the home page by title.
  const searchTerm = searchQuery.trim();
  const filteredBooks = filterBooksByTitle(books, searchQuery);

  // Text shown when the list is empty, depending on why it is empty.
  let emptyMessage = 'No books were found.';
  if (loading) {
    emptyMessage = 'Loading books...';
  } else if (searchTerm) {
    emptyMessage = 'No books match your search.';
  }

  return (
    <main className="page-shell home-page">
      <HeroSection />
      <section className="book-browser" aria-label="Books">
        <SearchBar value={searchQuery} onChange={onSearchChange} />
        {loadError ? (
          <ErrorMessage
            title="Could not load the books"
            message="There was a problem connecting to Open Library. Please check your internet connection and try again."
            onRetry={onRetry}
          />
        ) : (
          <BookList
            books={filteredBooks}
            emptyMessage={emptyMessage}
            favoriteIds={favoriteIds}
            onToggleFavorite={onToggleFavorite}
          />
        )}
      </section>
    </main>
  );
}

export default HomePage;
