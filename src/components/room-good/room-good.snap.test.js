import 'leaked-handles';
import React from 'react';
import {render} from '@testing-library/react';
import {filled} from '../../services/test-wrapper/mock-states';
import {TestWrapper} from '../../services/test-wrapper/test-wrapper';

import RoomGood from './room-good';

it(`RoomGood should render correctly`, () => {

  const good = filled.offers.entities[0].goods[0];

  const {container} = render(
      <TestWrapper>
        <RoomGood good={good}/>
      </TestWrapper>
  );

  expect(container).toMatchSnapshot();
});
