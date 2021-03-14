import {
  ActionType,
  ActionTypeDetails,
  ActionCreator
} from './actions';

import {Cities, SortOrders, AuthorizationStatus} from '../constants';

describe(`Action creators work correctly`, () => {
  it(`Action creator for set city name returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SET_CITY,
      payload: Cities.HAMBURG
    };
    expect(ActionCreator.setCity(Cities.HAMBURG)).toEqual(expectedAction);
  });
  it(`Action creator for set user returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SET_CURRENT_USER,
      payload: {
        id: 1,
        email: `123@mail.ru`,
        name: `123`,
      }
    };
    const user = {
      id: 1,
      email: `123@mail.ru`,
      name: `123`,
    };
    expect(ActionCreator.setCurrentUser(user)).toEqual(expectedAction);
  });
  it(`Action creator for set server availability returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SET_SERVER_AVAILABILITY,
      payload: false
    };
    expect(ActionCreator.setServerAvailability(false)).toEqual(expectedAction);
  });
  it(`Action creator for set sort order returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SET_SORT_ORDER,
      payload: SortOrders.POPULAR
    };
    expect(ActionCreator.setSortOrder(SortOrders.POPULAR)).toEqual(expectedAction);
  });
  it(`Action creator for set loaded offers returns correct action`, () => {
    const offers = [1, 2, 3];
    const expectedAction = {
      type: ActionType.LOAD_OFFERS,
      payload: offers
    };
    expect(ActionCreator.loadOffers(offers)).toEqual(expectedAction);
  });
  it(`Action creator for set authorization status returns correct action`, () => {
    const expectedAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH
    };
    expect(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)).toEqual(expectedAction);
  });
  it(`Action creator for update offers returns correct action`, () => {
    const offers = [1, 2, 3];
    const expectedAction = {
      type: `data/update-offers-room-clear`,
      payload: offers
    };
    expect(ActionCreator.updateOffers(
        offers,
        ActionTypeDetails.ROOM + ActionTypeDetails.CLEAR
    )).toEqual(expectedAction);
  });
});

