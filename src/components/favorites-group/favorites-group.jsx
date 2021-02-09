import React from 'react';

import FavoriteCard from '../favorite-card/favorite-card';

const FavoritesGroup = ({group}) => {
  const {cityName, favoritesInCity} = group;

  return (
    <li className="favorites__locations-items" key={cityName}>
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <a className="locations__item-link" href="#">
          <span>{cityName}</span>
        </a>
      </div>
    </div>
    <div className="favorites__places">
      {favoritesInCity.map((favoriteOffer) =>
        <FavoriteCard offer={favoriteOffer} key={favoriteOffer.id} />
      )}
    </div>
  </li>
  );
};

export default FavoritesGroup;

