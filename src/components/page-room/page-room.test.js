import React from 'react';
import {render, screen} from '@testing-library/react';
import {TestWrapper} from '../../services/test-wrapper/test-wrapper';
import {mockReviews} from '../../services/test-wrapper/mock-reviews';

import PageRoom from './page-room';

describe(`Test PageRoom`, () => {
  it(`PageRoom should render correctly with authorized user`, () => {

    const mockSetReviews = jest.fn();
    jest.spyOn(React, `useState`).mockImplementation(() => [mockReviews, mockSetReviews]);
    jest.spyOn(React, `useEffect`).mockImplementation(() => {});

    render(
        <TestWrapper >
          <PageRoom id={3} isAuthorized={true} isRoomLoaded={true} isNearbyLoaded={true}/>
        </TestWrapper>
    );

    expect(screen.getByLabelText(/Your review/i)).toBeInTheDocument();
  });

  it(`PageRoom should render correctly with unauthorized user`, () => {

    const mockSetReviews = jest.fn();
    jest.spyOn(React, `useState`).mockImplementation(() => [mockReviews, mockSetReviews]);
    jest.spyOn(React, `useEffect`).mockImplementation(() => {});

    render(
        <TestWrapper >
          <PageRoom id={3} isAuthorized={false} isRoomLoaded={true} isNearbyLoaded={true}/>
        </TestWrapper>
    );

    expect(screen.queryByLabelText(/Your review/i)).toBe(null);
  });
});


