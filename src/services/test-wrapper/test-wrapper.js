import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import * as states from './mock-states';

export const history = createMemoryHistory();
export const TestWrapper = ({
  children,
  init = false,
  url = null,
  stateModifier = {},
  mockDispatch = () =>{},
  mockHistory = null,
}) => {

  const mockStore = configureStore({});
  const store = mockStore(() => ({
    ...init ? states.initial : states.filled,
    ...stateModifier,
  }));

  if (!mockHistory) {
    mockHistory = createMemoryHistory();
  }

  if (url) {
    mockHistory.push(url);
  }
  store.dispatch = mockDispatch;

  return (
    <Provider store={store}>
      <Router history={mockHistory}>
        {children}
      </Router>
    </Provider>
  );
};

TestWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.arrayOf(PropTypes.object)]).isRequired,
  init: PropTypes.bool,
  url: PropTypes.string,
  stateModifier: PropTypes.object,
  mockDispatch: PropTypes.func,
  mockHistory: PropTypes.object,
};
