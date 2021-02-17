import React from 'react';

import {hotelPropTypes, hotelsPropTypes, commentsPropTypes} from '../../prop-types';

import Header from '../header/header';
import ReviewForm from '../review-form/review-form';
import RoomGalleryItem from '../room-gallery-item/room-gallery-item';
import RoomGood from '../room-good/room-good';
import ReviewsList from '../reviews-list/reviews-list';
import Map from '../map/map';
import NearbyList from '../nearby-list/nearby-list';

import {prepareRating, upFirst} from '../../utilities/utilities';


const PageRoom = ({room, reviews, nearOffers}) => {

  const {
    isPremium,
    price,
    title,
    isFavorite,
    rating,
    type,
    images,
    bedrooms,
    maxAdults,
    goods,
    host,
    description
  } = room;

  const mapStyle = {
    height: `579px`,
    width: `1144px`,
    margin: `0 auto`
  };

  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.slice(0, 6).map((url) => <RoomGalleryItem url={url} key={url}/>)}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && <div className="property__mark">
                <span>Premium</span>
              </div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className={
                  `property__bookmark-button button
                  ${isFavorite ? `property__bookmark-button--active` : null}`}
                type="button">
                  <svg className="property__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">
                    {`${isFavorite ? `In` : `To`} bookmarks`}
                  </span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: prepareRating(rating)}} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {upFirst(type)}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">€{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((good) => <RoomGood good={good} key={good}/>)}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={
                    `property__avatar-wrapper
                     user__avatar-wrapper
                     ${host.isPro && `property__avatar-wrapper--pro`}`
                  }>
                    <img className="property__avatar user__avatar" src={host.avatarUrl} width={74} height={74} alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <ReviewsList reviews={reviews}/>
                <ReviewForm />
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map offers={nearOffers} city={nearOffers[0].city} style={mapStyle}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <NearbyList nearOffers={nearOffers}/>
          </section>
        </div>
      </main>
    </div>
  );
};

PageRoom.propTypes = {
  room: hotelPropTypes,
  reviews: commentsPropTypes,
  nearOffers: hotelsPropTypes,
};

export default PageRoom;

