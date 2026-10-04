import React from 'react';

function BookCard({ book, isSelected, onSelect }) {
  return (
    <button
      className={`book-card${isSelected ? ' book-card--active' : ''}`}
      type="button"
      onClick={() => onSelect(book)}
      aria-pressed={isSelected}
    >
      <img className="book-card__cover" src={book.coverUrl} alt={`Cover of ${book.title}`} />
      <span className="book-card__title">{book.title}</span>
    </button>
  );
}

export default BookCard;
