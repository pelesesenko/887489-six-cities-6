import React from 'react';
import {commentsPropTypes} from '../../prop-types';

import Review from '../review/review';

export const ReviewsList = ({reviews}) => (
  <>
    <h2 className="reviews__title">Reviews · <span className="reviews__amount">{reviews.length}</span></h2>
    <ul className="reviews__list">
      {reviews.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
      .slice(0, 10)
      .map((review) => <Review review={review} key={review.id}/>)}
    </ul>
  </>
);


ReviewsList.propTypes = {
  reviews: commentsPropTypes
};

export default ReviewsList;


