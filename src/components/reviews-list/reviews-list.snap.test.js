import React from 'react';
import {render} from '@testing-library/react';
import {mockReviews} from '../../services/test-wrapper/mock-reviews';

import ReviewsList from './reviews-list';

it(`ReviewsList should render correctly`, () => {

  const {container} = render(
      <ReviewsList reviews={mockReviews}/>
  );

  expect(container).toMatchSnapshot();
});
