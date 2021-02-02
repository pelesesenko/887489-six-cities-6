import React from 'react';
import MainPage from '../main-page/main-page';
import PropTypes from 'prop-types';

const App = (props) => {
  const {offersAmountToShow} = props;
  return (
    <MainPage offersAmountToShow={offersAmountToShow} />
  );
};

App.propTypes = {
  offersAmountToShow: PropTypes.number.isRequired,
};

export default App;
