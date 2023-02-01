import { fetchCommentsAction } from './../api-actions';
import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { CommentsData } from '../../types/state';

const initialState: CommentsData = {
  currentComments: []
};

export const commentsData = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.currentComments = action.payload;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.currentComments = [];
      });
  }
});
