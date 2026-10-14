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
