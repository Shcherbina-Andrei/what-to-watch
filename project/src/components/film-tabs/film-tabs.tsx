import {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {Film} from '../../types/film';
import {Tabs} from '../../const';
import FilmOverview from '../film-overview/film-overview';
import FilmDetails from '../film-details/film-details';
import FilmReviews from '../film-reviews/film-reviews';

type PageProps = {
  currentFilm: Film;
}

function FilmTabs({currentFilm}: PageProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(Tabs.Overview);
  let descriptionElement: JSX.Element;

  switch (activeTab) {
    case Tabs.Overview:
      descriptionElement = <FilmOverview currentFilm={currentFilm} />;
      break;
    case Tabs.Details:
      descriptionElement = <FilmDetails currentFilm={currentFilm} />;
      break;
    case Tabs.Reviews:
      descriptionElement = <FilmReviews />;
      break;
    default:
      descriptionElement = <FilmOverview currentFilm={currentFilm} />;
      break;
  }

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={`film-nav__item ${activeTab === Tabs.Overview ? 'film-nav__item--active' : ''}`}>
            <NavLink to="" className="film-nav__link" onClick={() => setActiveTab(Tabs.Overview)}>Overview</NavLink>
          </li>
          <li className={`film-nav__item ${activeTab === Tabs.Details ? 'film-nav__item--active' : ''}`}>
            <NavLink to="" className="film-nav__link" onClick={() => setActiveTab(Tabs.Details)}>Details</NavLink>
          </li>
          <li className={`film-nav__item ${activeTab === Tabs.Reviews ? 'film-nav__item--active' : ''}`}>
            <NavLink to="" className="film-nav__link" onClick={() => setActiveTab(Tabs.Reviews)}>Reviews</NavLink>
          </li>
        </ul>
      </nav>

      {descriptionElement}
    </div>
  );
}

export default FilmTabs;
