import React from 'react';
import {render} from '@testing-library/react';
import {TestWrapper} from '../../services/test-wrapper/test-wrapper';
import {mockReviews} from '../../services/test-wrapper/mock-reviews';

import PageRoom from './page-room';


it(`PageRoom should render correctly`, () => {

  const mockSetReviews = jest.fn();
  jest.spyOn(React, `useState`).mockImplementation(() => [mockReviews, mockSetReviews]);
  jest.spyOn(React, `useEffect`).mockImplementation(() => {});

  const {container} = render(
      <TestWrapper >
        <PageRoom id={3} isAuthorized={true} isRoomLoaded={true} isNearbyLoaded={true}/>
      </TestWrapper>
  );

  expect(container).toMatchSnapshot();
});
