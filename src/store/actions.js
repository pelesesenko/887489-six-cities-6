// import Cities from '../../constants';

export const ActionType = {
  SET_CITY: `main/set-city`,
  SET_SORT_ORDER: `main/set-sort-order`,
  LOAD_OFFERS: `data/load-offers`,
  REQUIRED_AUTHORIZATION: `user/required-authorization`,
  SET_CURRENT_USER: `user/set-current-user`,
  UPDATE_OFFERS: `data/update-offers`,
};

export const ActionCreator = {
  setCity: (cityName) => ({
    type: ActionType.SET_CITY,
    payload: cityName,
  }),

  setSortOrder: (sortOrder) => ({
    type: ActionType.SET_SORT_ORDER,
    payload: sortOrder,
  }),

  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers,
  }),

  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status
  }),

  setCurrentUser: (user) => ({
    type: ActionType.SET_CURRENT_USER,
    payload: user,
  }),

  updateOffers: (offers) => ({
    type: ActionType.UPDATE_OFFERS,
    payload: offers,
  }),
};

