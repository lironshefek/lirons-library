export interface Book {
  id: string;
  title: string;
  author: string;
  year: number | string;
  cover_i: number | null;
  coverUrl: string;
  genres: string[];
  rating: number | null;
  ratingsCount: number | null;
}

export interface OpenLibraryDocument {
  key?: string;
  title?: string;
  author_name?: string | string[];
  first_publish_year?: number;
  cover_i?: number;
  subject?: unknown;
  ratings_average?: number;
  ratings_count?: number;
}

export interface OpenLibraryResponse {
  docs?: OpenLibraryDocument[];
}

// One book ("work") from https://openlibrary.org/works/{id}.json.
// The description can be plain text or an object with a `value`.
export interface OpenLibraryWork {
  description?: string | { value?: string };
}
