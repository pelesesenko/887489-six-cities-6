import React from 'react';
import {render, screen} from '@testing-library/react';
import {Route} from 'react-router-dom';
import {TestWrapper} from '../../services/test-wrapper/test-wrapper';
import {AuthorizationStatus} from '../../constants';

import PrivateRoute from './private-route';

describe(`Test Privat Route`, () => {

  it(`PrivateRoute should redirect to login page with unauthorized user`, () => {

    const stateModifier = {authorizationStatus: AuthorizationStatus.NO_AUTH};
    render(
        <TestWrapper url={`private-path`} stateModifier={stateModifier}>
          <Route exact path="/login"><h1>Login page</h1></Route>
          <PrivateRoute exact path="/private-path" render={() => <h1>Privat page</h1>}/>
        </TestWrapper>
    );
    expect(screen.getByText(/Login page/i)).toBeInTheDocument();
  });
  it(`PrivateRoute should render correct component with authorized user`, () => {

    render(
        <TestWrapper url={`private-path`}>
          <Route exact path="/login"><h1>Login page</h1></Route>
          <PrivateRoute exact path="/private-path" render={() => <h1>Privat page</h1>}/>
        </TestWrapper>
    );
    expect(screen.getByText(/Privat page/i)).toBeInTheDocument();
  });
  it(`PrivateRoute should show spinner when authorization not checked`, () => {

    render(
        <TestWrapper init url={`private-path`}>
          <Route exact path="/login"><h1>Login page</h1></Route>
          <PrivateRoute exact path="/private-path" render={() => <h1>Privat page</h1>}/>
        </TestWrapper>
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});

