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

    case ActionType.UPDATE_OFFERS_ROOM:
    case ActionType.UPDATE_OFFERS_NEARBY:
    case ActionType.UPDATE_OFFERS_FAVORITE:
    case ActionType.UPDATE_OFFERS_FAVORITES:
      let newState = {...state};
      if (action.payload instanceof Array) {

        action.payload.forEach((newRoom) => {
          let isFound = false;
          newState.entities = state.entities.map((oldRoom) => {
            if (newRoom.id === oldRoom.id) {
              isFound = true;
              return newRoom;
            } else {
              return oldRoom;
            }
          });
          if (!isFound) {
            newState.entities.push(newRoom);
          }
        });
      } else {
        let isFound = false;

        newState.entities = state.entities.map((oldRoom) => {
          if (action.payload.id === oldRoom.id) {
            isFound = true;
            return action.payload;
          } else {
            return oldRoom;
          }
        });
        if (!isFound) {
          newState.entities.push(action.payload);
        }
      }
      return newState;

    default: return state;
  }
};
