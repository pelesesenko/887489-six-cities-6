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
    case ActionType.UPDATE_OFFERS + ActionTypeDetails.FAVORITE:
      if (!state.isLoaded) {
        return state;
      }
      const index = state.ids.indexOf(action.payload.id);
      return {
        ...state,
        ids: index === -1
          ? [...state.ids, action.payload.id]
          : [...state.ids.slice(0, index), ...state.ids.slice(index + 1)]
      };
    case ActionType.UPDATE_OFFERS + ActionTypeDetails.FAVORITES + ActionTypeDetails.CLEAR:
      return initialState;

    default: return state;
  }
};
