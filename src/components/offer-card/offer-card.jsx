import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {prepareRating, upFirst} from '../../utilities/utilities';
import {hotelPropTypes} from '../../prop-types';
import {MAIN_OFFERS, FAVORITES_OFFERS, NEARBY_OFFERS} from '../../constants';

const OfferCard = ({offer, cardType}) => {

  const cardSettings = {
    [MAIN_OFFERS]: {
      cardClass: `cities__place-card`,
      imgWrapClass: `cities__image-wrapper`,
      infoClass: ``,
      imgSizes: [260, 200],
    },
    [FAVORITES_OFFERS]: {
      cardClass: `favorites__card`,
      imgWrapClass: `favorites__image-wrapper`,
      infoClass: `favorites__card-info`,
      imgSizes: [150, 110],
    },
    [NEARBY_OFFERS]: {
      cardClass: `near-places__card`,
      imgWrapClass: `near-places__image-wrapper`,
      infoClass: ``,
      imgSizes: [260, 200],
    }
  };

  const {isPremium, previewImage, price, title, isFavorite, rating, type, id} = offer;
  const offerLink = `/offer/${id}`;

  return (
    <article data-offer-id={id}
      className={`place-card ${cardSettings[cardType].cardClass}`}>
      {isPremium && <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className={`place-card__image-wrapper ${cardSettings[cardType].imgWrapClass}`}>
        <Link to={offerLink}>
          <img className="place-card__image"
            src={previewImage}
            width={cardSettings[cardType].imgSizes[0]}
            height={cardSettings[cardType].imgSizes[1]}
            alt="Place image" />
        </Link>
      </div>
      <div className={`place-card__info ${cardSettings[cardType].infoClass}`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text"> /&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${isFavorite && `place-card__bookmark-button--active`}`}
            type="button">
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">
              {`${isFavorite ? `In` : `To`} bookmarks`}
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: prepareRating(rating)}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={offerLink}>{title}</Link>
        </h2>
        <p className="place-card__type">{upFirst(type)}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = {
  offer: hotelPropTypes,
  cardType: PropTypes.string.isRequired,
};

export default OfferCard;
