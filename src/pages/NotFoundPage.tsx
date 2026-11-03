import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <main className="page-shell not-found-page">
      {/* Big faint "404" behind the message; screen readers skip it */}
      <span className="not-found-page__code" aria-hidden="true">404</span>
      <p className="eyebrow">Lost your place?</p>
      <h1 className="page-title not-found-page__title">Page Not Found</h1>
      <p className="page-intro">We could not find the page you were looking for.</p>
      <Link className="button button--primary not-found-page__link" to="/">
        Return to Lirons Library
      </Link>
    </main>
  );
}

export default NotFoundPage;
