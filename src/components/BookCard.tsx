import { Link } from 'react-router-dom';
import type { Book } from '../types/book';

interface BookCardProps {
  book: Book;
}

function BookCard({ book }: BookCardProps) {
  const routeId = encodeURIComponent(book.id);

  return (
    <Link className="book-card" to={`/books/${routeId}`}>
      <img className="book-card__cover" src={book.coverUrl} alt={`Cover of ${book.title}`} />
      <span className="book-card__title">{book.title}</span>
    </Link>
  );
}

export default BookCard;
