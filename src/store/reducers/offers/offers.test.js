import {
  ActionType,
  ActionTypeDetails,
} from '../../actions';

import {offers} from './offers';

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(offers(undefined, {})).toEqual({isLoaded: false, entities: []});
  });

  it(`Reducer should set the offers to a correct value`, () => {
    const first = {id: 1, a: 1};
    const second = {id: 2, a: 1};
    const third = {id: 3, a: 1};

    const state = {isLoaded: true, entities: [first, second, third]};

    const nonChangeAction = {
      type: ActionType.UPDATE_OFFERS + ActionTypeDetails.NEARBY + ActionTypeDetails.CLEAR,
      payload: null
    };
    expect(offers(state, nonChangeAction))
    .toEqual({isLoaded: true, entities: [first, second, third]});

    const reloadAction = {
      type: ActionType.LOAD_OFFERS,
      payload: [{id: 1, a: 2}, {id: 2, a: 1}, {id: 3, a: 1}]
    };
    expect(offers(state, reloadAction))
    .toEqual({isLoaded: true, entities: [{id: 1, a: 2}, {id: 2, a: 1}, {id: 3, a: 1}]});

    const favoritesAction = {
      type: ActionType.UPDATE_OFFERS + ActionTypeDetails.FAVORITES,
      payload: [{id: 1, a: 2}, {id: 4, a: 2}]
    };
    expect(offers(state, favoritesAction))
    .toEqual({isLoaded: true, entities: [{id: 1, a: 2}, second, third, {id: 4, a: 2}]});

    const nearbyAction = {
      type: ActionType.UPDATE_OFFERS + ActionTypeDetails.NEARBY,
      payload: [{id: 1, a: 2}, {id: 3, a: 1}, {id: 4, a: 2}]
    };
    expect(offers(state, nearbyAction))
    .toEqual({isLoaded: true, entities: [{id: 1, a: 2}, second, {id: 3, a: 1}, {id: 4, a: 2}]});

    const singleAction = {
      type: ActionType.UPDATE_OFFERS + ActionTypeDetails.FAVORITE,
      payload: {id: 2, a: 2}
    };
    expect(offers(state, singleAction))
    .toEqual({isLoaded: true, entities: [first, {id: 2, a: 2}, third]});
  });
});
