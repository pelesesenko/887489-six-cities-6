import {ActionType} from '../../actions';

export const initialState = true;

export const serverAvailability = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.SET_SERVER_AVAILABILITY:
      return action.payload;

    default: return state;
  }
};
