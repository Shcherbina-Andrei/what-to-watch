import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getPromoFilm } from '../../store/films-data/selectors';
import {fetchFavoriteFilms, fetchAddFavoriteFilm, fetchPromoFilmAction} from '../../store/api-actions';
import AddFavoriteFilmButton from '../add-favorite-film-button/add-favorite-film-button';

function PromoHeader(): JSX.Element {
  const promoFilm = useAppSelector(getPromoFilm);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  if (!promoFilm) {
    return <Header />;
  }

  const handlePlayerButton = (): void => {
    navigate(`/player/${promoFilm.id}`);
  };

  const addOrRemoveFavoriteFilm = () => {
    if (promoFilm) {
      dispatch(fetchAddFavoriteFilm(promoFilm));
      dispatch(fetchPromoFilmAction());
      dispatch(fetchFavoriteFilms());
    }
  };


  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={`${promoFilm.backgroundImage}`} alt={`${promoFilm.name}`} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <Header />

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={`${promoFilm.posterImage}`} alt={`${promoFilm.name} poster`} width="218" height="327" />
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{promoFilm.name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{promoFilm.genre}</span>
              <span className="film-card__year">{promoFilm.released}</span>
            </p>

            <div className="film-card__buttons">
              <button className="btn btn--play film-card__button" type="button" onClick={handlePlayerButton}>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <AddFavoriteFilmButton film={promoFilm} addOrRemoveFavoriteFilm={addOrRemoveFavoriteFilm} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromoHeader;
