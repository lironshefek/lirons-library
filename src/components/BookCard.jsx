function BookCard({ book }) {
  return (
    <article className="book-card">
      <img className="book-card__cover" src={book.coverUrl} alt={`Cover of ${book.title}`} />
      <div className="book-card__content">
        <p className="book-card__year">{book.year}</p>
        <h2 className="book-card__title">{book.title}</h2>
        <p className="book-card__author">{book.author}</p>
        <p className="book-card__description">{book.description}</p>
      </div>
    </article>
  );
}

export default BookCard;
