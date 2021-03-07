import {ActionType} from '../actions';

const initialState = {
  isRoomLoaded: false,
  roomId: null,
  isNearbyLoaded: false,
  nearbyIds: [],
};

export const room = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.UPDATE_OFFERS_ROOM:
      return {
        ...state,
        isRoomLoaded: true,
        roomId: action.payload.id
      };

    case ActionType.UPDATE_OFFERS_NEARBY:
      return {
        ...state,
        isNearbyLoaded: true,
        nearbyIds: action.payload.map((nearRoom) => nearRoom.id)
      };
      case ActionType.UPDATE_OFFERS_ROOM_CLEAR:
      return initialState;

    default: return state;
  }
};
