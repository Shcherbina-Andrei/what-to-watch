import {useState} from 'react';
import {Film, Films} from '../../types/film';
import FilmCard from '../film-card/film-card';

type PageProps = {
  films: Films;
}

function FilmsList({films}: PageProps): JSX.Element {
  const [, setActiveFilmCard] = useState('');
  const handleActiveFilmCard = (card: Film): void => {
    setActiveFilmCard(card.id.toString());
  };
  return (
    <div className="catalog__films-list">
      {films.map((film) => <FilmCard key={film.id} film={film} onActiveChange={handleActiveFilmCard}/>)}
    </div>
  );
}

export default FilmsList;
