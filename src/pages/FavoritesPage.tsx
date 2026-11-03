import { Link } from 'react-router-dom';
import BookList from '../components/BookList';
import EmptyState from '../components/EmptyState';
import type { Book } from '../types/book';

interface FavoritesPageProps {
  books: Book[];
  favoriteIds: ReadonlySet<string>;
  onToggleFavorite: (book: Book) => void;
}

function FavoritesPage({ books, favoriteIds, onToggleFavorite }: FavoritesPageProps) {
  return (
    <main className="page-shell collection-page">
      <header className="page-header">
        <p className="eyebrow">Your saved shelf</p>
        <h1 className="page-title">Favorites</h1>
        <p className="page-intro">Books you have bookmarked for later.</p>
      </header>
      {books.length > 0 ? (
        <BookList
          books={books}
          favoriteIds={favoriteIds}
          onToggleFavorite={onToggleFavorite}
          size="small"
        />
      ) : (
        <EmptyState icon="heart" message="You have not saved any favorite books yet.">
          <Link className="button button--primary status-box__action" to="/">
            Browse books
          </Link>
        </EmptyState>
      )}
    </main>
  );
}

export default FavoritesPage;
