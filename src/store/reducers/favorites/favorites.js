import {ActionType, ActionTypeDetails} from '../../actions';

export const initialState = {
  isLoaded: false,
  ids: [],
};

export const favorites = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.UPDATE_OFFERS + ActionTypeDetails.FAVORITES:
      return {
        ...state,
        isLoaded: true,
        ids: action.payload.map((fav) => fav.id)
      };
    case ActionType.UPDATE_OFFERS + ActionTypeDetails.FAVORITES + ActionTypeDetails.CLEAR:
      return initialState;

    default: return state;
  }
};
