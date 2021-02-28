import React, {useState, Fragment, useRef} from 'react';
import PropTypes from 'prop-types';

import {createApi} from '../../services/api';
import {reviewsAdapter} from '../../services/adapters';
import {Grades, ReviewLength, APIRoutes} from '../../constants';

const ReviewForm = ({roomId, onSentReview}) => {
  const formRef = useRef(null);
  const initialState = {comment: ``, rating: 0};

  const [reviewForm, setReviewForm] = useState(initialState);
  const [sendingFailed, setSendingFailed] = useState(false);

  const handleSendError = () => {
    setSendingFailed(true);
    setTimeout(() => setSendingFailed(false), 4000);
  };

  const isReviewFormValid = (
    reviewForm.comment.length > ReviewLength.MIN &&
    reviewForm.comment.length < ReviewLength.MAX &&
    reviewForm.rating
  );
  const reviewFormApi = createApi();
  const handleSubmit = (evt) => {
    evt.preventDefault();

    reviewFormApi.post(APIRoutes.COMMENTS + roomId, reviewForm)
    .then(({data}) => reviewsAdapter(data))
    .then((data) => onSentReview(data))
    .then(() => {
      setReviewForm({...initialState});
      [...formRef.current.rating].forEach((el) => {
        el.checked = false;
      });
    })
    .catch(() => handleSendError());
  };

  const handleFieldChange = (evt) => {
    const {name, value} = evt.target;
    setReviewForm({...reviewForm, [name]: value});
  };

  return (
    <>
      {sendingFailed && <b>Something went wrong... Please, try again</b>}
      <form onSubmit={handleSubmit} ref={formRef} className="reviews__form form" action="#" method="post">
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          {Grades.map((grade, i) => (
            <Fragment key={grade}>
              <input onChange={handleFieldChange} className="form__rating-input visually-hidden" name="rating"
                defaultValue={Grades.length - i} id={`${Grades.length - i}-stars`} type="radio"/>
              <label htmlFor={`${Grades.length - i}-stars`} className="reviews__rating-label form__rating-label" title={grade}>
                <svg className="form__star-image" width={37} height={33}>
                  <use xlinkHref="#icon-star" />
                </svg>
              </label>
            </Fragment>
          ))}
        </div>
        <textarea onChange={handleFieldChange} className="reviews__textarea form__textarea" id="review" name="comment" placeholder="Tell how was your stay, what you like and what can be improved" value={reviewForm.comment}/>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled={!isReviewFormValid}>Submit</button>
        </div>
      </form>
    </>
  );
};

ReviewForm.propTypes = {
  roomId: PropTypes.string.isRequired,
  onSentReview: PropTypes.func.isRequired,
};

export default ReviewForm;
