import React from 'react';
import {prepareRating, formatDate} from '../../utilities/utilities';
import {commentPropTypes} from '../../prop-types';

const Review = ({review}) => {

  const {
    user,
    rating,
    comment,
    date
  } = review;
  // console.log(new Date(date).toLocaleString(`en-CA`, {dateStyle: `short`}))
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width={54} height={54} alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: prepareRating(rating)}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime="2019-04-24">{formatDate(date)}</time>
      </div>
    </li>
  );
};

Review.propTypes = {
  review: commentPropTypes
};


export default Review;
