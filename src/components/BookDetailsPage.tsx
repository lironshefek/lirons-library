import { Link, useParams } from 'react-router-dom';
import BookDetails from './BookDetails';
import type { Book } from '../types/book';

interface BookDetailsPageProps {
  books: Book[];
  loading: boolean;
  favoriteIds: ReadonlySet<string>;
  onToggleFavorite: (book: Book) => void;
}

function BookDetailsPage({ books, loading, favoriteIds, onToggleFavorite }: BookDetailsPageProps) {
  const { id } = useParams<{ id: string }>();
  const book = books.find((item) => item.id === id);

  return (
    <main className="page-shell book-details-page">
      <Link className="book-details-page__back" to="/">
        ← Back to books
      </Link>
      {loading ? (
        <p className="book-details-page__message">Loading book details...</p>
      ) : book ? (
        <div className="book-details-page__content">
          <button
            className="favorite-toggle favorite-toggle--details"
            type="button"
            aria-label={favoriteIds.has(book.id) ? `Remove ${book.title} from favorites` : `Add ${book.title} to favorites`}
            aria-pressed={favoriteIds.has(book.id)}
            onClick={() => onToggleFavorite(book)}
          >
            {favoriteIds.has(book.id) ? '♥ Remove from favorites' : '♡ Add to favorites'}
          </button>
          <BookDetails book={book} />
        </div>
      ) : (
        <p className="book-details-page__message">Book not found.</p>
      )}
    </main>
  );
}

export default BookDetailsPage;
