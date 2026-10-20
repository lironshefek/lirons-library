import { useEffect, useState } from 'react';
import { getBookDescription } from '../api/openLibrary';
import type { Book } from '../types/book';
import { formatPublishYear, getCoverUrl } from '../utils/bookHelpers';
import type { CoverSize } from '../utils/bookHelpers';

interface BookDetailsProps {
  book: Book;
  // Cover image size; the roulette uses the smaller 'M' image while spinning
  // because it loads fast enough to keep up with the switching books.
  coverSize?: CoverSize;
  // When false the description is not requested (the roulette turns it off while spinning).
  loadDescription?: boolean;
}

// The description that was loaded, and which book it belongs to.
interface LoadedDescription {
  bookId: string;
  text: string | null;
}

function BookDetails({ book, coverSize = 'L', loadDescription = true }: BookDetailsProps) {
  const [description, setDescription] = useState<LoadedDescription | null>(null);

  // Fetch the description from the book's work page whenever the book changes.
  useEffect(() => {
    if (!loadDescription) {
      return undefined;
    }

    const controller = new AbortController();

    getBookDescription(book.id, controller.signal)
      .then((text) => setDescription({ bookId: book.id, text }))
      .catch((error: unknown) => {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Could not load book description:', error);
          setDescription({ bookId: book.id, text: null });
        }
      });

    return () => controller.abort();
  }, [book.id, loadDescription]);

  // Only show a description that belongs to the book currently on screen.
  const isDescriptionReady = description?.bookId === book.id;

  const hasRating = Number.isFinite(book.rating)
    && Number.isFinite(book.ratingsCount);
  const genres = Array.isArray(book.genres) ? book.genres.slice(0, 3) : [];

  return (
    <aside className="book-details" aria-label={`Details for ${book.title}`}>
      {/* key: a new image element per book, so an old cover never stays next to new text */}
      <img
        key={book.id}
        className="book-details__cover"
        src={getCoverUrl(book.cover_i, coverSize)}
        alt={`Cover of ${book.title}`}
      />
      <div className="book-details__content">
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
      {loadDescription && (
        <p className={`book-details__description${isDescriptionReady && description?.text ? '' : ' book-details__description--empty'}`}>
          {!isDescriptionReady
            ? 'Loading description...'
            : description?.text ?? 'No description is available for this book.'}
        </p>
      )}
      <ul className="book-details__genres" aria-label="Genres">
        {genres.map((genre) => (
          <li className="book-details__genre" key={genre}>{genre}</li>
        ))}
      </ul>
      </div>
    </aside>
  );
}

export default BookDetails;
