// import Cities from '../../constants';

export const ActionType = {
  SET_CITY: `MAIN/SET_CITY`,
  SET_SORT_ORDER: `MAIN/SET_SORT_ORDER`
};

export const ActionCreator = {
  setCity: (cityName) => ({
    type: ActionType.SET_CITY,
    payload: cityName,
  }),

  setSortOrder: (sortOrder) => ({
    type: ActionType.SET_SORT_ORDER,
    payload: sortOrder,
  })
};

