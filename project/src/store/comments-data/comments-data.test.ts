import { fetchCommentsAction } from './../api-actions';
import { makeComments } from './../../utils/mocks';
import { Comments } from './../../types/comment';
import { commentsData } from './comments-data';

const comments: Comments = makeComments();

describe('Reducer: commentsData', () => {
  it('without additional parameters should return initial state', () => {
    expect(commentsData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({currentComments: []});
  });

  it('should update comments by load comments', () => {
    const state = {currentComments: []};
    expect(commentsData.reducer(state, {type: fetchCommentsAction.fulfilled.type, payload: comments}))
      .toEqual({currentComments: comments});
  });
});
