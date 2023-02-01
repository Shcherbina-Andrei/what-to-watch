import { Film } from './../../types/film';
import { NameSpace } from '../../const';
import { Films } from '../../types/film';
import { State } from '../../types/state';

export const getFilms = (state: State): Films => state[NameSpace.Films].films;
export const getFilmsDataLoadingStatus = (state: State): boolean => state[NameSpace.Films].isFilmsDataLoading;
export const getPromoFilm = (state: State): Film | null => state[NameSpace.Films].promoFilm;
export const getCurrentFilm = (state: State): Film | null => state[NameSpace.Films].currentFilm;
export const getSimilarFilms = (state: State): Films => state[NameSpace.Films].similarFilms;
export const getFavoriteFilms = (state: State): Films => state[NameSpace.Films].favoriteFilms;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Films].hasError;
