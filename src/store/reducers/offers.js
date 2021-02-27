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

    case ActionType.UPDATE_OFFERS:
      let newState = {...state};
      if (action.payload instanceof Array) {
        action.payload.forEach((newRoom) => {
          newState.entities = state.entities.map(
            (oldRoom) => newRoom.id === oldRoom.id ? newRoom : {...oldRoom});
        });
      } else {
        newState.entities = state.entities.map(
          (oldRoom) => action.payload.id === oldRoom.id ? action.payload : {...oldRoom});
      }
      return newState;

    default: return state;
  }
};
