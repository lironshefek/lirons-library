import React from 'react';

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <label className="search-bar__label" htmlFor="book-search">
        Search books
      </label>
      <input
        className="search-bar__input"
        id="book-search"
        type="search"
        placeholder="Search for a book..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;
