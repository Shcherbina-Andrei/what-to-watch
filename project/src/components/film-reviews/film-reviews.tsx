import { useAppSelector } from '../../hooks';

function FilmReviews(): JSX.Element {
  const comments = useAppSelector((state) => state.currentComments);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {comments.map((comment) => (
          <div className="review" key={comment.id}>
            <blockquote className="review__quote">
              <p className="review__text">{comment.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{comment.user.name}</cite>
                <time className="review__date" dateTime="2016-12-24">{comment.date}</time>
              </footer>
            </blockquote>

            <div className="review__rating">{comment.rating}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilmReviews;
