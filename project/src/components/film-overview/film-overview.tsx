import {Film} from '../../types/film';
import {Fragment} from 'react';
import {transformRatingToWordValue} from '../../utils/format-rating';

type PageProps = {
  currentFilm: Film;
}

const ActorsDisplay = 3;

function FilmOverview({currentFilm}: PageProps): JSX.Element {
  return (
    <Fragment>
      <div className="film-rating">
        <div className="film-rating__score">{currentFilm.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{transformRatingToWordValue(currentFilm.rating)}</span>
          <span className="film-rating__count">{currentFilm.scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{currentFilm.description}</p>

        <p className="film-card__director"><strong>Director: {currentFilm.director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {currentFilm.starring.slice(0, ActorsDisplay).join(', ')} and other</strong></p>
      </div>
    </Fragment>
  );
}

export default FilmOverview;
