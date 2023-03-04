import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';
import GenresList from './genres-list';
import { makeFilms } from '../../utils/mocks';

const mockStore = configureMockStore();

const history = createMemoryHistory();

const films = makeFilms();

const handleChangeGenre = (genre: string) => genre;

const store = mockStore({
  APP: {genre: 'All genres'}
});

describe('Component: GenresList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <GenresList films={films} handleChangeGenre={handleChangeGenre} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('All genres')).toBeInTheDocument();
  });
});
