import { Link, useParams } from 'react-router-dom';
import BookDetails from './BookDetails';
import type { Book } from '../types/book';

interface BookDetailsPageProps {
  books: Book[];
  loading: boolean;
}

function BookDetailsPage({ books, loading }: BookDetailsPageProps) {
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
          <BookDetails book={book} />
        </div>
      ) : (
        <p className="book-details-page__message">Book not found.</p>
      )}
    </main>
  );
}

export default BookDetailsPage;
