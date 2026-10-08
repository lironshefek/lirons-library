import React from 'react';
import BookCard from './BookCard.jsx';

function BookList({ books, selectedBookId, onSelectBook, emptyMessage }) {
  return (
    <section className="book-grid" aria-label="Sample books">
      {books.length === 0 ? (
        emptyMessage && <p className="book-list__empty">{emptyMessage}</p>
      ) : (
        books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            isSelected={book.id === selectedBookId}
            onSelect={onSelectBook}
          />
        ))
      )}
    </section>
  );
}

export default BookList;
