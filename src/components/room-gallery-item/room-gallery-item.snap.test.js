import React from 'react';
import {render} from '@testing-library/react';
import {filled} from '../../services/test-wrapper/mock-states';
import {TestWrapper} from '../../services/test-wrapper/test-wrapper';

import RoomGalleryItem from './room-gallery-item';

it(`RoomGalleryItem should render correctly`, () => {

  const url = filled.offers.entities[0].images[0];

  const {container} = render(
      <TestWrapper>
        <RoomGalleryItem url={url}/>
      </TestWrapper>
  );

  expect(container).toMatchSnapshot();
});
