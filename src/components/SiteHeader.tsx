import { Link, NavLink } from 'react-router-dom';

interface SiteHeaderProps {
  favoritesCount: number;
}

// Adds the active class to the link of the page we are on.
function getNavLinkClass({ isActive }: { isActive: boolean }): string {
  return `site-nav__link${isActive ? ' site-nav__link--active' : ''}`;
}

// Top bar on every page: the LIRONS LIBRARY name and the main navigation.
function SiteHeader({ favoritesCount }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-logo" to="/">
          LIRONS LIBRARY
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
