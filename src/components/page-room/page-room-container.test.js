import React from 'react';
import {render, screen, cleanup} from '@testing-library/react';
import {Route} from 'react-router-dom';
import {TestWrapper} from '../../services/test-wrapper/test-wrapper';
import {AppPaths} from '../../constants';

import PageRoomContainer from './page-room-container';

it(`PageRoomContainer should correctly define the parameter, load data, clear data on unmount`, () => {

  const mockDispatch = jest.fn();
  render(
      <TestWrapper url ={`/offer/3`} mockDispatch={mockDispatch}>
        <Route path={AppPaths.ROOM} exact render={() => <PageRoomContainer/>}/>
      </TestWrapper>
  );
  expect(screen.getByText(`Amazing and Extremely Central Flat`)).toBeInTheDocument();

  expect(mockDispatch).toHaveBeenCalledTimes(2);

  cleanup();

  expect(mockDispatch).toHaveBeenCalledTimes(3);
});

