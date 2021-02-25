import {ActionType} from '../actions';

const initialState = {
  isLoaded: false,
  entities: [],
};

export const offers = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return {
        ...state,
        isLoaded: true,
        entities: action.payload,
      };
    default: return state;
  }
};
