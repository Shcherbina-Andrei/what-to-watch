import { Film, Films } from './../types/film';
import {films} from '../mocks/films';
import {createReducer} from '@reduxjs/toolkit';
import { changeGenreAction, getFilmsAction } from './action';

type InitialState = {
  currentFilm: Film;
  genre: string;
  films: Films;
}

const initialState: InitialState = {
  currentFilm: films[0],
  genre: 'All genres',
  films: films
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenreAction, (state, action) => {
      state.genre = action.payload.genre;
    })
    .addCase(getFilmsAction, (state, action) => {
      state.films = action.payload.films;
    });
});

export {reducer};
