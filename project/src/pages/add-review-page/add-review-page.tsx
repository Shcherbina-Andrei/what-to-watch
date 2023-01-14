import {Helmet} from 'react-helmet-async';
import {Link, useParams} from 'react-router-dom';
import AddReviewForm from '../../components/add-review-form/add-review-form';
import Logo from '../../components/logo/logo';
import {Films} from '../../types/film';
import NotFoundPage from '../not-found-page/not-found-page';

type PageProps = {
  films: Films;
}

function AddReviewPage({films}: PageProps): JSX.Element {
  const params = useParams();
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
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={currentFilm.posterImage} alt={`${currentFilm.name} poster`} width="218" height="327" />
        </div>
      </div>

      <AddReviewForm />

    </section>
  );
}

export default AddReviewPage;
