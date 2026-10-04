import React from 'react';
import books from './data/mockBooks.json';
import BookList from './components/BookList.jsx';
import './App.css';

function App() {
  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">A little space for readers</p>
        <h1>BookFinder</h1>
        <p className="page-intro">Browse a few hand-picked reads from the shelf.</p>
      </header>
      <BookList books={books} />
    </main>
  );
}

export default App;
