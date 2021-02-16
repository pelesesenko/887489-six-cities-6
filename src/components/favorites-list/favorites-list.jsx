import React from 'react';
import PropTypes from 'prop-types';
import {hotelsPropTypes} from '../../prop-types';

import FavoritesGroup from '../favorites-group/favorites-group';

const FavoritesList = ({prepFavorites}) => {
  return (
    <ul className="favorites__list">
      {prepFavorites.map((group) =>
        <FavoritesGroup group={group} key={group.cityName} />
      )}
    </ul>
  );
};

FavoritesList.propTypes = {
  prepFavorites: PropTypes.arrayOf(PropTypes.shape({
    cityName: PropTypes.string.isRequired,
    favoritesInCity: hotelsPropTypes
  }))
};

export default FavoritesList;
