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
      <div className="search-bar__field">
        {/* Magnifying glass icon inside the input */}
        <svg
          className="search-bar__icon"
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          className="search-bar__input"
          id="book-search"
          type="search"
          placeholder="Search for a book..."
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default SearchBar;
