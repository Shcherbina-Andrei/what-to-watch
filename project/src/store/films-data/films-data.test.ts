import { fetchFilmsAction, fetchCurrentFilmAction, fetchPromoFilmAction, fetchSimilarFilms, fetchFavoriteFilms } from './../api-actions';
import { filmsData } from './films-data';
import { makeFilmItem } from './../../utils/mocks';
import { makeFilms } from '../../utils/mocks';
import { Films } from './../../types/film';
import { FilmsData } from './../../types/state';
describe('Reducer: filmsData', () => {
  let state: FilmsData;

  const films: Films = makeFilms();
  const promoFilm = makeFilmItem();
  const currentFilm = makeFilmItem();
  const similarFilms = makeFilms();
  const favoriteFilms = makeFilms();

  beforeEach(() => {
    state = {
      isFilmsDataLoading: false,
      promoFilm: null,
      currentFilm: null,
      similarFilms: [],
      favoriteFilms: [],
      films: [],
      hasError: false
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(filmsData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('should change data loading status to "True"', () => {
    expect(filmsData.reducer(state, {type: fetchFilmsAction.pending.type}))
      .toEqual({...state, isFilmsDataLoading: true});
  });

  it('should update state by load films', () => {
    state = {...state, isFilmsDataLoading: true};
    expect(filmsData.reducer(state, {type: fetchFilmsAction.fulfilled.type, payload: films}))
      .toEqual({...state, films, isFilmsDataLoading: false, hasError: false});
  });

  it('should set hasError flag if server is unavailable', () => {
    state = {...state, isFilmsDataLoading: true};
    expect(filmsData.reducer(state, {type: fetchFilmsAction.rejected.type, payload: films}))
      .toEqual({...state, isFilmsDataLoading: false, hasError: true});
  });

  it('should set current film by load film', () => {
    state = {...state, films};
    expect(filmsData.reducer(state, {type: fetchCurrentFilmAction.fulfilled.type, payload: currentFilm}))
      .toEqual({...state, currentFilm});
  });

  it('should set promo film by load film', () => {
    state = {...state, films};
    expect(filmsData.reducer(state, {type: fetchPromoFilmAction.fulfilled.type, payload: promoFilm}))
      .toEqual({...state, promoFilm});
  });

  it('should set similar films by load current film', () => {
    state = {...state, films, currentFilm};
    expect(filmsData.reducer(state, {type: fetchSimilarFilms.fulfilled.type, payload: similarFilms}))
      .toEqual({...state, similarFilms});
  });

  it('should set favorite films by load film', () => {
    state = {...state, films};
    expect(filmsData.reducer(state, {type: fetchFavoriteFilms.fulfilled.type, payload: favoriteFilms}))
      .toEqual({...state, favoriteFilms});
  });
});
