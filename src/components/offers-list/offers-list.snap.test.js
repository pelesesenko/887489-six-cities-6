import React from 'react';
import {render} from '@testing-library/react';
import {TestWrapper} from '../../services/test-wrapper/test-wrapper';
import {filled} from '../../services/test-wrapper/mock-states';

import OffersList from './offers-list';

it(`OffersList should render correctly`, () => {

  const offers = filled.offers.entities;

  const {container} = render(
      <TestWrapper >
        <OffersList items={offers} />
      </TestWrapper>
  );

  expect(container).toMatchSnapshot();
});
