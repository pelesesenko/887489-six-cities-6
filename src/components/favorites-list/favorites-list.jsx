import React from 'react';

import FavoritesGroup from '../favorites-group/favorites-group';

const FavoritesList = ({prepFavorites}) => {
  return (
    <>
      {prepFavorites.map((group) =>
        <FavoritesGroup group={group} key={group.cityName} />
      )}
    </>
  )
};

export default FavoritesList;
