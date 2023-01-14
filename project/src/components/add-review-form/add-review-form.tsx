import React from 'react';
import {useState} from 'react';
import { Ratings } from '../../const';

function AddReviewForm(): JSX.Element {
  const [review, setReview] = useState({rating: '0', text: ''});

  return (
    <div className="add-review">
      <form action="#" className="add-review__form">
        <div className="rating">
          <div className="rating__stars">
            {Ratings.map((rating) => (
              <React.Fragment key={rating}>
                <input className="rating__input" id={`star-${rating}`} type="radio" name="rating"
                  value={rating} checked={review.rating === rating} onChange={(evt) => setReview({...review, rating: evt.target.value})}
                />
                <label className="rating__label" htmlFor={`star-${rating}`}>Rating {rating}</label>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="add-review__text">
          <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" value={review.text}
            onChange={(evt) => setReview({...review, text: evt.target.value})}
          >
          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>

        </div>
      </form>
    </div>
  );
}

export default AddReviewForm;
