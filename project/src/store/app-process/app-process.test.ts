import { appProcess, changeGenre, setUserAvatarUrl, setUserEmail } from './app-process';
describe('Reducer: appProcess', () => {
  const genre = 'All genres';

  it('without additional parameters should return initial state', () => {
    expect(appProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({genre, userEmail: null, userAvatarUrl: null});
  });

  it('should change genre', () => {
    const state = {genre, userEmail: null, userAvatarUrl: null};
    const newGenre = 'thriller';
    expect(appProcess.reducer(state, changeGenre(newGenre)))
      .toEqual({genre: newGenre, userEmail: null, userAvatarUrl: null});
  });

  it('should set user\'s email', () => {
    const state = {genre, userEmail: null, userAvatarUrl: null};
    const newUserEmail = 'noname@123.com';
    expect(appProcess.reducer(state, setUserEmail(newUserEmail)))
      .toEqual({genre, userEmail: newUserEmail, userAvatarUrl: null});
  });

  it('should set user\'s avatar', () => {
    const state = {genre, userEmail: null, userAvatarUrl: null};
    const newAvatarUrl = 'server.com/image324234234';
    expect(appProcess.reducer(state, setUserAvatarUrl(newAvatarUrl)))
      .toEqual({genre, userEmail: null, userAvatarUrl: newAvatarUrl});
  });
});
