import { Comments } from './comment';
import { Film, Films } from './film';
import {store} from '../store';
import { AuthorizationStatus } from '../const';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
}

export type AppProcess = {
  genre: string;
  userEmail: string | null;
  userAvatarUrl: string | null;
}

export type FilmsData = {
  isFilmsDataLoading: boolean;
  promoFilm: Film | null;
  currentFilm: Film | null;
  similarFilms: Films;
  favoriteFilms: Films;
  films: Films;
  hasError: boolean;
};

export type CommentsData = {
  currentComments: Comments;
}


