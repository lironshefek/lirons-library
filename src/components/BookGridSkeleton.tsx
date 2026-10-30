// How many placeholder cards to show while the books load.
const SKELETON_COUNT = 8;

// Grey pulsing placeholder cards shown while the books are loading.
function BookGridSkeleton() {
  // An array [0, 1, ..., 7], used only to repeat the placeholder card.
  const placeholders = Array.from({ length: SKELETON_COUNT }, (_, index) => index);

  return (
    <div className="book-grid" aria-busy="true">
      <span className="sr-only" role="status">Loading books...</span>
      {placeholders.map((index) => (
        <div className="skeleton-card" key={index} aria-hidden="true">
          <div className="skeleton skeleton--cover" />
          <div className="skeleton skeleton--title" />
          <div className="skeleton skeleton--meta" />
        </div>
      ))}
    </div>
  );
}

export default BookGridSkeleton;
