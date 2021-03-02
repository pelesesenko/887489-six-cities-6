import {SortOrders, AuthorizationStatus} from '../constants';
import {createSelector} from 'reselect';

export const isAuthorizedSelector = (state) => state.authorizationStatus === AuthorizationStatus.AUTH;
export const isOffersLoadedSelector = (state) => state.offers.isLoaded;
export const allOffersSelector = (state) => state.offers.entities;
export const currentCityNameSelector = (state) => state.currentCityName;
export const currentUserSelector = (state) => state.currentUser;
export const sortOrderSelector = (state) => state.sortOrder;
export const propsIdSelector = (_state, props) => props.id;
export const serverAvailabilitySelector = (state) => state.serverAvailability;

export const offerByIdSelector = createSelector(
    allOffersSelector,
    propsIdSelector,
    (offers, id) => offers.find((offer) => offer.id === id)
);

export const createOfferByIdSelector = () => offerByIdSelector;


export const offersInCitySelector = createSelector(
    allOffersSelector,
    currentCityNameSelector,
    (all, name) => {
      const result = all.filter((offer) => offer.city.name === name);
      return result;
    }
);

export const sortedOffersInCitySelector = createSelector(
    offersInCitySelector,
    sortOrderSelector,
    (offers, order) => {
      const result = [...offers];
      switch (order) {
        case SortOrders.RATING:
          result.sort((a, b) => b.rating - a.rating);
          break;
        case SortOrders.PRICE_UP:
          result.sort((a, b) => a.price - b.price);
          break;
        case SortOrders.PRICE_DOWN:
          result.sort((a, b) => b.price - a.price);
          break;
      }
      return result;
    }
);


