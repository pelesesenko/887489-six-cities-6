import React from 'react';
import OfferCard from '../offer-card/offer-card';
import PropTypes from 'prop-types';

const OffersList = ({items}) => {

  return (
    <>
      {items.map((item) => <OfferCard offer={item} key = {item.id} />)}
    </>
  );


};

export default OffersList;
