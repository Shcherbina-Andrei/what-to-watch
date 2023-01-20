import {Helmet} from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import {Films} from '../../types/film';
import NotFoundPage from '../not-found-page/not-found-page';
import {useEffect, useRef, useState} from 'react';

type PageProps = {
  films: Films;
}

function Player({films}: PageProps): JSX.Element {
  const params = useParams();
  const currentFilm = films.find((film) => film.id.toString() === params.id);

  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let isVideoPlayerMounted = true;

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


  });

  if (!currentFilm) {
    return <NotFoundPage />;
  }

  return (
    <div className="player">
      <Helmet>
        <title>Watching movie</title>
      </Helmet>
      <video src="https://cdn.coverr.co/videos/coverr-man-making-a-snowman-227/1080p.mp4" className="player__video" poster={currentFilm.posterImage} ref={videoRef}>
      </video>

      <button type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
          </div>
          <div className="player__time-value">1:30:29</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={() => setIsPlaying(!isPlaying)}>
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;

