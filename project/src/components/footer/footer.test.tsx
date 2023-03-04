import {render, screen} from '@testing-library/react';
import Footer from './footer';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';

const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render component correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Footer />
      </HistoryRouter>
    );

    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
  });
});
