import {
  ActionType,
  ActionTypeDetails,
} from '../../actions';

import {room} from './room';

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(room(undefined, {})).toEqual({
      isRoomLoaded: false,
      isNearbyLoaded: false,
      nearIds: [],
    });
  });

  it(`Reducer should set the room to a correct value`, () => {
    const filledState = {
      isRoomLoaded: true,
      isNearbyLoaded: true,
      nearIds: [1, 2, 3],
    };
    const cleanedState = {
      isRoomLoaded: false,
      isNearbyLoaded: false,
      nearIds: [],
    };

    const roomAction = {
      type: ActionType.UPDATE_OFFERS + ActionTypeDetails.ROOM,
      payload: {id: 4}
    };
    expect(room(filledState, roomAction)).toEqual({isRoomLoaded: true, isNearbyLoaded: true, nearIds: [1, 2, 3]});
    expect(room(cleanedState, roomAction)).toEqual({isRoomLoaded: true, isNearbyLoaded: false, nearIds: []});

    const nearbyAction = {
      type: ActionType.UPDATE_OFFERS + ActionTypeDetails.NEARBY,
      payload: [{id: 1}, {id: 2}, {id: 4}]
    };
    expect(room(filledState, nearbyAction)).toEqual({isRoomLoaded: true, isNearbyLoaded: true, nearIds: [1, 2, 4]});
    expect(room(cleanedState, nearbyAction)).toEqual({isRoomLoaded: false, isNearbyLoaded: true, nearIds: [1, 2, 4]});

    const clearAction = {
      type: ActionType.UPDATE_OFFERS + ActionTypeDetails.ROOM + ActionTypeDetails.CLEAR,
      payload: null
    };
    expect(room(filledState, clearAction)).toEqual({isRoomLoaded: false, isNearbyLoaded: false, nearIds: []});
    expect(room(cleanedState, clearAction)).toEqual({isRoomLoaded: false, isNearbyLoaded: false, nearIds: []});
  });
});
