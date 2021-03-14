import {ActionType} from '../../actions';
import {AuthorizationStatus} from '../../../constants';

export const initialState = AuthorizationStatus.NOT_CHECKED;

export const authorizationStatus = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return action.payload;

    default: return state;
  }
};
