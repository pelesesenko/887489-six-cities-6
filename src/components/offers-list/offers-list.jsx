import React from 'react';
import OfferCard from '../offer-card/offer-card';
import {MAIN_OFFERS} from '../../constants';
import {hotelsPropTypes} from '../../prop-types';
import PropTypes from 'prop-types';

const OffersList = ({items, changeActiveOfferId}) => {

  return (
    <div className="cities__places-list places__list tabs__content">
      {items.map((item) => <OfferCard offer={item} cardType={MAIN_OFFERS} key = {item.id} changeActiveOfferId={changeActiveOfferId}/>)}
    </div>
  );
};

OffersList.propTypes = {
  items: hotelsPropTypes,
  changeActiveOfferId: PropTypes.func
};

export default OffersList;
