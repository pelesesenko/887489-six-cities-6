import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {prepareRating, upFirst} from '../../services/utilities';
import {isAuthorizedSelector, createOfferByIdSelector} from '../../store/selectors';
import {hotelPropTypes} from '../../prop-types';
import {CardTypes, roomLink, AppPaths} from '../../constants';
import {resetFavoriteStatus} from '../../store/api-actions';
import {ActionTypeDetails} from '../../store/actions';

const OfferCard = ({id, offer, cardType, onChangeActiveOffer = () => {}, onResetFavoriteStatus, isAuthorized}) => {

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

  const history = useHistory();

  const handleFavButtonClick = () => {
    if (!isAuthorized) {
      history.push(AppPaths.LOGIN);
      return;
    }
    const status = isFavorite ? 0 : 1;
    onResetFavoriteStatus(id, status, ActionTypeDetails.FAVORITE);
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
        <Link to={roomLink + id}>
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
          <Link to={roomLink + id}>{title}</Link>
        </h2>
        <p className="place-card__type">{upFirst(type)}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  offer: hotelPropTypes,
  cardType: PropTypes.string.isRequired,
  onChangeActiveOffer: PropTypes.func,
  onResetFavoriteStatus: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

const makeMapStateToProps = () => {
  const offerById = createOfferByIdSelector();
  return (state, props) => ({
    offer: offerById(state, props),
    isAuthorized: isAuthorizedSelector(state),
  });
};

const mapDispatchToProps = {
  onResetFavoriteStatus: resetFavoriteStatus,
};

export {OfferCard};
export default connect(makeMapStateToProps, mapDispatchToProps)(OfferCard);
