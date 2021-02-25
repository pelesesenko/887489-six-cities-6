import {ActionType} from '../actions';


const initialState = {};

export const currentUser = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.SET_CURRENT_USER:
      return action.payload;

    default: return state;
  }
};
