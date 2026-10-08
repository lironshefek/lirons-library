const SEARCH_URL = 'https://openlibrary.org/search.json';
const DEFAULT_DESCRIPTION = 'No description available.';

export async function searchBooks(query, { signal } = {}) {
  const url = `${SEARCH_URL}?q=${encodeURIComponent(query)}&limit=30`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Open Library search failed (${response.status}).`);
  }

  const data = await response.json();

  return (data.docs ?? []).map((doc) => ({
    id: doc.key,
    title: doc.title,
    author: doc.author_name ? doc.author_name[0] : 'Unknown Author',
    year: doc.first_publish_year || 'N/A',
    cover_i: doc.cover_i,
    coverUrl: doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
      : null,
    description: doc.first_sentence
      ? (Array.isArray(doc.first_sentence) ? doc.first_sentence[0] : doc.first_sentence)
      : DEFAULT_DESCRIPTION,
    genres: doc.subject ? doc.subject.slice(0, 3) : ['General'],
  }));
}
