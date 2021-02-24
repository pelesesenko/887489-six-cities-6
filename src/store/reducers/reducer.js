import {ActionType} from '../actions';
import {Favorites} from '../../mocks/favorites';
import {Cities, SortOrders, AuthorizationStatus} from '../../constants';

const initialState = {
  currentCityName: Cities.PARIS,
  sortOrder: SortOrders.POPULAR,
  offers: {
    isLoaded: false,
    entities: [],
  },
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  favorites: Favorites
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

    case ActionType.LOAD_OFFERS:
      return {
        ...state,
        offers: {
          ...state.offers,
          isLoaded: true,
          entities: action.payload,
        }
      };

    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload
      };

    default: return state;
  }
};

export {reducer};
