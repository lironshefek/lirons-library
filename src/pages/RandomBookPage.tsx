import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookDetails from '../components/BookDetails';
import EmptyState from '../components/EmptyState';
import ErrorMessage from '../components/ErrorMessage';
import type { Book } from '../types/book';
import { pickRandomBook } from '../utils/bookHelpers';

interface RandomBookPageProps {
  books: Book[];
  loading: boolean;
  loadError: boolean;
  onRetry: () => void;
}

// How long one spin lasts and how often the shown book changes while spinning.
const SPIN_DURATION_MS = 1200;
const SPIN_STEP_MS = 100;

function RandomBookPage({ books, loading, loadError, onRetry }: RandomBookPageProps) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  // While spinning, flip through random books, then stop on the last one.
  useEffect(() => {
    if (!isSpinning) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setSelectedBook((current) => pickRandomBook(books, current?.id ?? null));
    }, SPIN_STEP_MS);

    const timeoutId = window.setTimeout(() => {
      window.clearInterval(intervalId);
      setIsSpinning(false);
    }, SPIN_DURATION_MS);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [isSpinning, books]);

  function handleSpin() {
    setSelectedBook((current) => pickRandomBook(books, current?.id ?? null));
    setIsSpinning(true);
  }

  // Pick what to show under the title: error, loading, empty shelf, or the roulette.
  let content;
  if (loadError) {
    content = (
      <ErrorMessage
        title="Nothing to spin yet"
        message="We couldn’t load the books from Open Library. Check your connection and try again."
        onRetry={onRetry}
      />
    );
  } else if (loading) {
    content = (
      <div className="random-page__content" aria-busy="true">
        <span className="sr-only" role="status">Loading books...</span>
        <div className="skeleton random-page__skeleton-button" aria-hidden="true" />
        <div className="random-page__card" aria-hidden="true">
          <div className="book-details book-details--compact">
            <div className="skeleton book-details__cover" />
            <div className="book-details__content">
              <div className="skeleton skeleton--details-title" />
              <div className="skeleton skeleton--details-author" />
              <div className="skeleton-lines">
                <div className="skeleton skeleton--line" />
                <div className="skeleton skeleton--line" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (books.length === 0) {
    content = (
      <EmptyState
        title="The shelf is empty for now"
        message="There are no books to spin right now. Check back a little later."
      />
    );
  } else {
    content = (
      <div className="random-page__content">
        <button
          className="button button--primary random-page__spin"
          type="button"
          onClick={handleSpin}
          disabled={isSpinning}
        >
          {/* Circular arrow icon; it turns while the roulette spins */}
          <svg
            className={`random-page__spin-icon${isSpinning ? ' random-page__spin-icon--spinning' : ''}`}
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12a9 9 0 1 1-3-6.7" />
            <path d="M21 3v6h-6" />
          </svg>
          {isSpinning ? 'Spinning...' : selectedBook ? 'Spin again' : 'Spin the roulette'}
        </button>

        {selectedBook ? (
          <div className={`random-page__card${isSpinning ? ' random-page__card--spinning' : ''}`}>
            <BookDetails
              book={selectedBook}
              coverSize={isSpinning ? 'M' : 'L'}
              loadDescription={!isSpinning}
              compact
            />
          </div>
        ) : (
          <p className="random-page__placeholder">Press the button to pick a surprise book.</p>
        )}
      </div>
    );
  }

  return (
    <main className="page-shell random-page">
      <Link className="back-link" to="/">
        ← Back to books
      </Link>
      <header className="random-page__header">
        <p className="random-page__eyebrow">Feeling lucky?</p>
        <h1 className="random-page__title">Mystery Book Roulette</h1>
        <p className="random-page__intro">Spin the roulette and let a surprise book find you.</p>
      </header>
      {content}
    </main>
  );
}

export default RandomBookPage;
