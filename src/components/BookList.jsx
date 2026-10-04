import BookCard from './BookCard.jsx';

function BookList({ books }) {
  return (
    <section className="book-grid" aria-label="Sample books">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </section>
  );
}

export default BookList;
