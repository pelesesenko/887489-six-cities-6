// import Cities from '../../constants';

export const ActionType = {
  SET_CITY: `MAIN/SET_CITY`,
  SET_SORT_ORDER: `MAIN/SET_SORT_ORDER`,
  LOAD_OFFERS: `DATA/LOAD_OFFERS`,
  REQUIRED_AUTHORIZATION: `USER/REQUIRED_AUTHORIZATION`,
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
};

