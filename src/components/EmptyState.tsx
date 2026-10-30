import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  message: string;
  // Optional extra content under the message, such as a link.
  children?: ReactNode;
}

// A calm message in a dashed box, shown when there is nothing to list.
function EmptyState({ title, message, children }: EmptyStateProps) {
  return (
    <section className="status-box status-box--empty">
      {/* Book icon */}
      <svg
        className="status-box__icon"
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5V5a2 2 0 0 1 2-2h13v16H6.5A2.5 2.5 0 0 0 4 21.5" />
        <path d="M19 17v4H6.5" />
      </svg>
      <h2 className="status-box__title">{title}</h2>
      <p className="status-box__text">{message}</p>
      {children}
    </section>
  );
}

export default EmptyState;
