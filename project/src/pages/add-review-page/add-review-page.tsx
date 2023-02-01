import {Helmet} from 'react-helmet-async';
import {Link, useParams} from 'react-router-dom';
import AddReviewForm from '../../components/add-review-form/add-review-form';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import { useAppSelector } from '../../hooks';
import { getFilms } from '../../store/films-data/selectors';
import NotFoundPage from '../not-found-page/not-found-page';

function AddReviewPage(): JSX.Element {
  const params = useParams();
  const films = useAppSelector(getFilms);
  const currentFilm = films.find((film) => film.id.toString() === params.id);
  if (!currentFilm) {
    return <NotFoundPage />;
  }
  return (
    <section className="film-card film-card--full">
      <Helmet>
        <title>Add your review</title>
      </Helmet>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={currentFilm.backgroundImage} alt={currentFilm.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${currentFilm.id}`} className="breadcrumbs__link">{currentFilm.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to="" className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>

          <UserBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={currentFilm.posterImage} alt={`${currentFilm.name} poster`} width="218" height="327" />
        </div>
      </div>

      <AddReviewForm currentId={currentFilm.id}/>

    </section>
  );
}

export default AddReviewPage;
