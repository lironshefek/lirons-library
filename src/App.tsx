import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { searchBooks } from './api/openLibrary';
import BookDetailsPage from './components/BookDetailsPage';
import BookList from './components/BookList';
import SearchBar from './components/SearchBar';
import type { Book } from './types/book';
import './App.css';

function BookListPage({ books }: { books: Book[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const searchTerm = searchQuery.trim().toLowerCase();
  const filteredBooks = books.filter((book) =>
    String(book.title ?? '').toLowerCase().includes(searchTerm),
  );

  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">A little space for readers</p>
        <h1>BookFinder</h1>
        <p className="page-intro">Browse a few hand-picked reads from the shelf.</p>
      </header>
      <div className="book-browser">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <BookList
          books={filteredBooks}
          emptyMessage={searchTerm ? 'No books match your search.' : null}
        />
      </div>
    </main>
  );
}

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadBooks() {
      try {
        const mappedBooks = await searchBooks(controller.signal);
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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookListPage books={books} />} />
        <Route path="/books/:id" element={<BookDetailsPage books={books} loading={loading} />} />
        <Route path="*" element={<main className="page-shell"><p>Page not found.</p></main>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
