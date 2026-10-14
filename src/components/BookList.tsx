import BookCard from './BookCard';
import type { Book } from '../types/book';

interface BookListProps {
  books: Book[];
  emptyMessage?: string | null;
}

function BookList({ books, emptyMessage }: BookListProps) {
  return (
    <section className="book-grid" aria-label="Books">
      {books.length === 0 ? (
        emptyMessage && <p className="book-list__empty">{emptyMessage}</p>
      ) : (
        books.map((book) => <BookCard key={book.id} book={book} />)
      )}
    </section>
  );
}

export default BookList;
