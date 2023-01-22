import {Film, Films} from '../types/film';

export const filterRelatedFilms = (currentFilm: Film, films: Films): Films => films.filter((film) => currentFilm.name !== film.name && film.genre === currentFilm.genre);

export const getFilmsByGenre = (films: Films, genre: string): Films => {
  if (genre === 'All genres') {
    return films;
  }

  return films.filter((film) => film.genre === genre);
};
