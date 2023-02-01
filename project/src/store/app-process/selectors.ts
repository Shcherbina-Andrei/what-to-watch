import {NameSpace} from '../../const';
import {State} from './../../types/state';

export const getGenre = (state: State) => state[NameSpace.App].genre;
export const getUserEmail = (state: State) => state[NameSpace.App].userEmail;
export const getAvatarUrl = (state: State) => state[NameSpace.App].userAvatarUrl;
