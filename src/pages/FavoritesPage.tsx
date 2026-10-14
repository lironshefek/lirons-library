import { Link } from 'react-router-dom';
import BookList from '../components/BookList';
import type { Book } from '../types/book';

interface FavoritesPageProps {
  books: Book[];
  favoriteIds: ReadonlySet<string>;
  onToggleFavorite: (book: Book) => void;
}

function FavoritesPage({ books, favoriteIds, onToggleFavorite }: FavoritesPageProps) {
  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">Your saved shelf</p>
        <h1>Favorites</h1>
        <p className="page-intro">Books you have bookmarked for later.</p>
      </header>
      {books.length > 0 ? (
        <BookList
          books={books}
          favoriteIds={favoriteIds}
          onToggleFavorite={onToggleFavorite}
        />
      ) : (
        <section className="favorites-empty">
          <p>You have not saved any favorite books yet.</p>
          <Link to="/">Browse books</Link>
        </section>
      )}
    </main>
  );
}

export default FavoritesPage;
