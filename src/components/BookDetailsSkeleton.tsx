// Grey pulsing placeholders shaped like the details page, shown while the book loads.
function BookDetailsSkeleton() {
  return (
    <div className="book-details" aria-busy="true">
      <span className="sr-only" role="status">Loading book details...</span>
      <div className="skeleton book-details__cover" aria-hidden="true" />
      <div className="book-details__content" aria-hidden="true">
        <div className="skeleton skeleton--details-title" />
        <div className="skeleton skeleton--details-author" />
        <div className="book-details__facts">
          <div className="skeleton skeleton--details-fact" />
          <div className="skeleton skeleton--details-fact skeleton--details-fact-wide" />
        </div>
        <div className="skeleton-lines">
          <div className="skeleton skeleton--line" />
          <div className="skeleton skeleton--line" />
          <div className="skeleton skeleton--line" />
          <div className="skeleton skeleton--line" />
        </div>
        <div className="skeleton skeleton--details-button" />
      </div>
    </div>
  );
}

export default BookDetailsSkeleton;
