import {SortOrders} from '../constants';

export const offersInCitySelector = (state) => {
  let result = [...state.offers.entities].filter(
      (offer) => offer.city.name === state.currentCityName
  );

  switch (state.sortOrder) {
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
};
