import type { Book, OpenLibraryDocument, OpenLibraryResponse } from '../types/book';
import { getCoverUrl } from '../utils/bookHelpers';

const SEARCH_URL = 'https://openlibrary.org/search.json';

function getCleanGenres(subjects: unknown): string[] {
  const cleanGenres = Array.isArray(subjects)
    ? subjects
      .filter((subject: unknown): subject is string => typeof subject === 'string')
      .map((subject: string) => subject.trim())
      .filter((subject: string) => {
        const lowerSubject = subject.toLowerCase();

        return subject.length > 0
          && subject.length <= 30
          && !/[:=\/\\\d]/.test(subject)
          && !lowerSubject.startsWith('nyt')
          && !lowerSubject.startsWith('accessible book')
          && !lowerSubject.startsWith('protected daisy');
      })
    : [];

  const selectedGenres = cleanGenres.slice(0, 3);
  return selectedGenres.length > 0 ? selectedGenres : ['General Fiction'];
}

function normalizeBook(doc: OpenLibraryDocument): Book | null {
  if (!doc.key) {
    return null;
  }

  const author = Array.isArray(doc.author_name)
    ? doc.author_name[0] || 'Unknown Author'
    : doc.author_name || 'Unknown Author';
  const coverId = doc.cover_i || null;

  return {
    id: doc.key.replace(/^\/works\//, ''),
    title: doc.title || 'Untitled',
    author,
    year: doc.first_publish_year ?? 'N/A',
    cover_i: coverId,
    coverUrl: getCoverUrl(coverId),
    genres: getCleanGenres(doc.subject),
    rating: Number.isFinite(doc.ratings_average)
      ? Number(doc.ratings_average?.toFixed(1))
      : null,
    ratingsCount: Number.isFinite(doc.ratings_count) ? doc.ratings_count ?? null : null,
  };
}

const FIELDS = [
  'key',
  'title',
  'author_name',
  'first_publish_year',
  'cover_i',
  'subject',
  'ratings_average',
  'ratings_count',
].join(',');

// Loads one book by its work id (e.g. "OL82563W"), used when the details
// page is opened directly or refreshed and the book is not in memory.
export async function getBookById(id: string, signal?: AbortSignal): Promise<Book | null> {
  const params = new URLSearchParams({ q: `key:/works/${id}`, limit: '1', fields: FIELDS });
  const response = await fetch(`${SEARCH_URL}?${params}`, { signal });

  if (!response.ok) {
    throw new Error(`Open Library lookup failed (${response.status}).`);
  }

  const data = await response.json() as OpenLibraryResponse;
  const doc = Array.isArray(data.docs) ? data.docs[0] : undefined;

  return doc ? normalizeBook(doc) : null;
}

export async function searchBooks(query = '', signal?: AbortSignal): Promise<Book[]> {
  const trimmedQuery = query.trim();
  // The home list shows only psychological thrillers (the site owner's favorite
  // genre) first published in 2000 or later that have a cover image.
  const apiQuery = trimmedQuery
    || 'subject:psychological_thriller AND first_publish_year:[2000 TO *] AND cover_i:[1 TO *]';
  const params = new URLSearchParams({ q: apiQuery, limit: '100', fields: FIELDS });
  const response = await fetch(`${SEARCH_URL}?${params}`, { signal });

  if (!response.ok) {
    throw new Error(`Open Library search failed (${response.status}).`);
  }

  const data = await response.json() as OpenLibraryResponse;
  const docs = Array.isArray(data.docs) ? data.docs : [];

  return docs
    .map(normalizeBook)
    .filter((book): book is Book => book !== null)
    // Safety check: keep only books that really have a cover image.
    .filter((book) => book.cover_i !== null);
}
