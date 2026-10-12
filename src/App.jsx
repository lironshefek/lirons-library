import React, { useEffect, useState } from 'react';
import { searchBooks } from './api/openLibrary.js';
import BookDetails from './components/BookDetails.jsx';
import BookList from './components/BookList.jsx';
import SearchBar from './components/SearchBar.jsx';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const query = searchQuery.trim();
    setSelectedBook(null);

    if (query === '' && hasSearched) {
      setBooks([]);
      return undefined;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      try {
        const mappedBooks = await searchBooks(query, { signal: controller.signal });
        console.log('Fetched books:', mappedBooks);
        setBooks(mappedBooks);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Could not search Open Library:', error);
          setBooks([]);
        }
      }
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [searchQuery, hasSearched]);

  function handleSearchChange(value) {
    setHasSearched(true);
    setSearchQuery(value);
  }

  const searchTerm = searchQuery.trim().toLowerCase();
  const filteredBooks = books.filter((book) => {
    if (searchTerm === '') {
      return true;
    }

    const title = String(book.title ?? '').toLowerCase();
    const author = String(book.author ?? '').toLowerCase();

    return title.includes(searchTerm) || author.includes(searchTerm);
  });

  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">A little space for readers</p>
        <h1>BookFinder</h1>
        <p className="page-intro">Browse a few hand-picked reads from the shelf.</p>
      </header>
      <div className="master-detail-layout">
        <div className="book-browser">
          <SearchBar value={searchQuery} onChange={handleSearchChange} />
          <BookList
            books={filteredBooks}
            selectedBookId={selectedBook?.id}
            onSelectBook={setSelectedBook}
            emptyMessage={searchTerm ? 'No books match your search.' : null}
          />
        </div>
        <BookDetails book={selectedBook} />
      </div>
    </main>
  );
}

export default App;
