interface ErrorMessageProps {
  title: string;
  message: string;
  // When given, a "Try again" button is shown that calls this function.
  onRetry?: () => void;
}

// A short, visible message shown when data from Open Library could not be loaded.
function ErrorMessage({ title, message, onRetry }: ErrorMessageProps) {
  return (
    <section className="status-box status-box--error" role="alert">
      {/* Circle with an exclamation mark */}
      <svg
        className="status-box__icon"
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7.5v5.5" />
        <path d="M12 16.5h.01" />
      </svg>
      <h2 className="status-box__title">{title}</h2>
      <p className="status-box__text">{message}</p>
      {onRetry && (
        <button className="button button--primary status-box__action" type="button" onClick={onRetry}>
          Try again
        </button>
      )}
    </section>
  );
}

export default ErrorMessage;
