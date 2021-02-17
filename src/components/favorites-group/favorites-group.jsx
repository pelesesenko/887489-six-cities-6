import React from 'react';
import PropTypes from 'prop-types';
import {hotelsPropTypes} from '../../prop-types';

import OfferCard from '../offer-card/offer-card';
import {FAVORITES_OFFERS} from '../../constants';

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
        {favoritesInCity.map((offer) =>
          <OfferCard offer={offer} cardName={FAVORITES_OFFERS} key={offer.id} />
        )}
      </div>
    </li>
  );
};

FavoritesGroup.propTypes = {
  group: PropTypes.shape({
    cityName: PropTypes.string.isRequired,
    favoritesInCity: hotelsPropTypes
  })
};


export default FavoritesGroup;

