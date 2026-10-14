import { describe, expect, it } from 'vitest';
import type { Book } from '../types/book';
import { filterBooksByTitle, formatPublishYear, getCoverUrl } from './bookHelpers';

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

  it('matches title text without regard to case', () => {
    expect(filterBooksByTitle(books, 'HOBBIT')).toEqual([books[0]]);
  });

  it('does not match author names', () => {
    expect(filterBooksByTitle(books, 'Tolkien')).toEqual([]);
  });

  it('returns all books for an empty query', () => {
    expect(filterBooksByTitle(books, '  ')).toEqual(books);
  });
});

describe('formatPublishYear', () => {
  it('formats numeric years as strings', () => {
    expect(formatPublishYear(1997)).toBe('1997');
  });

  it('returns N/A when the year is missing', () => {
    expect(formatPublishYear(null)).toBe('N/A');
  });
});

describe('getCoverUrl', () => {
  it('builds a cover URL for the requested size', () => {
    expect(getCoverUrl(42, 'L')).toBe('https://covers.openlibrary.org/b/id/42-L.jpg');
  });

  it('returns a placeholder when the cover identifier is missing', () => {
    expect(getCoverUrl(null)).toBe('https://via.placeholder.com/150x220?text=No+Cover');
  });
});
