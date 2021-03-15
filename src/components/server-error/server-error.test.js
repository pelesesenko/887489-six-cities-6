import 'leaked-handles';
import React from 'react';
import {render, screen} from '@testing-library/react';
import {TestWrapper} from '../../services/test-wrapper/test-wrapper';

import ServerError from './server-error';

describe(`Test ServerError`, () => {

  it(`ServerError should render correctly when server is not available`, () => {

    const stateModifier = {serverAvailability: false};
    render(
        <TestWrapper stateModifier={stateModifier}>
          <ServerError />
        </TestWrapper>
    );
    expect(screen.getByText(/Server is not available/i)).toBeInTheDocument();
  });
  it(`ServerError should render correctly when server is available`, () => {

    render(
        <TestWrapper >
          <ServerError />
        </TestWrapper>
    );
    expect(screen.queryByText(/Server is not available/i)).toBe(null);
  });
});
