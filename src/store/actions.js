// import Cities from '../../constants';

export const ActionType = {
  SET_CITY: `main/set-sity`,
};

export const ActionCreator = {
  setCity: (cityName) => ({
    type: ActionType.SET_CITY,
    payload: cityName,
  })
};

