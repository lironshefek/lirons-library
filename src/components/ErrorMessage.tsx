interface ErrorMessageProps {
  title: string;
  message: string;
  // When given, a "Try again" button is shown that calls this function.
  onRetry?: () => void;
}

// A short, visible message shown when data from Open Library could not be loaded.
function ErrorMessage({ title, message, onRetry }: ErrorMessageProps) {
  return (
    <section className="error-message" role="alert">
      <h2 className="error-message__title">{title}</h2>
      <p className="error-message__text">{message}</p>
      {onRetry && (
        <button className="error-message__retry" type="button" onClick={onRetry}>
          Try again
        </button>
      )}
    </section>
  );
}

export default ErrorMessage;
