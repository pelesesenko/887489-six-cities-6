import {ActionType} from '../../actions';

import {currentUser} from './current-user';

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(currentUser(undefined, {})).toEqual({});
  });

  it(`Reducer should set the current user to a given value`, () => {
    const state = {id: 1, email: `123@qwe.ru`};
    const nonChangeAction = {
      type: ActionType.SET_CURRENT_USER,
      payload: {id: 1, email: `123@qwe.ru`}
    };
    const changeAction = {
      type: ActionType.SET_CURRENT_USER,
      payload: {id: 2, email: `456@qwe.ru`}
    };
    const clearAction = {
      type: ActionType.SET_CURRENT_USER,
      payload: {}
    };

    expect(currentUser(state, nonChangeAction)).toEqual({id: 1, email: `123@qwe.ru`});
    expect(currentUser(state, changeAction)).toEqual({id: 2, email: `456@qwe.ru`});
    expect(currentUser(state, clearAction)).toEqual({});
  });
});
