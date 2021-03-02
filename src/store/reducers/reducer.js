import {combineReducers} from 'redux';

import {offers} from './offers';
import {authorizationStatus} from './auth-status';
import {sortOrder} from './sort-order';
import {currentCityName} from './current-city';
import {currentUser} from './current-user';
import {serverAvailability} from './server-availability';

export const reducer = combineReducers({
  currentCityName,
  sortOrder,
  offers,
  authorizationStatus,
  currentUser,
  serverAvailability,
});
