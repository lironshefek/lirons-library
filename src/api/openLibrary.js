const SEARCH_URL = 'https://openlibrary.org/search.json';

function getCleanGenres(subjects) {
  if (!Array.isArray(subjects)) {
    return ['General Fiction'];
  }

  const cleanGenres = subjects
    .filter((subject) => typeof subject === 'string')
    .map((subject) => subject.trim())
    .filter((subject) => {
      const lowerSubject = subject.toLowerCase();

      return subject.length > 0
        && subject.length <= 30
        && !/[:=\/\\\d]/.test(subject)
        && !lowerSubject.startsWith('nyt')
        && !lowerSubject.startsWith('accessible book')
        && !lowerSubject.startsWith('protected daisy');
    });

  const selectedGenres = cleanGenres.slice(0, 3);
  return selectedGenres.length > 0 ? selectedGenres : ['General Fiction'];
}

export async function searchBooks({ signal } = {}) {
  const fields = [
    'key',
    'title',
    'author_name',
    'first_publish_year',
    'cover_i',
    'subject',
    'ratings_average',
    'ratings_count',
  ].join(',');
  const query = 'subject:(psychological_thriller OR comedy OR drama OR biography)';
  const params = new URLSearchParams({ q: query, limit: '100', fields });
  const url = `${SEARCH_URL}?${params}`;
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
    genres: getCleanGenres(doc.subject),
    rating: Number.isFinite(doc.ratings_average)
      ? Number(doc.ratings_average.toFixed(1))
      : null,
    ratingsCount: Number.isFinite(doc.ratings_count) ? doc.ratings_count : null,
  }));
}
