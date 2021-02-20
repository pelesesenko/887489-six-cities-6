import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {reducer} from './store/reducers/reducer';
import App from './components/app/app';
import {Offers} from './mocks/offers';
import {Reviews} from './mocks/reviews';
import {Favorites} from './mocks/favorites';

const offersAmountToShow = 5;
const store = createStore(reducer, composeWithDevTools());

ReactDOM.render(
    <Provider store={store}>
      <App
        offersAmountToShow={offersAmountToShow}
        offers={Offers}
        reviews={Reviews}
        favorites={Favorites}
      />
    </Provider>,
    document.querySelector(`#root`)
);
