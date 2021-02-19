import React from 'react';
import {hotelsPropTypes} from '../../prop-types';

import OfferCard from '../offer-card/offer-card';
import {CardTypes} from '../../constants';

export const NearbyList = ({nearOffers}) => {
  return (
    <div className="near-places__list places__list">
      {nearOffers.map((offer) =>
        <OfferCard offer={offer} cardType={CardTypes.NEARBY_OFFERS} key={offer.id} />
      )}
    </div>
  );
};

NearbyList.propTypes = {
  nearOffers: hotelsPropTypes
};

export default NearbyList;
