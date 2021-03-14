import React from 'react';
import {render, screen} from '@testing-library/react';
import {TestWrapper} from '../../services/test-wrapper/test-wrapper';
import {AppPaths, AuthorizationStatus} from '../../constants';

import App from './app';

describe(`Test routing`, () => {

  it(`Render 'PageSignIn' when user navigate to '/login' url`, () => {

    render(
        <TestWrapper url={AppPaths.LOGIN} init stateModifier={{authorizationStatus: AuthorizationStatus.NO_AUTH}}>
          <App />
        </TestWrapper>
    );

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it(`Render 'PageFavorites' when user navigate to '/' url`, () => {

    render(
        <TestWrapper url={AppPaths.FAVORITES}>
          <App />
        </TestWrapper>
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });
  it(`Render 'PageRoomContainer' when user navigate to '/offer/:id?' url`, () => {

    render(
        <TestWrapper url={`/offer/1`}>
          <App />
        </TestWrapper>
    );

    expect(screen.getByText(/Canal View Prinsengracht/i)).toBeInTheDocument();
    expect(screen.getByText(/Peaceful studio in the most wanted area in town/i)).toBeInTheDocument();
  });

  it(`Render 'PageMain' when user navigate to '/' url`, () => {

    render(
        <TestWrapper >
          <App />
        </TestWrapper>
    );

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });
  it(`Render 'PageNotFound' when user redirected to '/not-found' url`, () => {

    render(
        <TestWrapper url={AppPaths.NOT_FOUND}>
          <App />
        </TestWrapper>
    );

    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });
  it(`Render 'PageNotFound' when navigate to non-existent url`, () => {

    render(
        <TestWrapper url={`non-existent-url`}>
          <App />
        </TestWrapper>
    );

    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });
});
