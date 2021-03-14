import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {TestWrapper} from '../../services/test-wrapper/test-wrapper';
import userEvent from '@testing-library/user-event';
import PageMain from '../page-main/page-main';

import {PageSignIn} from './page-sign-in';

describe(`Test PageSignIn`, () => {
  it(`PageSignIn should redirect to PageMain when user is athorized`, () => {
    render(
        <TestWrapper>
          <PageMain/>
          <PageSignIn isAuthorized onLogin={() =>{}}/>
        </TestWrapper>
    );
    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });
  it(`PageSignIn should render and handle event correctly`, () => {

    const mockOnLogin = jest.fn();
    const login = `1234@mail.ru`;
    const password = `123`;

    render(
        <TestWrapper init >
          <PageSignIn onLogin={mockOnLogin} isAuthorized={false}/>
        </TestWrapper>
    );
    const loginInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const form = screen.getByTestId(`login-form`);

    userEvent.type(loginInput, login);
    userEvent.type(passwordInput, password);

    expect(screen.getByDisplayValue(login)).toBeInTheDocument();
    expect(screen.getByDisplayValue(password)).toBeInTheDocument();

    fireEvent.submit(form);
    expect(mockOnLogin).toHaveBeenCalledWith({login, password});
    expect(mockOnLogin).toHaveBeenCalledWith({login, password});
  });
});
