import React, {useState} from 'react';
import OfferCard from '../offer-card/offer-card';
import {hotelsPropTypes} from '../../prop-types';

const OffersList = ({items}) => {
  const [activeItemId, setActiveItemId] = useState(null);

  function handleMouseOver(evt) {
    if (activeItemId) {
      return;
    }
    let target = evt.target.closest(`article`);
    if (!target) {
      return;
    }
    setActiveItemId(target.dataset.offerId);
  }

  function handleMouseOut(evt) {
    if (!activeItemId) {
      return;
    }
    let relatedTarget = evt.relatedTarget;
    while (relatedTarget) {
      if (relatedTarget
        && relatedTarget.dataset
        && relatedTarget.dataset.offerId === activeItemId) {
        return;
      }
      relatedTarget = relatedTarget.parentNode;
    }
    setActiveItemId(null);
  }

  return (
    <div onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className="cities__places-list places__list tabs__content">
      {items.map((item) => <OfferCard offer={item} key = {item.id} />)}
    </div>
  );
};

OffersList.propTypes = {
  items: hotelsPropTypes
};

export default OffersList;
