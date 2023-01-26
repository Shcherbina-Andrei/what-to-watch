import React, { useEffect } from 'react';
import {Helmet} from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FilmTabs from '../../components/film-tabs/film-tabs';
import FilmsList from '../../components/films-list/films-list';
import Header from '../../components/header/header';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import { AppRoute, AuthorizationStatus } from '../../const';
import {useAppSelector} from '../../hooks';
import {store} from '../../store';
import {fetchCommentsAction, fetchCurrentFilmAction, fetchSimilarFilms} from '../../store/api-actions';


function FilmPage(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const params = useParams();
  useEffect(() => {
    store.dispatch(fetchCurrentFilmAction(Number(params.id)));
    store.dispatch(fetchSimilarFilms(Number(params.id)));
    store.dispatch(fetchCommentsAction(Number(params.id)));
  }, [params.id]);

  const navigate = useNavigate();

  const currentFilm = useAppSelector((state) => state.currentFilm);
  const similarFilms = useAppSelector((state) => state.similarFilms);

  if (!currentFilm) {
    return <LoadingScreen />;
  }

  const handlePlayerButton = (): void => {
    navigate(`/player/${currentFilm.id}`);
  };

  const handleAddMyList = (): void => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>{currentFilm.name}</title>
      </Helmet>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={currentFilm.backgroundImage} alt={currentFilm.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header />

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{currentFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{currentFilm.genre}</span>
                <span className="film-card__year">{currentFilm.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={handlePlayerButton}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button" onClick={handleAddMyList}>
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                {(authorizationStatus === AuthorizationStatus.Auth) && <Link to="review" className="btn film-card__button">Add review</Link>}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={currentFilm.posterImage} alt={`${currentFilm.name} poster`} width="218" height="327" />
            </div>

            <FilmTabs currentFilm={currentFilm}/>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmsList films={similarFilms} />
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
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

export default FilmPage;
