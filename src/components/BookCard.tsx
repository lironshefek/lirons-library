import { Link } from 'react-router-dom';
import type { Book } from '../types/book';

interface BookCardProps {
  book: Book;
  isFavorite: boolean;
  onToggleFavorite: (book: Book) => void;
}

function BookCard({ book, isFavorite, onToggleFavorite }: BookCardProps) {
  const routeId = encodeURIComponent(book.id);

  return (
    <article className="book-card">
      <Link className="book-card__link" to={`/books/${routeId}`}>
        <img className="book-card__cover" src={book.coverUrl} alt={`Cover of ${book.title}`} />
        <span className="book-card__title">{book.title}</span>
      </Link>
      <button
        className="favorite-toggle"
        type="button"
        aria-label={isFavorite ? `Remove ${book.title} from favorites` : `Add ${book.title} to favorites`}
        aria-pressed={isFavorite}
        onClick={() => onToggleFavorite(book)}
      >
        {isFavorite ? '♥' : '♡'}
      </button>
    </article>
  );
}

export default BookCard;
