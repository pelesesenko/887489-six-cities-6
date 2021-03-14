import {ActionType} from '../../actions';
import {SortOrders} from '../../../constants';

import {sortOrder} from './sort-order';

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(sortOrder(undefined, {})).toEqual(SortOrders.POPULAR);
  });

  it(`Reducer should set the sort order to a given value`, () => {
    const state = SortOrders.POPULAR;
    const nonChangeAction = {
      type: ActionType.SET_SORT_ORDER,
      payload: SortOrders.POPULAR
    };
    const changeAction = {
      type: ActionType.SET_SORT_ORDER,
      payload: SortOrders.PRICE_DOWN
    };

    expect(sortOrder(state, nonChangeAction)).toEqual(SortOrders.POPULAR);
    expect(sortOrder(state, changeAction)).toEqual(SortOrders.PRICE_DOWN);
  });
});
