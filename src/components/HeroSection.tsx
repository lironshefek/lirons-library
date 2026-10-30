import { Link } from 'react-router-dom';
import heroPicksData from '../data/heroPicks.json';
import type { HeroPick } from '../types/book';
import { getCoverUrl } from '../utils/bookHelpers';

// Liron's three favorite books, saved in a JSON file so they show right away.
const heroPicks: HeroPick[] = heroPicksData;

// Where each cover sits in the tilted stack: left, front (center), right.
const coverPositions = ['left', 'center', 'right'];

// Big introduction at the top of the home page.
function HeroSection() {
  return (
    <section className="hero" aria-label="About this shelf">
      <div className="hero__text">
        <h1 className="hero__title">
          Psychological
          <br />
          thrillers, <em className="hero__title-accent">only.</em>
        </h1>
        <p className="hero__intro">
          No other genres, no filler. Just twisty, dark psychological thrillers,
          hand-picked because they are my favorite kind of book.
        </p>
        <div className="hero__actions">
          <Link className="button button--primary" to="/random">
            Surprise me
          </Link>
        </div>
      </div>

      {/* Decorative stack of covers, so screen readers skip it */}
      <div className="hero__stack" aria-hidden="true">
        {heroPicks.slice(0, 3).map((pick, index) => (
          <img
            key={pick.id}
            className={`hero__cover hero__cover--${coverPositions[index]}`}
            src={getCoverUrl(pick.cover_i, 'L')}
            alt=""
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSection;
