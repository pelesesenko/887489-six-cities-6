import React from 'react';
import {hotelsPropTypes} from '../../prop-types';
import {groupOffersByCity} from '../../services/utilities';

import FavoritesGroup from '../favorites-group/favorites-group';

const FavoritesList = ({favorites}) => {
  const groupedFavorites = groupOffersByCity(favorites);

  return (
    <ul className="favorites__list">
      {groupedFavorites.map((group) =>
        <FavoritesGroup group={group} key={group.cityName} />
      )}
    </ul>
  );
};

FavoritesList.propTypes = {
  favorites: hotelsPropTypes
};

export default FavoritesList;
