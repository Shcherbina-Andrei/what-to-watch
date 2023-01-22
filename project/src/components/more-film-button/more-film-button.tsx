type PageProps = {
  handleShowMoreFilms: () => void;
}

function MoreFilmButton({handleShowMoreFilms}: PageProps): JSX.Element {
  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={handleShowMoreFilms}>Show more</button>
    </div>
  );
}

export default MoreFilmButton;
