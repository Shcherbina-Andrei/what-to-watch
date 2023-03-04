import {useEffect, useRef, useState} from 'react';
import { Film } from '../../types/film';

type PageProps = {
  film: Film;
  isPlaying: boolean;
}

function VideoPlayer({film, isPlaying}: PageProps): JSX.Element {
  const [, setIsLoading] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const isVideoPlayerMounted = true;

    if (videoRef.current === null) {
      return;
    }

    videoRef.current.addEventListener('loadeddata', () => {
      if (isVideoPlayerMounted) {
        setIsLoading(false);
      }
    });

    if (isPlaying) {
      videoRef.current.play();
      return;
    }

    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    videoRef.current.load();
  });

  return (
    <video src={film.previewVideoLink} className="player__video" poster={film.posterImage} ref={videoRef} muted data-testid="video-player">
    </video>
  );
}

export default VideoPlayer;
