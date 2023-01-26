import { Comments } from './../types/comment';
import { Film, Films } from './../types/film';
import {createReducer} from '@reduxjs/toolkit';
import { changeGenreAction, getFilmsAction, loadFilms, requireAuthorizationStatus, loadCurrentFilm, loadPromoFilm, loadSimilarFilms, setFilmsDataLoadingStatus, setUserEmail, setUserAvatarUrl, loadCurrentComments } from './action';
import { AuthorizationStatus } from '../const';

type InitialState = {
  isFilmsDataLoading: boolean;
  promoFilm: Film | null;
  currentFilm: Film | null;
  similarFilms: Films;
  currentComments: Comments;
  genre: string;
  films: Films;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  userEmail: string | null;
  userAvatarUrl: string | null;
}

const initialState: InitialState = {
  isFilmsDataLoading: false,
  promoFilm: null,
  currentFilm: null,
  similarFilms: [],
  currentComments: [],
  genre: 'All genres',
  films: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  userEmail: null,
  userAvatarUrl: null
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setFilmsDataLoadingStatus, (state, action) => {
      state.isFilmsDataLoading = action.payload;
    })
    .addCase(changeGenreAction, (state, action) => {
      state.genre = action.payload.genre;
    })
    .addCase(getFilmsAction, (state, action) => {
      state.films = action.payload.films;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(loadCurrentFilm, (state, action) => {
      state.currentFilm = action.payload;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(loadPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(requireAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserEmail, (state, action) => {
      state.userEmail = action.payload;
    })
    .addCase(setUserAvatarUrl, (state, action) => {
      state.userAvatarUrl = action.payload;
    })
    .addCase(loadCurrentComments, (state, action) => {
      state.currentComments = action.payload;
    });
});

export {reducer};
