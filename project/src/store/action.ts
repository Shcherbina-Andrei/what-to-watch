import { AppRoute } from './../const';
import {createAction} from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { Comments } from '../types/comment';
import {Film, Films} from '../types/film';

export const setFilmsDataLoadingStatus = createAction<boolean>('films/setFilmsDataLoadingStatus');

export const changeGenreAction = createAction<{genre: string}>('app/changeGenre');

export const getFilmsAction = createAction<{films: Films}>('films/get');

export const loadFilms = createAction<Films>('data/loadFilms');

export const loadCurrentFilm = createAction<Film>('data/loadCurrentFilm');

export const loadSimilarFilms = createAction<Films>('data/loadSimilarFilms');

export const loadPromoFilm = createAction<Film>('data/loadPromoFilm');

export const loadCurrentComments = createAction<Comments>('data/loadComments');

export const requireAuthorizationStatus = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setUserEmail = createAction<string | null>('user/setUserEmail');

export const setUserAvatarUrl = createAction<string | null>('user/setUserAvatar');

export const redirectToRouteAction = createAction<AppRoute>('app/redirectToRoute');

