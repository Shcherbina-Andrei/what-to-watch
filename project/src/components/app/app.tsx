import {Route, Routes} from 'react-router-dom';
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
import {useAppSelector } from '../../hooks';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import ScrollToTop from '../scroll-to-top/scroll-to-top';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);


  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <LoadingScreen />;
  }

  return (
    <HelmetProvider>
      <ScrollToTop />
      <Routes>
        <Route index element={<MainPage />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus} >
              <MyListPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Films}>
          <Route path={AppRoute.Film} >
            <Route index element={<FilmPage />} />
            <Route path={AppRoute.AddReview} element={<AddReviewPage />} />
          </Route>
        </Route>
        <Route path={AppRoute.Player} element={<Player />} />
        <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
