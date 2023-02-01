import React, { useEffect } from 'react';
import {Helmet} from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AddFavoriteFilmButton from '../../components/add-favorite-film-button/add-favorite-film-button';
import FilmTabs from '../../components/film-tabs/film-tabs';
import FilmsList from '../../components/films-list/films-list';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import {AuthorizationStatus } from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchCommentsAction, fetchCurrentFilmAction, fetchSimilarFilms, fetchFavoriteFilms, fetchAddFavoriteFilm} from '../../store/api-actions';
import { getCurrentFilm, getSimilarFilms } from '../../store/films-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';


function FilmPage(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const params = useParams();

  const currentFilm = useAppSelector(getCurrentFilm);
  const similarFilms = useAppSelector(getSimilarFilms);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentFilmAction(Number(params.id)));
    dispatch(fetchSimilarFilms(Number(params.id)));
    dispatch(fetchCommentsAction(Number(params.id)));
  }, [params.id, dispatch]);

  const addOrRemoveFavoriteFilm = () => {
    if (currentFilm) {
      dispatch(fetchAddFavoriteFilm(currentFilm));
      dispatch(fetchCurrentFilmAction(currentFilm.id));
      dispatch(fetchFavoriteFilms());
    }
  };

  const navigate = useNavigate();

  if (!currentFilm) {
    return <LoadingScreen />;
  }

  const handlePlayerButton = (): void => {
    navigate(`/player/${currentFilm.id}`);
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
                <AddFavoriteFilmButton film={currentFilm} addOrRemoveFavoriteFilm={addOrRemoveFavoriteFilm}/>
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

        <Footer />
      </div>
    </React.Fragment>
  );
}

export default FilmPage;
