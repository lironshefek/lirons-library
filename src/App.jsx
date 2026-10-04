import React, { useState } from 'react';
import books from './data/mockBooks.json';
import BookDetails from './components/BookDetails.jsx';
import BookList from './components/BookList.jsx';
import './App.css';

function App() {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">A little space for readers</p>
        <h1>BookFinder</h1>
        <p className="page-intro">Browse a few hand-picked reads from the shelf.</p>
      </header>
      <div className="master-detail-layout">
        <BookList
          books={books}
          selectedBookId={selectedBook?.id}
          onSelectBook={setSelectedBook}
        />
        <BookDetails book={selectedBook} />
      </div>
    </main>
  );
}

export default App;
