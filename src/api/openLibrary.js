const SEARCH_URL = 'https://openlibrary.org/search.json';

export async function searchBooks({ signal } = {}) {
  const url = `${SEARCH_URL}?q=the&sort=rating&limit=100`;
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
    genres: Array.isArray(doc.subject) ? doc.subject.slice(0, 4) : ['General'],
    rating: typeof doc.ratings_average === 'number'
      ? Number(doc.ratings_average.toFixed(1))
      : null,
    ratingsCount: typeof doc.ratings_count === 'number' ? doc.ratings_count : null,
  }));
}
