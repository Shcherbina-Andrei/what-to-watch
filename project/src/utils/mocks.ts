import { Comments } from './../types/comment';
import { Films } from './../types/film';
import { Film } from '../types/film';
import {name, random, internet, date, datatype} from 'faker';
import { Comment } from '../types/comment';

export const makeFilmItem = (): Film => ({
  id: datatype.number(),
  name: random.word(),
  posterImage: internet.url(),
  previewImage: internet.url(),
  backgroundImage: internet.url(),
  backgroundColor: internet.color(),
  videoLink: internet.url(),
  previewVideoLink: internet.url(),
  description: random.words(),
  rating: datatype.number(),
  scoresCount: datatype.number(),
  director: name.lastName(),
  starring: [name.lastName(), name.lastName(), name.lastName()],
  runTime: datatype.number(),
  genre: random.word(),
  released: datatype.number(),
  isFavorite: datatype.boolean(),
});

export const makeFilms = () => {
  const films: Films = [];
  for (let i = 0; i < 5; i++) {
    films.push(makeFilmItem());
  }

  return films;
};

export const makeCommentItem = (): Comment => ({
  comment: random.words(),
  date: date.past().toDateString(),
  id: datatype.number(),
  rating: datatype.number(),
  user: {
    id: datatype.number(),
    name: name.firstName()
  }
});

export const makeComments = () => {
  const comments: Comments = [];
  for (let i = 0; i < 5; i++) {
    comments.push(makeCommentItem());
  }

  return comments;
};
