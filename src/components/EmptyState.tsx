import type { ReactNode } from 'react';

interface EmptyStateProps {
  // Optional heading above the message.
  title?: string;
  message: string;
  // Which outline icon to show: a book (default) or a heart (empty favorites).
  icon?: 'book' | 'heart';
  // Optional extra content under the message, such as a link.
  children?: ReactNode;
}

// A calm message in a dashed box, shown when there is nothing to list.
function EmptyState({ title, message, icon = 'book', children }: EmptyStateProps) {
  return (
    <section className="status-box status-box--empty">
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
        {icon === 'heart' ? (
          <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z" />
        ) : (
          <>
            <path d="M4 19.5V5a2 2 0 0 1 2-2h13v16H6.5A2.5 2.5 0 0 0 4 21.5" />
            <path d="M19 17v4H6.5" />
          </>
        )}
      </svg>
      {title && <h2 className="status-box__title">{title}</h2>}
      <p className="status-box__text">{message}</p>
      {children}
    </section>
  );
}

export default EmptyState;
