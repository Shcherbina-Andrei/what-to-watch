import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getFavoriteFilms } from '../../store/films-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { Film } from '../../types/film';

type propsType = {
  film: Film;
  addOrRemoveFavoriteFilm: () => void;
}

function AddFavoriteFilmButton({film, addOrRemoveFavoriteFilm}: propsType): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();

  const favoriteFilmNumbers = useAppSelector(getFavoriteFilms).length;

  const handleAddMyList = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
    }
    addOrRemoveFavoriteFilm();
  };

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={handleAddMyList}>
      {film.isFavorite ?
        <svg viewBox="0 0 18 14" width="18" height="14">
          <use xlinkHref="#in-list"></use>
        </svg>
        :
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"></use>
        </svg>}
      <span>My list</span>
      {authorizationStatus === AuthorizationStatus.Auth && <span className="film-card__count">{favoriteFilmNumbers}</span>}
    </button>
  );
}

export default AddFavoriteFilmButton;
