// import Cities from '../../constants';

export const ActionType = {
  SET_CITY: `MAIN/SET_CITY`,
};

export const ActionCreator = {
  setCity: (cityName) => ({
    type: ActionType.SET_CITY,
    payload: cityName,
  })
};

