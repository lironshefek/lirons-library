import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BookDetails from './BookDetails';
import BookDetailsSkeleton from './BookDetailsSkeleton';
import EmptyState from './EmptyState';
import ErrorMessage from './ErrorMessage';
import { getBookById } from '../api/openLibrary';
import type { Book } from '../types/book';

interface BookDetailsPageProps {
  books: Book[];
  loading: boolean;
  favoriteIds: ReadonlySet<string>;
  onToggleFavorite: (book: Book) => void;
}

function BookDetailsPage({ books, loading, favoriteIds, onToggleFavorite }: BookDetailsPageProps) {
  const { id } = useParams<{ id: string }>();
  const bookFromList = books.find((item) => item.id === id);
  const isInList = bookFromList !== undefined;

  // Book loaded directly from the API when it is not in the current lists
  // (for example after refreshing the page on a search result).
  const [fetchedBook, setFetchedBook] = useState<Book | null>(null);
  // The id whose API lookup has finished, so we know when to show "not found".
  const [checkedId, setCheckedId] = useState<string | null>(null);
  // The id whose API lookup failed (network or server problem).
  const [failedId, setFailedId] = useState<string | null>(null);
  // Increased by the "Try again" button to run the lookup again.
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (loading || isInList || !id) {
      return undefined;
    }

    const controller = new AbortController();

    getBookById(id, controller.signal)
      .then((result) => {
        setFetchedBook(result);
        setFailedId(null);
      })
      .catch((error: unknown) => {
        if (!(error instanceof Error && error.name === 'AbortError')) {
          console.error('Could not load book from Open Library:', error);
          setFetchedBook(null);
          setFailedId(id);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setCheckedId(id);
        }
      });

    return () => controller.abort();
  }, [id, loading, isInList, retryCount]);

  function retryLookup() {
    // Clear the old result so the loading skeleton shows while trying again.
    setFailedId(null);
    setCheckedId(null);
    setRetryCount((count) => count + 1);
  }

  // Only use the fetched book if it belongs to the id in the current URL.
  const book = bookFromList ?? (fetchedBook?.id === id ? fetchedBook : undefined);
  const isLookingUp = !isInList && checkedId !== id;

  // Pick what to show under the back link: loading, error, the book, or "not found".
  let content;
  if (loading || isLookingUp) {
    content = <BookDetailsSkeleton />;
  } else if (failedId === id && !book) {
    content = (
      <ErrorMessage
        title="This book didn’t load"
        message="We couldn’t get its details from Open Library. Check your connection and try again."
        onRetry={retryLookup}
      />
    );
  } else if (book) {
    const isFavorite = favoriteIds.has(book.id);
    content = (
      <BookDetails book={book} isPageTitle>
        <button
          className={`button button--large ${isFavorite ? 'button--outline' : 'button--primary'}`}
          type="button"
          aria-pressed={isFavorite}
          onClick={() => onToggleFavorite(book)}
        >
          {isFavorite ? '♥ Remove from favorites' : '♡ Add to favorites'}
        </button>
      </BookDetails>
    );
  } else {
    content = (
      <EmptyState
        title="We couldn’t find this book"
        message="Open Library has no book at this address. Go back and pick another one."
      />
    );
  }

  return (
    <main className="page-shell book-details-page">
      <Link className="book-details-page__back" to="/">
        ← Back to books
      </Link>
      {content}
    </main>
  );
}

export default BookDetailsPage;
