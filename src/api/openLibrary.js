const SEARCH_URL = 'https://openlibrary.org/search.json';
const DEFAULT_DESCRIPTION = 'No description available.';

export async function searchBooks(query, { signal } = {}) {
  const trimmedQuery = query.trim();
  const searchParams = trimmedQuery
    ? `q=${encodeURIComponent(trimmedQuery)}&limit=30`
    : 'subject=psychological_thriller&limit=20';
  const url = `${SEARCH_URL}?${searchParams}`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Open Library search failed (${response.status}).`);
  }

  const data = await response.json();

  const docs = Array.isArray(data.docs) ? data.docs : [];

  return docs.map((doc) => ({
    id: doc.key,
    title: doc.title || 'Untitled',
    author: Array.isArray(doc.author_name)
      ? doc.author_name[0] || 'Unknown Author'
      : doc.author_name || 'Unknown Author',
    year: doc.first_publish_year || 'N/A',
    cover_i: doc.cover_i || null,
    coverUrl: doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
      : 'https://via.placeholder.com/150x220?text=No+Cover',
    description: (Array.isArray(doc.first_sentence)
      ? doc.first_sentence[0]
      : doc.first_sentence) || DEFAULT_DESCRIPTION,
    genres: Array.isArray(doc.subject) ? doc.subject.slice(0, 3) : ['General'],
  }));
}
