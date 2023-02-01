import { NameSpace } from './../../const';
import { Comments } from '../../types/comment';
import { State } from './../../types/state';

export const getCurrentComments = (state: State): Comments => state[NameSpace.Comments].currentComments;
