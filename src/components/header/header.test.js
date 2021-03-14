import React from 'react';
import {render, screen} from '@testing-library/react';
import {TestWrapper} from '../../services/test-wrapper/test-wrapper';
import {AuthorizationStatus} from '../../constants';
import {filled} from '../../services/test-wrapper/mock-states';
import userEvent from '@testing-library/user-event';

import Header from './header';

describe(`Test Header`, () => {
  it(`Header should render correctly`, () => {

    const mockDispatch = jest.fn();
    const email = filled.currentUser.email;

    render(
        <TestWrapper mockDispatch={mockDispatch}>
          <Header/>
        </TestWrapper>
    );
    const logoutButton = screen.getByRole(`button`);

    userEvent.click(logoutButton);

    expect(screen.queryByText(/Sign In/i)).toBe(null);
    expect(screen.getByText(email)).toBeInTheDocument();
    expect(screen.getAllByRole(`link`).length).toBe(2);
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });

  it(`Header should render correctly without authorization`, () => {

    const stateModifier = {authorizationStatus: AuthorizationStatus.NO_AUTH};
    const email = filled.currentUser.email;

    render(
        <TestWrapper stateModifier={stateModifier}>
          <Header/>
        </TestWrapper>
    );

    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
    expect(screen.queryByText(email)).toBe(null);
    expect(screen.getAllByRole(`link`).length).toBe(2);
    expect(screen.queryByRole(`button`)).toBe(null);
  });

  it(`Header on PageMain should not have link to itself`, () => {

    render(
        <TestWrapper >
          <Header mainFlag/>
        </TestWrapper>
    );

    expect(screen.getAllByRole(`link`).length).toBe(1);
  });

});

