import {userProcess} from './user-process/user-process';
import {appProcess} from './app-process/app-process';
import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {filmsData} from './films-data/films-data';
import {commentsData} from './comments-data/comments-data';

export const rootReducer = combineReducers({
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Films]: filmsData.reducer,
  [NameSpace.Comments]: commentsData.reducer
});

