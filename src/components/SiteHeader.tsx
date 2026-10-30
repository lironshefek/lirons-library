import { Link, NavLink } from 'react-router-dom';

interface SiteHeaderProps {
  favoritesCount: number;
}

// Adds the active class to the link of the page we are on.
function getNavLinkClass({ isActive }: { isActive: boolean }): string {
  return `site-nav__link${isActive ? ' site-nav__link--active' : ''}`;
}

// Top bar on every page: the BookFinder logo and the main navigation.
function SiteHeader({ favoritesCount }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-logo" to="/">
          <svg
            className="site-logo__icon"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19.5V5a2 2 0 0 1 2-2h13v16H6.5A2.5 2.5 0 0 0 4 21.5" />
            <path d="M19 17v4H6.5" />
          </svg>
          BookFinder
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          <NavLink to="/" end className={getNavLinkClass}>
            Home
          </NavLink>
          <NavLink to="/favorites" className={getNavLinkClass}>
            Favorites <span className="site-nav__count">{favoritesCount}</span>
          </NavLink>
          <NavLink to="/random" className={getNavLinkClass}>
            Random
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default SiteHeader;
