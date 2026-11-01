import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
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
  // When true the book title is the page's main heading (<h1>).
  isPageTitle?: boolean;
  // Optional buttons shown under the details, e.g. "Add to favorites".
  children?: ReactNode;
}

// The description that was loaded, and which book it belongs to.
interface LoadedDescription {
  bookId: string;
  text: string | null;
  // True when the request failed, so we can say so instead of "no description".
  failed: boolean;
}

function BookDetails({
  book,
  coverSize = 'L',
  loadDescription = true,
  isPageTitle = false,
  children,
}: BookDetailsProps) {
  const [description, setDescription] = useState<LoadedDescription | null>(null);

  // Fetch the description from the book's work page whenever the book changes.
  useEffect(() => {
    if (!loadDescription) {
      return undefined;
    }

    const controller = new AbortController();

    getBookDescription(book.id, controller.signal)
      .then((text) => setDescription({ bookId: book.id, text, failed: false }))
      .catch((error: unknown) => {
        if (!(error instanceof Error && error.name === 'AbortError')) {
          console.error('Could not load book description:', error);
          setDescription({ bookId: book.id, text: null, failed: true });
        }
      });

    return () => controller.abort();
  }, [book.id, loadDescription]);

  // Only show a description that belongs to the book currently on screen.
  const isDescriptionReady = description?.bookId === book.id;

  const hasRating = Number.isFinite(book.rating)
    && Number.isFinite(book.ratingsCount);
  const genres = Array.isArray(book.genres) ? book.genres.slice(0, 3) : [];

  // The details page uses the title as its main heading (h1); the roulette uses h2.
  const TitleTag = isPageTitle ? 'h1' : 'h2';

  return (
    <div className="book-details">
      {/* key: a new image element per book, so an old cover never stays next to new text */}
      <img
        key={book.id}
        className="book-details__cover"
        src={getCoverUrl(book.cover_i, coverSize)}
        alt={`Cover of ${book.title}`}
      />
      <aside className="book-details__content" aria-label={`Details for ${book.title}`}>
        <div className="book-details__heading">
          <TitleTag className="book-details__title">{book.title}</TitleTag>
          <p className="book-details__author">{book.author}</p>
        </div>

        {/* Small boxes with the publication year and the rating */}
        <div className="book-details__facts">
          <span className="book-details__fact">First published {formatPublishYear(book.year)}</span>
          <span className="book-details__fact">
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
          </span>
        </div>

        {loadDescription && (
          <p className={`book-details__description${isDescriptionReady && description?.text ? '' : ' book-details__description--empty'}`}>
            {!isDescriptionReady
              ? 'Loading description...'
              : description?.failed
                ? 'Could not load the description right now. Please try again later.'
                : description?.text ?? 'No description is available for this book.'}
          </p>
        )}

        <ul className="book-details__genres" aria-label="Genres">
          {genres.map((genre) => (
            <li className="book-details__genre" key={genre}>{genre}</li>
          ))}
        </ul>

        {/* Extra content from the page, such as the favorite button */}
        {children && <div className="book-details__actions">{children}</div>}
      </aside>
    </div>
  );
}

export default BookDetails;
