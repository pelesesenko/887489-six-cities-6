import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {hotelPropTypes} from '../../prop-types';
import {useHistory} from 'react-router-dom';
import {ErrorStatus, AppPaths, APIRoutes} from '../../constants';
import {createApi} from '../../services/api';
import {offerAdapter, offersAdapter, reviewsAdapter} from '../../services/adapters';
import {ActionCreator} from '../../store/actions';
import {resetFavoriteStatus} from '../../store/api-actions';
import {offerByIdSelector} from '../../store/selectors';


import Header from '../header/header';
import Loading from '../loading/loading';
import ReviewForm from '../review-form/review-form';
import RoomGalleryItem from '../room-gallery-item/room-gallery-item';
import RoomGood from '../room-good/room-good';
import ReviewsList from '../reviews-list/reviews-list';
import Map from '../map/map';
import NearbyList from '../nearby-list/nearby-list';

import {prepareRating, upFirst} from '../../utilities/utilities';

const PageRoom = ({id, isAuthorized, onOffersUpdate, room, onResetFavoriteStatus, onLoadError, onLoadSuccess}) => {
  const history = useHistory();

  const [isRoomUpdated, setRoomUpdated] = useState(false);
  const [reviews, setReviews] = useState(null);
  const [nearOffers, setNearOffers] = useState(null);

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
    .then((data) => onOffersUpdate(data))
    .then(() => setRoomUpdated(true))
    .then(() => onLoadSuccess())
    .catch((err) => onLoadError(err));

    roomDataApi.get(APIRoutes.COMMENTS + id)
    .then(({data}) => reviewsAdapter(data))
    .then((data) => setReviews(data))
    .then(() => onLoadSuccess())
    .catch((err) => onLoadError(err));

    roomDataApi.get(APIRoutes.OFFERS + id + APIRoutes.NEARBY)
    .then(({data}) => offersAdapter(data))
    .then((data) => onOffersUpdate(data))
    .then((data) => setNearOffers(data))
    .then(() => onLoadSuccess())
    .catch((err) => onLoadError(err));
  }, [id]);

  const onSentReview = (newReviews) => {
    setReviews(newReviews);
  };

  const handleFavButtonClick = () => {
    if (!isAuthorized) {
      history.push(AppPaths.LOGIN);
      return;
    }
    const status = room.isFavorite ? 0 : 1;
    onResetFavoriteStatus(id, status);
  };

  const mapStyle = {
    height: `579px`,
    width: `1144px`,
    margin: `0 auto`
  };

  return (
    <div className="page">
      <Header/>
      {!isRoomUpdated
        ? <Loading />
        : (<main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {room.images.slice(0, 6).map((url) => <RoomGalleryItem url={url} key={url}/>)}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {room.isPremium && <div className="property__mark">
                  <span>Premium</span>
                </div>}
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {room.title}
                  </h1>
                  <button onClick={handleFavButtonClick}
                    className={`property__bookmark-button button
                    ${room.isFavorite ? `property__bookmark-button--active` : null}`}
                    type="button">
                    <svg className="property__bookmark-icon" width={31} height={33}>
                      <use xlinkHref="#icon-bookmark" />
                    </svg>
                    <span className="visually-hidden">
                      {`${room.isFavorite ? `In` : `To`} bookmarks`}
                    </span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: prepareRating(room.rating)}} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{room.rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {upFirst(room.type)}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {room.bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {room.maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">€{room.price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {room.goods.map((good) => <RoomGood good={good} key={good}/>)}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className={`property__avatar-wrapper user__avatar-wrapper
                      ${room.host.isPro ? `property__avatar-wrapper--pro` : ``}`
                    }>
                      <img className="property__avatar user__avatar" src={room.host.avatarUrl} width={74} height={74} alt="Host avatar" />
                    </div>
                    <span className="property__user-name">
                      {room.host.name}
                    </span>
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {room.description}
                    </p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  {!reviews ? <Loading /> : <ReviewsList reviews={reviews}/>}
                  {isAuthorized && <ReviewForm roomId={id} onSentReview={onSentReview}/>}
                </section>
              </div>
            </div>
            <section className="property__map map">
              {!nearOffers
                ? <Loading />
                : <Map offers={[...nearOffers, room]} cityName={room.city.name} style={mapStyle} activeOfferId={id}/>}
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              {nearOffers === null
                ? <Loading />
                : <NearbyList nearOffersId={nearOffers.map((offer) => offer.id)}/>}
            </section>
          </div>
        </main>)}
    </div>
  );
};

PageRoom.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  onOffersUpdate: PropTypes.func.isRequired,
  onResetFavoriteStatus: PropTypes.func.isRequired,
  onLoadSuccess: PropTypes.func.isRequired,
  onLoadError: PropTypes.func.isRequired,
  room: hotelPropTypes,
  id: PropTypes.number.isRequired,
};

const mapStateToProps = (state, props) => ({
  room: offerByIdSelector(state, props),
});

const mapDispatchToProps = (dispatch) => ({
  onOffersUpdate(offers) {
    dispatch(ActionCreator.updateOffers(offers));
    return offers;
  },
  onResetFavoriteStatus(id, status) {
    dispatch(resetFavoriteStatus(id, status));
  },
  onLoadSuccess() {
    dispatch(ActionCreator.setServerAvailability(true));
  },
  onLoadError(err) {
    const {response} = err;
    if (response.status !== ErrorStatus.NOT_FOUND && response.status !== ErrorStatus.BAD_REQUEST) {
      dispatch(ActionCreator.setServerAvailability(false));
    }
  },
});

export {PageRoom};
export default connect(mapStateToProps, mapDispatchToProps)(PageRoom);


