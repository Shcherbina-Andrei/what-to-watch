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
import { useAppSelector } from '../../hooks';

function App(): JSX.Element {
  const films = useAppSelector((state) => state.films);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route path={AppRoute.MyList} element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth} >
              <MyListPage films={films}/>
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Films}>
            <Route path={AppRoute.Film} >
              <Route index element={<FilmPage films={films}/>} />
              <Route path={AppRoute.AddReview} element={<AddReviewPage films={films} />} />
            </Route>
          </Route>
          <Route path={AppRoute.Player} element={<Player films={films}/>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
