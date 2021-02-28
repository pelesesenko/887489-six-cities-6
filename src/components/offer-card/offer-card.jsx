import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {prepareRating, upFirst} from '../../utilities/utilities';
import {hotelPropTypes} from '../../prop-types';
import {CardTypes} from '../../constants';
import {resetFavoriteStatus} from '../../store/api-actions';

const OfferCard = ({id, offer, cardType, onChangeActiveOffer = () => {}, onResetFavoriteStatus}) => {

  const cardSettings = {
    [CardTypes.MAIN_OFFERS]: {
      cardClass: `cities__place-card`,
      imgWrapClass: `cities__image-wrapper`,
      infoClass: ``,
      imgSizes: [260, 200],
    },
    [CardTypes.FAVORITES_OFFERS]: {
      cardClass: `favorites__card`,
      imgWrapClass: `favorites__image-wrapper`,
      infoClass: `favorites__card-info`,
      imgSizes: [150, 110],
    },
    [CardTypes.NEARBY_OFFERS]: {
      cardClass: `near-places__card`,
      imgWrapClass: `near-places__image-wrapper`,
      infoClass: ``,
      imgSizes: [260, 200],
    }
  };

  const {isPremium, previewImage, price, title, isFavorite, rating, type} = offer;
  const offerLink = `/offer/${id}`;

  const handleFavButtonClick = () => {
    const status = isFavorite ? 0 : 1;
    onResetFavoriteStatus(id, status);
  };

  return (
    <article
      onMouseEnter={() => onChangeActiveOffer(id)}
      onMouseLeave={() => onChangeActiveOffer(null)}
      className={`place-card ${cardSettings[cardType].cardClass}`}
    >
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
          <button onClick={handleFavButtonClick}
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
  onChangeActiveOffer: PropTypes.func,
  onResetFavoriteStatus: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

const mapStateToProps = (state, props) => ({
  offer: state.offers.entities.find((offer) => offer.id === props.id),

});

const mapDispatchToProps = (dispatch) => ({
  onResetFavoriteStatus(id, status) {
    dispatch(resetFavoriteStatus(id, status));
  },
});

export {OfferCard};
export default connect(mapStateToProps, mapDispatchToProps)(OfferCard);
