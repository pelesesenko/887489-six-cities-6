import React from 'react';
import {render} from '@testing-library/react';
import {filled} from '../../services/test-wrapper/mock-states';

import RoomGood from './room-good';

it(`RoomGood should render correctly`, () => {

  const good = filled.offers.entities[0].goods[0];

  const {container} = render(
      <RoomGood good={good}/>
  );

  expect(container).toMatchSnapshot();
});
