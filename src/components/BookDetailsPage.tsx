import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BookDetails from './BookDetails';
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

  useEffect(() => {
    if (loading || isInList || !id) {
      return undefined;
    }

    const controller = new AbortController();

    getBookById(id, controller.signal)
      .then((result) => setFetchedBook(result))
      .catch((error: unknown) => {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Could not load book from Open Library:', error);
          setFetchedBook(null);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setCheckedId(id);
        }
      });

    return () => controller.abort();
  }, [id, loading, isInList]);

  // Only use the fetched book if it belongs to the id in the current URL.
  const book = bookFromList ?? (fetchedBook?.id === id ? fetchedBook : undefined);
  const isLookingUp = !isInList && checkedId !== id;

  return (
    <main className="page-shell book-details-page">
      <Link className="book-details-page__back" to="/">
        ← Back to books
      </Link>
      {loading || isLookingUp ? (
        <p className="book-details-page__message">Loading book details...</p>
      ) : book ? (
        <div className="book-details-page__content">
          <button
            className="favorite-toggle favorite-toggle--details"
            type="button"
            aria-label={favoriteIds.has(book.id) ? `Remove ${book.title} from favorites` : `Add ${book.title} to favorites`}
            aria-pressed={favoriteIds.has(book.id)}
            onClick={() => onToggleFavorite(book)}
          >
            {favoriteIds.has(book.id) ? '♥ Remove from favorites' : '♡ Add to favorites'}
          </button>
          <BookDetails book={book} />
        </div>
      ) : (
        <p className="book-details-page__message">Book not found.</p>
      )}
    </main>
  );
}

export default BookDetailsPage;
