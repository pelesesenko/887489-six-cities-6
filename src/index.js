import React from 'react';
import ReactDOM from 'react-dom';
import browserHistory from "./browser-history";
import {Router as BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {createApi} from './services/api';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {reducer} from './store/reducers/reducer';
import App from './components/app/app';
import {ActionCreator} from './store/actions';
import {checkAuth, fetchOffers} from './store/api-actions';
import {AuthorizationStatus, ErrorStatus} from './constants';

const api = createApi(() => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
}, ErrorStatus.UNAUTHORIZED);

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api))
));

store.dispatch(checkAuth());
store.dispatch(fetchOffers());

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter history={browserHistory}>
        <App/>
      </BrowserRouter>
    </Provider>,
    document.querySelector(`#root`)
);
