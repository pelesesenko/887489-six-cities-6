import {
  ActionType,
  ActionTypeDetails,
} from '../../actions';

import {favorites} from './favorites';

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(favorites(undefined, {})).toEqual({isLoaded: false, ids: []});
  });

  it(`Reducer should set the favorites to a correct value`, () => {
    const state = {isLoaded: true, ids: [1, 2, 3]};
    const nonChangeAction = {
      type: ActionType.UPDATE_OFFERS + ActionTypeDetails.FAVORITES,
      payload: [{id: 1}, {id: 2}, {id: 3}]
    };
    const changeAction = {
      type: ActionType.UPDATE_OFFERS + ActionTypeDetails.FAVORITES,
      payload: [{id: 1}, {id: 2}, {id: 4}]
    };
    const clearAction = {
      type: ActionType.UPDATE_OFFERS + ActionTypeDetails.FAVORITES + ActionTypeDetails.CLEAR,
      payload: null
    };
    const removeFavoriteAction = {
      type: ActionType.UPDATE_OFFERS + ActionTypeDetails.FAVORITE,
      payload: {id: 1}
    };
    const addFavoriteAction = {
      type: ActionType.UPDATE_OFFERS + ActionTypeDetails.FAVORITE,
      payload: {id: 4}
    };

    expect(favorites(state, nonChangeAction)).toEqual({isLoaded: true, ids: [1, 2, 3]});
    expect(favorites(state, changeAction)).toEqual({isLoaded: true, ids: [1, 2, 4]});
    expect(favorites(state, clearAction)).toEqual({isLoaded: false, ids: []});
    expect(favorites(state, removeFavoriteAction)).toEqual({isLoaded: true, ids: [2, 3]});
    expect(favorites(state, addFavoriteAction)).toEqual({isLoaded: true, ids: [1, 2, 3, 4]});
  });
});
