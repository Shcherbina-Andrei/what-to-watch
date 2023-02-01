import FilmsList from '../../components/films-list/films-list';
import GenresList from '../../components/genres-list/genres-list';
import MoreFilmButton from '../../components/more-film-button/more-film-button';
import {useState} from 'react';
import {useAppDispatch} from '../../hooks';
import {useAppSelector} from '../../hooks';
import {getFilmsByGenre} from '../../utils/filter-related-films';
import { getGenre } from '../../store/app-process/selectors';
import { getFilms } from '../../store/films-data/selectors';
import { changeGenre } from '../../store/app-process/app-process';

const MaxFilms = 8;

function FilmsCatalog(): JSX.Element {
  const currentGenre = useAppSelector(getGenre);

  const dispatch = useAppDispatch();
  const films = useAppSelector(getFilms);
  const currentFilms = getFilmsByGenre(films, currentGenre);

  const [displayedFilms, setDisplayedFilms] = useState(MaxFilms);

  const handleShowMoreFilms = () => {
    setDisplayedFilms(Math.min(currentFilms.length, displayedFilms + MaxFilms));
  };

  const handleChangeGenre = (genre: string) => {
    dispatch(changeGenre(genre));
    setDisplayedFilms(Math.min(getFilmsByGenre(films, genre).length, MaxFilms));
  };

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <GenresList films={films} handleChangeGenre={handleChangeGenre}/>

      <FilmsList films={currentFilms.slice(0, displayedFilms)}/>

      {currentFilms.length > displayedFilms ? <MoreFilmButton handleShowMoreFilms={handleShowMoreFilms}/> : ''}
    </section>
  );
}

export default FilmsCatalog;
