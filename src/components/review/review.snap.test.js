import React from 'react';
import {render} from '@testing-library/react';
import {mockReviews} from '../../services/test-wrapper/mock-reviews';

import Review from './review';

it(`Review should render correctly`, () => {

  const review = mockReviews[0];

  const {container} = render(
      <Review review={review}/>
  );

  expect(container).toMatchSnapshot();
});
