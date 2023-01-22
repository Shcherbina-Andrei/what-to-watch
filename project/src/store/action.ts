import {createAction} from '@reduxjs/toolkit';
import {Films} from '../types/film';

export const changeGenreAction = createAction<{genre: string}>('app/changeGenre');

export const getFilmsAction = createAction<{films: Films}>('films/get');
