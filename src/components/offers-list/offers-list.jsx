import React from 'react';
import OfferCard from '../offer-card/offer-card';
import {CardTypes} from '../../constants';
import {hotelsPropTypes} from '../../prop-types';
import PropTypes from 'prop-types';

const OffersList = ({items, onChangeActiveOffer}) => {

  return (
    <div className="cities__places-list places__list tabs__content">
      {items.map((item) => <OfferCard offer={item} cardType={CardTypes.MAIN_OFFERS} key = {item.id} onChangeActiveOffer={onChangeActiveOffer}/>)}
    </div>
  );
};

OffersList.propTypes = {
  items: hotelsPropTypes,
  onChangeActiveOffer: PropTypes.func
};

export default OffersList;
