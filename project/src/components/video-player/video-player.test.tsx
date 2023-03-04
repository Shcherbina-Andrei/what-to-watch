import { render, screen } from '@testing-library/react';
import { makeFilmItem } from '../../utils/mocks';
import VideoPlayer from './video-player';

const film = makeFilmItem();

describe('Component: VideoPlayer', () => {
  it('should render correctly', () => {
    render(
      <VideoPlayer film={film} isPlaying={false} />
    );

    expect(screen.getByTestId('video-player')).toBeInTheDocument();
  });
});
