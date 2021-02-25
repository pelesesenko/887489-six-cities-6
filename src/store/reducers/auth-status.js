import {ActionType} from '../actions';
import {AuthorizationStatus} from '../../constants';

const initialState = AuthorizationStatus.NO_AUTH;

export const authorizationStatus = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return action.payload;

    default: return state;
  }
};
