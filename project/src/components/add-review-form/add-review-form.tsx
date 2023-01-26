import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { APIRoutes, Ratings } from '../../const';
import { useAppDispatch } from '../../hooks';
import { fetchSendNewCommentAction } from '../../store/api-actions';

const MAX_COMMENT_LENGTH = 400;
const MIN_COMMENT_LENGTH = 50;

type PropType = {
  currentId: number;
}

function AddReviewForm({currentId}: PropType): JSX.Element {
  const [commentItem, setCommentItem] = useState({rating: 0, text: ''});
  const [commentIsSending, setCommentIsSending] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const id = currentId;
    const comment = commentItem.text;
    const rating = commentItem.rating;
    setCommentIsSending(true);
    await dispatch(fetchSendNewCommentAction({id, comment, rating}));
    setCommentIsSending(false);
    setCommentItem({rating: 0, text: ''});
    navigate(`${APIRoutes.Films}/${currentId}`);
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={(evt) => {
        evt.preventDefault();
        handleSubmit();
      }}
      >
        <div className="rating">
          <div className="rating__stars">
            {Ratings.map((rating) => (
              <React.Fragment key={rating}>
                <input className="rating__input" id={`star-${rating}`} type="radio" name="rating"
                  value={rating} checked={String(commentItem.rating) === rating} onChange={(evt) => setCommentItem({...commentItem, rating: Number(evt.target.value)})}
                />
                <label className="rating__label" htmlFor={`star-${rating}`}>Rating {rating}</label>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="add-review__text">
          <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" value={commentItem.text}
            onChange={(evt) => setCommentItem({...commentItem, text: evt.target.value})}
          >
          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit"
              disabled={((commentItem.text.length < MIN_COMMENT_LENGTH || commentItem.text.length > MAX_COMMENT_LENGTH) || commentItem.rating === 0 || commentIsSending)}
            >Post
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}

export default AddReviewForm;
