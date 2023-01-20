import {Film, Films} from '../types/film';

export const filterRelatedFilms = (currentFilm: Film, films: Films): Films => films.filter((film) => currentFilm.name !== film.name && film.genre === currentFilm.genre);
