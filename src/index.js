import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const offersAmountToShow = 5;

ReactDOM.render(
    <App offersAmountToShow={offersAmountToShow} />,
    document.querySelector(`#root`)
);
