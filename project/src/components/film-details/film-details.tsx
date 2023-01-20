import { Fragment } from 'react';
import {Film} from '../../types/film';
import {formatDuration} from '../../utils/format-duration';

type PageProps = {
  currentFilm: Film;
}

function FilmDetails({currentFilm}: PageProps): JSX.Element {
  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{currentFilm.director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {currentFilm.starring.map((actor, index) => (
              <Fragment key={actor}>
                {actor}{index < currentFilm.starring.length - 1 && ','} {index < currentFilm.starring.length - 1 && <br />}
              </Fragment>
            ))}
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{formatDuration(currentFilm.runTime)}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{currentFilm.genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{currentFilm.released}</span>
        </p>
      </div>
    </div>
  );
}

export default FilmDetails;
