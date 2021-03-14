import React from 'react';
import {render} from '@testing-library/react';
import {TestWrapper} from '../../services/test-wrapper/test-wrapper';
import {filled} from '../../services/test-wrapper/mock-states';

import FavoritesList from './favorites-list';

it(`FavoritesList should render correctly`, () => {

  const favorites = filled.offers.entities;

  const {container} = render(
      <TestWrapper >
        <FavoritesList favorites={favorites}/>
      </TestWrapper>
  );

  expect(container).toMatchSnapshot();
});
