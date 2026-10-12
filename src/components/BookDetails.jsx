import React from 'react';

function BookDetails({ book }) {
  if (!book) {
    return (
      <aside className="book-details" aria-label="Book details">
        <p className="book-details__placeholder">Select a book from the list</p>
      </aside>
    );
  }

  const hasRating = typeof book.rating === 'number'
    && typeof book.ratingsCount === 'number';

  return (
    <aside className="book-details" aria-label={`Details for ${book.title}`}>
      <img
        className="book-details__cover"
        src={book.coverUrl}
        alt={`Cover of ${book.title}`}
      />
      <h2 className="book-details__title">{book.title}</h2>
      <p className="book-details__author">{book.author}</p>
      <p className="book-details__year">First published {book.year}</p>
      <p className="book-details__rating">
        {hasRating
          ? `${book.rating.toFixed(1)} / 5 · ${book.ratingsCount.toLocaleString()} ratings`
          : 'No rating available'}
      </p>
      <ul className="book-details__genres" aria-label="Genres">
        {book.genres.map((genre) => (
          <li className="book-details__genre" key={genre}>{genre}</li>
        ))}
      </ul>
    </aside>
  );
}

export default BookDetails;
