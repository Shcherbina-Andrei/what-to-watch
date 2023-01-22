import { Link } from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {Films} from '../../types/film';

type PageProps = {
  films: Films;
  handleChangeGenre: (genre: string) => void;
}

function GenresList({films, handleChangeGenre}: PageProps): JSX.Element {
  const currentGenre = useAppSelector((state) => state.genre);

  const genres = new Set<string>();
  genres.add('All genres');
  films.forEach((film) => genres.add(film.genre));

  return (
    <ul className="catalog__genres-list">
      {Array.from(genres).map((genre) => (
        <li className={`catalog__genres-item ${genre === currentGenre ? 'catalog__genres-item--active' : ''}`} key={genre}>
          <Link to="" className="catalog__genres-link" onClick={() => handleChangeGenre(genre)}>{genre}</Link>
        </li>
      ))}
    </ul>
  );
}

export default GenresList;
