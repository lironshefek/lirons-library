import BookGridSkeleton from '../components/BookGridSkeleton';
import BookList from '../components/BookList';
import EmptyState from '../components/EmptyState';
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
  const filteredBooks = filterBooksByTitle(books, searchQuery);

  // Pick what to show under the search bar: error, loading, empty shelf, or the books.
  let content;
  if (loadError) {
    content = (
      <ErrorMessage
        title="The books didn’t load"
        message="We couldn’t reach Open Library just now. Check your connection and try again."
        onRetry={onRetry}
      />
    );
  } else if (loading) {
    content = <BookGridSkeleton />;
  } else if (books.length === 0) {
    content = (
      <EmptyState
        title="The shelf is empty for now"
        message="No psychological thrillers came back this time. Check back a little later."
      />
    );
  } else {
    content = (
      <BookList
        books={filteredBooks}
        emptyMessage="No books match your search."
        favoriteIds={favoriteIds}
        onToggleFavorite={onToggleFavorite}
      />
    );
  }

  return (
    <main className="page-shell home-page">
      <HeroSection />
      <section className="book-browser" aria-label="Books">
        <SearchBar value={searchQuery} onChange={onSearchChange} />
        {content}
      </section>
    </main>
  );
}

export default HomePage;
