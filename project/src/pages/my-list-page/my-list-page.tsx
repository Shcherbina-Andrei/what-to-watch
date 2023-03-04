import {Helmet} from 'react-helmet-async';
import FilmsList from '../../components/films-list/films-list';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import { useAppSelector } from '../../hooks';
import { getFavoriteFilms} from '../../store/films-data/selectors';

function MyListPage(): JSX.Element {
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  return (
    <div className="user-page">
      <Helmet>
        <title>My list</title>
      </Helmet>
      <header className="page-header user-page__head">
        <div className="logo">
          <Logo />
        </div>

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{favoriteFilms.length}</span></h1>
        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmsList films={favoriteFilms} />
      </section>

      <Footer />
    </div>
  );
}

export default MyListPage;
