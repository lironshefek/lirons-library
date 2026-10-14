import type { Book } from '../types/book';
import { formatPublishYear, getCoverUrl } from '../utils/bookHelpers';

interface BookDetailsProps {
  book: Book;
}

function BookDetails({ book }: BookDetailsProps) {
  const hasRating = Number.isFinite(book.rating)
    && Number.isFinite(book.ratingsCount);
  const genres = Array.isArray(book.genres) ? book.genres.slice(0, 3) : [];

  return (
    <aside className="book-details" aria-label={`Details for ${book.title}`}>
      <img
        className="book-details__cover"
        src={getCoverUrl(book.cover_i, 'L')}
        alt={`Cover of ${book.title}`}
      />
      <h2 className="book-details__title">{book.title}</h2>
      <p className="book-details__author">{book.author}</p>
      <p className="book-details__year">First published {formatPublishYear(book.year)}</p>
      <p className="book-details__rating">
        {hasRating ? (
          <>
            <svg
              className="book-details__rating-star"
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <path d="m12 2 2.9 6.2 6.8.8-5 4.8 1.3 6.8-6-3.4-6 3.4 1.2-6.8-5-4.8 6.9-.8L12 2Z" />
            </svg>
            {book.rating?.toFixed(1)} / 5 · {book.ratingsCount?.toLocaleString()} ratings
          </>
        ) : 'No rating available'}
      </p>
      <ul className="book-details__genres" aria-label="Genres">
        {genres.map((genre) => (
          <li className="book-details__genre" key={genre}>{genre}</li>
        ))}
      </ul>
    </aside>
  );
}

export default BookDetails;
