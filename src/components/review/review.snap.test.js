import 'leaked-handles';
import React from 'react';
import {render} from '@testing-library/react';
import {mockReviews} from '../../services/test-wrapper/mock-reviews';
import {TestWrapper} from '../../services/test-wrapper/test-wrapper';

import Review from './review';

it(`Review should render correctly`, () => {

  const review = mockReviews[0];

  const {container} = render(
      <TestWrapper>
        <Review review={review}/>
      </TestWrapper>
  );

  expect(container).toMatchSnapshot();
});
