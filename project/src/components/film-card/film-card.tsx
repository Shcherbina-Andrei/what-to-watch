import { Link } from 'react-router-dom';
import {Film} from '../../types/film';
import VideoPlayer from '../video-player/video-player';
import {useEffect, useState} from 'react';

type PageProps = {
  film: Film;
  onActiveChange: (card: Film) => void;
}

function FilmCard({film, onActiveChange}: PageProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isActiveCard, setIsActiveCard] = useState(false);

  const onMouseOverCardHandle = () => {
    onActiveChange(film);
    setIsActiveCard(true);
  };

  const onMouseLeaveHandle = () => {
    setIsActiveCard(false);
  };

  useEffect(() => {
    if (isActiveCard) {
      const timerId = setTimeout(() => setIsPlaying(true), 1000);

      return () => clearTimeout(timerId);
    }

    setIsPlaying(false);
  },[isActiveCard]);

  return (
    <article className="small-film-card catalog__films-card"
      onMouseOver={onMouseOverCardHandle}
      onMouseLeave={onMouseLeaveHandle}
    >
      <div className="small-film-card__image">
        <VideoPlayer film={film} isPlaying={isPlaying}/>
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${film.id}`}>{film.name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;

