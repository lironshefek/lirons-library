import React, { useState } from 'react';
import books from './data/mockBooks.json';
import BookDetails from './components/BookDetails.jsx';
import BookList from './components/BookList.jsx';
import SearchBar from './components/SearchBar.jsx';
import './App.css';

function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
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
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <BookList
            books={filteredBooks}
            selectedBookId={selectedBook?.id}
            onSelectBook={setSelectedBook}
          />
        </div>
        <BookDetails book={selectedBook} />
      </div>
    </main>
  );
}

export default App;
