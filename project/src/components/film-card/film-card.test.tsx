import {render, screen} from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import {createMemoryHistory} from 'history';
import FilmCard from './film-card';
import {makeFilmItem} from '../../utils/mocks';

const film = makeFilmItem();
const history = createMemoryHistory();

describe('Component: FilmCard', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <FilmCard film={film} onActiveChange={(currentFilm) => currentFilm}/>
      </HistoryRouter>
    );

    expect(screen.getByText(film.name)).toBeInTheDocument();
  });
});
