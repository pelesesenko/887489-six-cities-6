import {ActionType} from '../../actions';

import {serverAvailability} from './server-availability';

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(serverAvailability(undefined, {})).toEqual(true);
  });

  it(`Reducer should set the server availability to a given value`, () => {
    const state = true;
    const nonChangeAction = {
      type: ActionType.SET_SERVER_AVAILABILITY,
      payload: true
    };
    const changeAction = {
      type: ActionType.SET_SERVER_AVAILABILITY,
      payload: false
    };

    expect(serverAvailability(state, nonChangeAction)).toEqual(true);
    expect(serverAvailability(state, changeAction)).toEqual(false);
  });
});
