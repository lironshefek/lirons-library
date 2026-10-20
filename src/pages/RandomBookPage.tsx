import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookDetails from '../components/BookDetails';
import type { Book } from '../types/book';
import { pickRandomBook } from '../utils/bookHelpers';

interface RandomBookPageProps {
  books: Book[];
  loading: boolean;
}

// How long one spin lasts and how often the shown book changes while spinning.
const SPIN_DURATION_MS = 1200;
const SPIN_STEP_MS = 100;

function RandomBookPage({ books, loading }: RandomBookPageProps) {
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

  return (
    <main className="page-shell book-details-page random-page">
      <Link className="book-details-page__back" to="/">
        ← Back to books
      </Link>
      <header className="page-header">
        <p className="eyebrow">Feeling lucky?</p>
        <h1>Mystery Book Roulette</h1>
        <p className="page-intro">Spin the roulette and let a surprise book find you.</p>
      </header>

      <button
        className="random-page__spin"
        type="button"
        onClick={handleSpin}
        disabled={loading || isSpinning || books.length === 0}
      >
        {isSpinning ? 'Spinning...' : selectedBook ? 'Spin again' : 'Spin the roulette'}
      </button>

      {loading ? (
        <p className="book-details-page__message">Loading books...</p>
      ) : books.length === 0 ? (
        <p className="book-details-page__message">No books are available to pick from.</p>
      ) : selectedBook ? (
        <div className={`random-page__result${isSpinning ? ' random-page__result--spinning' : ''}`}>
          <BookDetails
            book={selectedBook}
            coverSize={isSpinning ? 'M' : 'L'}
            loadDescription={!isSpinning}
          />
        </div>
      ) : (
        <p className="book-details-page__message">Press the button to pick a random book.</p>
      )}
    </main>
  );
}

export default RandomBookPage;
