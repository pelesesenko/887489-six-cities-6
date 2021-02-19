import {ActionType} from '../actions';
import {Offers} from '../../mocks/offers';
import {Cities} from '../../constants';

const initialState = {
  currentCityName: Cities.PARIS,
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
    default: return state;
  }
};

export {reducer};
