import {saveToken, dropToken} from './../services/token';
import {UserData} from './../types/user-data';
import {AuthData} from './../types/auth-data';
import {Film, Films} from './../types/film';
import {setUserEmail, setUserAvatarUrl} from './app-process/app-process';
import {redirectToRouteAction} from './action';
import {APIRoutes, AppRoute} from './../const';
import {AxiosInstance} from 'axios';
import {AppDispatch, State} from './../types/state';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { Comments } from '../types/comment';

export const fetchFilmsAction = createAsyncThunk<Films, undefined, {
  state: State;
  extra: AxiosInstance;
}
>(
  'data/fetchFilms',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Films>(APIRoutes.Films);
    return data;
  }
);

export const fetchCurrentFilmAction = createAsyncThunk<Film | null, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/fetchCurrentFilm',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Film>(`${APIRoutes.Films}/${id}`);
      return data;
    } catch {
      dispatch(redirectToRouteAction(AppRoute.NotFound));
      return null;
    }
  }
);

export const fetchSimilarFilms = createAsyncThunk<Films, number, {
  state: State;
  extra: AxiosInstance;
}
>(
  'data/fetchSimilarFilms',
  async (id, {extra: api}) => {
    const {data} = await api.get<Films>(`${APIRoutes.Films}/${id}/similar`);
    return data;
  }
);

export const fetchPromoFilmAction = createAsyncThunk<Film | null, undefined, {
  state: State;
  extra: AxiosInstance;
}
>(
  'data/fetchPromoFilm',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Film>('/promo');
    return data;
  }
);

export const fetchFavoriteFilms = createAsyncThunk<Films, undefined, {
  state: State;
  extra: AxiosInstance;
}
>(
  'data/fetchFavoriteFilm',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Films>('/favorite');
    return data;
  }
);

export const fetchAddFavoriteFilm = createAsyncThunk<void, Film, {
  state: State;
  extra: AxiosInstance;
}
>(
  'data/fetchAddFavoriteFilm',
  async (film, {extra: api}) => {
    const filmParam = !film.isFavorite ? 1 : 0;
    await api.post(`/favorite/${film.id}/${String(filmParam)}`);
  }
);

export const fetchCommentsAction = createAsyncThunk<Comments, number, {
  state: State;
  extra: AxiosInstance;
}
>(
  'data/fetchComments',
  async (id, {extra: api}) => {
    const {data} = await api.get<Comments>(`/comments/${id}`);
    return data;
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
    const {data} = await api.get<UserData>(APIRoutes.Login);
    dispatch(setUserEmail(data.email));
    dispatch(setUserAvatarUrl(data.avatarUrl));
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  state: State;
  extra: AxiosInstance;
}
>(
  'user/login',
  async ({login: email, password}, {extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoutes.Login, {email, password});
    saveToken(token);
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
    dispatch(setUserEmail(null));
    dispatch(setUserAvatarUrl(null));
  }
);

