import { describe, expect, it } from 'vitest';
import type { Book } from '../types/book';
import { filterBooksByTitle, formatPublishYear, getCoverUrl, pickRandomBook } from './bookHelpers';

function makeBook(overrides: Partial<Book> = {}): Book {
  return {
    id: 'book-id',
    title: 'The Example Book',
    author: 'A. Writer',
    year: 2020,
    cover_i: 123,
    coverUrl: 'https://covers.openlibrary.org/b/id/123-M.jpg',
    genres: ['Fiction'],
    rating: null,
    ratingsCount: null,
    ...overrides,
  };
}

describe('filterBooksByTitle', () => {
  const books = [
    makeBook({ id: '1', title: 'The Hobbit', author: 'J. R. R. Tolkien' }),
    makeBook({ id: '2', title: 'Dune', author: 'Frank Herbert' }),
  ];

  // Finds a book when the title matches, even if the letter case differs.
  it('matches title text without regard to case', () => {
    expect(filterBooksByTitle(books, 'HOBBIT')).toEqual([books[0]]);
  });

  // Confirms that searching an author's name does not return the book.
  it('does not match author names', () => {
    expect(filterBooksByTitle(books, 'Tolkien')).toEqual([]);
  });

  // Shows all books when the search box is empty or only has spaces.
  it('returns all books for an empty query', () => {
    expect(filterBooksByTitle(books, '  ')).toEqual(books);
  });
});

describe('formatPublishYear', () => {
  // Turns a numeric publication year into text for display.
  it('formats numeric years as strings', () => {
    expect(formatPublishYear(1997)).toBe('1997');
  });

  // Uses N/A when a book has no publication year.
  it('returns N/A when the year is missing', () => {
    expect(formatPublishYear(null)).toBe('N/A');
  });
});

describe('getCoverUrl', () => {
  // Creates a cover image URL using the requested image size.
  it('builds a cover URL for the requested size', () => {
    expect(getCoverUrl(42, 'L')).toBe('https://covers.openlibrary.org/b/id/42-L.jpg');
  });

  // Uses a placeholder image when the book has no cover.
  it('returns a placeholder when the cover identifier is missing', () => {
    expect(getCoverUrl(null)).toBe('https://via.placeholder.com/150x220?text=No+Cover');
  });
});

describe('pickRandomBook', () => {
  const books = [
    makeBook({ id: '1', title: 'First' }),
    makeBook({ id: '2', title: 'Second' }),
    makeBook({ id: '3', title: 'Third' }),
  ];

  // Uses the random number to choose a position in the list.
  it('picks the book at the random position', () => {
    expect(pickRandomBook(books, null, () => 0.5)).toBe(books[1]);
  });

  // Never repeats the excluded book when other books are available.
  it('skips the excluded book', () => {
    expect(pickRandomBook(books, '1', () => 0)).toBe(books[1]);
  });

  // Returns null when there are no books to choose from.
  it('returns null for an empty list', () => {
    expect(pickRandomBook([], null, () => 0)).toBeNull();
  });
});
