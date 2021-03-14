import React from 'react';
import {render} from '@testing-library/react';
import {TestWrapper} from '../../services/test-wrapper/test-wrapper';
import {Cities} from '../../constants';
import {filled} from '../../services/test-wrapper/mock-states';

import FavoritesGroup from './favorites-group';

it(`FavoritesGroup should render correctly`, () => {

  const offersInCity = [filled.offers.entities[1]];
  const group = {cityName: Cities.COLOGNE, offersInCity};

  const {container} = render(
      <TestWrapper >
        <FavoritesGroup group={group}/>
      </TestWrapper>
  );
  const cityLink = container.querySelector(`.locations__item-link`);

  expect(cityLink.firstChild.innerHTML).toBe(Cities.COLOGNE);
});
