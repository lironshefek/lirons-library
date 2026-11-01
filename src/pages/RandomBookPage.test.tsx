import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Book } from '../types/book';
import RandomBookPage from './RandomBookPage';

function makeBook(id: string, title: string): Book {
  return {
    id,
    title,
    author: 'A. Writer',
    year: 2020,
    cover_i: 1,
    coverUrl: '',
    genres: [],
    rating: null,
    ratingsCount: null,
  };
}

// The "home page list" the roulette receives.
const homeBooks = [
  makeBook('1', 'The Silent Patient'),
  makeBook('2', 'The Housemaid'),
  makeBook('3', 'Never Lie'),
];

describe('RandomBookPage', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // The picked book asks for its description; answer with an empty work.
    // A new Response each time, because a response body can only be read once.
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve(new Response('{}'))));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  // Every book the roulette shows must come from the home page list.
  it('only picks books from the list it is given', async () => {
    render(
      <MemoryRouter>
        <RandomBookPage books={homeBooks} loading={false} loadError={false} onRetry={() => undefined} />
      </MemoryRouter>,
    );
    const homeTitles = homeBooks.map((book) => book.title);

    for (let spin = 0; spin < 20; spin += 1) {
      fireEvent.click(screen.getByRole('button', { name: /spin/i }));
      // Let the whole spin finish (it lasts 1.2 seconds).
      await act(async () => {
        await vi.advanceTimersByTimeAsync(1300);
      });

      const shownTitle = screen.getByRole('heading', { level: 2 }).textContent;
      expect(homeTitles).toContain(shownTitle);
    }
  });
});
