import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { REQUEST_TIMEOUT_MS, searchBooks } from './openLibrary';

// A fake fetch that never answers, like a network that is down but not
// reported as offline. It only stops when its signal is aborted.
function neverAnsweringFetch(_url: string, options: RequestInit): Promise<Response> {
  return new Promise((_resolve, reject) => {
    options.signal?.addEventListener('abort', () => reject(options.signal?.reason));
  });
}

describe('searchBooks request timeout', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal('fetch', vi.fn(neverAnsweringFetch));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  // Gives up with a TimeoutError so the page can show an error instead of loading forever.
  it('fails with a TimeoutError when Open Library does not answer in time', async () => {
    const result = expect(searchBooks('')).rejects.toMatchObject({ name: 'TimeoutError' });

    await vi.advanceTimersByTimeAsync(REQUEST_TIMEOUT_MS);
    await result;
  });

  // Leaving the page still counts as a normal cancel (AbortError), not an error to show.
  it('fails with an AbortError when the caller cancels the request', async () => {
    const controller = new AbortController();
    const result = expect(searchBooks('', controller.signal)).rejects.toMatchObject({ name: 'AbortError' });

    controller.abort();
    await result;
  });
});
