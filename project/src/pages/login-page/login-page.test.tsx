import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import {HelmetProvider} from 'react-helmet-async';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import {AuthorizationStatus} from '../../const';
import LoginPage from './login-page';

const mockStore = configureMockStore();

const history = createMemoryHistory();

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.NoAuth},
  APP: {userEmail: null, userAvatarUrl: null}
});

describe('Component: Login Page', () => {
  it('should render correctly', async () => {
    history.push('/login');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <LoginPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('email'), 'test@gmail.com');
    await userEvent.type(screen.getByTestId('password'), '12345678A');

    expect(screen.getByDisplayValue(/test@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/12345678A/i)).toBeInTheDocument();
  });
});
