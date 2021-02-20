import React from 'react';
import {Cities} from '../../constants';
import PropTypes from 'prop-types';

export const CitiesList = ({currentCityName, onSetCity}) => {

  return (
    <ul className="locations__list tabs__list">
      {Object.keys(Cities).map((key) => (
        <li onClick={() => onSetCity(Cities[key])} className="locations__item" key={Cities[key]}>
          <a className=
            {`locations__item-link tabs__item${Cities[key] === currentCityName ? ` tabs__item--active` : ``}`}>
            <span>{Cities[key]}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

CitiesList.propTypes = {
  currentCityName: PropTypes.oneOf(Object.values(Cities)),
  onSetCity: PropTypes.func
};

export default CitiesList;
