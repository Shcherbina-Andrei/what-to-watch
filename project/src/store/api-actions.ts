import {saveToken, dropToken} from './../services/token';
import {UserData} from './../types/user-data';
import {AuthData} from './../types/auth-data';
import {Film, Films} from './../types/film';
import { loadFilms, requireAuthorizationStatus, loadCurrentFilm, loadPromoFilm, loadSimilarFilms, setFilmsDataLoadingStatus, setUserEmail, setUserAvatarUrl, loadCurrentComments, redirectToRouteAction } from './action';
import {APIRoutes, AppRoute, AuthorizationStatus} from './../const';
import {AxiosInstance} from 'axios';
import {AppDispatch, State} from './../types/state';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { Comments } from '../types/comment';

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setFilmsDataLoadingStatus(true));
    const {data} = await api.get<Films>(APIRoutes.Films);
    dispatch(setFilmsDataLoadingStatus(false));
    dispatch(loadFilms(data));
  }
);

export const fetchCurrentFilmAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/fetchCurrentFilm',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Film>(`${APIRoutes.Films}/${id}`);
      dispatch(loadCurrentFilm(data));
    } catch {
      dispatch(redirectToRouteAction(AppRoute.NotFound));
    }
  }
);

export const fetchSimilarFilms = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/fetchSimilarFilms',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Films>(`${APIRoutes.Films}/${id}/similar`);
    dispatch(loadSimilarFilms(data));
  }
);

export const fetchPromoFilmAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/fetchPromoFilm',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Film>('/promo');
    dispatch(loadPromoFilm(data));
  }
);

export const fetchCommentsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/fetchComments',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Comments>(`/comments/${id}`);
    dispatch(loadCurrentComments(data));
  }
);

export const fetchSendNewCommentAction = createAsyncThunk<void, {
  id: number;
  comment: string;
  rating: number;
}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/sendComment',
  async ({id, comment, rating}, {dispatch, extra: api}) => {
    await api.post(`comments/${id}`, {comment, rating});
    dispatch(fetchCommentsAction(Number(id)));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(APIRoutes.Login);
      dispatch(requireAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setUserEmail(data.email));
      dispatch(setUserAvatarUrl(data.avatarUrl));
    } catch {
      dispatch(requireAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'user/loginAction',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoutes.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(checkAuthAction());
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'user/logoutAction',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoutes.Logout);
    dropToken();
    dispatch(requireAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(setUserEmail(null));
    dispatch(setUserAvatarUrl(null));
  }
);

