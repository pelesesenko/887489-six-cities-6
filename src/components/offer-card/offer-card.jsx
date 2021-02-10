import React from 'react';
import {Link} from 'react-router-dom';
import {prepareRating, upFirst} from '../../utilities/utilities';
import {hotelPropTypes} from '../../prop-types';

const OfferCard = ({offer}) => {

  const {isPremium, previewImage, price, title, isFavorite, rating, type, id} = offer;
  const offerLink = `/offer/${id}`;

  return (
    <article data-offer-id={id} className="cities__place-card place-card">
      {isPremium && <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={offerLink}>
          <img className="place-card__image" src={previewImage} width={260} height={200} alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${isFavorite ?
              `place-card__bookmark-button--active`
              : null}`}
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
  offer: hotelPropTypes
};

export default OfferCard;
