import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {createApi} from './services/api';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {reducer} from './store/reducers/reducer';
import App from './components/app/app';
import {Reviews} from './mocks/reviews';
import {Favorites} from './mocks/favorites';
import {ActionCreator} from './store/actions';
import {checkAuth} from './store/api-actions';
import {AuthorizationStatus, ErrorStatus} from './constants';

const api = createApi(() => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
}, ErrorStatus.UNAUTHORIZED);

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api))
));

store.dispatch(checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App
        reviews={Reviews}
        favorites={Favorites}
      />
    </Provider>,
    document.querySelector(`#root`)
);
