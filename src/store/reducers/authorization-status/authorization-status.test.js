import {ActionType} from '../../actions';
import {AuthorizationStatus} from '../../../constants';

import {authorizationStatus} from './authorization-status';

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(authorizationStatus(undefined, {})).toEqual(AuthorizationStatus.NOT_CHECKED);
  });

  it(`Reducer should set the authorization status to a given value`, () => {
    const state = AuthorizationStatus.NO_AUTH;
    const nonChangeAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH
    };
    const changeAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH
    };

    expect(authorizationStatus(state, changeAction)).toEqual(AuthorizationStatus.AUTH);
    expect(authorizationStatus(state, nonChangeAction)).toEqual(AuthorizationStatus.NO_AUTH);
  });
});

