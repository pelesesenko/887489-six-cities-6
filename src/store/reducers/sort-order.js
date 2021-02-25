import {ActionType} from '../actions';
import {SortOrders} from '../../constants';

const initialState = SortOrders.POPULAR;

export const sortOrder = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.SET_SORT_ORDER:
      return action.payload;

    default: return state;
  }
};
