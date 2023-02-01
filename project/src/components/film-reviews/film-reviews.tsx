import { useAppSelector } from '../../hooks';
import { getCurrentComments } from '../../store/comments-data/selectors';
import { formatDate } from '../../utils/format-comment-date';

function FilmReviews(): JSX.Element {
  const comments = useAppSelector(getCurrentComments);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {comments.length !== 0 ? comments.map((comment) => (
          <div className="review" key={comment.id}>
            <blockquote className="review__quote">
              <p className="review__text">{comment.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{comment.user.name}</cite>
                <time className="review__date" dateTime={comment.date}>{formatDate(comment.date)}</time>
              </footer>
            </blockquote>

            <div className="review__rating">{comment.rating}</div>
          </div>
        )) :
          <p className="review__author">No reviews yet...</p>}
      </div>
    </div>
  );
}

export default FilmReviews;
