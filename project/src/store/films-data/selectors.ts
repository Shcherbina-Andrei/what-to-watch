import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getFilms = (state: State) => state[NameSpace.Films].films;
export const getFilmsDataLoadingStatus = (state: State) => state[NameSpace.Films].isFilmsDataLoading;
export const getPromoFilm = (state: State) => state[NameSpace.Films].promoFilm;
export const getCurrentFilm = (state: State) => state[NameSpace.Films].currentFilm;
export const getSimilarFilms = (state: State) => state[NameSpace.Films].similarFilms;
export const getFavoriteFilms = (state: State) => state[NameSpace.Films].favoriteFilms;
export const getErrorStatus = (state: State) => state[NameSpace.Films].hasError;
