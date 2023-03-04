import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import {AuthorizationStatus, AppRoute} from '../../const';
import {makeComments, makeFilmItem, makeFilms} from '../../utils/mocks';
import { Comments } from '../../types/comment';
import App from './app';

const mockStore = configureMockStore();

const fakeFilm = {...makeFilmItem(), id: 13};
const fakePromoFilm = {...makeFilmItem(), id: 26};
const fakeFilms = [...makeFilms(), fakeFilm, fakePromoFilm];
const fakeSimilarFilms = makeFilms();
const fakeComments: Comments = makeComments();

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.NoAuth},
  FILMS: {films: fakeFilms, promoFilm: fakeFilm, currentFilm: fakeFilm, favoriteFilms: [], similarFilms: fakeSimilarFilms, isFilmDataLoading: false},
  COMMENTS: {currentComments: fakeComments},
  APP: {genre: 'All movies', userEmail: null, userAvatarUrl: null}
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainPage" when user navigate to "/"', () => {
    history.push('/');

    render(fakeApp);

    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getByText('Catalog')).toBeInTheDocument();
    expect(screen.getByText('All genres')).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getByText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
  });

  it('should render "MoviePage" when user navigate to "/films/:id"', () => {
    history.push(`/film/:${fakeFilm.id}`);

    render(fakeApp);

    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
  });
});

