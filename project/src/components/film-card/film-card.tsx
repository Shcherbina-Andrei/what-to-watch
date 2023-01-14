import { Link } from 'react-router-dom';
import {Film} from '../../types/film';

type PageProps = {
  film: Film;
  onActiveChange: (card: Film) => void;
}

function FilmCard({film, onActiveChange}: PageProps): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card" onMouseOver={() => onActiveChange(film)}>
      <div className="small-film-card__image">
        <img src={film.posterImage} alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${film.id}`}>{film.name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;

