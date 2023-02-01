import { fetchCurrentFilmAction, fetchFilmsAction, fetchPromoFilmAction, fetchSimilarFilms, fetchFavoriteFilms } from './../api-actions';
import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FilmsData } from '../../types/state';

const initialState: FilmsData = {
  isFilmsDataLoading: false,
  promoFilm: null,
  currentFilm: null,
  similarFilms: [],
  favoriteFilms: [],
  films: [],
  hasError: false,
};

export const filmsData = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isFilmsDataLoading = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isFilmsDataLoading = false;
        state.hasError = false;
      })
      .addCase(fetchFilmsAction.rejected, (state) => {
        state.isFilmsDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
      })
      .addCase(fetchPromoFilmAction.rejected, (state) => {
        state.promoFilm = null;
      })
      .addCase(fetchCurrentFilmAction.fulfilled, (state, action) => {
        state.currentFilm = action.payload;
      })
      .addCase(fetchCurrentFilmAction.rejected, (state) => {
        state.currentFilm = null;
      })
      .addCase(fetchSimilarFilms.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
      })
      .addCase(fetchSimilarFilms.rejected, (state) => {
        state.similarFilms = [];
      })
      .addCase(fetchFavoriteFilms.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
      })
      .addCase(fetchFavoriteFilms.rejected, (state) => {
        state.favoriteFilms = [];
      });
  },
});
