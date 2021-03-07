import {ActionType, ActionTypeDetails} from '../actions';

const initialState = {
  isRoomLoaded: false,
  isNearbyLoaded: false,
  nearIds: [],
};

export const room = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.UPDATE_OFFERS + ActionTypeDetails.ROOM:
      return {
        ...state,
        isRoomLoaded: true,
      };

    case ActionType.UPDATE_OFFERS + ActionTypeDetails.ROOM + ActionTypeDetails.CLEAR:
      return initialState;

    case ActionType.UPDATE_OFFERS + ActionTypeDetails.NEARBY:
      return {
        ...state,
        isNearbyLoaded: true,
        nearIds: action.payload.map((nearRoom) => nearRoom.id)
      };

    default: return state;
  }
};
