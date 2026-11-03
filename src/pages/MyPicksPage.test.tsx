import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import myPicksData from '../data/myPicks.json';
import MyPicksPage from './MyPicksPage';

describe('MyPicksPage', () => {
  // Shows a card for every book saved in src/data/myPicks.json.
  it('shows all of Liron\'s picks', () => {
    render(
      <MemoryRouter>
        <MyPicksPage favoriteIds={new Set()} onToggleFavorite={() => undefined} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'My Picks' })).toBeInTheDocument();
    for (const pick of myPicksData) {
      expect(screen.getByText(pick.title)).toBeInTheDocument();
    }
  });
});
