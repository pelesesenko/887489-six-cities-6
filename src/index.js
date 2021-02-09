import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {Offers} from './mocks/offers';
import {Reviews} from './mocks/reviews';
import {Favorites} from './mocks/favorites';

const offersAmountToShow = 5;

ReactDOM.render(
    <App
      offersAmountToShow={offersAmountToShow}
      offers={Offers}
      reviews={Reviews}
      favorites={Favorites}
      />,
    document.querySelector(`#root`)
);
