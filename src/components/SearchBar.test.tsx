import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import SearchBar from './SearchBar';

function SearchBarHarness() {
  const [query, setQuery] = useState('');

  return (
    <>
      <SearchBar value={query} onChange={setQuery} />
      <output aria-label="Current search">{query}</output>
    </>
  );
}

describe('SearchBar', () => {
  // Shows the search input with the expected placeholder text.
  it('renders the search field with its expected placeholder', () => {
    render(<SearchBar value="" onChange={() => undefined} />);

    expect(screen.getByRole('searchbox', { name: 'Search books' }))
      .toHaveAttribute('placeholder', 'Search for a book...');
  });

  // Updates the input and saved search value as the user types.
  it('updates the controlled search value while typing', async () => {
    const user = userEvent.setup();
    render(<SearchBarHarness />);

    const searchInput = screen.getByRole('searchbox', { name: 'Search books' });
    await user.type(searchInput, 'Dune');

    expect(searchInput).toHaveValue('Dune');
    expect(screen.getByLabelText('Current search')).toHaveTextContent('Dune');
  });
});
