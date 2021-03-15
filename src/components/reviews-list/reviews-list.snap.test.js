import 'leaked-handles';
import React from 'react';
import {render} from '@testing-library/react';
import {mockReviews} from '../../services/test-wrapper/mock-reviews';
import {TestWrapper} from '../../services/test-wrapper/test-wrapper';

import ReviewsList from './reviews-list';

it(`ReviewsList should render correctly`, () => {

  const {container} = render(
      <TestWrapper>
        <ReviewsList reviews={mockReviews}/>
      </TestWrapper>
  );

  expect(container).toMatchSnapshot();
});
