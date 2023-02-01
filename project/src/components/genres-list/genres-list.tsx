import {useAppSelector} from '../../hooks';
import { getGenre } from '../../store/app-process/selectors';
import {Films} from '../../types/film';
import './genres-list.css';

type PageProps = {
  films: Films;
  handleChangeGenre: (genre: string) => void;
}

function GenresList({films, handleChangeGenre}: PageProps): JSX.Element {
  const currentGenre = useAppSelector(getGenre);

  const genres = new Set<string>();
  genres.add('All genres');
  films.forEach((film) => genres.add(film.genre));

  return (
    <ul className="catalog__genres-list">
      {Array.from(genres).map((genre) => (
        <li className={`catalog__genres-item ${genre === currentGenre ? 'catalog__genres-item--active' : ''}`} key={genre}>
          <button className="catalog__genres-link catalog__genres-link--button" onClick={() => handleChangeGenre(genre)}>{genre}</button>
        </li>
      ))}
    </ul>
  );
}

export default GenresList;
