import React, {useState, Fragment} from 'react';

import {Grades} from '../../constants';


const ReviewForm = () => {

  const [reviewForm, setReviewForm] = useState({review: ``, rating: 0});

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  const handleFieldChange = (evt) => {
    const {name, value} = evt.target;
    setReviewForm({...reviewForm, [name]: value});
  };

  return (
    <form onSubmit={handleSubmit} className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Grades.map((grade, i) => (
          <Fragment key={grade}>
            <input onChange={handleFieldChange} className="form__rating-input visually-hidden" name="rating" defaultValue={Grades.length - i} id={`${Grades.length - i}-stars`} type="radio"/>
            <label htmlFor={`${Grades.length - i}-stars`} className="reviews__rating-label form__rating-label" title={grade}>
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea onChange={handleFieldChange} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" defaultValue={``} />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
};

export default ReviewForm;
