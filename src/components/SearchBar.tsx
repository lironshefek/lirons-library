import type { ChangeEvent } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

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
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
