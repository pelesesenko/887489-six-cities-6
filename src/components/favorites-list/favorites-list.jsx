import React from 'react';
import PropTypes from 'prop-types';
import {hotelsPropTypes} from '../../prop-types';

import FavoritesGroup from '../favorites-group/favorites-group';

const FavoritesList = ({favorites}) => {
  return (
    <ul className="favorites__list">
      {favorites.map((group) =>
        <FavoritesGroup group={group} key={group.cityName} />
      )}
    </ul>
  );
};

FavoritesList.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.shape({
    cityName: PropTypes.string.isRequired,
    offersInCity: hotelsPropTypes
  }))
};

export default FavoritesList;
