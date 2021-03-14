import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {ErrorStatus, AppPaths, APIRoutes} from '../../constants';
import {simpleApi} from '../../services/api';
import {ActionCreator, ActionTypeDetails} from '../../store/actions';
import {resetFavoriteStatus} from '../../store/api-actions';
import {offerByIdSelector, nearOffersSelector} from '../../store/selectors';


import Header from '../header/header';
import Loading from '../loading/loading';
import ReviewForm from '../review-form/review-form';
import RoomGalleryItem from '../room-gallery-item/room-gallery-item';
import RoomGood from '../room-good/room-good';
import ReviewsList from '../reviews-list/reviews-list';
import Map from '../map/map';
import NearbyList from '../nearby-list/nearby-list';
import history from '../../browser-history';

import {prepareRating, upFirst} from '../../services/utilities';

const PageRoom = (props) => {

  const {id, isAuthorized, isRoomLoaded, isNearbyLoaded} = props;

  const [reviews, setReviews] = React.useState(null);

  const room = useSelector((state) => offerByIdSelector(state, props));
  const nearOffers = useSelector((state) => nearOffersSelector(state));

  const dispatch = useDispatch();

  const commentsUrl = APIRoutes.COMMENTS + id;

  const onLoadSuccess = () => {
    dispatch(ActionCreator.setServerAvailability(true));
  };

  const onLoadError = (err) => {
    const {response} = err;
    if (response.status !== ErrorStatus.BAD_REQUEST) {
      dispatch(ActionCreator.setServerAvailability(false));
    }
  };

  useEffect(() => {
    simpleApi.get(commentsUrl)
    .then(({data}) => setReviews(data))
    .then(() => onLoadSuccess())
    .catch((err) => onLoadError(err));
  }, [id]);

  const onSentReview = (newReviews) => {
    setReviews(newReviews);
  };
  // simpleApi.get(APIRoutes.COMMENTS + 3 ).then(({data}) => console.log(JSON.stringify(data)))

  const handleFavButtonClick = () => {
    if (!isAuthorized) {
      history.push(AppPaths.LOGIN);
      return;
    }
    const status = room.isFavorite ? 0 : 1;
    dispatch(resetFavoriteStatus(id, status, ActionTypeDetails.FAVORITE));
  };

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
                  {isAuthorized && <ReviewForm roomId={id} onSentReview={onSentReview} api={simpleApi}/>}
                </section>
              </div>
            </div>
            <section className="property__map map">
              {!isNearbyLoaded
                ? <Loading />
                : <Map offers={[...nearOffers, room]} cityName={room.city.name} style={mapStyle} activeOfferId={id}/>}
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              {!isNearbyLoaded
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
  isRoomLoaded: PropTypes.bool.isRequired,
  isNearbyLoaded: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
};

export default PageRoom;


