import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <main className="page-shell not-found-page">
      <p className="eyebrow">Lost your place?</p>
      <h1>Page Not Found</h1>
      <p className="page-intro">We could not find the page you were looking for.</p>
      <Link className="not-found-page__link" to="/">Return to BookFinder</Link>
    </main>
  );
}

export default NotFoundPage;
