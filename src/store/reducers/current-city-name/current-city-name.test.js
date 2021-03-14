import {ActionType} from '../../actions';
import {Cities} from '../../../constants';

import {currentCityName} from './current-city-name';

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(currentCityName(undefined, {})).toEqual(Cities.PARIS);
  });

  it(`Reducer should set the current city name to a given value`, () => {
    const state = Cities.PARIS;
    const nonChangeAction = {
      type: ActionType.SET_CITY,
      payload: Cities.PARIS
    };
    const changeAction = {
      type: ActionType.SET_CITY,
      payload: Cities.COLOGNE
    };

    expect(currentCityName(state, changeAction)).toEqual(Cities.COLOGNE);
    expect(currentCityName(state, nonChangeAction)).toEqual(Cities.PARIS);
  });
});
