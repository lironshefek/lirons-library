import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { searchBooks } from './api/openLibrary';
import BookDetailsPage from './components/BookDetailsPage';
import SiteFooter from './components/SiteFooter';
import SiteHeader from './components/SiteHeader';
import FavoritesPage from './pages/FavoritesPage';
import HomePage from './pages/HomePage';
import MyPicksPage from './pages/MyPicksPage';
import NotFoundPage from './pages/NotFoundPage';
import RandomBookPage from './pages/RandomBookPage';
import myPicksData from './data/myPicks.json';
import type { Book } from './types/book';
import './App.css';

// Liron's saved picks; the details page also looks here, so picks open instantly.
const myPicks: Book[] = myPicksData;

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item: unknown) => typeof item === 'string');
}

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [favorites, setFavorites] = useState<Book[]>(() => {
    try {
      const storedFavorites: unknown = JSON.parse(localStorage.getItem('bookfinder-favorites') ?? '[]');
      return Array.isArray(storedFavorites)
        ? storedFavorites.filter((book): book is Book => (
          typeof book === 'object'
          && book !== null
          && 'id' in book
          && typeof book.id === 'string'
          && 'title' in book
          && typeof book.title === 'string'
          && 'author' in book
          && typeof book.author === 'string'
          && 'coverUrl' in book
          && typeof book.coverUrl === 'string'
          && 'year' in book
          && (typeof book.year === 'number' || typeof book.year === 'string')
          && 'cover_i' in book
          && (typeof book.cover_i === 'number' || book.cover_i === null)
          && 'genres' in book
          && isStringArray(book.genres)
          && 'rating' in book
          && (typeof book.rating === 'number' || book.rating === null)
          && 'ratingsCount' in book
          && (typeof book.ratingsCount === 'number' || book.ratingsCount === null)
        ))
        : [];
    } catch {
      return [];
    }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  // True when the book list could not be loaded from Open Library.
  const [loadError, setLoadError] = useState(false);
  // Increased by the "Try again" button to run the loading effect again.
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadBooks() {
      setLoading(true);
      setLoadError(false);

      try {
        const mappedBooks = await searchBooks('', controller.signal);
        setBooks(mappedBooks);
      } catch (error: unknown) {
        if (!(error instanceof Error && error.name === 'AbortError')) {
          console.error('Could not search Open Library:', error);
          setLoadError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadBooks();

    return () => controller.abort();
  }, [reloadCount]);

  function retryLoadBooks() {
    setReloadCount((count) => count + 1);
  }

  useEffect(() => {
    try {
      localStorage.setItem('bookfinder-favorites', JSON.stringify(favorites));
    } catch (error: unknown) {
      console.error('Could not save favorites:', error);
    }
  }, [favorites]);

  const favoriteIds = new Set(favorites.map((book) => book.id));

  function toggleFavorite(book: Book) {
    setFavorites((currentFavorites) => (
      currentFavorites.some((favorite) => favorite.id === book.id)
        ? currentFavorites.filter((favorite) => favorite.id !== book.id)
        : [...currentFavorites, book]
    ));
  }

  return (
    <BrowserRouter>
      <div className="app-frame">
        <SiteHeader favoritesCount={favorites.length} picksCount={myPicks.length} />
        <Routes>
          <Route
            path="/"
            element={(
              <HomePage
                books={books}
                loading={loading}
                loadError={loadError}
                onRetry={retryLoadBooks}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                favoriteIds={favoriteIds}
                onToggleFavorite={toggleFavorite}
              />
            )}
          />
          <Route path="/books/:id" element={(
            <BookDetailsPage
              books={[...books, ...myPicks]}
              loading={loading}
              favoriteIds={favoriteIds}
              onToggleFavorite={toggleFavorite}
            />
          )} />
          <Route path="/picks" element={(
            <MyPicksPage
              favoriteIds={favoriteIds}
              onToggleFavorite={toggleFavorite}
            />
          )} />
          <Route path="/favorites" element={(
            <FavoritesPage
              books={favorites}
              favoriteIds={favoriteIds}
              onToggleFavorite={toggleFavorite}
            />
          )} />
          <Route path="/random" element={<RandomBookPage
            books={books}
            loading={loading}
            loadError={loadError}
            onRetry={retryLoadBooks}
          />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <SiteFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
