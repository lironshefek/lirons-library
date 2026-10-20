import { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { searchBooks } from './api/openLibrary';
import BookDetailsPage from './components/BookDetailsPage';
import BookList from './components/BookList';
import SearchBar from './components/SearchBar';
import FavoritesPage from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';
import RandomBookPage from './pages/RandomBookPage';
import type { Book } from './types/book';
import { filterBooksByTitle } from './utils/bookHelpers';
import './App.css';

interface BookListPageProps {
  books: Book[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  favoriteIds: ReadonlySet<string>;
  onToggleFavorite: (book: Book) => void;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item: unknown) => typeof item === 'string');
}

function BookListPage({
  books,
  searchQuery,
  onSearchChange,
  favoriteIds,
  onToggleFavorite,
}: BookListPageProps) {
  // Search only filters the books already shown on the home page by title.
  const searchTerm = searchQuery.trim();
  const filteredBooks = filterBooksByTitle(books, searchQuery);

  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">BookFinder · My personal shelf</p>
        <h1>Psychological Thrillers I Love</h1>
        <p className="page-intro">
          Only one genre lives here: twisty, dark psychological thrillers from 2000
          onward, hand-picked because they are my favorite kind of book.
        </p>
      </header>
      <div className="book-browser">
        <SearchBar value={searchQuery} onChange={onSearchChange} />
        <BookList
          books={filteredBooks}
          emptyMessage={searchTerm ? 'No books match your search.' : null}
          favoriteIds={favoriteIds}
          onToggleFavorite={onToggleFavorite}
        />
      </div>
    </main>
  );
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

  useEffect(() => {
    const controller = new AbortController();

    async function loadBooks() {
      try {
        const mappedBooks = await searchBooks('', controller.signal);
        setBooks(mappedBooks);
      } catch (error: unknown) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Could not search Open Library:', error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadBooks();

    return () => controller.abort();
  }, []);

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
      <nav className="site-nav" aria-label="Main navigation">
        <NavLink to="/" end className={({ isActive }) => `site-nav__link${isActive ? ' site-nav__link--active' : ''}`}>
          Home
        </NavLink>
        <NavLink to="/favorites" className={({ isActive }) => `site-nav__link${isActive ? ' site-nav__link--active' : ''}`}>
          Favorites <span className="site-nav__count">{favorites.length}</span>
        </NavLink>
        <NavLink to="/random" className={({ isActive }) => `site-nav__link${isActive ? ' site-nav__link--active' : ''}`}>
          Random
        </NavLink>
      </nav>
      <Routes>
        <Route
          path="/"
          element={(
            <BookListPage
              books={books}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              favoriteIds={favoriteIds}
              onToggleFavorite={toggleFavorite}
            />
          )}
        />
        <Route path="/books/:id" element={(
          <BookDetailsPage
            books={books}
            loading={loading}
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
        <Route path="/random" element={<RandomBookPage books={books} loading={loading} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
