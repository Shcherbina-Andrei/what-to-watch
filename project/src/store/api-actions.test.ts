import { makeFilms } from './../utils/mocks';
import { AuthData } from './../types/auth-data';
import { checkAuthAction, loginAction, fetchFilmsAction, logoutAction } from './api-actions';
import { APIRoutes } from './../const';
import { State } from './../types/state';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createApi } from './../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import {Action} from 'redux';
import { setUserAvatarUrl, setUserEmail } from './app-process/app-process';

describe('Async actions', () => {
  const api = createApi();
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should authorization status is "auth" when server return 200 and set user\'s email', async () => {
    const store = mockStore();
    mockApi
      .onGet(APIRoutes.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      setUserEmail.type,
      setUserAvatarUrl.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should dispatch RequiredAuthorization when POST /login', async () => {
    const fakerUser: AuthData = {login: 'lg@mail.ru', password: '1234567'};

    mockApi
      .onPost(APIRoutes.Login)
      .reply(200, {token: 'secret'});

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakerUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('what-to-watch', 'secret');
  });

  it('should dispatch Load_Films when GET /films', async () => {
    const mockFilms = makeFilms();
    mockApi
      .onGet(APIRoutes.Films)
      .reply(200, mockFilms);

    const store = mockStore();

    await store.dispatch(fetchFilmsAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFilmsAction.pending.type,
      fetchFilmsAction.fulfilled.type
    ]);
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockApi
      .onDelete(APIRoutes.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      setUserEmail.type,
      setUserAvatarUrl.type,
      logoutAction.fulfilled.type
    ]);
  });
});
