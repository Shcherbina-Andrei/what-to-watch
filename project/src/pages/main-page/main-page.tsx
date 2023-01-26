import React from 'react';
import {useState} from 'react';
import { Helmet } from 'react-helmet-async';
import FilmsList from '../../components/films-list/films-list';
import GenresList from '../../components/genres-list/genres-list';
import MoreFilmButton from '../../components/more-film-button/more-film-button';
import {useAppDispatch} from '../../hooks';
import {useAppSelector} from '../../hooks';
import {getFilmsByGenre} from '../../utils/filter-related-films';
import {changeGenreAction} from '../../store/action';
import PromoHeader from '../../components/promo-header/promo-header';

const MaxFilms = 8;

function MainPage(): JSX.Element {
  const currentGenre = useAppSelector((state) => state.genre);

  const dispatch = useAppDispatch();
  const films = useAppSelector((state) => state.films);
  const currentFilms = getFilmsByGenre(films, currentGenre);

  const [displayedFilms, setDisplayedFilms] = useState(MaxFilms);

  const handleShowMoreFilms = () => {
    setDisplayedFilms(Math.min(currentFilms.length, displayedFilms + MaxFilms));
  };

  const handleChangeGenre = (genre: string) => {
    dispatch(changeGenreAction({genre}));
    setDisplayedFilms(Math.min(getFilmsByGenre(films, genre).length, MaxFilms));
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>What to watch</title>
      </Helmet>

      <PromoHeader />

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList films={films} handleChangeGenre={handleChangeGenre}/>

          <FilmsList films={currentFilms.slice(0, displayedFilms)}/>

          {currentFilms.length > displayedFilms ? <MoreFilmButton handleShowMoreFilms={handleShowMoreFilms}/> : ''}
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href="/" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
}

export default MainPage;
