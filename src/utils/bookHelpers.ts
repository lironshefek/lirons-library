import type { Book } from '../types/book';

export type CoverSize = 'S' | 'M' | 'L';

const FALLBACK_COVER_URL = 'https://via.placeholder.com/150x220?text=No+Cover';

export function filterBooksByTitle(books: readonly Book[], query: string): Book[] {
  const searchTerm = query.trim().toLowerCase();

  return books.filter((book) => book.title.toLowerCase().includes(searchTerm));
}

export function formatPublishYear(year: number | string | null | undefined): string {
  if (typeof year === 'number' && Number.isFinite(year)) {
    return String(year);
  }

  if (typeof year === 'string' && year.trim().length > 0) {
    return year.trim();
  }

  return 'N/A';
}

export function getCoverUrl(coverId: number | null | undefined, size: CoverSize = 'M'): string {
  if (typeof coverId !== 'number' || !Number.isFinite(coverId) || coverId <= 0) {
    return FALLBACK_COVER_URL;
  }

  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}

// Picks a random book from the list, avoiding the book with `excludeId`
// when another option exists. `random` can be replaced in tests.
export function pickRandomBook(
  books: readonly Book[],
  excludeId: string | null = null,
  random: () => number = Math.random,
): Book | null {
  const candidates = books.length > 1
    ? books.filter((book) => book.id !== excludeId)
    : books;

  if (candidates.length === 0) {
    return null;
  }

  const index = Math.floor(random() * candidates.length);
  return candidates[index];
}

// Turns a raw Open Library description into clean display text, or null.
// Removes the "----------" source notes some books have at the end, removes
// Markdown bold markers (**), and replaces Markdown links like [text](url)
// or [text][1] (with a "[1]: url" line) with just the text.
export function getDescriptionText(description: unknown): string | null {
  const raw = typeof description === 'string'
    ? description
    : typeof description === 'object' && description !== null
      && 'value' in description && typeof description.value === 'string'
      ? description.value
      : '';

  const text = raw
    .split(/\n-{3,}/)[0]
    .replace(/^\s*\[\d+\]:\s*\S+\s*$/gm, '')
    .replace(/\[([^\]]+)\]\[\d+\]/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*/g, '')
    .trim();

  return text.length > 0 ? text : null;
}
