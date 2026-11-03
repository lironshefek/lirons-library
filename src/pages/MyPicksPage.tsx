import BookList from '../components/BookList';
import myPicksData from '../data/myPicks.json';
import type { Book } from '../types/book';

// Liron's hand-picked books, saved ahead of time in src/data/myPicks.json,
// so the page shows right away without searching Open Library.
const myPicks: Book[] = myPicksData;

interface MyPicksPageProps {
  favoriteIds: ReadonlySet<string>;
  onToggleFavorite: (book: Book) => void;
}

// Built like the Favorites page: a header and the same grid of book cards.
function MyPicksPage({ favoriteIds, onToggleFavorite }: MyPicksPageProps) {
  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">Hand-picked by me</p>
        <h1>My Picks</h1>
        <p className="page-intro">The thrillers I love most and would recommend to anyone.</p>
      </header>
      <BookList
        books={myPicks}
        favoriteIds={favoriteIds}
        onToggleFavorite={onToggleFavorite}
      />
    </main>
  );
}

export default MyPicksPage;
