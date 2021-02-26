import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {useParams, useHistory} from 'react-router-dom';
import {ErrorStatus, AppPaths, APIRoutes, AuthorizationStatus} from '../../constants';
import {createApi} from '../../services/api';
import {offerAdapter, offersAdapter, reviewsAdapter} from '../../services/adapters';


import Header from '../header/header';
import Loading from '../loading/loading';
import ReviewForm from '../review-form/review-form';
import RoomGalleryItem from '../room-gallery-item/room-gallery-item';
import RoomGood from '../room-good/room-good';
import ReviewsList from '../reviews-list/reviews-list';
import Map from '../map/map';
import NearbyList from '../nearby-list/nearby-list';

import {prepareRating, upFirst} from '../../utilities/utilities';


const PageRoom = ({isAuthorized}) => {

  const id = useParams().id;
  const history = useHistory();

  const [room, setRoom] = useState({});
  const [reviews, setReviews] = useState([]);
  const [nearOffers, setNearOffers] = useState([]);

  const [isRoomLoaded, setRoomLoaded] = useState(false);
  const [isReviewsLoaded, setReviewsLoaded] = useState(false);
  const [isNearOffersLoaded, setNearOffersLoaded] = useState(false);


  const roomApi = createApi(
      () => {
        history.push(AppPaths.NOT_FOUND);
      },
      ErrorStatus.NOT_FOUND
  );

  const roomDataApi = createApi();

  useEffect(() => {
    roomApi.get(APIRoutes.OFFERS + id)
    .then(({data}) => offerAdapter(data))
    .then((data) => setRoom(data))
    .then(() => setRoomLoaded(true));

    roomDataApi.get(APIRoutes.COMMENTS + id)
    .then(({data}) => reviewsAdapter(data))
    .then((data) => setReviews(data))
    .then(() => setReviewsLoaded(true))
    .catch(() => {});

    roomDataApi.get(APIRoutes.OFFERS + id + APIRoutes.NEARBY)
    .then(({data}) => offersAdapter(data))
    .then((data) => setNearOffers(data))
    .then(() => setNearOffersLoaded(true))
    .catch(() => {});

    return (() => {
      setRoom({});
      setReviews([]);
      setNearOffers([]);
      setRoomLoaded(false);
      setReviewsLoaded(false);
      setNearOffersLoaded(false);
    });
  }, [id]);

  const onSentReview = (newReviews) => {
    setReviews(newReviews);
  };

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
      {!isRoomLoaded
        ? <Loading />
        : (<main className="page__main page__main--property">
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
                    <div className={`property__avatar-wrapper user__avatar-wrapper
                      ${host.isPro ? `property__avatar-wrapper--pro` : ``}`
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
                  {isReviewsLoaded ? <ReviewsList reviews={reviews}/> : <Loading />}
                  {isAuthorized && <ReviewForm roomId={id} onSentReview={onSentReview}/>}
                </section>
              </div>
            </div>
            <section className="property__map map">
              {isNearOffersLoaded
                ? <Map offers={nearOffers} city={nearOffers[0].city} style={mapStyle}/>
                : <Loading />}
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <NearbyList nearOffers={nearOffers}/>
            </section>
          </div>
        </main>)}
    </div>
  );
};

PageRoom.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthorized: state.authorizationStatus === AuthorizationStatus.AUTH,
  user: state.currentUser,
});

export {PageRoom};
export default connect(mapStateToProps)(PageRoom);


