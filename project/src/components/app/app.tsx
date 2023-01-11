import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import FilmPage from '../../pages/movie-page/movie-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import Player from '../../pages/player/player';
import PrivateRoute from '../private-route/private-route';
import {AuthorizationStatus} from '../../const';
import {HelmetProvider} from 'react-helmet-async';

type MainPageProps = {
  title: string;
  genre: string;
  year: number;
}

function App({title, genre, year}: MainPageProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<MainPage title={title} genre={genre} year={year} />} />
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route path={AppRoute.MyList} element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth} >
              <MyListPage />
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Films}>
            <Route path={AppRoute.Film} element={<FilmPage />} >
              <Route path={AppRoute.AddReview} element={<AddReviewPage />} />
            </Route>
          </Route>
          <Route path={AppRoute.Player} element={<Player />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
