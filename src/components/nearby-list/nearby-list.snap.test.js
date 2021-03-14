import React from 'react';
import {render} from '@testing-library/react';
import {TestWrapper} from '../../services/test-wrapper/test-wrapper';
import {filled} from '../../services/test-wrapper/mock-states';

import NearbyList from './nearby-list';

it(`NearbyList should render correctly`, () => {

  const nearOffersId = filled.room.nearIds;

  const {container} = render(
      <TestWrapper >
        <NearbyList nearOffersId={nearOffersId}/>
      </TestWrapper>
  );

  expect(container).toMatchSnapshot();
});
