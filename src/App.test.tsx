import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

// A minimal successful Open Library search response with one book.
const oneBookResponse = {
  docs: [
    {
      key: '/works/OL1W',
      title: 'The Silent Patient',
      author_name: ['Alex Michaelides'],
      first_publish_year: 2019,
      cover_i: 123,
    },
  ],
};

describe('App when Open Library is not available', () => {
  beforeEach(() => {
    // Hide the expected console.error output from the failed request.
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  // Shows a clear error title instead of an empty page when the request fails.
  it('shows an error message when the books cannot be loaded', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));

    render(<App />);

    expect(await screen.findByRole('alert')).toHaveTextContent('The books didn’t load');
  });

  // The "Try again" button loads the books again and the error disappears.
  it('loads the books after clicking Try again', async () => {
    const user = userEvent.setup();
    vi.stubGlobal('fetch', vi.fn()
      .mockRejectedValueOnce(new TypeError('Failed to fetch'))
      .mockResolvedValueOnce(new Response(JSON.stringify(oneBookResponse))));

    render(<App />);
    await user.click(await screen.findByRole('button', { name: 'Try again' }));

    expect(await screen.findByText('The Silent Patient')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
