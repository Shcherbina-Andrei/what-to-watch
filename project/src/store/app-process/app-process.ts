import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import {AppProcess} from '../../types/state';

const initialState: AppProcess = {
  genre: 'All genres',
  userEmail: null,
  userAvatarUrl: null
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    },
    setUserEmail: (state, action: PayloadAction<string | null>) => {
      state.userEmail = action.payload;
    },
    setUserAvatarUrl: (state, action: PayloadAction<string | null>) => {
      state.userAvatarUrl = action.payload;
    }
  }
});

export const {changeGenre, setUserEmail, setUserAvatarUrl} = appProcess.actions;

