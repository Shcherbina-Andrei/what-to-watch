import {Helmet} from 'react-helmet-async';
import {useNavigate, useParams} from 'react-router-dom';
import NotFoundPage from '../not-found-page/not-found-page';
import {SyntheticEvent, useEffect, useRef, useState} from 'react';
import {useAppSelector} from '../../hooks';
import {getFilms} from '../../store/films-data/selectors';
import { formatDurationForPlayer, formatDurationToPercents } from '../../utils/format-duration';

function Player(): JSX.Element {
  const params = useParams();
  const films = useAppSelector(getFilms);
  const currentFilm = films.find((film) => film.id.toString() === params.id);
  const [minutesLeft, setMinutesLeft] = useState({minutesPercentsLeft: 0, minutes: '0'});

  const navigate = useNavigate();

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleProgressVideo = (evt: SyntheticEvent<HTMLVideoElement>) => {
    if(evt.currentTarget.duration) {
      setMinutesLeft({
        ...minutesLeft,
        minutesPercentsLeft: formatDurationToPercents(evt.currentTarget.currentTime, evt.currentTarget.duration),
        minutes: formatDurationForPlayer((evt.currentTarget.duration - evt.currentTarget.currentTime) / 60)
      });
    }
  };

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
    } else {
      videoRef.current.pause();
    }
  }, [minutesLeft, isPlaying]);

  const setFullScreen = () => {
    videoRef.current?.requestFullscreen();
  };

  if (!currentFilm) {
    return <NotFoundPage />;
  }

  return (
    <div className="player">
      <Helmet>
        <title>Watching movie</title>
      </Helmet>
      <video src={currentFilm.videoLink} className="player__video" poster={currentFilm.previewImage} ref={videoRef} onTimeUpdate={handleProgressVideo}>
      </video>

      <button type="button" className="player__exit" onClick={() => navigate(-1)}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={minutesLeft.minutesPercentsLeft} max="100"></progress>
            <div className="player__toggler" style={{left: `${minutesLeft.minutesPercentsLeft}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{minutesLeft.minutes}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={() => setIsPlaying(!isPlaying)}>
            {
              isPlaying
                ?
                <>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </>
                :
                <>
                  <svg viewBox="0 0 14 21" width="14" height="21">
                    <use xlinkHref="#pause"></use>
                  </svg>
                  <span>Pause</span>
                </>
            }
          </button>
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen" onClick={setFullScreen}>
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

