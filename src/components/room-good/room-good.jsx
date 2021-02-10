import React from 'react';
import PropTypes from 'prop-types';

const RoomGood = ({good}) => (
  <li className="property__inside-item">
    {good}
  </li>
);

RoomGood.propTypes = {
  good: PropTypes.string.isRequired,
};


export default RoomGood;
