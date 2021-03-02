import React from 'react';
import PropTypes from 'prop-types';

import OfferCard from '../offer-card/offer-card';
import {CardTypes} from '../../constants';

export const NearbyList = ({nearOffersId}) => {

  return (
    <div className="near-places__list places__list">
      {nearOffersId.map((id) =>
        <OfferCard id={id} cardType={CardTypes.NEARBY_OFFERS} key={id} />
      )}
    </div>
  );
};

NearbyList.propTypes = {
  nearOffersId: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default NearbyList;
