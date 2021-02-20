import {ActionType} from '../actions';
import {Offers} from '../../mocks/offers';
import {Cities, SortOrders} from '../../constants';

const initialState = {
  currentCityName: Cities.PARIS,
  sortOrder: SortOrders.POPULAR,
  offers: Offers,
  offersAmountToShow: 5,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.SET_CITY:
      return {
        ...state,
        currentCityName: action.payload
      };

    case ActionType.SET_SORT_ORDER:
      return {
        ...state,
        sortOrder: action.payload
      };


    default: return state;
  }
};

export {reducer};
